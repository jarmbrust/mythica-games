export type Social = {
  label: string;
  href: string;
  handle: string;
};

export const discordInvite = 'https://discord.gg/ZYASckRTW'; // expires end of Oct

export const socials: readonly Social[] = [
  { label: 'Discord', href: discordInvite, handle: 'discord invite' },
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
  // {
  //   label: 'GitHub',
  //   href: 'https://github.com/your-org-here',
  //   handle: 'TODO',
  // },
];
