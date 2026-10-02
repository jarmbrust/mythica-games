export const site = {
  name: 'Mythica',
  tagline: 'A Casual World of Warcraft Guild for Slightly Older Players',
  description:
    'Mythica is a social World of Warcraft guild with adults of various levels of maturity. We are excited looking forward to WoW:Forever!',
  // Fixed background layer. Drop images in `frontend/public/backgrounds/`
  // and point this path at whichever one should be shown.
  backgroundImage: '/backgrounds/wow-background8.jpeg',
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
