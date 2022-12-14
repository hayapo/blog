import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { config } from "lib/theme";
import React from "react";
import { AppProps } from "next/app";
import Layout from "components/Layout";

const theme = extendTheme({ config });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
