import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export function middleAuth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value;
    console.log(sessionToken);
    return middleware(request, event);
  };
}
