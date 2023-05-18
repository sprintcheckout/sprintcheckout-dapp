import {connectorsForWallets, getDefaultWallets} from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { zkSyncTestnet, zkSync, polygonMumbai, polygonZkEvmTestnet, scrollTestnet, optimismGoerli, optimism } from '@wagmi/core/chains'
import { publicProvider } from 'wagmi/providers/public'
import {metaMaskWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets";
import {useEffect} from "react";
import axios from "axios";

//const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
// const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
// const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';
//
// async function getPaymentSession(id: string) {
//
//   return await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/' + id);
// }
//
// async function getMerchantPaymentSettings(merchantId: string) {
//
//   let paymentSettingsResponse = await axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_settings/' + merchantId);
//   return paymentSettingsResponse;
// }
//
// let defaultChains: any[] = [];
// useEffect(() => {
//
//   const search = window.location.search;
//   const params = new URLSearchParams(search);
//   const paymentSessionIdB64 = params.get('uid');
//   let paymentSessionId = Buffer.from(paymentSessionIdB64 || '', "base64").toString();
//   if (paymentSessionId) {
//     getPaymentSession(paymentSessionId).then(paymentSession => {
//       getMerchantPaymentSettings(paymentSession.data.merchantId).then(paymentSettings => {
//         paymentSettings.data.chains.map((psChain: { name: any }) => {
//           console.log("psChain.name");
//           console.log(psChain.name);
//         });
//         defaultChains = [zkSync, zkSyncTestnet, polygonMumbai, polygonZkEvmTestnet, scrollTestnet, optimismGoerli, optimism, ...(process.env.NODE_ENV === 'development' ? [zkSync, zkSyncTestnet, polygonMumbai, polygonZkEvmTestnet, scrollTestnet, optimismGoerli, ] : [])];
//       });
//     })
//       .catch(err => {
//         console.log("Payment Session error: " + err);
//       });
//   }
//
// }, []);

// let defaultChains = [zkSync, zkSyncTestnet, polygonMumbai, polygonZkEvmTestnet, scrollTestnet, optimismGoerli, optimism, ...(process.env.NODE_ENV === 'development' ? [zkSync, zkSyncTestnet, polygonMumbai, polygonZkEvmTestnet, scrollTestnet, optimismGoerli, ] : [])];
// const { chains, provider, webSocketProvider } = configureChains(
//   defaultChains,
//     [publicProvider()],
// )

// const connectors = connectorsForWallets([
//   {
//     groupName: 'Recommended',
//     wallets: [
//       metaMaskWallet({ chains }),
//       walletConnectWallet({ chains }),
//     ],
//   },
// ]);

// const { chains, provider, webSocketProvider } = configureChains(
//   defChains,
//   [publicProvider()],
// );

// export const getClient = () => {
//
//   let connectors = connectorsForWallets([
//     {
//       groupName: 'Recommended',
//       wallets: [
//         metaMaskWallet({ chains }),
//         walletConnectWallet({ chains }),
//       ],
//     },
//   ]);
//   return createClient({
//     autoConnect: true,
//     connectors,
//     provider,
//     webSocketProvider,
//   });
// }

// export { chains }
