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
            "We're setting up shop horde-side on the RP instance, and while we plan to mostly take our time leveling, questing, crafting, we will run guild groups for instances, events, and so on. Raiding is an open question, and will depend on how many want to do it come 60.",
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
      slug: 'other-games',
      heading: 'Other Games',
      intro: '',
      entries: [
        {
          slug: 'dnd-campaign',
          name: 'D&D: Keep on the Borderlands',
          status: 'active',
          summary:
            'A D&D game that recently started (VTT/Discord). It is FULL, but some guild-members have mentioned interest in starting up campaigns or one-shots in the future.',
        },
        {
          slug: 'tbd',
          name: 'Other Games',
          status: 'upcoming',
          summary:
            'TBD: Other possibilities exist, but nothing ongoing at the moment.',
        },
      ],
    },
  ],
};
