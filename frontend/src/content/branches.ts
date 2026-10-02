export type Branch = {
  slug: string;
  name: string;
  summary: string;
};

export type Branches = {
  eyebrow: string;
  title: string;
  intro: string;
  activeHeading: string;
  formerHeading: string;
  // formerIntro: string;
  active: readonly Branch[];
  former: readonly Branch[];
};

export const branches: Branches = {
  eyebrow: 'Branches',
  title: 'Our branches',
  intro:
    'We have been in three different versions of WoW, and will be setting up shop in a forth soon!',
  activeHeading: 'Active branches',
  formerHeading: 'Former branches',
  // formerIntro:
  //   'TODO: one sentence acknowledging the retired branches and thanking their members.',
  active: [
    {
      slug: 'retail',
      name: 'Retail',
      summary:
        'TODO: describe the Retail branch — what it raids, when it runs, and who it suits.',
    },
    {
      slug: 'wowforever',
      name: 'WoW:Forever',
      summary: 'We will be setting up shop horde-side, on the RP instance.',
    },
  ],
  former: [
    {
      slug: 'classic',
      name: 'Classic',
      summary:
        'The guild actually started here to escape Shadowlands, but it died out when DF picked up.',
    },
    {
      slug: 'sod',
      name: 'Season of Discovery',
      summary: 'SoD was never meant to last.',
    },
  ],
};
