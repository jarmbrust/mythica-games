export type CommunityEntryStatus = 'active' | 'former' | 'upcoming';

export type CommunityEntry = {
  slug: string;
  name: string;
  summary: string;
  status?: CommunityEntryStatus;
};

export type CommunitySection = {
  slug: string;
  heading: string;
  intro: string;
  entries: readonly CommunityEntry[];
};

export type Community = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly CommunitySection[];
};

export const statusLabels: Record<CommunityEntryStatus, string> = {
  active: 'Active',
  upcoming: 'Upcoming',
  former: 'Former',
};

export const community: Community = {
  eyebrow: 'Community',
  title: 'The Mythica Community',
  intro: '',
  sections: [
    {
      slug: 'wow-branches',
      heading: 'WoW branches',
      intro:
        'We have been in three different versions of WoW, and will be setting up shop in a forth soon!',
      entries: [
        {
          slug: 'retail',
          name: 'Retail',
          status: 'active',
          summary:
            'Our Retail branch has been around since the beginning of the Dragonflight expansion, and has earned AOTC most seasons. While it is still fairly active, many regular players are taking a bit of a break and looking forward to WoW:Forever.',
        },
        {
          slug: 'wowforever',
          name: 'WoW:Forever',
          status: 'upcoming',
          summary:
            'We will be setting up shop horde-side, on the RP instance, and plan to mostly take our time leveling, questing, crafting, and so on. We plan to have guild groups for instances, events, and so on, but do not know yet if we will be raiding in end-game.',
        },
      ],
    },
    {
      slug: 'former-branches',
      heading: 'Former branches',
      intro: '',
      entries: [
        {
          slug: 'classic',
          name: 'Classic',
          status: 'former',
          summary:
            'The guild actually started here to escape Shadowlands, but it died out when DF picked up.',
        },
        {
          slug: 'sod',
          name: 'Season of Discovery',
          status: 'former',
          summary: 'SoD was never meant to last...',
        },
      ],
    },
    {
      slug: 'tabletop',
      heading: 'Dungeons & Dragons and other TTRPGs',
      intro:
        'We currently have a D&D game that is ongoing (VTT/Discord), and a few guildies have mentioned interest in starting up campaigns or one-shots in the future.',
      entries: [
        {
          slug: 'dnd-campaign',
          name: 'Keep on the Boarderlands',
          summary:
            'D&D 5.5e, VTT/Discord. Just started but currently FULL, unless the DM decides to make it West Marches-style (which he is considering).',
        },
      ],
    },
    {
      slug: 'other-games',
      heading: 'Other games',
      intro: 'A lot of us play other games as well, Steam games, and so on.',
      entries: [
        {
          slug: 'other-game-one',
          name: 'Other games',
          summary: 'TBD',
        },
      ],
    },
  ],
};
