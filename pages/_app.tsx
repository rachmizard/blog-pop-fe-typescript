import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

import DebugObserver from "lib/DebugObserver";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <DebugObserver />
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default MyApp;
