import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Account } from '../components'
import {Center} from "@chakra-ui/react";

function Page() {
  const { isConnected } = useAccount()
  return (
    <>
        <Center marginTop="20px" marginBottom="20px">
            <h1>Sprintcheckout</h1>
        </Center>

      {/*<ConnectButton />*/}
      {/*{isConnected && <Account />}*/}
    </>
  )
}

export default Page
