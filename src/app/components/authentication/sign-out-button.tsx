'use client';

import { signOut } from 'next-auth/react';
import Button from '@/app/components/general/button';

interface Props {
  className?: string;
}

export default function SignOutButton({ className }: Props) {
  const handleSignOut = () => signOut({ callbackUrl: '/' });
  return (
    <Button className={className} type="button" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
