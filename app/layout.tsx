import '@/styles/globals.css';
import Nav from '@/components/Nav';
import SessionProvider from '@/components/Provider';
import { Inter } from 'next/font/google';
import { Head, Html, Main, NextScript } from 'next/document';
import RegisterModal from '@/components/modals/RegisterModal';
import LoginModal from '@/components/modals/LoginModal';
import ToasterProvider from '@/providers/ToasterProvider';

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

const Rootlayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <Html lang='en' className={inter.className}>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />

        <meta name='pwa-demo' content='pwa-demo' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='pwa-demo' />
        <meta name='description' content='pwa-demo' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='msapplication-TileColor' content='#2B5797' />
        <meta name='msapplication-tap-highlight' content='no' />
        <meta name='theme-color' content='#000000' />

        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <body>
        <SessionProvider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <ToasterProvider />
            <LoginModal />
            <RegisterModal />
            <Nav />
            {children}
          </main>
        </SessionProvider>
      </body>
    </Html>
  );
};

export default Rootlayout;
