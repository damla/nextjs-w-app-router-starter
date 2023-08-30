'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProviderProps } from 'next-themes/dist/types';

interface Props {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function Providers({ children, themeProps }: Props) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        <SessionProvider>{children}</SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
