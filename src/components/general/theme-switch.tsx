'use client';

// https://github.com/nextui-org/next-app-template/blob/main/components/theme-switch.tsx
import { SwitchProps, useSwitch } from '@nextui-org/switch';

import { Icon } from '@/components/general/icon/icon';
import { VisuallyHidden } from '@react-aria/visually-hidden';
import clsx from 'clsx';
import { useIsSSR } from '@react-aria/ssr';
import { useTheme } from 'next-themes';

export interface Props {
  className?: string;
  classNames?: SwitchProps['classNames'];
}

export function ThemeSwitch({ className, classNames }: Props) {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const onChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch({
    isSelected: theme === 'light' || isSSR,
    'aria-label': `Switch to ${
      theme === 'light' || isSSR ? 'dark' : 'light'
    } mode`,
    onChange
  });

  return (
    <Component
      {...getBaseProps({
        className: clsx(
          'px-px transition-opacity hover:opacity-80 cursor-pointer',
          className,
          classNames?.base
        )
      })}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: clsx(
            [
              'w-auto h-auto',
              'bg-transparent',
              'rounded-lg',
              'flex items-center justify-center',
              'group-data-[selected=true]:bg-transparent',
              '!text-default-500',
              'pt-px',
              'px-0',
              'mx-0'
            ],
            classNames?.wrapper
          )
        })}
      >
        {!isSelected || isSSR ? (
          <Icon name="SunFilledIcon" size={22} />
        ) : (
          <Icon name="MoonFilledIcon" size={22} />
        )}
      </div>
    </Component>
  );
}
