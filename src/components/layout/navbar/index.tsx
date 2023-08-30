import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  Navbar as NextUINavbar
} from '@nextui-org/navbar';

import { Icon } from '@/components/general/icon/icon';
import { Link } from '@nextui-org/link';
import { NavbarAuthMenu } from './nav-auth-menu';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/general/theme-switch';
import { siteConfig } from '@/config/site';

export default async function Navbar() {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-1/4" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Next.JS w/App Router</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="basis-1/5 sm:basis-1/2" justify="center">
        <NavbarAuthMenu />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-1/4"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.x} aria-label="X">
            <Icon name="XIcon" size={16} className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <Icon name="GithubIcon" size={22} className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <Icon name="GithubIcon" size={22} className="text-default-500" />
        </Link>
        <ThemeSwitch />
        {/* A component changed from uncontrolled to controlled warning happens because of the toggle */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarAuthMenu mobile />
      </NavbarMenu>
    </NextUINavbar>
  );
}
