import {useContractRead, useContractWrite, useNetwork, usePrepareContractWrite} from 'wagmi'
import {getAccount} from "@wagmi/core";
import {useEffect, useState} from "react";
import {Alert, AlertDescription, AlertIcon, AlertTitle, Button, Center, Link, Spinner, Text} from "@chakra-ui/react";
import SPRINTCHECKOUT_CONTRACT_ABI from "../resources/abis/abi.json";
import ERC20_CONTRACT_ABI from "../resources/abis/erctokenabi.json";
import axios from "axios";
import BigNumber from "bignumber.js";

const SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_GOERLI = '0xcF7c7C4330829B3D98B4c9e9aB0fD01DfEdD8807'; // GOERLI ADDRESS
const SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_MUMBAI = '0x3D28aCb2aCCF54FcD37f718Ea58dD780aCD2927d'; // POLYGON MUMBAI ADDRESS
const SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_ZKEVM = '0xDdb60d551D819594B96b29b62c718038244c41A5'; // POLYGON ZKEVM ADDRESS
const SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_MAINNET = '0x2bf81700C523E4E95a4FF0214b933348BAaA09eF'; // MAINNET ADDRESS
const SPRINTCHECKOUT_SCROLL_ALPHA_CONTRACT_ADDRESS_TESTNET = '0x3D28aCb2aCCF54FcD37f718Ea58dD780aCD2927d'; // TESNET ADDRESS
const SPRINTCHECKOUT_OPTIMISM_GOERLI_CONTRACT_ADDRESS_TESTNET = '0x3D28aCb2aCCF54FcD37f718Ea58dD780aCD2927d'; // TESNET ADDRESS
const SPRINTCHECKOUT_AVALANCHE_FUJI_CONTRACT_ADDRESS_TESTNET = '0xDdb60d551D819594B96b29b62c718038244c41A5'; // TESNET ADDRESS
const SPRINTCHECKOUT_AVALANCHE_CONTRACT_ADDRESS_MAINNET = '0xb433eC1f161228b82431DE388D999724dD86e0E1'; // MAINNET ADDRESS


//const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
const SPRINTCHECKOUT_FEE_ADDRESS = "0xAf1DD0F5dBebEc8c9c1c2a48aa79fB1D8E2DdA32"; // TODO check if makes sense to send the fee to the spc smart contract address
const SPRINTCHECKOUT_FEE = 0.005;

const tokenDecimals = new Map<string, number>([
    ["WAVAX", 18],
    ["AVAX", 18],
    ["TSMRTR", 18],
    ["SMRTR", 18],
    ["TTRESR", 18],
    ["USDC", 6],
    ["USDCE", 6],
    ["USDT", 6],
    ["DAI", 18],
    ["CTT", 18],
    ["WBTC", 8],
    ["WETH", 18],
    ["ETH", 18]
]);

interface NetworkContract {
    280: string;    // zksync testnet
    324: string;    // zksync mainnet
    80001: string;  // polygon mumbai
    534353: string; // scroll testnet
    420: string;    // optimism goerli
    10: string;     // optimism mainnet
    43113: string;  // avalanche fuji
    43114: string;  // avalanche mainnet
}

// -> https://github.com/wagmi-dev/references/blob/df936de6d27b86fe8e7bad0dfa80e0810c0bcbd0/packages/chains/src/zkSync.ts#L4
// -> https://github.com/wagmi-dev/references/blob/df936de6d27b86fe8e7bad0dfa80e0810c0bcbd0/packages/chains/src/zkSyncTestnet.ts#L4
const contractAddresses: Record<string, NetworkContract> = {
    USDCE: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664"}, // TODO review every token contract address and decimals** on mainnet and goerli
    USDC: {280: "0x0faF6df7054946141266420b43783387A78d82A9", 324: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4", 80001: "0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747", 534353: "0xA0D71B9877f44C744546D649147E3F1e70a93760", 420: "0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E", 10: "0x0000000000000000000000000000000000000000", 43113: "0x5425890298aed601595a70AB815c96711a31Bc65", 43114: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"}, // TODO review every token contract address and decimals** on mainnet and goerli
    USDT: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"},
    DAI: {280: "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"}, // TODO DAI decimals are not appropiate, fix
    WBTC: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"},
    WETH: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"},
    ETH: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"},
    CTT: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x7DdEFA2f027691116D0a7aa6418246622d70B12A", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x0000000000000000000000000000000000000000"},
    TTRESR: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x04fEAB8a7657b9ad107BC15E0A25Db1121C7dD12", 43114: "0x0000000000000000000000000000000000000000"},
    TSMRTR: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x6F5DE1D3Fe07e48D6f8448565BcB9A035904Fd73", 43114: "0x0000000000000000000000000000000000000000"},
    WAVAX: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0xd00ae08403B9bbb9124bB305C09058E32C39A48c", 43114: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"},
    SMRTR: {280: "0x0000000000000000000000000000000000000000", 324: "0x0000000000000000000000000000000000000000", 80001: "0x0000000000000000000000000000000000000000", 534353: "0x0000000000000000000000000000000000000000", 420: "0x0000000000000000000000000000000000000000", 10: "0x0000000000000000000000000000000000000000", 43113: "0x0000000000000000000000000000000000000000", 43114: "0x6D923f688C7FF287dc3A5943CAeefc994F97b290"},

};

