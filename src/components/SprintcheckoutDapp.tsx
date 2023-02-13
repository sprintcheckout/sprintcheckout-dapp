import {useAccount, useEnsName} from 'wagmi'
import {Center, Link, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import * as React from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

const AUTH0_OAUTH_URL = 'https://dev-0p0zfam6.us.auth0.com/oauth/token';
const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
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

export function SprintcheckoutDapp() {

    let authResponse: AxiosResponse;
    let paymentSessionId: string;
    let merchantId: string;
    let orderId: string;
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

    const [tokenConversionRate, setTokenConversionRate] = useState<string | undefined>("");
    const [count, setCount] = useState(0);


    function setDataFromPaymentSession(paymentSession: AxiosResponse) {

        merchantId = paymentSession.data.merchantId
        orderId = paymentSession.data.orderId
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

    }, [count]);

    const countUp = () => {
        setCount(count + 1);
    }

    async function getMerchantPaymentSettings(merchantId: string) {

        let authResponse = await getAuth0Token();
        let paymentSettingsResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_settings/' + merchantId, {
            headers: {
                'Authorization': `Bearer ${authResponse.data.access_token}`
            }
        });
        return paymentSettingsResponse;
    }

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

    async function getPaymentSession(id: string) {

        let authResponse = await getAuth0Token();
        let paymentSessionResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/' + id, {
            headers: {
                'Authorization': `Bearer ${authResponse.data.access_token}`
            }
        });
        return paymentSessionResponse;
    }

    async function getTokenConversion(id: string) {

        let authResponse = await getAuth0Token();
        // let tokensResponse = await axios.get('http://localhost:8080/payment_session/token_conversions/' + id, {
        let tokensResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/token_conversions/' + id, {
            headers: {
                'Authorization': `Bearer ${authResponse.data.access_token}`
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
            <Center border='1px' borderColor='gray.200' borderRadius="12px" alignSelf="center" /*maxWidth="70ch"*/>
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
                                <Td isNumeric>{tokenAmount}</Td>
                                <Td>
                                    <Select borderRadius="20px" onChange={onChangeSendTokenAndConversion}>
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
            <Center>{tokenConversionRate} {selectedToken} per {selectedCurrency} (No hidden fees <Link
                href='https://www.coingecko.com/'>Coingecko)</Link>
            </Center>
        </>
    )
}
