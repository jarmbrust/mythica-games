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
  intro:
    'TODO: one or two sentences about everything the community does together — WoW branches, tabletop games, and other places we play.',
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
            'TODO: describe the Retail branch — what it raids, when it runs, and who it suits.',
        },
        {
          slug: 'wowforever',
          name: 'WoW:Forever',
          status: 'upcoming',
          summary: 'We will be setting up shop horde-side, on the RP instance.',
        },
      ],
    },
    {
      slug: 'former-branches',
      heading: 'Former branches',
      intro:
        'TODO: one sentence acknowledging the retired branches and thanking their members.',
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
          summary: 'SoD was never meant to last.',
        },
      ],
    },
    {
      slug: 'tabletop',
      heading: 'Dungeons & Dragons',
      intro: 'TODO: describe the tabletop side of the community.',
      entries: [
        {
          slug: 'dnd-campaign',
          name: 'TODO: campaign name',
          summary: 'TODO: describe the campaign and how to join.',
        },
      ],
    },
    {
      slug: 'other-games',
      heading: 'Other games',
      intro: 'TODO: describe the other games the community plays together.',
      entries: [
        {
          slug: 'other-game-one',
          name: 'TODO: game name',
          summary: 'TODO: describe it.',
        },
      ],
    },
  ],
};
