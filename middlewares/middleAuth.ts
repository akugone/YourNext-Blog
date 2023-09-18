import { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server';

export function middleAuth(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    console.log('middleAuth');

    return middleware(request, event);
  };
}
