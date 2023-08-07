import * as React from "react";
import {Box, Image, Text} from "@chakra-ui/react";

export function SpcLogo(props: { merchantLogoUrl: undefined | string, merchantName: undefined | string }) {



  return <Box marginTop="45px" marginBottom={5}>
    {props.merchantLogoUrl ?
      <Image src={props.merchantLogoUrl}
             maxWidth="300px"
             maxHeight="40px"
             objectFit="contain"/> :
      <Text fontSize="2xl" isTruncated>
        {props.merchantName?.toUpperCase()}
      </Text>
    }
  </Box>;

}