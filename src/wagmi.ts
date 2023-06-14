import {getDefaultWallets} from '@rainbow-me/rainbowkit'
import {configureChains, createConfig} from 'wagmi'
import {publicProvider} from 'wagmi/providers/public'
import {
  avalanche,
  avalancheFuji,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  zkSync,
  zkSyncTestnet
} from "@wagmi/core/chains";
import {useEffect, useState} from "react";
import axios from "axios";
import {Chain} from "@wagmi/chains";
import {RainbowKitChain} from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/RainbowKitChainContext";

//const SPRINTCHECKOUT_BASE_URL = 'http://localhost:8080/checkout'; // TODO RESTORE for local dev
const SPRINTCHECKOUT_BASE_URL = 'https://sprintcheckout-mvp.herokuapp.com/checkout';
const SPRINTCHECKOUT_BACKEND_API_URL_V2 = SPRINTCHECKOUT_BASE_URL + '/v2';

const walletConnectProjectId = '8d2ad33727b11255d175e4bb4997ad0e'
let paymentSessionId: string;
let defaultChains: any = [];

function getPaymentSessionChains(id: string) {

  return axios.get(SPRINTCHECKOUT_BACKEND_API_URL_V2 + '/payment_session/chains/' + id);
}

function loadChains(psChain: { name: string; network: string; active: boolean }) {
  // defaultChains = [];
  if (psChain.active) {
    let chainAndNetwork: string = psChain.name + "-" + psChain.network;
    switch (chainAndNetwork) {
      case "zksync-mainnet":
        defaultChains.push(zkSync)
        break;
      case "zksync-goerli":
        defaultChains.push(zkSyncTestnet)
        break;
      case "polygon-mainnet":
        defaultChains.push(polygon)
        break;
      case "polygon-mumbai":
        defaultChains.push(polygonMumbai)
        break;
      case "optimism-mainnet":
        defaultChains.push(optimism)
        break;
      case "optimism-goerli":
        defaultChains.push(optimismGoerli)
        break;
      case "avalanche-fuji":
        defaultChains.push(avalancheFuji)
        break;
      case "avalanche-mainnet":
        defaultChains.push(avalanche)
        break;
      default:
        console.log("No chain available");
    }
  }
}

export function setupChains(defaultChains: Chain[]) {

  console.log("defaultChains", defaultChains);
  const {chains, publicClient, webSocketPublicClient} = configureChains(
    defaultChains,
    [publicProvider()],
  );

  return {chains, publicClient, webSocketPublicClient};
}

export const useInitPublicClient = () => {
  // const [isLoading, setIsLoading] = useState(true);
  const [chains, setChains] = useState<Array<RainbowKitChain>>();
  const [config, setConfig] = useState<any>();
  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const paymentSessionIdB64 = params.get('uid');
    paymentSessionId = Buffer.from(paymentSessionIdB64 || '', "base64").toString();
    console.log("paymentSessionId", paymentSessionId);
    if (paymentSessionId) {
      getPaymentSessionChains(paymentSessionId).then(psChains => {
        console.log("psChains", psChains);
        psChains.data.map((psChain: { name: string, network: string, active: boolean }) => {
          loadChains(psChain);
        });

        const {chains, publicClient, webSocketPublicClient} = setupChains(defaultChains);
        setChains(chains);

        const {connectors} = getDefaultWallets({
          appName: 'My wagmi + RainbowKit App',
          chains,
          projectId: walletConnectProjectId,
        })

        const config = createConfig({
          autoConnect: true,
          connectors,
          publicClient,
          webSocketPublicClient,
        })
        setConfig(config);
      });

    }

  }, []);
  return {config, chains}
}


// export {chains}
