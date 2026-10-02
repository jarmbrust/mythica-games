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
    'We are, for the most part, an “older-person” guild that does our best to foster an inclusive and safe environment. So therefore, we ask that all members abide by the following Code of Conduct. The list is non-exclusive, and covers all communication in game, on discord, forums, etc.',
  lastUpdated: '01-Oct-2026',
  // Moderators will have final say on everything.
  sections: [
    {
      heading:
        'Rule 1: Be respectful, and that includes no harassment or trolling',
      body: [
        "Basically... Don’t be a jerk, treat everyone with respect, and don't use the anonymity of an avatar turn you into an ass.",
      ],
    },
    {
      heading:
        'Rule 2: We continuously strive to foster an accepting and safe environment',
      body: [
        'We are LGBTQ+ friendly, inclusive, and under no circumstances do we tolerate hate-speech of any kind. Anyone in guild found harassing other players with hate-speech (speech that is: racist, sexist, homophobic, xenophobic, and other related slurs), whether their target is in guild or not, **might** get one warning before a swift /gkick... and you may not get even one warning if you were egregious enough.',
        "We do not have a lot of tolerance for this because, well, it's a freaking computer game folks, we are here to hang out and have fun. And yes, we are well aware that there is plenty of fantasy racism and xenophobia in game, and this is fine as it is part of that fantasy world... it only becomes a problem when it is used in an attempt to obscure obviously real-world bigotry. If you lack the maturity or empathy to treat everyone with the same basic decency, they you're probably better off in some toxic streamer's zerg-guild, because we sure as hell don\'t want you.",
      ],
    },
    {
      heading: 'Rule 3: Steer clear of hot-button topics',
      body: [
        'This is mostly for our discord and guild chat, but try to avoid heated topics that stir up arguments and shouting-matches. This includes topics like religion, politics, real-world race or ethnicity, and so on. We get a whole lot of turmoil regarding similar topics in the real world, and while many of are paying attention to the happenings of the next couple of months, while in game, most of us would much rather tune out the news for a little awhile, and maybe focus on the happenings of Orcs and Dwarves, and the latest Goblin tax hike.',
      ],
    },
    {
      heading: 'Rule 4: Avoid being vulgar',
      body: [
        'We are all adults here, and not some sensitive "snowflakes" or whatever. Regardless, it doesn\'t mean we want to have to deal with that crap. So, in Discord and guild chats we like to keep things civil, and generally somewhat around PG-13(ish). While occasional f-bombs are totally fine, please avoid excessive or extreme content... ie: porn/nudes, explicit depictions or descriptions of violence/abuse, excessive bad language, etc.',
      ],
    },
    {
      heading: 'Rule 5: You clicked the "Accept" checkbox on the TOS',
      body: [
        'Therefor, do not engage in behavior that violates the TOS, including not engaging in RMT, purchasing from gold-sellers, botting, multi-boxing, etc.',
      ],
    },
    {
      heading: 'Rule 6: Be excellent to one another',
      body: ['...and party on dude!'],
    },
  ],
};
