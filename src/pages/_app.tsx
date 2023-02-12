import '@rainbow-me/rainbowkit/styles.css'
import {ConnectButton, RainbowKitProvider} from '@rainbow-me/rainbowkit'
import type {AppProps} from 'next/app'
import NextHead from 'next/head'
import * as React from 'react'
import {useAccount, WagmiConfig} from 'wagmi'

import {chains, client} from '../wagmi'

import {
    Button,
    Center,
    ChakraProvider,
    Container,
    Link,
    Select,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react'

import {Pruebas} from "../components/Pruebas";
import {Account} from "../components";
import {SprintcheckoutDapp} from "../components/SprintcheckoutDapp";


function App({Component, pageProps}: AppProps) {
    // const [mounted, setMounted] = React.useState(false)

    // React.useEffect(() => setMounted(true), [])
    let amount;
    let selectedToken;
    let selectedCurrency;
    const {isConnected} = useAccount()

    return (

        <ChakraProvider>
            <WagmiConfig client={client}>
                <RainbowKitProvider chains={chains}>
                    <NextHead>
                        <title>My wagmi + RainbowKit App</title>
                    </NextHead>

                    {<Component {...pageProps} />}

                    <SprintcheckoutDapp />

                    <Center alignContent="center" width="100%" marginTop="15px">
                        <Button backgroundColor="#0E76FD"
                        > Paga
                        </Button>
                    </Center>

                    <Center alignContent="center" marginTop="15px">
                        <ConnectButton/>
                        {/*{isConnected && <Account/>}*/}
                    </Center>


                    <Container>
                        <Pruebas/>
                    </Container>


                    {/*<ReturnToStore />*/}
                    {/*<Erc20Dropdown />*/}
                    {/*<PaymentDetails />*/}
                    {/*<PayButton />*/}
                </RainbowKitProvider>
            </WagmiConfig>
        </ChakraProvider>
    )
}

export default App
