'use client';

import Link from 'next/link';

export default function ServerPage() {
  return (
    <section className="flex min-h-screen p-24">
      <p>
        You are unauthorized to view this page. Go back to{' '}
        <Link href="/" className="text-blue-700">
          Home Page.
        </Link>
      </p>
    </section>
  );
}
