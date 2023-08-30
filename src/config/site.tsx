import { Links, Routes } from './routes';
import { NavItem, SiteConfig } from '@/types';

import { SignOutButton } from '@/components/authentication/sign-out-button';

const baseNavItems: NavItem[] = [
  {
    label: 'Home',
    href: Routes.HOME
  }
];

const publicNavItems: NavItem[] = [
  ...baseNavItems,
  {
    label: 'Login',
    href: Routes.SIGN_IN
  },
  {
    label: 'Register',
    href: Routes.SIGN_UP
  }
];

const authorizedUserNavItems: NavItem[] = [
  ...baseNavItems,
  {
    label: 'Logout',
    button: <SignOutButton />
  }
];

const authorizedAdminNavItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: Routes.DASHBOARD
  }
];

export const siteConfig: SiteConfig = {
  name: 'Next.js w/App Router Starter',
  description: 'Supercharge development with Next.js with App Router Starter',
  navItems: {
    public: publicNavItems,
    user: authorizedUserNavItems,
    admin: [...authorizedUserNavItems, ...authorizedAdminNavItems]
  },
  links: {
    github: Links.GITHUB,
    x: Links.X
  }
};
