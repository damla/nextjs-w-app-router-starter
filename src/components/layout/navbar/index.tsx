import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import { ThemeSwitch } from '@/components/general/theme-switch';
import { Icon } from '@/components/general/icon/icon';
import { NavbarAuthMenu } from './nav-auth-menu';

export default async function Navbar() {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Next.JS w/App Router</p>
          </NextLink>
        </NavbarBrand>
        <NavbarAuthMenu />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.x} aria-label="X">
            <Icon name="XIcon" size={22} className="text-default-500" />
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
