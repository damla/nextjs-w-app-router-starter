import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/utils/auth-options';
import SignOutButton from '@/app/components/authentication/sign-out-button';
import ListPosts from '@/app/components/posts/list-posts';
import { Suspense } from 'react';
import { Role } from '@prisma/client';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col min-h-screen items-start p-24">
      {!session?.user && (
        <>
          <Link href="/auth/signup">Register</Link>
          <Link href="/auth/signin">Login</Link>
        </>
      )}
      {session?.user.role === Role.ADMIN && (
        <Link href="/dashboard">Dashboard</Link>
      )}
      {session?.user && <SignOutButton />}
      <h1 className="text-xl font-bold text-red-500 mt-4">Posts</h1>
      <div className="border border-gray-500 rounded-xs p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ListPosts />
        </Suspense>
      </div>
    </main>
  );
}
