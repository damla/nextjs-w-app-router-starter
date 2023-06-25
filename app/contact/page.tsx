'use client';

import Link from 'next/link';

const navigation = [{ name: '/Home', href: '/' }];

export default function Contact() {
  return (
    <div className="pt-4">
      <nav className="fixed left-0 top-0 flex max-w-min border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <ul className="flex items-center justify-center w-full">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-white-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="container flex items-center justify-center min-h-screen mx-auto">
        Contact Page
      </div>
    </div>
  );
}
