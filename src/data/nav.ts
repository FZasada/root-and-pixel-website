export interface NavItem {
  /** i18n key for the label */
  key: string;
  /** target route, with optional `#hash` for sections */
  to: string;
  /** section id inside the target page */
  hash?: string;
}

export const navItems: NavItem[] = [
  { key: "nav.home", to: "/", hash: "home" },
  { key: "nav.apps", to: "/apps" },
  { key: "nav.about", to: "/", hash: "about" },
  { key: "nav.contact", to: "/", hash: "contact" },
];