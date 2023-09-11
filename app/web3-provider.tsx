'use client';

import React from 'react';
import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { argentWallet, trustWallet, ledgerWallet } from '@rainbow-me/rainbowkit/wallets';
import { createConfig, WagmiConfig } from 'wagmi';
import { chains, publicClient, webSocketPublicClient } from '@/app/constants/chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

const { wallets } = getDefaultWallets({
  appName: 'RainbowKit demo',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || '',
  chains,
});

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

const WagmiProviders = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default WagmiProviders;
