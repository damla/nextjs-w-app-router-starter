'use client';

import { Button } from '@/components/general/button';
import { signOut } from 'next-auth/react';

interface Props {
  className?: string;
}

export function SignOutButton({ className }: Props) {
  const handleSignOut = () => signOut({ callbackUrl: '/' });
  return (
    <Button className={className} type="button" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
