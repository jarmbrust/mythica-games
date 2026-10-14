export type RuleSection = {
  heading: string;
  body: string[];
};

export type Rules = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: readonly RuleSection[];
};

export const rules: Rules = {
  title: 'Code of Conduct',
  intro:
    'We are a community that does our best to foster an inclusive and safe environment. As such, we ask all members to abide by the following Code of Conduct. The following list is non-exclusive and covers communication in game, on discord, forums, etc. If you have questions on any of it, please contact an officer or the GM.',
  lastUpdated: '04-Oct-2026',
  sections: [
    {
      heading: 'Rule 1: Be respectful',
      body: [
        'This one rule more or less summarizes the rest of this list. It boils down to "don’t be a jerk". This includes harassment and trolling, and not trying to stirring up drama. Treat everyone with respect and don\'t use the anonymity of an avatar turn you into an ass.',
      ],
    },
    {
      heading:
        'Rule 2: We continuously strive to foster an accepting and safe environment',
      body: [
        'We are a LGBTQ+ friendly and an all-around inclusive community. Under no circumstances do we tolerate hate-speech of any kind. Anyone in guild found harassing or trolling other players with racist, sexist, homophobic, xenophobic, and other related topics or slurs open themselves up to a swift /gkick.',
        'Note: while fantasy-racism and xenophobia exist in the game-lore, when it’s used as a thin veil over obvious real-world bigotry, then it becomes a problem.',
      ],
    },
    {
      heading: 'Rule 3: Stay clear of hot-button topics',
      body: [
        'Avoid heated topics that easily stir up arguments and shouting-matches. Topics like religion, politics, and so on tend to foment outrage, not encourage legitimate discussion or debate (welcome to the internet btw).',
        "We live in a time and society where political views are wildly divergent, often ill-informed, and in everyone's face. You may have pure intentions beginning that political discussion, but in public channels it will likely devolve quickly into trolling and name-calling, and a lot of people login to play a fantasy game, not discuss real-world issues.",
      ],
    },
    {
      heading: "Rule 4: Don't be vulgar",
      body: [
        "We are all adults here, but this doesn't mean we want to deal with content that's intentionally crude, obnoxious, offensive, gross, or gruesome.",
        'Therefor, in Discord, guild chats, public chats, forums, and so on, we like to keep things overall civil. As far as the guild text and voice chats, when in doubt, aim for what most regard as PG-13(ish) content in public chats and forums.',
      ],
    },
    {
      heading: 'Rule 5: Do not violate the TOS',
      body: [
        'You clicked the checkbox and accepted the TOS, so do not engage in behavior that violates it. Do not violate the naming polices, participate in RMT and purchasing from gold-sellers, no botting, no multi-boxing, etc.',
      ],
    },
    {
      heading: 'Rule 6: No Elitism',
      body: [
        "Many of us have played this game for years, some as early as 2004/2005, and have raided on many levels. However, these days a lot of us have real-life commitments and offline interests. We're probably not spending 20, 30, 40 hours a week in game getting phatl00tz.",
        "Don't get me wrong, some members do play long hours, and we try our best in instances, raids, and so on, however, we're here for a fun and relaxing time, not being bleeding-edge on anything in game. We also love to help new or returning players learn and enjoy the game!",
      ],
    },
  ],
};