interface IHash {
    [details: number]: string;
}

let sprintcheckoutContractAddressByNetwork: IHash = {};
sprintcheckoutContractAddressByNetwork[280] = SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_GOERLI;
sprintcheckoutContractAddressByNetwork[324] = SPRINTCHECKOUT_ZKSYNC_CONTRACT_ADDRESS_MAINNET;
sprintcheckoutContractAddressByNetwork[80001] = SPRINTCHECKOUT_POLYGON_CONTRACT_ADDRESS_MUMBAI;
sprintcheckoutContractAddressByNetwork[534353] = SPRINTCHECKOUT_SCROLL_ALPHA_CONTRACT_ADDRESS_TESTNET;
sprintcheckoutContractAddressByNetwork[420] = SPRINTCHECKOUT_OPTIMISM_GOERLI_CONTRACT_ADDRESS_TESTNET;
sprintcheckoutContractAddressByNetwork[43113] = SPRINTCHECKOUT_AVALANCHE_FUJI_CONTRACT_ADDRESS_TESTNET
sprintcheckoutContractAddressByNetwork[43114] = SPRINTCHECKOUT_AVALANCHE_CONTRACT_ADDRESS_MAINNET

interface MerchantOrder {
    paymentSessionId: string;
    status: string;
    receipts: Array<string>;
    chain: undefined|string
    httpService: undefined|string
    blockExplorer: undefined|string
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

        setIsTxBeingValidated(true);
        const merchantOrder: MerchantOrder = {
                paymentSessionId: props.backendPaymentSessionId,
                status: "",
                receipts: [txHash.hash],
                chain: chain?.name,
                httpService: chain?.rpcUrls.default.http.at(0),
                blockExplorer: (chain?.blockExplorers?.default.url)? chain?.blockExplorers?.default.url : "noBlockExplorerUrl"
            }

