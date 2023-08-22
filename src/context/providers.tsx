'use client';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { SessionProvider } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
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
