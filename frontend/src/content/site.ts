export const site = {
  name: 'Mythica',
  tagline: 'Guild and gaming community for World of Warcraft and other games.',
  description: 'TODO: one-sentence description of Mythica Guild.',
} as const;

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/+$/, '');

export type NavItem = {
  label: string;
  href: string;
};

export const nav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Games', href: '/games' },
  { label: 'Rules', href: '/rules' },
  { label: 'Contact', href: '/contact' },
];
