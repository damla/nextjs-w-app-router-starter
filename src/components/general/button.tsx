'use client';

import { ReactNode } from 'react';

interface Props {
  type?: 'button' | 'reset' | 'submit';
  onClick?: VoidFunction;
  className?: string;
  children: ReactNode;
}

export function Button({
  type = 'button',
  onClick,
  className,
  children
}: Props) {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
}
