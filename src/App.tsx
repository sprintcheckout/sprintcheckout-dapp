import {ConnectButton} from '@rainbow-me/rainbowkit'
import {useAccount} from 'wagmi'

import {Account} from './components'
import {SprintcheckoutDapp} from "./components/SprintcheckoutDapp";
import {ProcessPayment} from "./components/ProcessPayment";
import {Center} from "@chakra-ui/react";

export function App() {
    return (
        <>
            <Center marginTop="20px" marginBottom="20px">
                <h1>Sprintcheckout</h1>
            </Center>

            <SprintcheckoutDapp/>

{/*TODO: Check why Connect Button is not changing address when changing MetaMask account (see wagmin template and check it works)*/}
            <Center alignContent="center" marginTop="15px">
                <ConnectButton/>
            </Center>
            {/*{isConnected && <Account/>}*/}
        </>
    )
}
