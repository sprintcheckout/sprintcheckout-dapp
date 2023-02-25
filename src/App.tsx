import {ConnectButton} from '@rainbow-me/rainbowkit'
import {SprintcheckoutDapp} from "./components/SprintcheckoutDapp";
import {Box, Center, Image, Link, Text} from "@chakra-ui/react";

export function App() {
    return (
        <>
            {/*<Center justifyContent={"right"} flexDirection={"column"}>*/}
            {/*    <Text color={"#F9F9F9"} fontSize={14}>How it works?</Text>*/}
            {/*</Center>*/}
            <SprintcheckoutDapp/>
        </>
    )
}
