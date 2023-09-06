'use client';

import Link from 'next/link';
import { Links } from '@/config/routes';

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-10 gap-1">
      <span className="text-default-600">&copy;{new Date().getFullYear()}</span>
      <Link href={Links.GITHUB} className="text-primary">
        Damla Köksal.
      </Link>
      <span className="text-default-600">All rights reserved.</span>
    </footer>
  );
}
