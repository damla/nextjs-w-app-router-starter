import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

import { NextResponse } from 'next/server';
import { Role } from '@prisma/client';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith('/dashboard') &&
      request.nextauth.token?.role !== Role.ADMIN
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
