'use client';

import { Post } from '@prisma/client';
import React, { cache, use } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { url } from '../utils/env';

const getPosts = cache(() => fetch(`${url}/api/posts`).then(res => res.json()));

export default function ListPosts() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    }
  });

  if (!session?.user) return;

  let posts = use<Post[]>(getPosts());
  return (
    <div className="pt-10 flex gap-20">
      {posts &&
        posts.map(post => (
          <div
            key={post.id}
            className="flex w-full justify-center items-center flex-col border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:text-black"
          >
            {post.content}
          </div>
        ))}
    </div>
  );
}
