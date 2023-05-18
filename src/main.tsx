import '@rainbow-me/rainbowkit/styles.css'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import {App} from './App'
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
    <App/>
  </ChakraProvider>
  // </React.StrictMode>,
)
