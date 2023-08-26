import { Links, Routes } from './routes';
import { SignOutButton } from '@/components/authentication/sign-out-button';

interface AuthorizedAdmin {
  label: string;
  href: string;
  button?: JSX.Element;
}

const publicNavItems = [
  {
    label: 'Home',
    href: Routes.HOME
  },
  {
    label: 'Login',
    href: Routes.SIGN_IN
  },
  {
    label: 'Register',
    href: Routes.SIGN_UP
  }
];

const authorizedUserNavItems = [
  {
    label: 'Home',
    href: Routes.HOME
  },
  {
    label: 'Logout',
    button: <SignOutButton />
  }
];

const authorizedAdminNavItems = [
  {
    label: 'Dashboard',
    href: Routes.DASHBOARD
  }
];

export const siteConfig = {
  name: 'Next.js w/App Router Starter',
  description: 'Supercharge development with Next.js with App Router Starter',
  navItems: {
    public: [...publicNavItems],
    authorizedUser: [...authorizedUserNavItems],
    authorizedAdmin: [
      ...authorizedAdminNavItems,
      ...authorizedUserNavItems
    ] as AuthorizedAdmin[]
  },
  links: {
    github: Links.GITHUB,
    x: Links.X
  }
};
