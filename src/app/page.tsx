import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/auth-options';
import SignOutButton from '@/components/authentication/sign-out-button';
import ListPosts from '@/components/posts/list-posts';
import { Suspense } from 'react';
import { Role } from '@prisma/client';
import { Button } from '@nextui-org/button';
import { ThemeSwitch } from '../components/general/theme-switch';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col min-h-screen items-start p-24">
      <ThemeSwitch />
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
      <Button color="success" radius="full">
        damla
      </Button>
    </main>
  );
}
