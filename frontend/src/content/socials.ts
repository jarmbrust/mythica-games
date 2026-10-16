export type DiscordCard = {
  label: string;
  href: string;
  ids?: readonly string[];
};

export const discordInvite = 'https://discord.gg/ZYASckRTW'; // expires end of Oct

// Card object for the "Join our Discord" card. The string `discordInvite`
// above stays the plain href used by the hero button.
export const discordInviteCard: DiscordCard = {
  label: 'Discord',
  href: discordInvite,
};

// Officer contact card: links to the Discord app itself — no server invite —
// and lists the officers' Discord IDs for direct messages.
export const officerDiscordCard: DiscordCard = {
  label:
    'You can message any of the following officers for additional information about the guild, or to request an invite.',
  href: 'https://discord.com/app',
  ids: ['Zem3k', '(adding more soon)'],
};
