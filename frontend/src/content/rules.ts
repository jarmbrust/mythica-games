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
    'We are a community that does our best to foster an inclusive and safe environment. As such, we require all members to abide by the following Code of Conduct. If you have questions, please contact an officer or the GM.',
  lastUpdated: '18-NOV-2026',
  sections: [
    {
      heading: 'Rule 1: Be respectful',
      body: [
        'This one rule more or less summarizes the rest of this list. It boils down to "don’t be a jerk", and includes harassment, trolling, and so on. Really, just treat everyone with respect, and don\'t use the anonymity of an online avatar turn you into an ass.',
      ],
    },
    {
      heading:
        'Rule 2: We continuously strive to foster an inclusive and safe environment',
      body: [
        'We are an LGBTQ+ friendly, all-around inclusive community. Under no circumstances do we tolerate hate-speech or behavior that is racist, sexist, homophobic, transphobic, xenophobic, etc. A member found engaging in such behavior, whether in guild channels or not, opens themselves up to being kicked from the guild.',
        "**Note**: We realize that fantasy-racism and xenophobia may exists in-game and throughout the lore, story, and the attitudes of some NPCs. Therefore, in-character attitudes can be fine in the proper context, and with all parties understanding it is RP. However even then, when it's used as a thin cover for obvious real-world bigotry, it becomes a problem.",
      ],
    },
    {
      heading: 'Rule 3: Avoid being vulgar',
      body: [
        "We are all adults here, but this doesn't mean we want to deal with content that's overtly or excessively crude, obnoxious, offensive, gross, or gruesome.",
        'Therefore, in Discord and guild chat especially, we like to keep things PG-13ish.',
      ],
    },
    {
      heading: 'Rule 4: Avoid hot-button or rage-bate topics',
      body: [
        'Avoid heated topics that easily stir up arguments and shouting-matches, especially in our Discord or guild chats. Topics like religion, politics, and so on will more likely foment outrage than encourage legitimate discussion or debate.',
        'Keep in mind, most players do not want to have real-world, often sensationalized or coded, topics in there fantasy game.',
      ],
    },
    {
      heading: 'Rule 5: Do not violate the TOS',
      body: [
        "Do not violate the TOS. Doing so harms the game's economy and gameplay, and negatively impacts other players. ",
      ],
    },
    {
      heading: 'Rule 6: No Elitism',
      body: [
        'Many of us have years of experience under our belts, some going as far back as early 2004/2005, and at all levels of play, from casual to hard-core raiders.',
        'However, now days we are mostly casual, and are here to have fun, make friends, and relax. We welcome people of all levels, and love to help people who want to get better. Ultimately we understand that **the experience >>> than the lootz.**',
        "Be welcoming, helpful, and don't berate people that are not as uber-uber-l33t as you.",
      ],
    },
  ],
};
