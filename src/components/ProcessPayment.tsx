import {useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useCallback, useEffect, useState} from "react";
import {Box, Button, Center, Spinner, Text} from "@chakra-ui/react";

import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";
import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";

const AUTH0_OAUTH_URL = 'https://dev-0p0zfam6.us.auth0.com/oauth/token';
const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout';
// const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout'; // TODO RESTORE
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
const SPRINTCHECKOUT_FEE = 0.005;


let authResponse: AxiosResponse;

interface MerchantOrder {
    orderId: string;
    merchantId: string;
    status: string;
    receipts: Array<string>;
}

//TODO think about the component modeling and if this should be a good approach or what (SprintCheckoutDapp > ProcessPayment)
// TODO: thinking also about extending to other chains (polygon) etc.
export function ProcessPayment(props: { isConnected: boolean, merchantAmount: string|undefined, orderId: string| undefined, merchantId: string|undefined, selectedToken: string|undefined }) {
    // const [param, setParam] = useState("");

    // const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807';
    const [isConnected, setIsConnected] = useState(false);
    const [isBalanceEnough, setIsBalanceEnough] = useState(false);
    // const [isApproveLoading, setIsApproveLoading] = useState(false);
    const [address, setAddress] = useState<string | undefined>("");
    // const [txHashObj, setTxHashObj] = useState<any>();
    // const [orderId, setOrderId] = useState<string>("");
    // const [merchantId, setMerchantId] = useState<string>("");
    const [enablePayCall, setEnablePayCall] = useState(false);
    const [enableApproveCall, setEnableApproveCall] = useState(false);


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
    /***************************************/
    /*              ALLOWANCE              */
    /***************************************/

    const {data: balance, isError, isLoading: allowanceLoading} = useContractRead({
        address: '0x0faF6df7054946141266420b43783387A78d82A9',
        abi: ERC20_CONTRACT_ABI,
        functionName: 'allowance',
        args: [address, "0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807"],
        watch: true
    })

    /***************************************/
    /*              APPROVE                */
    /***************************************/
    const merchantAmountBigNumber = props.merchantAmount && (Math.round(Number(props.merchantAmount) * (10 ** 6)));
    const spcFeeToPayBigNumber = props.merchantAmount && Math.round((Number(props.merchantAmount) * SPRINTCHECKOUT_FEE * (10 ** 6)));
    const amountToPay = merchantAmountBigNumber && spcFeeToPayBigNumber && Number(merchantAmountBigNumber) + Number(spcFeeToPayBigNumber);

    const {config: erc20ConfigApprove} = usePrepareContractWrite({
        address: '0x0faF6df7054946141266420b43783387A78d82A9',
        abi: ERC20_CONTRACT_ABI,
        functionName: 'approve',
        args: ["0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807", amountToPay]
    })

    const {data: erc20ApproveData, isLoading: isApproveLoading, status: approveStatus, isSuccess: isApproveSuccess, reset, write: approve} = useContractWrite(erc20ConfigApprove)

    /***************************************/
    /*              TRANSFER               */
    /***************************************/
    //TODO Move map with ERC20 token addresses and load the proper one here dinamically

    // console.log(Number(merchantAmountBigNumber)! + Number(spcFeeToPayBigNumber!));
    const {config, error, isSuccess: configSuccess} = usePrepareContractWrite({
        address: enablePayCall && merchantAmountBigNumber && spcFeeToPayBigNumber? '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807': undefined,
        abi: SPRINTCHECKOUT_CONTRACT_ABI,
        functionName: 'transferFrom',
        args: ['0x0faF6df7054946141266420b43783387A78d82A9', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32",
            merchantAmountBigNumber? BigNumber.from(merchantAmountBigNumber.toString()).toNumber() : undefined, spcFeeToPayBigNumber? BigNumber.from(spcFeeToPayBigNumber.toString()).toNumber() : undefined],
        // args: ['0x0faF6df7054946141266420b43783387A78d82A9', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32", 20000, 10000],
    })

    const {data: txHash, isLoading, isSuccess, write: pay} = useContractWrite(config)
    if (enablePayCall && configSuccess) {
        pay?.();
        setEnablePayCall(false);
    }

    //TODO: how to invoke this function after txHash gets a value from contract interaction response?
    // async function processReceipt() {
    //     if (txHash) {
    //         const merchantOrder: MerchantOrder = {
    //             orderId: orderId,
    //             merchantId: merchantId,
    //             status: "SUCCESS",
    //             receipts: [txHash.hash]
    //         }
    //
    //         let authResponse = await getAuth0Token();
    //         let resp = await axios.post(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/process_receipts', merchantOrder, {
    //             headers: {
    //                 // 'Authorization': `Bearer ${authResponse.data.access_token}` // TODO restore
    //             }
    //         });
    //         console.log(resp.data);
    //         window.location.replace("https://www.facilware.com");
    //     }
    // }

    const calculateIsBalanceEnough = (balance: any, amountToPay: number): boolean => {
        console.log("Balance = " + balance);
        // console.log("Amount to Pay = " + amountToPay);
        if (balance >= amountToPay) {
            // setEnableApproveCall(false);
            return true;
        }
        // setEnableApproveCall(true);
        return false;
    }

    //TODO: Why is everything being rendered several times, how to avoid it
    useEffect(() => {
        console.log("Inside Use Effect!");
        let account = getAccount();
        setAddress(account.address);
        setIsConnected(props.isConnected);
        console.log("approve loading");
        console.log(isApproveLoading);
        console.log("is approve success");
        console.log(isApproveSuccess);
        // setIsApproveLoading(isApproveLoading);
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
        // setOrderId(props.orderId!);
        // setMerchantId(props.merchantId!);
    }, [props.isConnected, props.merchantAmount, address, balance, isBalanceEnough, isApproveSuccess, isApproveLoading, approveStatus, txHash]);

    return (
        <>
            {/* TODO: dev purposes for seeing the content: {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
            {/*{isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
            {(isConnected && !isBalanceEnough) ?
                (isApproveLoading && (!isApproveSuccess || !isBalanceEnough) || (isApproveSuccess && !isBalanceEnough))?
                    <Spinner thickness='2px' speed='0.65s'size="xl" color="blue.500" /> :
                    <Button backgroundColor="#0E76FD" onClick={() => approve?.()}>
                        Approve
                    </Button> :
                isConnected && isBalanceEnough && props.merchantAmount && props.selectedToken?
                <Button color={"white"} backgroundColor="#0E76FD" onClick={() => setEnablePayCall(true)}>
                    Pay {props.merchantAmount} {props.selectedToken}
                </Button> : null
            }
            <Box>
            </Box>
        </>
    )
}

