import {useContractRead, useContractWrite, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Button, Text} from "@chakra-ui/react";

import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";

let address: string | undefined;

export function ProcessPayment(props: { isConnected: boolean; }) {
    // const [param, setParam] = useState("");

    // const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807';
    const [isConnected, setIsConnected] = useState(false);
    const [amountAllowed, setAmountAllowed] = useState();
    const [address, setAddress] = useState<string | undefined>("");
    useEffect(() => {
        let account = getAccount();
        setAddress(account.address);
        setIsConnected(props.isConnected);

    }, [props.isConnected, amountAllowed, address]);

    // let account = getAccount();
    // let address = account.address;

    // const provider = useProvider()

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

    const {config} = usePrepareContractWrite({
        address: '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807',
        abi: SPRINTCHECKOUT_CONTRACT_ABI,
        functionName: 'transferFrom',
        args: ['0x0faF6df7054946141266420b43783387A78d82A9', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32", 200000, 100000],
    })

    const {data: misDatos, isLoading, isSuccess, write: pay} = useContractWrite(config)

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
                <Button backgroundColor="#0E76FD" onClick={() => pay?.()}>
                    Pay
                </Button>
            }
        </>
    )
}

