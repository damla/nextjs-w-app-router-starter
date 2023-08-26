'use client';

import { NavItem } from '@/types';
import { Link, NavbarItem, NavbarMenuItem } from '@nextui-org/react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { link as linkStyles } from '@nextui-org/theme';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';
import { isAdmin, isUser } from '@/utils/auth';

function renderNavItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <ul className="hidden lg:flex gap-4 justify-start ml-2">
      {navItems.map((item, idx) => (
        <>
          {item.href && (
            <NavbarItem key={`${keyPrefix}-${idx}`}>
              <NextLink
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium'
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          )}
          {item.button && (
            <NavbarItem key={`${keyPrefix}-${idx}`}>{item.button}</NavbarItem>
          )}
        </>
      ))}
    </ul>
  );
}

function renderMobileItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <div className="mx-4 mt-2 flex flex-col gap-2">
      {navItems.map((item, idx) => (
        <>
          {item.href && (
            <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          )}
          {item.button && (
            <NavbarItem key={`${keyPrefix}-${idx}`}>{item.button}</NavbarItem>
          )}
        </>
      ))}
    </div>
  );
}

interface Props {
  mobile?: boolean;
}

export function NavbarAuthMenu({ mobile }: Props) {
  const { data: session } = useSession();
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [userType, setUserType] = useState<string>('public');

  function fetchUserType() {
    if (session && isAdmin(session)) return 'admin';
    if (session && isUser(session)) return 'user';
    return 'public';
  }

  useEffect(() => {
    const userType = fetchUserType();
    setUserType(userType);
    setNavItems(siteConfig.navItems[userType]);
  }, [session]); // eslint-disable-line react-hooks/exhaustive-deps

  if (mobile)
    return renderMobileItems(navItems, `mobile-${userType}-menu-item`);
  return renderNavItems(navItems, `${userType}-menu-item`);
}
