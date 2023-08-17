import { withAuth, NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { ROLES } from './app/types/types';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      request.nextauth.token?.role !== ROLES.ADMIN
    ) {
      return NextResponse.rewrite(new URL('/unauthorized', request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = { matcher: ['/dashboard'] };
