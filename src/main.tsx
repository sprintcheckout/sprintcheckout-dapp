import '@rainbow-me/rainbowkit/styles.css'
import {RainbowKitProvider} from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import {WagmiConfig} from 'wagmi'

import {App} from './App'
import {chains, client} from './wagmi'
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const customTheme = extendTheme({
    styles: {
        global: {
            "html, body": {
                backgroundColor: "#294365",
                height: "100%",
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(

    // <React.StrictMode>
        <ChakraProvider theme={customTheme}>
            <WagmiConfig client={client}>
                <RainbowKitProvider chains={chains}>
                    <App />
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    // </React.StrictMode>,
)
