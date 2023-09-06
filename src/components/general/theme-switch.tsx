import { useEffect, useState } from 'react';

import { Icon } from './icon/icon';
import { useTheme } from 'next-themes';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-10 h-10 p-3 leading-4"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <Icon name={theme === 'dark' ? 'SunFilledIcon' : 'MoonFilledIcon'} />
    </button>
  );
};

export default ThemeSwitch;
