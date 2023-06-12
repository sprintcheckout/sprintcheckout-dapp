import '@rainbow-me/rainbowkit/styles.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {WagmiConfig} from 'wagmi'

import {App} from './App'
import {useInitPublicClient} from './wagmi'
import {ChakraProvider} from "@chakra-ui/react";
import {RainbowKitProvider} from "@rainbow-me/rainbowkit";


const InitComponent = () => {
  const { config, chains } = useInitPublicClient();
  return <div>
    { (!chains && !config)? "":
      <div>
        <WagmiConfig config={config}>
          <RainbowKitProvider chains={chains!}>
          <ChakraProvider>
            <App/>
          </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </div>
    }
  </div>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(

  // <React.StrictMode>
  <InitComponent />
  // </React.StrictMode>,
)
