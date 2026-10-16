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
  lastUpdated: '16-Oct-2026',
  sections: [
    {
      heading: 'Rule 1: Be respectful',
      body: [
        'This one rule more or less summarizes the rest of this list. It boils down to "don’t be a jerk". This includes harassment, trolling, and so on. Really, just treat everyone with respect, and don\'t use the anonymity of an online avatar turn you into an ass.',
      ],
    },
    {
      heading:
        'Rule 2: We continuously strive to foster an inclusive and safe environment',
      body: [
        'We are a LGBTQ+ friendly and an all-around inclusive community. Under no circumstances do we tolerate hate-speech or behavior that is racist, sexist, homophobic, transphobic, xenophobic, or other related categories. A member found engaging in such behavior, whether in guild channels or not, opens themselves up to a swift /gkick.',
        "**Note**: We realize that fantasy-racism and xenophobia exist in game throughout the lore, story, and the attitudes of many NPCs, and therefore in-character behavior is fine as far as that goes (especially on an RP server and when done in context). However, when it's used as a thin veil over obvious real-world bigotry, well, then it becomes a problem.",
      ],
    },
    {
      heading: "Rule 3: Don't be vulgar",
      body: [
        "We are all adults here, but this doesn't mean we want to deal with content that's overtly or excessively crude, obnoxious, offensive, gross, or gruesome.",
        'Therefore, in Discord and guild chats especially, we like to keep things PG-13ish, more or less.',
      ],
    },
    {
      heading: 'Rule 4: Try to stay clear of hot-button topics',
      body: [
        "Avoid heated topics that easily stir up arguments and shouting-matches, especially in our Discord or guild chats. Topics like religion, politics, and so on will more likely foment outrage than encourage legitimate discussion or debate. Even not resulting in outrage, it can also leave people who may not 100% agree with the group feel like they don't belong.",
        'Most importantly, a lot of people do not want to deal with heavy real- world topics in a fantasy game.',
        "If you choose to engage in discussions like that in public channels, be civil, after all, you are wearing the guild's tag.",
      ],
    },
    {
      heading: 'Rule 5: Do not violate the TOS',
      body: [
        "Do not engage in behavior that violates the TOS. Not only can it harm game-play or the in-game economy, but no one wants to get caught up in the bad behavior of others. If we find out you engaged in things like RMT, botting, multi-boxing, and so on, we'll kick you, and likely report you to Blizzard.",
      ],
    },
    {
      heading: 'Rule 6: No Elitism',
      body: [
        'Many of us have years of experience under our belts, some going as far back as early 2004/2005, and at all levels of play, from casual to hard-core raiders.',
        'However, now days we are mostly casual, and are here to have fun, make friends, and relax. We welcome people of all levels, and love to help people who want to get better. Ultimately we understand that **the experience >>> than the lootz.**',
        "Be welcoming, and don't berate people that are not as uber-uber-l33t as you.",
      ],
    },
  ],
};
