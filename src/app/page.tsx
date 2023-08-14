'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { ROLES } from './types/types';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col min-h-screen items-start p-24">
      {!session?.user && (
        <>
          <Link href="/auth/signup">Register</Link>
          <Link href="/auth/signin">Login</Link>
        </>
      )}
      {session?.user.role === ROLES.ADMIN && (
        <Link href="/dashboard">Dashboard</Link>
      )}
      {session?.user && (
        <button onClick={() => signOut({ callbackUrl: '/' })}>Sign Out</button>
      )}
    </main>
  );
}
