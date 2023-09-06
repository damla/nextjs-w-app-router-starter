import clsx from 'clsx';
import { iconNameMap } from './icons';

export type IconName = keyof typeof iconNameMap;

interface Props {
  name: IconName;
  size?: number;
  className?: string;
}

export function Icon({ name, size, className }: Props) {
  const Component = iconNameMap[name];

  return (
    <span
      className={clsx('inline-flex items-center justify-center', className)}
      style={{ fontSize: size }}
    >
      <Component />
    </span>
  );
}
