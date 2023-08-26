'use client';

import { Links } from '@/config/routes';
import { Link } from '@nextui-org/react';

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-center py-3 gap-1">
      <span className="text-default-600">Created by</span>
      <Link href={Links.GITHUB} className="text-primary">
        Damla Köksal
      </Link>
    </footer>
  );
}
