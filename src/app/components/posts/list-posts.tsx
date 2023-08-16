import { Post } from '@prisma/client';

async function getListData(): Promise<Post[]> {
  const res = await fetch('http://localhost:3000/api/posts');

  if (!res.ok) {
    // TODO: refactor this error part
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function ListPosts() {
  const posts: Post[] = await getListData();

  if (posts.length === 0) return <p>No Posts found.</p>;

  return (
    <div className="pt-10 flex gap-20">
      {posts &&
        posts.map(
          post =>
            post.isPublished && (
              <div
                key={post.id}
                className="flex w-full justify-center items-center flex-col border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:text-black"
              >
                {post.title}
                {post.content}
              </div>
            )
        )}
    </div>
  );
}