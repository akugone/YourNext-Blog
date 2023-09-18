// import { chain } from '@/middlewares/chain';
// import { middleAuth } from '@/middlewares/middleAuth';

// const middlewares = [middleAuth];
// export default chain(middlewares);

// export const config = { matcher: ['/create-hint', '/profile'] };

import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
  },
  {
    callbacks: {
      authorized: ({ token }) => token?.role === 'admin',
    },
  },
);

export const config = { matcher: ['/profile'] };
