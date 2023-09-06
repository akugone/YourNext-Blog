import '@/styles/globals.css';
import Nav from '@/components/Nav';
import Provider from '@/components/Provider';
import { Inter } from 'next/font/google';

import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';

// font setup
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'WILT',
  description: 'This is the first verion of the WILT project',
};

const Rootlayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en' className={inter.className}>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient'></div>
        </div>
        <main className='app'>
          <LoginModal />
          <RegisterModal />
          <Nav />
          {children}
        </main>
      </Provider>
    </body>
  </html>
);

export default Rootlayout;
