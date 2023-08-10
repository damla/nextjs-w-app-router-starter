import ListUsers from '@/app/components/list-users';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen items-start p-24">
      <div className="flex-col font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:text-black">
          <code className="font-mono font-bold">User List</code>
        </p>
      </div>
      <ListUsers />
    </main>
  );
}
