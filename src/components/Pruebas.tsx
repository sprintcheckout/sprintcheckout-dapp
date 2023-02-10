import {useContractRead, useContractWrite, usePrepareContractWrite, useProvider} from 'wagmi'
import {getAccount, getContract} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";

export function Pruebas() {
    // const [param, setParam] = useState("");

    // const SPRINTCHECKOUT_CONTRACT_ADDRESS = '0x515EBd37Cd83B31570345426B6309c40eeceA50e';

    const spcAbi = [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "selectedToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "customer",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "merchant",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "sprintcheckout",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "spcFee",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];

    const erc20Abi = [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "spender",
                    "type": "address"
                },
                {
                    "name": "tokens",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "owner",
                    "type": "address"
                },
                {
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

        let account = getAccount();
        let address = account.address;
        console.log("address");
        console.log(address);
    // const provider = useProvider()

    const {config: erc20ConfigApprove} = usePrepareContractWrite({
        address: '0x852a4599217e76aa725f0ada8bf832a1f57a8a91',
        abi: erc20Abi,
        functionName: 'approve',
        args: ["0x515EBd37Cd83B31570345426B6309c40eeceA50e", 600000],
    })

    const {data: erc20ApproveData, write: approve} = useContractWrite(erc20ConfigApprove)


    const {config: erc20Config} = usePrepareContractWrite({
        address: '0x852a4599217e76aa725f0ada8bf832a1f57a8a91',
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address, "0x515EBd37Cd83B31570345426B6309c40eeceA50e"],
    })

    const {data: erc20Data, write: allow} = useContractWrite(erc20Config)

    const { data: allowanceData, isError, isLoading: allowanceLoading } = useContractRead({
        address: '0x852a4599217e76aa725f0ada8bf832a1f57a8a91',
        abi: erc20Abi,
        functionName: 'allowance',
        args: [address, "0x515EBd37Cd83B31570345426B6309c40eeceA50e"],
    })

    console.log("Allowed:" + allowanceData);
    console.log(allowanceData);

    const {config} = usePrepareContractWrite({
        address: '0x515EBd37Cd83B31570345426B6309c40eeceA50e',
        abi: spcAbi,
        functionName: 'transferFrom',
        args: ['0x852a4599217e76aa725f0ada8bf832a1f57a8a91', address, "0xA3B667ed1aff9243A14FA4c610B4f8e29D0C96e1", "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32", 200000, 100000],
    })

    const {data: misDatos, isLoading, isSuccess, write: pay} = useContractWrite(config)



    useEffect(() => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paymentSessionIdB64 = params.get('uid');
        console.log("paymentSessionIdB64");
        console.log(paymentSessionIdB64);

    }, []);

    return (
        <>
            <Button
                onClick={() => pay?.()}
            > Pay
            </Button>
        </>
    )
}

