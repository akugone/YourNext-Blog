import '@/styles/globals.css';
import Nav from '@/components/Nav';
import SessionProvider from '@/components/Provider';
import { Inter } from 'next/font/google';

import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

import { createPublicClient, http } from 'viem';
import { WagmiConfig, createConfig, mainnet } from 'wagmi';

// font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

export const metadata = {
  title: 'WILT',
  description: 'This is the first verion of the WILT project',
};

const Rootlayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en' className={inter.className}>
      <body>
        <WagmiConfig config={config}>
          <SessionProvider>
            <div className='main'>
              <div className='gradient'></div>
            </div>
            <main className='app'>
              <ToasterProvider />
              <LoginModal />
              <RegisterModal />
              <Nav currentUser={currentUser} />
              {children}
            </main>
          </SessionProvider>
        </WagmiConfig>
      </body>
    </html>
  );
};

export default Rootlayout;
