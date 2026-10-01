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
  formerIntro: string;
  active: readonly Branch[];
  former: readonly Branch[];
};

export const branches: Branches = {
  eyebrow: 'Branches',
  title: 'Our branches',
  intro:
    'TODO: one or two sentences introducing the branches and how newcomers choose one.',
  activeHeading: 'Active branches',
  formerHeading: 'Former branches',
  formerIntro:
    'TODO: one sentence acknowledging the retired branches and thanking their members.',
  active: [
    {
      slug: 'retail',
      name: 'Retail',
      summary:
        'TODO: describe the Retail branch — what it raids, when it runs, and who it suits.',
    },
    {
      slug: 'wow4ever',
      name: 'Wow4ever',
      summary:
        'TODO: describe the Wow4ever branch — the server, its activities, and who it suits.',
    },
  ],
  former: [
    {
      slug: 'classic',
      name: 'Classic',
      summary: 'TODO: describe the retired Classic branch and when it wound down.',
    },
    {
      slug: 'sod',
      name: 'Season of Discovery',
      summary: 'TODO: describe the retired SoD branch and when it wound down.',
    },
  ],
};
