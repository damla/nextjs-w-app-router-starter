'use client';

import { Fragment, useEffect, useState } from 'react';
import { Link, NavbarItem, NavbarMenuItem } from '@nextui-org/react';
import { isAdmin, isUser } from '@/utils/auth';

import { NavItem } from '@/types';
import NextLink from 'next/link';
import clsx from 'clsx';
import { link as linkStyles } from '@nextui-org/theme';
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';

function renderNavItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <ul className="hidden lg:flex gap-4 justify-start ml-2">
      {navItems.map((item, idx) => (
        <Fragment key={`${keyPrefix}-${idx + 1}`}>
          {item.href && (
            <NavbarItem>
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
            <NavbarItem className="sm:text-base order-1">
              {item.button}
            </NavbarItem>
          )}
        </Fragment>
      ))}
    </ul>
  );
}

function renderMobileItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <div className="mx-4 mt-2 flex flex-col gap-2">
      {navItems.map((item, idx) => (
        <Fragment key={`mobile-${keyPrefix}-menu-item-${idx}`}>
          {item.href && (
            <NavbarMenuItem>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          )}
          {item.button && (
            <NavbarItem className="text-lg order-1">{item.button}</NavbarItem>
          )}
        </Fragment>
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
