import {useAccount} from 'wagmi'
import {
    Alert,
    AlertIcon,
    Box,
    Center, Flex,
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

const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
//const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
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
    let currency: string;
    let failUrl: string;
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
    const [selectedToken, setSelectedToken] = useState<string | undefined>("");
    const [selectedCurrency, setSelectedCurrency] = useState<string | undefined>("");
    const [amount, setAmount] = useState<string | undefined>("");
    const [tokenAmount, setTokenAmount] = useState<string | undefined>("");
    const [orderId, setOrderId] = useState<string | undefined>("");
    const [merchantId, setMerchantId] = useState<string | undefined>("");
    const [successUrl, setSuccessUrl] = useState<string | undefined>("");
    const [cancelUrl, setCancelUrl] = useState<string | undefined>("");
    const [sessionNotFound, setSessionNotFound] = useState<boolean>(false);

    const [tokenConversionRate, setTokenConversionRate] = useState<string | undefined>("");
    const {isConnected} = useAccount()


    function setDataFromPaymentSession(paymentSession: AxiosResponse) {

        setMerchantId(paymentSession.data.merchantId);
        setOrderId(paymentSession.data.orderId);
        currency = paymentSession.data.currency;
        setSuccessUrl(paymentSession.data.successUrl);
        failUrl = paymentSession.data.failUrl;
        setCancelUrl(paymentSession.data.cancelUrl);
        setAmount(paymentSession.data.amount);
        setSelectedCurrency(currency);
    }

    useEffect(() => {

        const search = window.location.search;
        const params = new URLSearchParams(search);
        const paymentSessionIdB64 = params.get('uid');
        paymentSessionId = Buffer.from(paymentSessionIdB64 || '', "base64").toString();
        if (paymentSessionId) {
            getPaymentSession(paymentSessionId).then(paymentSession => {
                setDataFromPaymentSession(paymentSession);
                getMerchantPaymentSettings(paymentSession.data.merchantId).then(paymentSettings => {
                    networkFromBackend = paymentSettings.data.layer.network;
                    merchantPublicAddress = paymentSettings.data.layer.publicAddress;
                });
            });
            getTokenConversion(paymentSessionId)
        } else {
            setSessionNotFound(true);
        }

    }, []);

    async function getMerchantPaymentSettings(merchantId: string) {

        let paymentSettingsResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_settings/' + merchantId);
        return paymentSettingsResponse;
    }

    async function getPaymentSession(id: string) {

        return await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/' + id);
    }

    async function getTokenConversion(id: string) {

        let tokensResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/token_conversions/' + id);
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
            <Box bg={"white"} flexDirection="column" width="50vh" borderRadius="10px" margin="0 auto" marginTop={150}>
                <Center marginTop="20px" marginBottom="20px">
                    <Box marginTop="45px" marginBottom={5}>
                        <svg width="283" height="37" viewBox="0 0 283 37" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M275.765 16.1764C279.241 16.1764 282.059 13.3584 282.059 9.88225C282.059 6.40611 279.241 3.58813 275.765 3.58813C272.289 3.58813 269.471 6.40611 269.471 9.88225C269.471 13.3584 272.289 16.1764 275.765 16.1764Z"
                                fill="#1576D8"/>
                            <path
                                d="M15.9738 21.9744C15.9738 21.495 15.9 21.0647 15.7525 20.6837C15.6173 20.2903 15.3591 19.9338 14.978 19.6141C14.5969 19.2822 14.0622 18.9565 13.3738 18.6368C12.6853 18.3172 11.7941 17.9853 10.7 17.6411C9.48296 17.2477 8.3274 16.8051 7.2333 16.3134C6.1515 15.8217 5.19263 15.2501 4.3567 14.5985C3.53305 13.9347 2.88151 13.1664 2.40208 12.2935C1.93494 11.4207 1.70136 10.4065 1.70136 9.25098C1.70136 8.1323 1.94723 7.11811 2.43896 6.20841C2.93068 5.28642 3.6191 4.49966 4.50421 3.84812C5.38932 3.18428 6.43425 2.67412 7.63898 2.31761C8.85601 1.96111 10.1898 1.78286 11.6404 1.78286C13.6196 1.78286 15.3468 2.13936 16.822 2.85237C18.2972 3.56537 19.4405 4.54268 20.2518 5.78429C21.0754 7.02591 21.4873 8.44577 21.4873 10.0439H15.9922C15.9922 9.25712 15.8262 8.5687 15.4943 7.97863C15.1747 7.37626 14.683 6.90298 14.0191 6.55877C13.3676 6.21456 12.544 6.04245 11.5482 6.04245C10.5893 6.04245 9.79029 6.18997 9.15104 6.48501C8.5118 6.76775 8.03236 7.15499 7.71274 7.64671C7.39312 8.12615 7.2333 8.66705 7.2333 9.26942C7.2333 9.72426 7.34394 10.1361 7.56522 10.5049C7.79879 10.8737 8.143 11.2179 8.59785 11.5375C9.0527 11.8571 9.61204 12.1583 10.2759 12.4411C10.9397 12.7238 11.708 13.0004 12.5808 13.2709C14.0437 13.7134 15.3284 14.2113 16.4348 14.7645C17.5534 15.3177 18.4877 15.9385 19.2376 16.6269C19.9875 17.3153 20.553 18.0959 20.9341 18.9688C21.3152 19.8416 21.5057 20.8312 21.5057 21.9376C21.5057 23.1054 21.2783 24.1503 20.8234 25.0723C20.3686 25.9943 19.7109 26.7749 18.8504 27.4142C17.9899 28.0534 16.9634 28.539 15.7709 28.8709C14.5785 29.2028 13.2447 29.3688 11.7695 29.3688C10.4418 29.3688 9.1326 29.1967 7.84182 28.8525C6.55103 28.496 5.37703 27.9612 4.31982 27.2482C3.27489 26.5352 2.43896 25.6255 1.812 24.5191C1.18505 23.4127 0.871574 22.1035 0.871574 20.5915H6.42195C6.42195 21.4274 6.55103 22.1342 6.80919 22.712C7.06735 23.2898 7.43 23.757 7.89714 24.1135C8.37657 24.47 8.94206 24.7281 9.5936 24.8879C10.2574 25.0477 10.9827 25.1276 11.7695 25.1276C12.7284 25.1276 13.5151 24.9924 14.1298 24.722C14.7567 24.4515 15.2177 24.0766 15.5128 23.5971C15.8201 23.1177 15.9738 22.5768 15.9738 21.9744ZM30.5609 12.8836V36.671H25.2502V9.04814H30.1736L30.5609 12.8836ZM43.1921 18.8028V19.19C43.1921 20.6406 43.02 21.9867 42.6758 23.2283C42.3439 24.47 41.8522 25.5518 41.2006 26.4737C40.5491 27.3834 39.7378 28.0964 38.7666 28.6128C37.8077 29.1168 36.7013 29.3688 35.4474 29.3688C34.2304 29.3688 33.1732 29.1229 32.2758 28.6312C31.3784 28.1395 30.6223 27.4511 30.0077 26.5659C29.4053 25.6685 28.9197 24.6298 28.5509 23.4496C28.1821 22.2695 27.8994 21.0033 27.7027 19.651V18.6368C27.8994 17.1862 28.1821 15.8586 28.5509 14.6538C28.9197 13.4368 29.4053 12.3857 30.0077 11.5006C30.6223 10.6032 31.3722 9.90866 32.2573 9.41693C33.1547 8.92521 34.2058 8.67934 35.4105 8.67934C36.6767 8.67934 37.7893 8.91906 38.7481 9.3985C39.7193 9.87793 40.5307 10.5663 41.1822 11.4638C41.846 12.3612 42.3439 13.4307 42.6758 14.6723C43.02 15.9139 43.1921 17.2907 43.1921 18.8028ZM37.863 19.19V18.8028C37.863 17.9546 37.7893 17.1739 37.6418 16.4609C37.5065 15.7356 37.2853 15.1025 36.9779 14.5616C36.6829 14.0207 36.2895 13.6028 35.7978 13.3077C35.3183 13.0004 34.7344 12.8467 34.046 12.8467C33.3207 12.8467 32.6999 12.9635 32.1836 13.1971C31.6796 13.4307 31.2677 13.7687 30.9481 14.2113C30.6285 14.6538 30.3888 15.1824 30.229 15.7971C30.0692 16.4118 29.9708 17.1063 29.9339 17.8808V20.4439C29.9954 21.3536 30.1675 22.1711 30.4502 22.8964C30.733 23.6094 31.1694 24.1749 31.7595 24.5929C32.3495 25.0109 33.124 25.2198 34.0829 25.2198C34.7836 25.2198 35.3737 25.0662 35.8531 24.7588C36.3325 24.4392 36.7198 24.0028 37.0148 23.4496C37.3221 22.8964 37.5373 22.2572 37.6602 21.5319C37.7954 20.8066 37.863 20.026 37.863 19.19ZM52.1182 13.3999V29H46.8076V9.04814H51.8048L52.1182 13.3999ZM58.1296 8.91906L58.0374 13.8425C57.7792 13.8056 57.4658 13.7749 57.097 13.7503C56.7405 13.7134 56.4147 13.695 56.1197 13.695C55.3698 13.695 54.7182 13.7933 54.165 13.99C53.6241 14.1744 53.1693 14.451 52.8005 14.8198C52.444 15.1886 52.1735 15.6373 51.9892 16.1659C51.817 16.6945 51.7187 17.2969 51.6941 17.973L50.6246 17.6411C50.6246 16.3503 50.7537 15.164 51.0118 14.0822C51.27 12.9881 51.6449 12.0354 52.1367 11.224C52.6407 10.4127 53.2553 9.78573 53.9806 9.34318C54.7059 8.90062 55.5357 8.67934 56.47 8.67934C56.7651 8.67934 57.0662 8.70393 57.3736 8.7531C57.6809 8.78998 57.9329 8.8453 58.1296 8.91906ZM66.5578 9.04814V29H61.2287V9.04814H66.5578ZM60.8968 3.84812C60.8968 3.07364 61.1673 2.4344 61.7082 1.93038C62.2491 1.42636 62.9744 1.17435 63.8841 1.17435C64.7815 1.17435 65.5006 1.42636 66.0415 1.93038C66.5947 2.4344 66.8713 3.07364 66.8713 3.84812C66.8713 4.62259 66.5947 5.26183 66.0415 5.76585C65.5006 6.26988 64.7815 6.52189 63.8841 6.52189C62.9744 6.52189 62.2491 6.26988 61.7082 5.76585C61.1673 5.26183 60.8968 4.62259 60.8968 3.84812ZM76.4612 13.3077V29H71.1506V9.04814H76.1293L76.4612 13.3077ZM75.6868 18.3234H74.2485C74.2485 16.8482 74.439 15.5205 74.8201 14.3404C75.2012 13.1479 75.7359 12.1337 76.4244 11.2978C77.1128 10.4496 77.9303 9.80417 78.8768 9.36162C79.8357 8.90677 80.9052 8.67934 82.0854 8.67934C83.0197 8.67934 83.874 8.81457 84.6485 9.08502C85.423 9.35547 86.0868 9.78573 86.64 10.3758C87.2055 10.9659 87.6358 11.7465 87.9308 12.7177C88.2381 13.6888 88.3918 14.8751 88.3918 16.2765V29H83.0442V16.2581C83.0442 15.373 82.9213 14.6846 82.6754 14.1928C82.4296 13.7011 82.0669 13.3569 81.5875 13.1602C81.1204 12.9512 80.5426 12.8467 79.8542 12.8467C79.1412 12.8467 78.5203 12.9881 77.9917 13.2709C77.4754 13.5536 77.0452 13.947 76.701 14.451C76.369 14.9427 76.117 15.5205 75.9449 16.1843C75.7728 16.8482 75.6868 17.5612 75.6868 18.3234ZM102.518 9.04814V12.8099H90.9008V9.04814H102.518ZM93.7774 4.12471H99.0881V22.9886C99.0881 23.5664 99.1618 24.009 99.3094 24.3163C99.4692 24.6236 99.7027 24.8388 100.01 24.9617C100.317 25.0723 100.705 25.1276 101.172 25.1276C101.504 25.1276 101.799 25.1153 102.057 25.0908C102.327 25.0539 102.555 25.017 102.739 24.9801L102.758 28.8894C102.303 29.0369 101.811 29.1537 101.282 29.2397C100.754 29.3258 100.17 29.3688 99.5306 29.3688C98.3628 29.3688 97.3424 29.1783 96.4696 28.7972C95.6091 28.4038 94.9453 27.7768 94.4781 26.9163C94.011 26.0558 93.7774 24.9248 93.7774 23.5234V4.12471ZM114.099 25.2198C114.751 25.2198 115.329 25.0969 115.833 24.851C116.337 24.5929 116.73 24.2364 117.013 23.7815C117.308 23.3144 117.461 22.7673 117.474 22.1404H122.471C122.459 23.5418 122.084 24.7896 121.346 25.8837C120.609 26.9655 119.619 27.8199 118.377 28.4468C117.136 29.0615 115.747 29.3688 114.21 29.3688C112.661 29.3688 111.309 29.1106 110.153 28.5943C109.01 28.078 108.057 27.365 107.295 26.4553C106.533 25.5333 105.961 24.4638 105.58 23.2468C105.199 22.0175 105.008 20.7021 105.008 19.3007V18.7659C105.008 17.3522 105.199 16.0368 105.58 14.8198C105.961 13.5905 106.533 12.521 107.295 11.6113C108.057 10.6893 109.01 9.97013 110.153 9.45381C111.296 8.9375 112.636 8.67934 114.173 8.67934C115.808 8.67934 117.24 8.99282 118.47 9.61977C119.711 10.2467 120.682 11.1441 121.383 12.312C122.096 13.4675 122.459 14.8382 122.471 16.4241H117.474C117.461 15.7602 117.32 15.1579 117.05 14.617C116.792 14.0761 116.41 13.6458 115.906 13.3262C115.415 12.9943 114.806 12.8283 114.081 12.8283C113.306 12.8283 112.673 12.9943 112.182 13.3262C111.69 13.6458 111.309 14.0884 111.038 14.6538C110.768 15.207 110.577 15.8401 110.467 16.5531C110.368 17.2538 110.319 17.9914 110.319 18.7659V19.3007C110.319 20.0751 110.368 20.8189 110.467 21.5319C110.565 22.2449 110.749 22.878 111.02 23.4312C111.303 23.9844 111.69 24.4208 112.182 24.7404C112.673 25.06 113.313 25.2198 114.099 25.2198ZM131.047 0.676471V29H125.736V0.676471H131.047ZM130.291 18.3234H128.834C128.846 16.9342 129.031 15.6557 129.387 14.4879C129.744 13.3077 130.254 12.2874 130.918 11.4269C131.581 10.5541 132.374 9.87793 133.296 9.3985C134.231 8.91906 135.263 8.67934 136.394 8.67934C137.378 8.67934 138.269 8.82071 139.068 9.10346C139.879 9.37391 140.574 9.81646 141.152 10.4311C141.742 11.0335 142.197 11.8264 142.516 12.8099C142.836 13.7933 142.996 14.9858 142.996 16.3872V29H137.648V16.3503C137.648 15.4652 137.519 14.7706 137.261 14.2666C137.015 13.7503 136.652 13.3876 136.173 13.1787C135.706 12.9574 135.128 12.8467 134.44 12.8467C133.677 12.8467 133.026 12.9881 132.485 13.2709C131.956 13.5536 131.532 13.947 131.213 14.451C130.893 14.9427 130.659 15.5205 130.512 16.1843C130.364 16.8482 130.291 17.5612 130.291 18.3234ZM156.532 29.3688C154.983 29.3688 153.594 29.1229 152.364 28.6312C151.135 28.1272 150.09 27.4326 149.23 26.5475C148.381 25.6624 147.73 24.6359 147.275 23.4681C146.82 22.2879 146.593 21.034 146.593 19.7063V18.9688C146.593 17.4567 146.808 16.0737 147.238 14.8198C147.668 13.5659 148.283 12.4779 149.082 11.556C149.893 10.634 150.877 9.9271 152.032 9.43537C153.188 8.93135 154.491 8.67934 155.942 8.67934C157.355 8.67934 158.609 8.91291 159.703 9.38006C160.797 9.8472 161.713 10.511 162.451 11.3716C163.201 12.2321 163.766 13.2647 164.147 14.4694C164.528 15.6619 164.719 16.9895 164.719 18.4524V20.6652H148.861V17.1248H159.501V16.7191C159.501 15.9815 159.365 15.3238 159.095 14.746C158.837 14.156 158.443 13.6888 157.915 13.3446C157.386 13.0004 156.71 12.8283 155.886 12.8283C155.186 12.8283 154.583 12.982 154.079 13.2893C153.575 13.5966 153.163 14.0269 152.844 14.5801C152.536 15.1333 152.303 15.7848 152.143 16.5347C151.996 17.2723 151.922 18.0836 151.922 18.9688V19.7063C151.922 20.5054 152.032 21.243 152.254 21.9191C152.487 22.5952 152.813 23.1792 153.231 23.6709C153.661 24.1626 154.178 24.5437 154.78 24.8142C155.395 25.0846 156.089 25.2198 156.864 25.2198C157.823 25.2198 158.714 25.0354 159.537 24.6666C160.373 24.2856 161.093 23.7139 161.695 22.9517L164.276 25.7546C163.858 26.357 163.287 26.9347 162.562 27.4879C161.849 28.0411 160.988 28.496 159.98 28.8525C158.972 29.1967 157.823 29.3688 156.532 29.3688ZM176.3 25.2198C176.952 25.2198 177.53 25.0969 178.034 24.851C178.538 24.5929 178.931 24.2364 179.214 23.7815C179.509 23.3144 179.663 22.7673 179.675 22.1404H184.672C184.66 23.5418 184.285 24.7896 183.547 25.8837C182.81 26.9655 181.82 27.8199 180.578 28.4468C179.337 29.0615 177.948 29.3688 176.411 29.3688C174.862 29.3688 173.51 29.1106 172.354 28.5943C171.211 28.078 170.258 27.365 169.496 26.4553C168.734 25.5333 168.162 24.4638 167.781 23.2468C167.4 22.0175 167.21 20.7021 167.21 19.3007V18.7659C167.21 17.3522 167.4 16.0368 167.781 14.8198C168.162 13.5905 168.734 12.521 169.496 11.6113C170.258 10.6893 171.211 9.97013 172.354 9.45381C173.498 8.9375 174.838 8.67934 176.374 8.67934C178.009 8.67934 179.441 8.99282 180.671 9.61977C181.912 10.2467 182.883 11.1441 183.584 12.312C184.297 13.4675 184.66 14.8382 184.672 16.4241H179.675C179.663 15.7602 179.521 15.1579 179.251 14.617C178.993 14.0761 178.612 13.6458 178.108 13.3262C177.616 12.9943 177.007 12.8283 176.282 12.8283C175.508 12.8283 174.874 12.9943 174.383 13.3262C173.891 13.6458 173.51 14.0884 173.239 14.6538C172.969 15.207 172.778 15.8401 172.668 16.5531C172.569 17.2538 172.52 17.9914 172.52 18.7659V19.3007C172.52 20.0751 172.569 20.8189 172.668 21.5319C172.766 22.2449 172.951 22.878 173.221 23.4312C173.504 23.9844 173.891 24.4208 174.383 24.7404C174.874 25.06 175.514 25.2198 176.3 25.2198ZM193.377 0.658031V29H188.066V0.658031H193.377ZM205.953 9.04814L197.286 18.9319L192.639 23.634L190.703 19.7985L194.391 15.1148L199.573 9.04814H205.953ZM200.439 29L194.539 19.7801L198.208 16.5716L206.561 29H200.439ZM207.706 19.2269V18.8397C207.706 17.3768 207.915 16.0307 208.333 14.8014C208.751 13.5597 209.359 12.4841 210.158 11.5744C210.957 10.6647 211.941 9.95784 213.109 9.45381C214.277 8.9375 215.617 8.67934 217.129 8.67934C218.641 8.67934 219.987 8.9375 221.167 9.45381C222.347 9.95784 223.337 10.6647 224.136 11.5744C224.947 12.4841 225.562 13.5597 225.98 14.8014C226.398 16.0307 226.607 17.3768 226.607 18.8397V19.2269C226.607 20.6775 226.398 22.0236 225.98 23.2652C225.562 24.4945 224.947 25.5702 224.136 26.4922C223.337 27.4019 222.353 28.1087 221.185 28.6128C220.017 29.1168 218.678 29.3688 217.165 29.3688C215.653 29.3688 214.307 29.1168 213.127 28.6128C211.959 28.1087 210.97 27.4019 210.158 26.4922C209.359 25.5702 208.751 24.4945 208.333 23.2652C207.915 22.0236 207.706 20.6775 207.706 19.2269ZM213.017 18.8397V19.2269C213.017 20.0628 213.09 20.8435 213.238 21.5688C213.385 22.2941 213.619 22.9333 213.939 23.4865C214.27 24.0274 214.701 24.4515 215.229 24.7588C215.758 25.0662 216.403 25.2198 217.165 25.2198C217.903 25.2198 218.536 25.0662 219.065 24.7588C219.593 24.4515 220.017 24.0274 220.337 23.4865C220.657 22.9333 220.89 22.2941 221.038 21.5688C221.198 20.8435 221.278 20.0628 221.278 19.2269V18.8397C221.278 18.0283 221.198 17.2661 221.038 16.5531C220.89 15.8278 220.651 15.1886 220.319 14.6354C219.999 14.0699 219.575 13.6274 219.046 13.3077C218.518 12.9881 217.878 12.8283 217.129 12.8283C216.379 12.8283 215.739 12.9881 215.211 13.3077C214.695 13.6274 214.27 14.0699 213.939 14.6354C213.619 15.1886 213.385 15.8278 213.238 16.5531C213.09 17.2661 213.017 18.0283 213.017 18.8397ZM241.987 24.2241V9.04814H247.297V29H242.3L241.987 24.2241ZM242.577 20.1305L244.144 20.0936C244.144 21.4212 243.99 22.6567 243.683 23.8C243.376 24.931 242.915 25.9144 242.3 26.7503C241.685 27.574 240.911 28.2194 239.977 28.6865C239.042 29.1414 237.942 29.3688 236.676 29.3688C235.705 29.3688 234.807 29.2336 233.984 28.9631C233.172 28.6804 232.472 28.244 231.882 27.6539C231.304 27.0515 230.849 26.2832 230.517 25.3489C230.197 24.4023 230.038 23.2652 230.038 21.9376V9.04814H235.348V21.9744C235.348 22.5645 235.416 23.0624 235.551 23.4681C235.699 23.8737 235.902 24.2057 236.16 24.4638C236.418 24.722 236.719 24.9064 237.063 25.017C237.42 25.1276 237.813 25.183 238.243 25.183C239.337 25.183 240.198 24.9617 240.825 24.5191C241.464 24.0766 241.913 23.4742 242.171 22.712C242.442 21.9376 242.577 21.077 242.577 20.1305ZM261.442 9.04814V12.8099H249.825V9.04814H261.442ZM252.701 4.12471H258.012V22.9886C258.012 23.5664 258.086 24.009 258.233 24.3163C258.393 24.6236 258.627 24.8388 258.934 24.9617C259.241 25.0723 259.629 25.1276 260.096 25.1276C260.428 25.1276 260.723 25.1153 260.981 25.0908C261.251 25.0539 261.479 25.017 261.663 24.9801L261.682 28.8894C261.227 29.0369 260.735 29.1537 260.206 29.2397C259.678 29.3258 259.094 29.3688 258.455 29.3688C257.287 29.3688 256.266 29.1783 255.394 28.7972C254.533 28.4038 253.869 27.7768 253.402 26.9163C252.935 26.0558 252.701 24.9248 252.701 23.5234V4.12471Z"
                                fill="#183B56"/>
                        </svg>
                    </Box>
                </Center>
                {/*<Box display="flex" flexDirection="column">*/}
                {(!sessionNotFound && (!amount || !selectedCurrency || !tokenAmount || !pricesForAmountRounded)) ?
                    <Center>
                        <Spinner thickness='2px' speed='0.65s' size="xl" color="blue.500"/>
                    </Center> : null
                }
                { sessionNotFound?
                    <Flex alignContent={"center"} justifyContent={"center"}>
                        <Center>
                            <Alert status='warning' borderRadius="15px" alignContent={"center"}>
                                <AlertIcon />
                                Seems that you don't have a valid session id
                            </Alert>
                        </Center>
                    </Flex>
                    : null
                }
                {amount && selectedCurrency && tokenAmount && pricesForAmountRounded && (
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
                                    <Tr>
                                        <Td alignContent={"left"} fontWeight={"bold"} color="#3182CE">{tokenAmount}</Td>
                                        <Td>
                                            <Select style={{fontWeight: 'bold'}} color={"#3182CE"} borderRadius="20px"
                                                    onChange={onChangeSendTokenAndConversion}>
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

                {/*TODO: Connect Button should refresh the Approve/Pay buttons in our component when changing Metamask address */}
                <Center alignContent="center" marginTop={10} pb={30} id={"connectButtonId"}>
                    <ConnectButton accountStatus={"address"} chainStatus="name" showBalance={false}/>
                </Center>
                {/*</Box>*/}

                {isConnected ?

                    <ProcessPayment sessionNotFound={sessionNotFound} isConnected={isConnected} merchantAmount={tokenAmount} orderId={orderId}
                                    merchantId={merchantId} selectedToken={selectedToken}
                                    successUrl={successUrl}/> : null
                }

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
        </>
    )
}
