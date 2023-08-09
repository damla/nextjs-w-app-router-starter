'use client';

import { User } from '@prisma/client';
import React, { cache, use } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const getUsers = cache(() =>
  fetch('http://localhost:3000/api/users').then(res => res.json())
);

export default function ListUsers() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin?callbackUrl=/');
    }
  });

  if (!session?.user) return;

  let users = use<User[]>(getUsers());
  return (
    <div className="pt-10 flex gap-20">
      {users &&
        users.map(user => (
          <div
            key={user.id}
            className="flex w-full justify-center items-center flex-col border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4"
          >
            <code className="font-mono font-bold">Name: {user.name}</code>
            <code className="font-mono font-bold">Role: {user.role}</code>
          </div>
        ))}
    </div>
  );
}