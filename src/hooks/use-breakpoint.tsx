'use client';

import { useEffect, useState } from 'react';

type Breakpoints = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  '2xl': number;
};

type CurrentBreakpoint = keyof Breakpoints | null;

const useBreakpoint = (): CurrentBreakpoint => {
  const breakpoints: Breakpoints = {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  };

  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<CurrentBreakpoint>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      let matchedBreakpoint: CurrentBreakpoint = null;
      for (const [name, width] of Object.entries(breakpoints)) {
        if (window.matchMedia(`(min-width: ${width}px)`).matches) {
          matchedBreakpoint = name as keyof Breakpoints;
        }
      }
      setCurrentBreakpoint(matchedBreakpoint);
    };

    updateBreakpoint();

    window.addEventListener('resize', updateBreakpoint);

    return () => {
      window.removeEventListener('resize', updateBreakpoint);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return currentBreakpoint;
};

export default useBreakpoint;
