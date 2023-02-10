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


function App({Component, pageProps}: AppProps) {
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => setMounted(true), [])
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

                    {mounted && <Component {...pageProps} />}

                    <Center border='1px' borderColor='gray.200' borderRadius="12px" alignSelf="center" maxWidth="70ch">

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
                                        <Td isNumeric>25.4</Td>
                                        <Td>USD</Td>
                                    </Tr>
                                    <Tr>
                                        <Td isNumeric>30.48</Td>
                                        <Td>
                                            <Select placeholder='Select token' borderRadius="20px">
                                                <option value='option1'>USDC</option>
                                                <option value='option2'>DAI</option>
                                                <option value='option3'>USDT</option>
                                            </Select>
                                        </Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Center>

                    <Center>{amount}{selectedToken} per {selectedCurrency} (No hidden fees <Link
                        href='https://www.coingecko.com/'>Coingecko)</Link></Center>

                    <Center alignContent="center" width="50%" marginTop="15px">
                        <Button backgroundColor="#0E76FD"
                        > Paga
                        </Button>
                    </Center>

                    <Center alignContent="center" width="50%" marginTop="15px">
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
