'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from '@rainbow-me/rainbowkit-siwe-next-auth';

interface ProviderProps {
  children: ReactNode;
  session?: Session | null;
}

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: 'Sign in to WILT',
});

const Provider = ({ children, session }: ProviderProps) => (
  <SessionProvider session={session}>
    {/* <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}> */}
    {children}
    {/* </RainbowKitSiweNextAuthProvider> */}
  </SessionProvider>
);

export default Provider;
