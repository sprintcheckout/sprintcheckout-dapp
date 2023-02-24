import {useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Link, Spinner, Text} from "@chakra-ui/react";

import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";
import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";

const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807';
const AUTH0_OAUTH_URL = 'https://dev-0p0zfam6.us.auth0.com/oauth/token';
const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout';
// const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout'; // TODO RESTORE
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
const SPRINTCHECKOUT_FEE = 0.005;

interface NetworkContract {
    goerli: string;
    mainnet: string;
}

const contractAddresses: Record<string, NetworkContract> = {
    USDC: {goerli: "0x0faF6df7054946141266420b43783387A78d82A9", mainnet: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"}, // TODO review every token contract address and decimals** on mainnet and goerli
    USDT: {goerli: "0x", mainnet: "0xdAC17F958D2ee523a2206206994597C13D831ec7"},
    DAI: {goerli: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b", mainnet: "0x6b175474e89094c44da98b954eedeac495271d0f"}, // TODO DAI decimals are not appropiate, fix
    WBTC: {goerli: "0x", mainnet: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599"},
    WETH: { goerli: "0x", mainnet: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" },
    ETH: {goerli: "0x0000000000000000000000000000000000000000", mainnet: "0x0000000000000000000000000000000000000000"},
};

let authResponse: AxiosResponse;

interface MerchantOrder {
    orderId: string;
    merchantId: string;
    status: string;
    receipts: Array<string>;
}

// TODO: thinking also about extending to other chains (polygon) etc.
export function ProcessPayment(props: { isConnected: boolean, merchantAmount: string | undefined, orderId: string | undefined,
    merchantId: string | undefined, selectedToken: string | undefined, successUrl: string | undefined }) {

    const [isConnected, setIsConnected] = useState(false);
    const [isBalanceEnough, setIsBalanceEnough] = useState(false);
    const [address, setAddress] = useState<string | undefined>("");
    // const [txHashObj, setTxHashObj] = useState<any>();
    const [txUrl, setTxUrl] = useState("");
    // const [orderId, setOrderId] = useState<string>("");
    // const [merchantId, setMerchantId] = useState<string>("");
    const [enablePayCall, setEnablePayCall] = useState(false);


    async function getAuth0Token() {

        if (!authResponse) {
            console.log("Regenerating authResponse (QUOTA!)")
            // let authBody = '{"client_id":"' + import.meta.env.VITE_AUTH0_CLIENT_ID + '","client_secret":"' + import.meta.env.VITE_AUTH0_CLIENT_SECRET + '","audience":"' + SPRINTCHECKOUT_BASE_URL + '","grant_type":"client_credentials"}'
            // authResponse = await axios.post(AUTH0_OAUTH_URL, authBody, {
            //     headers: {
            //         'content-type': `application/json`
            //     }
            // });
            authResponse = {config: {}, data: undefined, headers: undefined, status: 0, statusText: ""};
        }
        return authResponse;
    }

    async function processReceiptAndRedirect(txHash: { hash: string; }, orderId: string, merchantId: string) {
        // const merchantOrder: MerchantOrder = {
        //         orderId: orderId,
        //         merchantId: merchantId,
        //         status: "SUCCESS",
        //         receipts: [txHash.hash]
        //     }
        //
        //     let authResponse = await getAuth0Token();
        //     let resp = await axios.post(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/process_receipts', merchantOrder, {
        //         headers: {
        //             // 'Authorization': `Bearer ${authResponse.data.access_token}` // TODO restore
        //         }
        //     });
        //     console.log(resp.data);
        props.successUrl && window.location.replace(props.successUrl);

    }

    /** ************************************************************************************************* **/
    /**                                         ALLOWANCE                                                 **/
    /** ************************************************************************************************* **/
    console.log("props.selectedToken");
    console.log(props.selectedToken);
    const {data: balance, isError, isLoading: allowanceLoading} = useContractRead({
    // @ts-ignore
        address: props.selectedToken && contractAddresses[props.selectedToken!]["goerli" as keyof NetworkContract],
        abi: ERC20_CONTRACT_ABI,
        functionName: 'allowance',
        args: [address, SPRINTCHECKOUT_CONTRACT_ADDRESS],
        watch: true
    })

    /** ************************************************************************************************* **/
    /**                                         APPROVAL                                                  **/
    /** ************************************************************************************************* **/
    const highAmountForApproval = Number(1000) * (100 ** 2); // TODO this approves a high amount based on amount to pay, think about which number will be

    const {config: erc20ConfigApprove} = usePrepareContractWrite({
    // @ts-ignore
        address: props.selectedToken && contractAddresses[props.selectedToken!]["goerli" as keyof NetworkContract],
        abi: ERC20_CONTRACT_ABI,
        functionName: 'approve',
        args: [SPRINTCHECKOUT_CONTRACT_ADDRESS, highAmountForApproval]
    })

    const {
        data: erc20ApproveData,
        isLoading: isApproveLoading,
        status: approveStatus,
        isSuccess: isApproveSuccess,
        reset,
        write: approve
    } = useContractWrite(erc20ConfigApprove)

    /** ************************************************************************************************* **/
    /**                                         TRANSFER FROM                                             **/
    /** ************************************************************************************************* **/
    //TODO Move map with ERC20 token addresses and load the proper one here dinamically
    const merchantAmountBigNumber = props.merchantAmount && (Math.round(Number(props.merchantAmount) * (10 ** 6)));
    const spcFeeToPayBigNumber = props.merchantAmount && Math.round((Number(props.merchantAmount) * SPRINTCHECKOUT_FEE * (10 ** 6)));
    const amountToPay = merchantAmountBigNumber && spcFeeToPayBigNumber && Number(merchantAmountBigNumber) + Number(spcFeeToPayBigNumber);
    const merchantAmountMinusSpcFee = merchantAmountBigNumber && spcFeeToPayBigNumber && Number(merchantAmountBigNumber) - Number(spcFeeToPayBigNumber);
    //TODO estimate gas fee for the transfer from and do the maths to subtract it from the merchand and spc fee amounts

        // console.log(Number(merchantAmountBigNumber)! + Number(spcFeeToPayBigNumber!));
    const {config, error, isSuccess: configSuccess} = usePrepareContractWrite({
            address: enablePayCall && merchantAmountBigNumber && spcFeeToPayBigNumber ? SPRINTCHECKOUT_CONTRACT_ADDRESS : undefined,
            abi: SPRINTCHECKOUT_CONTRACT_ABI,
            functionName: 'transferFrom',
            args: [props.selectedToken && contractAddresses[props.selectedToken!]["goerli" as keyof NetworkContract], address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32",
                merchantAmountMinusSpcFee ? BigNumber.from(merchantAmountMinusSpcFee.toString()).toNumber() : undefined, spcFeeToPayBigNumber ? BigNumber.from(spcFeeToPayBigNumber.toString()).toNumber() : undefined],
        })

    const {data: txHash, isLoading, isSuccess, write: pay} = useContractWrite(config)
    if (enablePayCall && configSuccess) {
        pay?.();
        setEnablePayCall(false);
    }

    const calculateIsBalanceEnough = (balance: any, amountToPay: number): boolean => {
        console.log("Balance = " + balance);
        if (balance >= amountToPay) {
            return true;
        }
        return false;
    }

    /****************************************************/
    /*                     USE EFFECT                   */
    /****************************************************/
    useEffect(() => {
        console.log("Inside Use Effect!");
        let account = getAccount();
        setAddress(account.address);
        setIsConnected(props.isConnected);
        console.log("approve loading");
        console.log(isApproveLoading);
        console.log("is approve success");
        console.log(isApproveSuccess);
        setIsBalanceEnough(calculateIsBalanceEnough(balance, Number(amountToPay)));
        if (isApproveSuccess && isBalanceEnough && !isApproveLoading) {
            reset();
        }
        console.log("isBalanceEnough");
        console.log(isBalanceEnough);
        console.log("approveStatus");
        console.log(approveStatus);

        console.log("txHash?.hash");
        console.log(txHash?.hash);
        if (txHash) {
            setTxUrl("https://goerli.explorer.zksync.io/tx/" + txHash?.hash);

            setTimeout(function() {
                processReceiptAndRedirect(txHash, "order", "merch")
            }, 4500);
        }
        // setOrderId(props.orderId!);
        // setMerchantId(props.merchantId!);
    }, [props.isConnected, props.merchantAmount, props.selectedToken, address, balance, isBalanceEnough, isApproveSuccess, isApproveLoading, approveStatus, txHash]);

    /****************************************************/
    /*                    HTML - JXS                    */
    /****************************************************/

    return (
        <>
            <Center paddingBottom={"40px"}>
                {/* dev purposes for seeing the content: {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
                {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}
                {(isConnected && !isBalanceEnough && !txUrl) ?
                    (isApproveLoading && (!isApproveSuccess || !isBalanceEnough) || (isApproveSuccess && !isBalanceEnough)) ?
                        <Spinner thickness='2px' speed='0.65s' size="xl" color="blue.500"/> :
                        <Button backgroundColor="#0E76FD" onClick={() => approve?.()}>
                            Approve
                        </Button> :
                    isConnected && isBalanceEnough && props.merchantAmount && props.selectedToken && !txUrl?
                        <Button color={"white"} backgroundColor="#0E76FD" onClick={() => setEnablePayCall(true)}>
                            Pay {props.merchantAmount} {props.selectedToken}
                        </Button> : null
                }
            </Center>
            {txUrl ?
                <Center >
                    <Alert
                        borderBottomRadius="10px"
                        status='success'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0}/>
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Payment processed successfully!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            <Link isExternal={true} textDecor="underline" href={txUrl}>Here you can check your transaction status</Link>
                            <Text>You are being redirected to the store...</Text>
                            <Center marginTop={2}>
                                <Spinner thickness='2px' speed='0.65s' size="md" color="green.500"/>
                            </Center>
                        </AlertDescription>
                    </Alert>
                </Center> : null}
        </>
    )
}

