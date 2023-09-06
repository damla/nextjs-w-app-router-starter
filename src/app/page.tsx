import { ListPosts } from '@/components/posts/list-posts';
import { Suspense } from 'react';

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen items-start p-24">
      <h1 className="text-xl font-bold text-red-500 mt-4">Posts</h1>
      <div className="border border-gray-500 rounded-xs p-4">
        <Suspense fallback={<div>Loading...</div>}>
          <ListPosts />
        </Suspense>
      </div>
    </section>
  );
}
