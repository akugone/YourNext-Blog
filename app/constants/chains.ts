'use client';

import { configureChains } from 'wagmi';
import { polygonMumbai, sepolia, lineaTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, sepolia],
  [publicProvider()],
);