            let resp = await axios.post(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/process_receipts', merchantOrder);
        // TODO send tx hash to backend, validate and redirect to success or fail depending on the result
        if (resp.status == 200) {
            setIsTxBeingValidated(false);
            setIsTxValid(true);
            setTimeout(() => {
                props.successUrl && window.location.replace(props.successUrl);
            }, 3000);
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
        address: props.selectedToken && props.selectedToken !== "-" && props.selectedToken != 'ETH' && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract],
        abi: ERC20_CONTRACT_ABI,
        functionName: 'allowance',
        args: [address, chain && sprintcheckoutContractAddressByNetwork[chain?.id]],
        watch: true
    })

    /** ************************************************************************************************* **/
    /**                                         APPROVAL                                                  **/
    /** ************************************************************************************************* **/
    let selectedTokenDecimals = props.selectedToken && props.selectedToken !== "-" && tokenDecimals.get(props.selectedToken);
    // const highAmountForApproval = new BigNumber((10 ** 18).toString()); // TODO this approves a high amount based on amount to pay, think about which number will be
    const highAmountForApproval = selectedTokenDecimals && ( new BigNumber(Number(props.merchantAmount).toString()).multipliedBy(new BigNumber((10 ** selectedTokenDecimals).toString()))); // TODO this approves a high amount based on amount to pay, think about which number will be
    const {config: erc20ConfigApprove} = usePrepareContractWrite({
        // @ts-ignore
        address: props.selectedToken && props.selectedToken !== "-" && props.selectedToken != 'ETH' && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract],
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
    const orderAmountRealBigNumber: "" | undefined | false | 0 | BigNumber = props.merchantAmount && props.selectedToken && props.selectedToken !== "-" && selectedTokenDecimals &&
        ( new BigNumber(Number(props.merchantAmount).toString()).multipliedBy(new BigNumber((10 ** selectedTokenDecimals).toString())));

    // console.log("orderAmountRealBigNumber" + orderAmountRealBigNumber);

    // const spcFeeToPayRealBigNumber = props.merchantAmount &&
    //   BigNumber.from(Math.round(Number(props.merchantAmount)).toString()).mul(BigNumber.from(SPRINTCHECKOUT_FEE).mul((BigNumber.from(10 ** 18).toString())));
    // const amountToPayBigNumber = orderAmountRealBigNumber && spcFeeToPayRealBigNumber && orderAmountRealBigNumber.add(spcFeeToPayRealBigNumber); // 1.005
    // const merchantAmountMinusSpcFeeBigNumber = orderAmountRealBigNumber && spcFeeToPayRealBigNumber && orderAmountRealBigNumber.sub(spcFeeToPayRealBigNumber);

    // console.log("Order Amount:" + orderAmountRealBigNumber);

    const percentage = new BigNumber('500'); // represents 0.5%
    const spcFeeToPayRealBigNumber = orderAmountRealBigNumber && new BigNumber(orderAmountRealBigNumber).multipliedBy(percentage).div(10000);
    // console.log("Spc fee:" + spcFeeToPayRealBigNumber);
    const merchantAmountRealBigNumber = orderAmountRealBigNumber && spcFeeToPayRealBigNumber && orderAmountRealBigNumber.minus(spcFeeToPayRealBigNumber);
    // console.log("Merchant amount:" + merchantAmountRealBigNumber);


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
        address: chain && enablePayCall && orderAmountRealBigNumber && spcFeeToPayRealBigNumber ? sprintcheckoutContractAddressByNetwork[chain?.id] : undefined,
        abi: SPRINTCHECKOUT_CONTRACT_ABI,
        functionName: 'transferFrom',
        args: [props.merchantPublicAddress && props.selectedToken && props.selectedToken !== "-" && chain && contractAddresses[props.selectedToken!][chain?.id as keyof NetworkContract], address, props.merchantPublicAddress, SPRINTCHECKOUT_FEE_ADDRESS,
            merchantAmountRealBigNumber ? new BigNumber(merchantAmountRealBigNumber.toString()) : undefined, spcFeeToPayRealBigNumber ? new BigNumber(spcFeeToPayRealBigNumber.toString()) : undefined],
    })

    const {data: txHash, isLoading, isSuccess, write: pay} = useContractWrite(config)
    if (enablePayCall && configSuccess) {
        pay?.();
        setEnablePayCall(false);
    }

    const calculateIsBalanceEnough = (balance: any, orderAmount: any): boolean => {
        if (!balance || !orderAmount) {
            return false;
        }
        const balanceStr : string = balance.toString();
        const balanceVar = new BigNumber(balanceStr);
        let hasEnoughBalance = balanceVar.gte(new BigNumber(orderAmount));
        return hasEnoughBalance;
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
        setIsBalanceEnough(calculateIsBalanceEnough(balance, orderAmountRealBigNumber));
        if (isApproveSuccess && isBalanceEnough && !isApproveLoading) {
            reset();
        }
        if (txHash && !isTxValid) {
            setTxUrl(chain?.blockExplorers?.default.url + "/tx/" + txHash?.hash);
            txHash && !isTxValid && !isTxBeingValidated && processReceiptAndRedirect(txHash);
        }
        // setOrderId(props.orderId!);
        // setMerchantId(props.merchantId!);
    }, deps);

    /****************************************************/
    /*                    HTML - JXS                    */
    /****************************************************/

    return (
        <>
            {!props.sessionNotFound && props.selectedToken != 'ETH' && props.selectedToken !== "-" ?
                <Center paddingBottom={"40px"}>
                    {/* dev purposes for seeing the content: {isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
                    {/*{isConnected ? <Text>Balance: {balance?.toString()}</Text> : null}*/}
                    {(isConnected && !isBalanceEnough && !txUrl) ?
                        (isApproveLoading && (!isApproveSuccess || !isBalanceEnough) || (isApproveSuccess && !isBalanceEnough)) ?
                            <Spinner thickness='2px' speed='0.65s' size="xl" color="blue.500"/> :
                            <Button color={"white"} backgroundColor="#0E76FD" onClick={() => approve?.()}>
                                Approve
                            </Button> :
                        isConnected && isBalanceEnough && props.merchantAmount && props.selectedToken && props.selectedToken !== "-" && !txUrl ?
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
            {/*ZERDEV TESTS*/}
            {/*<Button color={"white"} backgroundColor="#0E76FD" onClick={() => batchMint}>*/}
            {/*    {isBatchLoadin ? 'loading...' : 'Batch Example'}*/}
            {/*</Button>*/}

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

