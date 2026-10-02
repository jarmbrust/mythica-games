export type Social = {
  label: string;
  href: string;
  handle: string;
};

export const discordInvite = 'https://discord.gg/ZYASckRTW'; // expires end of Oct

export const socials: readonly Social[] = [
  { label: 'Discord', href: discordInvite, handle: 'discord invite' },
];
