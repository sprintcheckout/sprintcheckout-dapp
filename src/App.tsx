import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount} from 'wagmi'

import {Account} from './components'
import {SprintcheckoutDapp} from "./components/SprintcheckoutDapp";
import {ProcessPayment} from "./components/ProcessPayment";
import {Center} from "@chakra-ui/react";

export function App() {
    const {isConnected} = useAccount()
    return (
        <>
            <Center marginTop="20px" marginBottom="20px">
                <h1>Sprintcheckout</h1>
            </Center>

            <SprintcheckoutDapp/>

            <Center alignContent="center" width="100%" marginTop="15px">
                <ProcessPayment isConnected={isConnected}/>
            </Center>
            <Center alignContent="center" marginTop="15px">
                <ConnectButton/>

            </Center>
            {/*{isConnected && <Account/>}*/}
        </>
    )
}
