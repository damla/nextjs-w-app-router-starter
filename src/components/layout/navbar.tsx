import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from '@nextui-org/navbar';
import { Link } from '@nextui-org/link';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from '@/components/general/theme-switch';
import { Icon } from '@/components/general/icon/icon';
import { isAdmin, isLoggedIn } from '@/utils/auth';

export default async function Navbar() {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Next.JS w/App Router</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {(await isLoggedIn()) ? (
            (await isAdmin()) ? (
              <>
                {siteConfig.navItems.authorizedAdmin.map((item, idx) =>
                  item.href ? (
                    <NavbarItem key={`menu-item-${idx}`}>
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
                  ) : (
                    <NavbarItem key={`menu-item-${idx}`}>
                      {item.button}
                    </NavbarItem>
                  )
                )}
              </>
            ) : (
              <>
                {siteConfig.navItems.authorizedUser.map((item, idx) =>
                  item.href ? (
                    <NavbarItem key={`menu-item-${idx}`}>
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
                  ) : (
                    <NavbarItem key={`menu-item-${idx}`}>
                      {item.button}
                    </NavbarItem>
                  )
                )}
              </>
            )
          ) : (
            <>
              {siteConfig.navItems.public.map((item, idx) => (
                <NavbarItem key={`menu-item-${idx}`}>
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
              ))}
            </>
          )}
        </ul>
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
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {(await isLoggedIn()) ? (
            (await isAdmin()) ? (
              <>
                {siteConfig.navItems.authorizedAdmin.map((item, idx) =>
                  item.href ? (
                    <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
                      <Link color="foreground" href={item.href} size="lg">
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  ) : (
                    <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
                      {item.button}
                    </NavbarMenuItem>
                  )
                )}
              </>
            ) : (
              <>
                {siteConfig.navItems.authorizedUser.map((item, idx) =>
                  item.href ? (
                    <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
                      <Link color="foreground" href={item.href} size="lg">
                        {item.label}
                      </Link>
                    </NavbarMenuItem>
                  ) : (
                    <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
                      {item.button}
                    </NavbarMenuItem>
                  )
                )}
              </>
            )
          ) : (
            <>
              {siteConfig.navItems.public.map((item, idx) => (
                <NavbarMenuItem key={`mobile-menu-item-${idx}`}>
                  <Link color="foreground" href={item.href} size="lg">
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ))}
            </>
          )}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
