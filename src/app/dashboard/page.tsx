'use client';

import { Button } from '@/components/general/button';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

interface PostData {
  title: string;
  content: string;
  isPublished: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const { data: session, update } = useSession();

  const [error, setError] = useState<string>('');
  const [newName, setNewName] = useState<string>('');
  const [post, setPost] = useState<PostData>({
    title: '',
    content: '',
    isPublished: false
  });

  const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...post })
    });
    if (response.ok) {
      router.refresh();
      router.push('/');
    } else {
      const error = await response.text();
      setError(error);
      resetForm();
    }
  };

  const resetForm = () => {
    setPost({
      title: '',
      content: '',
      isPublished: false
    });
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Dashboard</p>
      <p>Hi {session?.user?.name}</p>
      <p>Address: {session?.user?.address}</p>
      <label>Update Name</label>
      <input
        type="text"
        placeholder="Enter new name"
        className="border border-gray-200 rounded-md px-2 py-1"
        value={newName}
        onChange={e => setNewName(e.target.value)}
      />
      <button
        onClick={() => update({ name: newName })}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update
      </button>
      <form
        onSubmit={addPost}
        className="flex flex-col my-4 gap-4 border border-pink-500 rounded-md p-4"
      >
        <div className="flex gap-2">
          <label htmlFor="postTitle">Post Title: </label>
          <input
            id="postTitle"
            type="text"
            placeholder="Title"
            className="border border-gray-200 rounded-md px-2 py-1"
            value={post.title}
            onChange={e => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="postContent">Post Content: </label>
          <input
            id="postContent"
            type="text"
            placeholder="Content"
            className="border border-gray-200 rounded-md px-2 py-1"
            value={post.content}
            onChange={e => {
              setPost({ ...post, content: e.target.value });
            }}
          />
        </div>
        <div className="flex gap-2">
          <input
            id="publishCheckbox"
            type="checkbox"
            checked={post.isPublished}
            onChange={e => {
              setPost({ ...post, isPublished: e.target.checked });
            }}
          />
          <label htmlFor="publishCheckbox">Publish</label>
        </div>
        {error && <p>{error}</p>}
        <Button
          type="submit"
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Post
        </Button>
      </form>
    </section>
  );
}
