export type Social = {
  label: string;
  href: string;
  handle: string;
};

export const contactEmail = 'hello@example.com';

export const discordInvite = 'https://discord.gg/your-invite-here';

export const socials: readonly Social[] = [
  { label: 'Discord', href: discordInvite, handle: 'TODO' },
  // {
  //   label: "Twitch",
  //   href: "https://twitch.tv/your-handle-here",
  //   handle: "TODO",
  // },
  // {
  //   label: "YouTube",
  //   href: "https://youtube.com/@your-handle-here",
  //   handle: "TODO",
  // },
  {
    label: 'GitHub',
    href: 'https://github.com/your-org-here',
    handle: 'TODO',
  },
];
