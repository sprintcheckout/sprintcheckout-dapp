import {useAccount, useNetwork} from 'wagmi'

import {
  Alert,
  AlertIcon,
  Box,
  Center,
  Flex,
  Link,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {Chain} from '@wagmi/chains';
import * as React from "react";
import {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {ProcessPayment} from "./ProcessPayment";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {SpcLogo} from "./SpcLogo";


const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
//const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
const walletConnectProjectId = '70f630470ab734f0a78073b4eb4fc927' // TODO check cloud walletconnect
const logEnabled = true;

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

const MyComponent = (props: {
  setChain: (currentChain: (Chain & { unsupported?: boolean }) | undefined) => void
  setIsConnected: (isConnected: boolean) => void
}) => {
  const {chain, chains} = useNetwork();
  const {isConnected} = useAccount();
  useEffect(() => {
    props.setChain(chain);
    props.setIsConnected(isConnected);
  }, [chain, chains, isConnected]);
  return <div></div>;
}

export function SprintcheckoutDapp() {

  const [chain, setChain] = useState<Chain>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  let paymentSessionId: string;
  let currency: string;
  let token: string;

  let tokenAmountToPay: number; // Amount to pay in the selected token

  let tokenRoundDecimals: IHash = {};
  tokenRoundDecimals["DAI"] = 2;
  tokenRoundDecimals["USDT"] = 2;
  tokenRoundDecimals["USDC"] = 2;
  tokenRoundDecimals["USDCE"] = 2;
  tokenRoundDecimals["CTT"] = 2;
  tokenRoundDecimals["BUSD"] = 2;
  tokenRoundDecimals["ETH"] = 6;
  tokenRoundDecimals["WETH"] = 6;
  tokenRoundDecimals["BTC"] = 6;
  tokenRoundDecimals["WBTC"] = 6;
  tokenRoundDecimals["AVAX"] = 6;
  tokenRoundDecimals["WAVAX"] = 6;
  tokenRoundDecimals["TTRESR"] = 2;
  tokenRoundDecimals["TSMRTR"] = 2;
  tokenRoundDecimals["SMRTR"] = 2;

  const [selectedToken, setSelectedToken] = useState<string | undefined>("");
  const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>("");
  const [amount, setAmount] = useState<string | undefined>("");
  const [tokenAmount, setTokenAmount] = useState<string | undefined>("");
  const [orderId, setOrderId] = useState<string | undefined>("");
  const [merchantId, setMerchantId] = useState<string | undefined>("");
  const [merchantPublicAddress, setMerchantPublicAddress] = useState<string | undefined>("");
  const [successUrl, setSuccessUrl] = useState<string | undefined>("");
  const [failUrl, setFailUrl] = useState<string | undefined>("");
  const [cancelUrl, setCancelUrl] = useState<string | undefined>("");
  const [sessionNotFound, setSessionNotFound] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<boolean>(false);
  const [backendPaymentSessionId, setBackendPaymentSessionId] = useState<string>("");
  const [selectedChain, setSelectedChain] = useState<any>();
  const [pricesForAmountRounded, setPricesForAmountRounded] = useState<any>();
  const [tokenConversionRate, setTokenConversionRate] = useState<string | undefined>("");
  const [merchantLogoUrl, setMerchantLogoUrl] = useState<string | undefined>("");
  const [merchantName, setMerchantName] = useState<string | undefined>("");


  function setDataFromPaymentSession(paymentSession: AxiosResponse) {

    setMerchantId(paymentSession.data.merchantId);
    setOrderId(paymentSession.data.orderId);
    currency = paymentSession.data.currency;
    setSuccessUrl(paymentSession.data.successUrl);
    setFailUrl(paymentSession.data.failUrl);
    setCancelUrl(paymentSession.data.cancelUrl);
    setAmount(paymentSession.data.amount);
    setSelectedCurrency(currency);
  }

  function processPaymentSettings(paymentSettings: AxiosResponse<any>) {
    import.meta.env.VITE_IS_LOG_ENABLED && console.log("PaymentSettings response:", paymentSettings.data);
    let selectedChainList = chain && paymentSettings.data.chains.filter((aChain: {
      id: number;
    }) => aChain.id === chain?.id);
    selectedChainList && selectedChainList[0] && selectedChainList[0].publicAddress && setMerchantPublicAddress(selectedChainList[0].publicAddress);
    selectedChainList && selectedChainList[0] && !selectedChain && setSelectedChain(selectedChainList[0]);
    selectedChainList && selectedChainList[0] && getTokenConversion(paymentSessionId, selectedChainList[0]);
    setMerchantLogoUrl(paymentSettings.data.merchantLogoUrl);
    setMerchantName(paymentSettings.data.merchantName);
  }

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const paymentSessionIdB64 = params.get('uid');
    paymentSessionId = Buffer.from(paymentSessionIdB64 || '', "base64").toString();
    if (paymentSessionId) {
      setBackendPaymentSessionId(paymentSessionId);

      if (merchantId && orderId && successUrl && failUrl && cancelUrl && amount && selectedCurrency) {
        getMerchantPaymentSettings(merchantId).then(paymentSettings => {
          processPaymentSettings(paymentSettings);
        });
      } else {
        getPaymentSession(paymentSessionId).then(paymentSession => {
          setDataFromPaymentSession(paymentSession);
          getMerchantPaymentSettings(paymentSession.data.merchantId).then(paymentSettings => {
            processPaymentSettings(paymentSettings);
          });
        })
          .catch(err => {
            if (err.toString().indexOf("Network Error") > -1) {
              setNetworkError(true);
            } else {
              console.log("Payment Session error: " + err);
              setSessionNotFound(true);
            }
          });
      }

    } else {
      setSessionNotFound(true);
    }

  }, [chain]);

  function getMerchantPaymentSettings(merchantId: string) {

    let paymentSettingsResponse = axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_settings/' + merchantId);
    return paymentSettingsResponse;
  }

  function getPaymentSession(id: string) {

    return axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/' + id);
  }

  function getTokenConversion(id: string, selectedChainParam: any) {

    let tokensResponse = axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/token_conversions/' + id);

    tokensResponse.then(({data}) => {
      tokenConversionsList = data;
      import.meta.env.VITE_IS_LOG_ENABLED && console.log("tokenConversionsList", tokenConversionsList);
      import.meta.env.VITE_IS_LOG_ENABLED && console.log("selectedChainParam", selectedChainParam);
      let pricesForAmount = tokenConversionsList?.tokenPricesForAmount;
      let filter = pricesForAmount?.map((obj: { symbol: string; conversion: number; }) => {
        let tc = {} as TokenConversion
        tc.symbol = obj.symbol.toUpperCase();
        // @ts-ignore
        if (selectedChainParam && selectedChainParam.tokens.find(token => token.symbol === tc.symbol)?.active !== true) {
          return null; // skip the element if symbol is mapped and active flag is false
        }
        let fixedNum = obj.conversion.toFixed(tokenRoundDecimals[obj.symbol.toUpperCase()!]);
        tc.conversion = parseFloat(fixedNum);
        return tc;
      }).filter(Boolean);
      setPricesForAmountRounded(filter);
      // console.log("pricesForAmountRounded", pricesForAmountRounded);
      // let pricesForJustOne = tokenConversionsList?.tokenPricesForJustOne;
      // let firstTokenForAmount = pricesForAmount.at(0);
      // let symbol = firstTokenForAmount?.symbol?.toUpperCase().toString();
      // symbol = symbol!.replace(".", "");
      // let conversionNumber = firstTokenForAmount?.conversion;
      // let conversion = firstTokenForAmount?.conversion?.toFixed(tokenRoundDecimals[symbol!])?.toString();
      // console.log("Setting selected token to " + symbol);
      // setSelectedToken(symbol);
      // console.log("Set selected token = " + selectedToken);
      // setTokenAmount(conversion);
      // let firsTokenForJustOne = pricesForJustOne?.filter((elem: {
      //   symbol: any;
      // }) => elem.symbol === symbol?.toLowerCase());
      // setTokenConversionRate(firsTokenForJustOne.at(0)?.conversion?.toFixed(tokenRoundDecimals[symbol!]).toString());
      // tokenAmountToPay = conversionNumber!;
    })
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
    let selectedTokenConversion = pricesForJustOne?.filter((elem: {
      symbol: string;
    }) => (elem.symbol === tokenSymbol.toLowerCase() || elem.symbol === tokenSymbol))
    let conversion = selectedTokenConversion.at(0)?.conversion?.toFixed(tokenRoundDecimals[tokenSymbol!])?.toString();
    setSelectedToken(tokenSymbol.toUpperCase());
    setTokenConversionRate(conversion);
  }

  function calculateAndSetAmountForSelectedToken(tokenSymbol: string) {

    let pricesForAmount = tokenConversionsList?.tokenPricesForAmount;
    let selectedTokenConversion = pricesForAmount?.filter((elem: {
      symbol: string;
    }) => (elem.symbol === tokenSymbol.toLowerCase() || elem.symbol === tokenSymbol))
    let conversion = selectedTokenConversion.at(0)?.conversion?.toFixed(tokenRoundDecimals[tokenSymbol!])?.toString();
    tokenAmountToPay = selectedTokenConversion.at(0)?.conversion!;
    setTokenAmount(conversion);
    import.meta.env.VITE_IS_LOG_ENABLED && console.log("Set token amount:", tokenAmount);
    import.meta.env.VITE_IS_LOG_ENABLED && console.log("Set token amount to conversion:", conversion);
  }

  return (
    <>
      <Box margin="0 auto">
        <Flex justifyContent={"flex-end"}>
          <Text mt={2} mr={5} color={"#F9F9F9"} fontSize={14}>
            <Link href='https://www.sprintcheckout.com/'>How it works?</Link>
          </Text>
        </Flex>
      </Box>
      <Box bg={"white"} flexDirection="column" width="50vh" borderRadius="10px" margin="0 auto" marginTop={140}>

        <Center marginTop="20px" marginBottom="20px">
          <SpcLogo merchantLogoUrl={merchantLogoUrl} merchantName={merchantName}/>
        </Center>
        {/*<Box display="flex" flexDirection="column">*/}
        {/*{((!sessionNotFound && !networkError) && (!amount || !selectedCurrency || (!tokenAmount && selectedToken !== "-") || (!pricesForAmountRounded && selectedToken !== "-"))) ?*/}
        {/*  <Center pb={10}>*/}
        {/*    <Spinner thickness='2px' speed='0.65s' size="xl" color="blue.500"/>*/}
        {/*  </Center> : null*/}
        {/*}*/}
        {(sessionNotFound || networkError) ?
          <Flex alignContent={"center"} justifyContent={"center"} pb={10}>
            <Center>
              <Alert status='warning' borderRadius="15px" alignContent={"center"}>
                <AlertIcon/>
                {sessionNotFound ? "Seems that you don't have a valid payment session" : null}
                {networkError ? "Network error. Unable to retrieve information from the API" : null}
              </Alert>
            </Center>
          </Flex>
          : null
        }
        {amount && selectedCurrency && (
          <Center border='1px' borderColor='gray.200' borderRadius="12px" minWidth="310px" maxWidth="400px"
                  margin={"0 auto"}>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>AMOUNT</Th>
                    <Th>CURRENCY</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>{amount}</Td>
                    <Td>{selectedCurrency}</Td>
                  </Tr>
                  {isConnected ?
                    <Tr>
                      {tokenAmount ?
                        <Td alignContent={"left"} fontWeight={"bold"} color="#3182CE">{tokenAmount}</Td> :
                        <Td alignContent={"right"} fontWeight={"bold"} color="#3182CE">-</Td>
                      }
                      <Td>
                        <Select style={{fontWeight: 'bold'}} color={"#3182CE"} borderRadius="20px"
                                onChange={onChangeSendTokenAndConversion}>
                          <option key="select" value="-">Select</option>
                          {
                            // @ts-ignore
                            pricesForAmountRounded?.map((elem, index) => {
                              if (index === 0 && !token) {
                                token = elem.symbol.toUpperCase();
                              }
                              return <option key={elem.symbol} value={elem.symbol}>
                                {elem.symbol}
                              </option>;
                            })}
                        </Select>
                      </Td>
                    </Tr> : null}
                </Tbody>
              </Table>
            </TableContainer>
          </Center>
        )}

        {amount && selectedCurrency && tokenAmount && pricesForAmountRounded && selectedToken !== "-" ?
          <Center marginTop={3}>
            <Text color="#718096" fontSize={13} mr={1}>
              {tokenConversionRate} {selectedToken} per {selectedCurrency} (No hidden fees{' '}
            </Text>
            <Text color="#718096" fontSize={13}>
              <Link href='https://www.coingecko.com/' textDecor="underline">Coingecko)</Link>
            </Text>
          </Center> : null
        }

        {/*TODO: Connect Button should refresh the Approve/Pay buttons in our component when changing Metamask address */}
        <Center alignContent="center" marginTop={10} pb={30} id={"connectButtonId"}>
          <MyComponent setChain={setChain} setIsConnected={setIsConnected}/>
          <ConnectButton accountStatus={"address"} chainStatus="name" showBalance={false}/>
        </Center>
        {/*{isConnected ?*/}
        <ProcessPayment backendPaymentSessionId={backendPaymentSessionId} sessionNotFound={sessionNotFound}
                        isConnected={isConnected} merchantAmount={tokenAmount} orderId={orderId}
                        merchantId={merchantId} merchantPublicAddress={merchantPublicAddress}
                        selectedToken={selectedToken}
                        successUrl={successUrl} failUrl={failUrl}/>
        {/*}*/}

        {/* TODO add icons and links */}
        {/*<Center>*/}
        {/*    <Image src={"/src/resources/argent.png"} />*/}
        {/*</Center>*/}

      </Box>
      <Center mt={5}>
        <Text color={"#F9F9F9"} fontSize={14}>
          <Link href={cancelUrl}>Cancel and return to store</Link>
        </Text>
      </Center>
      <Center mt={35}>
        <Text color={"#F9F9F9"} fontSize={14}>
          Powered by{' '}
          <Box as="span" fontWeight="bold">
            Sprintcheckout <Box as="span" mb={1.5} className={"circle"} display="inline-block"></Box>
          </Box>
        </Text>
      </Center>

    </>
  )
}
