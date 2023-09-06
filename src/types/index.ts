export interface NavItem {
  label: string;
  href?: string;
  button?: JSX.Element;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems: {
    public: NavItem[];
    user: NavItem[];
    admin: NavItem[];
  };
  links: {
    github: string;
    x: string;
  };
}
