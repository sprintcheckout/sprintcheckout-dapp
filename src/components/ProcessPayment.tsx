import {useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Link, Spinner, Text} from "@chakra-ui/react";
import { useNetwork } from 'wagmi'
// import { useWhatChanged } from '@simbathesailor/use-what-changed';


import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";
import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";

const SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_GOERLI = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807'; // GOERLI ADDRESS
const SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_MUMBAI = '0x3D28aCb2aCCF54FcD37f718Ea58dD780aCD2927d'; // POLYGON MUMBAI ADDRESS
const SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_ZKEVM = '0xDdb60d551D819594B96b29b62c718038244c41A5'; // POLYGON ZKEVM ADDRESS
const SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_MAINNET = '0x2bf81700C523E4E95a4FF0214b933348BAaA09eF'; // MAINNET ADDRESS
//const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
const SPRINTCHECKOUT_FEE_ADDRESS = "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32"; // TODO check if makes sense to send the fee to the spc smart contract address
const SPRINTCHECKOUT_FEE = 0.005;

interface NetworkContract {
    280: string;
    324: string;
    80001: string;
}

// 280 (goerli a.k.a zkSyncTestnet) and 324 (mainet a.k.a zkSync) are the ZkSync assigned ids
// -> https://github.com/wagmi-dev/references/blob/df936de6d27b86fe8e7bad0dfa80e0810c0bcbd0/packages/chains/src/zkSync.ts#L4
// -> https://github.com/wagmi-dev/references/blob/df936de6d27b86fe8e7bad0dfa80e0810c0bcbd0/packages/chains/src/zkSyncTestnet.ts#L4
const contractAddresses: Record<string, NetworkContract> = {
    USDC: {280: "0x0faF6df7054946141266420b43783387A78d82A9", 324: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 80001: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747"}, // TODO review every token contract address and decimals** on mainnet and goerli
    USDT: {280: "0x", 324: "0xdAC17F958D2ee523a2206206994597C13D831ec7", 80001: "0x"},
    DAI: {280: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b", 324: "0x6b175474e89094c44da98b954eedeac495271d0f", 80001: "0x"}, // TODO DAI decimals are not appropiate, fix
    WBTC: {280: "0x", 324: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", 80001: "0x"},
    WETH: {280: "0x", 324: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 80001: "0x"},
    ETH: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x"},
};

interface IHash {
    [details: number]: string;
}

let sprintcheckoutContractAddressByNetwork: IHash = {};
sprintcheckoutContractAddressByNetwork[280] = SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_GOERLI;
sprintcheckoutContractAddressByNetwork[324] = SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_MAINNET;
sprintcheckoutContractAddressByNetwork[80001] = SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_MUMBAI;


let authResponse: AxiosResponse;

interface MerchantOrder {
    paymentSessionId: string;
    status: string;
    receipts: Array<string>;
}


// TODO: thinking also about extending to other chains (polygon) etc.
// TODO check how to deploy a smart contract in other chains (polygon mumbai etc.)
export function ProcessPayment(props: {
    backendPaymentSessionId: string, sessionNotFound: boolean, isConnected: boolean, merchantAmount: string | undefined, orderId: string | undefined,
    merchantId: string | undefined, merchantPublicAddress: string | undefined, selectedToken: string | undefined, successUrl: string | undefined, failUrl: string | undefined
}) {

    const { chain } = useNetwork();
    const [isConnected, setIsConnected] = useState(false);
    const [isBalanceEnough, setIsBalanceEnough] = useState(false);
    const [address, setAddress] = useState<string | undefined>("");
    const [txUrl, setTxUrl] = useState("");
    const [enablePayCall, setEnablePayCall] = useState(false);
    const [isTxValid, setIsTxValid] = useState(false);
    const [isTxInvalid, setIsTxInvalid] = useState(false);
    const [isTxBeingValidated, setIsTxBeingValidated] = useState(false);


    async function processReceiptAndRedirect(txHash: { hash: string; }) {
        //TODO check how to see that the header origin is the dApp in the backend to allow the process receipt
        // 1 send payment session id and tx hash
        //   - in backend, get merchant address from sesion id
        //   - get transaction from web3j in backend by using tx hash
        //      - check that the web3j tx object has the merchant Address in the 'to' field

        setIsTxBeingValidated(true);
        const merchantOrder: MerchantOrder = {
                paymentSessionId: props.backendPaymentSessionId,
                status: "",
                receipts: [txHash.hash]
            }

            let resp = await axios.post(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/process_receipts   ', merchantOrder);
        // TODO send tx hash to backend, validate and redirect to success or fail depending on the result
        if (resp.status == 200) {
            setIsTxBeingValidated(false);
            setIsTxValid(true);
            props.successUrl && window.location.replace(props.successUrl);
        } else {
            setIsTxInvalid(true);
            props.failUrl && window.location.replace(props.failUrl);
        }

    }

    /** ************************************************************************************************* **/
    /**                                         ALLOWANCE                                                 **/
    /** ************************************************************************************************* **/
    const {data: balance, isError, isLoading: allowanceLoading} = useContractRead({
        // @ts-ignore
        address: props.selectedToken && props.selectedToken != 'ETH' && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract],
        abi: ERC20_CONTRACT_ABI,
        functionName: 'allowance',
        args: [address, chain && sprintcheckoutContractAddressByNetwork[chain?.id]],
        watch: true
    })

    /** ************************************************************************************************* **/
    /**                                         APPROVAL                                                  **/
    /** ************************************************************************************************* **/
    const highAmountForApproval = Number(1000000) * (100 ** 2); // TODO this approves a high amount based on amount to pay, think about which number will be

    const {config: erc20ConfigApprove} = usePrepareContractWrite({
        // @ts-ignore
        address: props.selectedToken && props.selectedToken != 'ETH' && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract],
        abi: ERC20_CONTRACT_ABI,
        functionName: 'approve',
        args: [chain && sprintcheckoutContractAddressByNetwork[chain?.id], highAmountForApproval]
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
    //TODO Take into account ERC20 decimals for the transfer from operation
    const merchantAmountBigNumber = props.merchantAmount && (Math.round(Number(props.merchantAmount) * (10 ** 6)));
    const spcFeeToPayBigNumber = props.merchantAmount && Math.round((Number(props.merchantAmount) * SPRINTCHECKOUT_FEE * (10 ** 6)));
    const amountToPay = merchantAmountBigNumber && spcFeeToPayBigNumber && Number(merchantAmountBigNumber) + Number(spcFeeToPayBigNumber);
    const merchantAmountMinusSpcFee = merchantAmountBigNumber && spcFeeToPayBigNumber && Number(merchantAmountBigNumber) - Number(spcFeeToPayBigNumber);
    //TODO estimate gas fee for the transfer from and do the maths to subtract it from the merchant and spc fee amounts
    //TODO Account Abstraction / Paymaster could be the way to go

    //TODO create a debug function
    // console.log("Selected token: " + props.selectedToken);
    // console.log("Selected chain id: " + chain?.id);
    // props.selectedToken && chain && console.log("Contract loaded based on chain: " + contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract]);
    // merchantAmountMinusSpcFee && console.log("Merchant minus fee:" + merchantAmountMinusSpcFee);
    // spcFeeToPayBigNumber && console.log("SPC fee:" + spcFeeToPayBigNumber);

    const {config, error, isSuccess: configSuccess} = usePrepareContractWrite({
        // @ts-ignore
        address: chain && enablePayCall && merchantAmountBigNumber && spcFeeToPayBigNumber ? sprintcheckoutContractAddressByNetwork[chain?.id] : undefined,
        abi: SPRINTCHECKOUT_CONTRACT_ABI,
        functionName: 'transferFrom',
        args: [props.merchantPublicAddress && props.selectedToken && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract], address, props.merchantPublicAddress, SPRINTCHECKOUT_FEE_ADDRESS,
            merchantAmountMinusSpcFee ? BigNumber.from(merchantAmountMinusSpcFee.toString()).toNumber() : undefined, spcFeeToPayBigNumber ? BigNumber.from(spcFeeToPayBigNumber.toString()).toNumber() : undefined],
    })


    const {data: txHash, isLoading, isSuccess, write: pay} = useContractWrite(config)
    if (enablePayCall && configSuccess) {
        pay?.();
        setEnablePayCall(false);
    }

    const calculateIsBalanceEnough = (balance: any, amountToPay: number): boolean => {
        if (balance >= amountToPay) {
            return true;
        }
        return false;
    }

    /****************************************************/
    /*                     USE EFFECT                   */
    /****************************************************/
    let deps = [props.sessionNotFound, props.isConnected, props.merchantAmount, props.selectedToken, props.merchantPublicAddress,
        address, balance, isBalanceEnough, isApproveSuccess, isApproveLoading, approveStatus, txHash, isTxValid]
    // useWhatChanged(deps,'props.sessionNotFound, props.isConnected, props.merchantAmount, props.selectedToken, props.merchantPublicAddress, address, balance, isBalanceEnough, isApproveSuccess, isApproveLoading, approveStatus, txHash, isTxValid');
        useEffect(() => {
        let account = getAccount();
        setAddress(account.address);
        setIsConnected(props.isConnected);
        setIsBalanceEnough(calculateIsBalanceEnough(balance, Number(amountToPay)));
        if (isApproveSuccess && isBalanceEnough && !isApproveLoading) {
            reset();
        }
        if (txHash && !isTxValid) {
            setTxUrl("https://goerli.explorer.zksync.io/tx/" + txHash?.hash);
            !isTxValid && processReceiptAndRedirect(txHash);
        }
        // setOrderId(props.orderId!);
        // setMerchantId(props.merchantId!);
    }, [props.sessionNotFound, props.isConnected, props.merchantAmount, props.selectedToken, props.merchantPublicAddress,
        address, balance, isBalanceEnough, isApproveSuccess, isApproveLoading, approveStatus, txHash, isTxValid]);

    /****************************************************/
    /*                    HTML - JXS                    */
    /****************************************************/

    return (
        <>
            {!props.sessionNotFound && props.selectedToken != 'ETH' ?
                <Center paddingBottom={"40px"}>
                    {/* dev purposes for seeing the content: {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
                    {/*{isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
                    {(isConnected && !isBalanceEnough && !txUrl) ?
                        (isApproveLoading && (!isApproveSuccess || !isBalanceEnough) || (isApproveSuccess && !isBalanceEnough)) ?
                            <Spinner thickness='2px' speed='0.65s' size="xl" color="blue.500"/> :
                            <Button color={"white"} backgroundColor="#0E76FD" onClick={() => approve?.()}>
                                Approve
                            </Button> :
                        isConnected && isBalanceEnough && props.merchantAmount && props.selectedToken && !txUrl ?
                            <Button color={"white"} backgroundColor="#0E76FD" onClick={() => setEnablePayCall(true)}>
                                Pay {props.merchantAmount} {props.selectedToken}
                            </Button> : null
                    }
                </Center> : null
            }
            {!props.sessionNotFound && props.selectedToken == 'ETH' ? // TODO think about being able to use ETH (right now is not supported)
                <Center paddingBottom={"40px"}>
                    <Button color={"white"} backgroundColor="#0E76FD" onClick={() => setEnablePayCall(true)}>
                        Pay {props.merchantAmount} {props.selectedToken}
                    </Button>
                </Center> : null
            }
            {!props.sessionNotFound && txUrl && isTxValid ?
                <Center>
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
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Payment processed successfully!
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            <Link isExternal={true} textDecor="underline" href={txUrl}>Here you can check your
                                transaction status</Link>
                            <Text>You are being redirected to the store...</Text>
                            <Center marginTop={2}>
                                <Spinner thickness='2px' speed='0.65s' size="md" color="green.500"/>
                            </Center>
                        </AlertDescription>
                    </Alert>
                </Center> : null
            }


            {!props.sessionNotFound && !isTxValid && isTxBeingValidated?
                <Center>
                    <Spinner mb={10} thickness='2px' speed='0.65s' size="xl" color="blue.500"/>
                </Center> : null
            }

            {!props.sessionNotFound && !txUrl && !isTxValid && isTxInvalid?
                <Center>
                    <Alert
                        borderBottomRadius="10px"
                        status='warning'
                        variant='subtle'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'
                        height='200px'
                    >
                        <AlertIcon boxSize='40px' mr={0} />
                        <AlertTitle mt={4} mb={1} fontSize='lg'>
                            Your transaction has not been validated
                        </AlertTitle>
                        <AlertDescription maxWidth='sm'>
                            {/*<Link isExternal={true} textDecor="underline" href={txUrl}>Here you can check your*/}
                            {/*    transaction status</Link>*/}
                            <Text>Please, contact with your merchant</Text>
                        </AlertDescription>
                    </Alert>
                </Center> : null
            }
        </>
    )
}

