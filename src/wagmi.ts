import {connectorsForWallets, getDefaultWallets} from '@rainbow-me/rainbowkit'
import { configureChains, createClient } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { zkSyncTestnet, zkSync } from '@wagmi/core/chains'
import {injectedWallet, metaMaskWallet, rainbowWallet, walletConnectWallet} from "@rainbow-me/rainbowkit/wallets";
const { chains, provider, webSocketProvider } = configureChains(
  [zkSync, zkSyncTestnet, ...(process.env.NODE_ENV === 'development' ? [zkSync, zkSyncTestnet] : [])],
  [publicProvider()],
)


const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

// const { connectors } = getDefaultWallets({
//   appName: 'My wagmi + RainbowKit App',
//   chains,
// })

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains }
