'use client';

import React from 'react';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai, sepolia, lineaTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, sepolia, lineaTestnet],
  [publicProvider()],
);

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains,
});

const demoAppInfo = {
  appName: 'Rainbowkit Demo',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId: projectId ?? '', chains: chains as any }),
      trustWallet({ projectId: projectId ?? '', chains: chains as any }),
      ledgerWallet({ projectId: projectId ?? '', chains: chains as any }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Web3Providers = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo} modalSize='compact'>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Providers;
