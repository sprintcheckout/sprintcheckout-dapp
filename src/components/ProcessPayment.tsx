import {useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Button, Text} from "@chakra-ui/react";

import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";
import {BigNumber} from "ethers";
import axios, {AxiosResponse} from "axios";

const AUTH0_OAUTH_URL = 'https://dev-0p0zfam6.us.auth0.com/oauth/token';
const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';

let authResponse: AxiosResponse;

interface MerchantOrder {
    orderId: string;
    merchantId: string;
    status: string;
    receipts: Array<string>;
}

//TODO think about the component modeling and if this should be a good approach or what (SprintCheckoutDapp > ProcessPayment)
export function ProcessPayment(props: { isConnected: boolean, merchantAmount: string|undefined, spcFee: string|undefined,
    orderId: string| undefined, merchantId: string|undefined }) {
    // const [param, setParam] = useState("");

    // const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807';
    const [isConnected, setIsConnected] = useState(false);
    const [amountAllowed, setAmountAllowed] = useState();
    const [address, setAddress] = useState<string | undefined>("");
    const [merchantAmount, setMerchantAmount] = useState<BigNumber | undefined>();
    const [spcFee, setSpcFee] = useState<BigNumber | undefined>();
    const [txHashObj, setTxHashObj] = useState<any>();
    const [orderId, setOrderId] = useState<string>("");
    const [merchantId, setMerchantId] = useState<string>("");

    //TODO: Why is everything being rendered several times, how to avoid it
    useEffect(() => {
        let account = getAccount();
        setAddress(account.address);
        setIsConnected(props.isConnected);
        console.log("ma:  " + props.merchantAmount);
        console.log("fee: " + props.spcFee);
        setMerchantAmount(BigNumber.from((Math.round(Number(props.merchantAmount)! * (10 ** 6))).toString()));
        setSpcFee(BigNumber.from((Math.round(Number(props.spcFee)! * (10 ** 6))).toString()));
        console.log("merchantAmount: " + merchantAmount);
        console.log("spcFee: " + spcFee);
        setOrderId(props.orderId!);
        setMerchantId(props.merchantId!);
    }, [props.isConnected, props.merchantAmount, props.spcFee, amountAllowed, address]);


    async function getAuth0Token() {

        if (!authResponse) {
            let authBody = '{"client_id":"' + import.meta.env.VITE_AUTH0_CLIENT_ID + '","client_secret":"' + import.meta.env.VITE_AUTH0_CLIENT_SECRET + '","audience":"' + SPRINTCHECKOUT_BASE_URL + '","grant_type":"client_credentials"}'
            authResponse = await axios.post(AUTH0_OAUTH_URL, authBody, {
                headers: {
                    'content-type': `application/json`
                }
            });
        }
        return authResponse;
    }


    const {data: balance, isError, isLoading: allowanceLoading} = useContractRead({
        address: '0x0faF6df7054946141266420b43783387A78d82A9',
        abi: ERC20_CONTRACT_ABI,
        functionName: 'allowance',
        args: [address, "0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807"],
        watch: true
    })

    // setAmountAllowed(allowanceData);

    const {config: erc20ConfigApprove} = usePrepareContractWrite({
        address: '0x0faF6df7054946141266420b43783387A78d82A9',
        abi: ERC20_CONTRACT_ABI,
        functionName: 'approve',
        args: ["0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807", 600000],
    })

    const {data: erc20ApproveData, write: approve} = useContractWrite(erc20ConfigApprove)

    //TODO: How to invoke this just when merchantAmount and spcFee are loaded; Check lines 45-46
    //TODO Move map with ERC20 token addresses and load the proper one here dinamically
    const {config} = usePrepareContractWrite({
        address: '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807',
        abi: SPRINTCHECKOUT_CONTRACT_ABI,
        functionName: 'transferFrom',
        // args: ['0x0faF6df7054946141266420b43783387A78d82A9', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32", merchantAmount, spcFee],
        args: ['0x0faF6df7054946141266420b43783387A78d82A9', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32", 20000, 10000],
    })

    const {data: txHash, isLoading, isSuccess, write: pay} = useContractWrite(config)

    //TODO: how to invoke this function after txHash gets a value from contract interaction response?
    async function processReceipt() {
        if (txHash) {
            const merchantOrder: MerchantOrder = {
                orderId: orderId,
                merchantId: merchantId,
                status: "SUCCESS",
                receipts: [txHash.hash]
            }

            let authResponse = await getAuth0Token();
            let resp = await axios.post(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/process_receipts', merchantOrder, {
                headers: {
                    'Authorization': `Bearer ${authResponse.data.access_token}`
                }
            });
            console.log(resp.data);
            window.location.replace("https://www.facilware.com");
        }
    }

    const isBalanceEnough = (balance: any, amountToPay: number): boolean => {
        if (balance >= amountToPay) {
            return true;
        }
        return false;
    }

    return (
        <>
            {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}
            {(isConnected && !isBalanceEnough(balance, 1)) ?
                <Button backgroundColor="#0E76FD" onClick={() => approve?.()}>
                    Approve
                </Button>
                :
                isConnected?
                <Button backgroundColor="#0E76FD" onClick={() => pay?.()}>
                    Pay
                </Button> : null
            }
        </>
    )
}

