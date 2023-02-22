import {useAccount, useEnsName} from 'wagmi'
import {
    Box,
    Center,
    Link,
    Select,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ProcessPayment} from "./ProcessPayment";
import {ConnectButton} from "@rainbow-me/rainbowkit";

const AUTH0_OAUTH_URL = 'https://dev-0p0zfam6.us.auth0.com/oauth/token';
// const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';// TODO RESTORE
const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout';
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';

interface IHash {
    [details: string]: number;
}

interface TokenConversion {
    symbol: string;
    conversion: number;
}

interface TokenConversionCollections {
    tokenPricesForAmount: Array<TokenConversion>;
    tokenPricesForJustOne: Array<TokenConversion>;
}

let tokenConversionsList: TokenConversionCollections;
let pricesForAmountRounded: Array<TokenConversion>;

let authResponse: AxiosResponse;


export function SprintcheckoutDapp() {

    let paymentSessionId: string;
    // let merchantId: string;
    // let orderId: string;
    let currency: string;
    let successUrl: string;
    let failUrl: string;
    let cancelUrl: string;
    let token: string;

    var merchantPublicAddress: string;
    let networkFromBackend: string;
    let tokenAmountToPay: number; // Amount to pay in the selected token

    let tokenRoundDecimals: IHash = {};
    tokenRoundDecimals["USDT"] = 2;
    tokenRoundDecimals["DAI"] = 2;
    tokenRoundDecimals["BUSD"] = 2;
    tokenRoundDecimals["USDC"] = 2;
    tokenRoundDecimals["ETH"] = 6;
    tokenRoundDecimals["WETH"] = 6;
    tokenRoundDecimals["BTC"] = 6;
    tokenRoundDecimals["WBTC"] = 6;

    const {address} = useAccount()
    const {data: ensName} = useEnsName({address})
    const [selectedToken, setSelectedToken] = useState<string | undefined>("");
    const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>("");
    const [amount, setAmount] = useState<string | undefined>("");
    const [tokenAmount, setTokenAmount] = useState<string | undefined>("");
    const [orderId, setOrderId] = useState<string | undefined>("");
    const [merchantId, setMerchantId] = useState<string | undefined>("");

    const [tokenConversionRate, setTokenConversionRate] = useState<string | undefined>("");
    const [count, setCount] = useState(0);
    const {isConnected} = useAccount()


    function setDataFromPaymentSession(paymentSession: AxiosResponse) {

        setMerchantId(paymentSession.data.merchantId);
        setOrderId(paymentSession.data.orderId);
        currency = paymentSession.data.currency
        successUrl = paymentSession.data.successUrl
        failUrl = paymentSession.data.failUrl
        cancelUrl = paymentSession.data.cancelUrl

        setAmount(paymentSession.data.amount);
        setSelectedCurrency(currency);
    }

    useEffect(() => {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paymentSessionIdB64 = params.get('uid');
        paymentSessionId = Buffer.from(paymentSessionIdB64 || '', "base64").toString();

        if (paymentSessionId != null) {
            getPaymentSession(paymentSessionId).then(paymentSession => {
                setDataFromPaymentSession(paymentSession);
                getMerchantPaymentSettings(paymentSession.data.merchantId).then(paymentSettings => {
                    networkFromBackend = paymentSettings.data.layer.network;
                    merchantPublicAddress = paymentSettings.data.layer.publicAddress;
                });
            });
            getTokenConversion(paymentSessionId)
        } else {
            // TODO show error, no session available
        }

    }, []);

    async function getMerchantPaymentSettings(merchantId: string) {

        let authResponse = await getAuth0Token();
        let paymentSettingsResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_settings/' + merchantId, {
            headers: {
                // 'Authorization': `Bearer ${authResponse.data.access_token}` // TODO restore
            }
        });
        return paymentSettingsResponse;
    }

    async function getAuth0Token() {
        if (!authResponse) {
            // TODO RESTORE
            // let authBody = '{"client_id":"' + import.meta.env.VITE_AUTH0_CLIENT_ID + '","client_secret":"' + import.meta.env.VITE_AUTH0_CLIENT_SECRET + '","audience":"' + SPRINTCHECKOUT_BASE_URL + '","grant_type":"client_credentials"}'
            // authResponse = await axios.post(AUTH0_OAUTH_URL, authBody, {
            //     headers: {
            //         'content-type': `application/json`
            //     }
            // });
        }
        authResponse = {config: {}, data: undefined, headers: undefined, status: 0, statusText: ""};

        return authResponse;
    }

    async function getPaymentSession(id: string) {

        let authResponse = await getAuth0Token();
        let paymentSessionResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/' + id, {
            headers: {
                // 'Authorization': `Bearer ${authResponse.data.access_token}` // TODO restore
            }
        });
        return paymentSessionResponse;
    }

    async function getTokenConversion(id: string) {

        let authResponse = await getAuth0Token();
        // let tokensResponse = await axios.get('http://localhost:8080/payment_session/token_conversions/' + id, {
        let tokensResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/token_conversions/' + id, {
            headers: {
                // 'Authorization': `Bearer ${authResponse.data.access_token}` // TODO restore
                'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjR5LTl6am1MYldIZV84MGhoVEMydyJ9.eyJpc3MiOiJodHRwczovL2Rldi0wcDB6ZmFtNi51cy5hdXRoMC5jb20vIiwic3ViIjoiRVpVbWpITmdaTTFxUDh1UVhWUTB3dkpJaE8yd2pKWFBAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vc3ByaW50Y2hlY2tvdXQtbXZwLmhlcm9rdWFwcC5jb20vY2hlY2tvdXQiLCJpYXQiOjE2NzY3OTUzMzUsImV4cCI6MTY3Njg4MTczNSwiYXpwIjoiRVpVbWpITmdaTTFxUDh1UVhWUTB3dkpJaE8yd2pKWFAiLCJzY29wZSI6InJlYWQ6cGF5bWVudFNlc3Npb24iLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.B-TfwzLC08hmI8jAaR5xJqkh-eYFR8EyMgw75mxp--i0qobGKb4y8gykN_boqb4cHCAkJEFvdVEgp41rm_h2V4kAAj4hveiVmgvWQieUKXMVuIx_vP3RK6f-plvaB5naoK4YdFEtQsQTDtL6VmnMQQ-S4iXdNhSeunL9IIniEOWtebb3cTmAbkp-CSg-5YALCYdqj5OELm4jQj3htjs0pefB1dSLq7yVdAtvPn_FcLtLCaoug5_hUqvOGPFs6CxS6OajFiIHAbXzeHfXmapL_PW0SQz3X_aL9LKgupRU2G8LDkMPEH6YCMfvk6x_klqi_15d2rqVqY8wN2zObe2YkA`
            }
        });
        tokenConversionsList = tokensResponse.data;
        let pricesForAmount = tokenConversionsList?.tokenPricesForAmount;
        pricesForAmountRounded = pricesForAmount?.map((obj: { symbol: string; conversion: number; }) => {
            let tc = {} as TokenConversion
            tc.symbol = obj.symbol.toUpperCase();
            let fixedNum = obj.conversion.toFixed(tokenRoundDecimals[obj.symbol.toUpperCase()!]);
            tc.conversion = parseFloat(fixedNum);
            return tc;
        });
        let pricesForJustOne = tokenConversionsList?.tokenPricesForJustOne;
        let firstTokenForAmount = pricesForAmount.at(0);
        let symbol = firstTokenForAmount?.symbol?.toUpperCase().toString();
        let conversionNumber = firstTokenForAmount?.conversion;
        let conversion = firstTokenForAmount?.conversion?.toFixed(tokenRoundDecimals[symbol!])?.toString();

        setSelectedToken(symbol);
        setTokenAmount(conversion);
        let firsTokenForJustOne = pricesForJustOne?.filter((elem: { symbol: any; }) => elem.symbol === symbol?.toLowerCase());
        setTokenConversionRate(firsTokenForJustOne.at(0)?.conversion?.toFixed(tokenRoundDecimals[symbol!]).toString());
        tokenAmountToPay = conversionNumber!;
    }

    function onChangeSendTokenAndConversion(event: any) {

        let selectedToken = event.target.value;
        if (selectedToken) {
            calculateAndSetOneUnitSelectedTokenAndConversion(selectedToken);
            calculateAndSetAmountForSelectedToken(selectedToken);
        }
        token = selectedToken.toUpperCase();
    }

    function calculateAndSetOneUnitSelectedTokenAndConversion(tokenSymbol: string) {

        let pricesForJustOne = tokenConversionsList?.tokenPricesForJustOne;
        let selectedTokenConversion = pricesForJustOne?.filter((elem: { symbol: string; }) => elem.symbol === tokenSymbol.toLowerCase())
        let conversion = selectedTokenConversion.at(0)?.conversion?.toFixed(tokenRoundDecimals[tokenSymbol!])?.toString();
        setSelectedToken(tokenSymbol.toUpperCase());
        setTokenConversionRate(conversion);
    }

    function calculateAndSetAmountForSelectedToken(tokenSymbol: string) {

        let pricesForAmount = tokenConversionsList?.tokenPricesForAmount;
        let selectedTokenConversion = pricesForAmount?.filter((elem: { symbol: string; }) => elem.symbol === tokenSymbol.toLowerCase())
        let conversion = selectedTokenConversion.at(0)?.conversion?.toFixed(tokenRoundDecimals[tokenSymbol!])?.toString();
        tokenAmountToPay = selectedTokenConversion.at(0)?.conversion!;
        setTokenAmount(conversion);
    }

    return (
        <>
            <Box display="flex" flexDirection="column">
                {(!amount || !selectedCurrency || !tokenAmount || !pricesForAmountRounded) ?
                    <Center>
                        <Spinner thickness='2px' speed='0.65s'size="xl" color="blue.500" />
                    </Center> : null
                }

                {amount && selectedCurrency && tokenAmount && pricesForAmountRounded && (
                <Center border='1px' borderColor='gray.200' borderRadius="12px" maxWidth="400px"
                        margin={"0 auto"}>
                     <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    <Th isNumeric>AMOUNT</Th>
                                    <Th>CURRENCY</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                <Tr>
                                    <Td isNumeric>{amount}</Td>
                                    <Td>{selectedCurrency}</Td>
                                </Tr>
                                <Tr>
                                    <Td fontWeight={"bold"} color="#3182CE" isNumeric>{tokenAmount}</Td>
                                    <Td>
                                        <Select style={{ fontWeight: 'bold' }} color={"#3182CE"} borderRadius="20px" onChange={onChangeSendTokenAndConversion}>
                                            {pricesForAmountRounded?.map((elem, index) => {
                                                if (index === 0 && !token) {
                                                    token = elem.symbol.toUpperCase();
                                                }
                                                return <option key={elem.symbol} value={elem.symbol}>
                                                    {elem.symbol}
                                                    </option>;
                                            })}
                                        </Select>
                                    </Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Center>
                )}

                {amount && selectedCurrency && tokenAmount && pricesForAmountRounded && (
                <Center marginTop={3}>
                    <Text color="#718096" fontSize={13} mr={1}>
                        {tokenConversionRate} {selectedToken} per {selectedCurrency} (No hidden fees{' '}
                    </Text>
                    <Text color="#718096" fontSize={13}>
                        <Link href='https://www.coingecko.com/' textDecor="underline">Coingecko)</Link>
                    </Text>
                </Center>
                )}

                {/*TODO: Check why Connect Button is not changing address when changing MetaMask account (see wagmin template and check it works)*/}
                <Center alignContent="center" marginTop={10} marginBottom="30px">
                    <ConnectButton accountStatus={"address"} chainStatus="name" showBalance={false}/>
                </Center>
            </Box>

        {isConnected ?

                <ProcessPayment isConnected={isConnected} merchantAmount={tokenAmount} orderId={orderId} merchantId={merchantId} selectedToken={selectedToken}/> : null
        }

                {/* TODO add icons and links */}
                {/*<Center>*/}
                {/*    <Image src={"/src/resources/argent.png"} />*/}
                {/*</Center>*/}

        </>
    )
}
