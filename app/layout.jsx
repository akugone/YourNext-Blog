import '@styles/globals.css';

export const metadata = {
  title: 'WILT version 1',
  description: 'This is the first verion of the WILT project',
};

const Rootlayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient'></div>
        </div>
        <main className='app'>{children}</main>
      </body>
    </html>
  );
};

export default Rootlayout;
