import '@/styles/globals.css';
import Nav from '@/components/Nav';
import SessionProvider from '@/components/Provider';
import { Inter } from 'next/font/google';

import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import WagmiProviders from './web3-provider';
import { chains } from '@/app/constants/chains';

// font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const demoAppInfo = {
  appName: 'WILT Demo',
};

export const metadata = {
  title: 'WILT',
  description: 'This is the first verion of the WILT project',
};

const Rootlayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  return (
    <html lang='en' className={inter.className}>
      <body>
        <WagmiProviders>
          <SessionProvider>
            <RainbowKitProvider chains={chains} appInfo={demoAppInfo} modalSize='compact'>
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
            </RainbowKitProvider>
          </SessionProvider>
        </WagmiProviders>
      </body>
    </html>
  );
};

export default Rootlayout;
