export const site = {
  name: 'Mythica',
  tagline:
    'Guild and gaming community for mature players (ie, old farts) in World of Warcraft.',
  description:
    'Mythica is a mature, social World of Warcraft guild, excited to return for WoW:Forever.',
  legalNote: [
    'World of Warcraft and its content are owned by Blizzard Entertainment, Inc.',
    'This site is not affiliated with or endorsed by Blizzard Entertainment.',
  ],
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
  { label: 'Branches', href: '/branches' },
  { label: 'Code of Conduct', href: '/rules' },
  { label: 'Contact', href: '/contact' },
];
