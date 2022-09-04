import "@rainbow-me/rainbowkit/styles.css";

import React from "react";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Chain,
} from "@rainbow-me/rainbowkit";


// import { Chain, getDefaultWallets } from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";


export const { provider, chains } = configureChains(
  [chain.ropsten],
  [
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Token Generator",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function Web3ConnectorConfig({ children }) {
  
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "#FF9200",
            accentColorForeground: "white",
            borderRadius: "large",
            overlayBlur: "large",
            fontStack: "rounded",
          })}
          coolMode
          chains={chains}
        >
         
            {children}
          {/* </ContractContext.Provider> */}
        </RainbowKitProvider>
      </WagmiConfig>
     
      
    </>
  );
}
