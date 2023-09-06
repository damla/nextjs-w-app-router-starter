'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProviderProps } from 'next-themes/dist/types';

interface Props {
  children: ReactNode;
  themeProps?: ThemeProviderProps;
}

export default function Providers({ children, themeProps }: Props) {
  return (
    <NextThemesProvider {...themeProps}>
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}
