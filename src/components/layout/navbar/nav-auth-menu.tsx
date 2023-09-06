'use client';

import { Fragment, useEffect, useState } from 'react';
import { isAdmin, isUser } from '@/utils/auth';

import { Disclosure } from '@headlessui/react';
import { NavItem } from '@/types';
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';

function renderNavItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <div className="flex space-x-4">
      {navItems.map((item, idx) => (
        <Fragment key={`${keyPrefix}-${idx + 1}`}>
          {item.href && (
            <a
              className="text-black hover:text-gray-600 dark:text-gray-300 dark:hover:text-white px-3 py-4 text-sm font-medium"
              href={item.href}
            >
              {item.label}
            </a>
          )}
          {item.button && (
            <div className="text-black hover:text-gray-600 dark:text-gray-300 dark:hover:text-white px-3 py-4 text-sm font-medium flex items-center order-1">
              {item.button}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function renderMobileItems(navItems: NavItem[], keyPrefix: string) {
  return (
    <div className="flex flex-col space-y-1 px-2 pb-3 pt-2">
      {navItems.map((item, idx) => (
        <Fragment key={`mobile-${keyPrefix}-menu-item-${idx}`}>
          {item.href && (
            <Disclosure.Button
              as="a"
              href={item.href}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              {item.label}
            </Disclosure.Button>
          )}
          {item.button && (
            <div className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium order-1">
              {item.button}
            </div>
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
