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
    'We are a community that does our best to foster an inclusive and safe environment. As such, we ask all members to abide by the following Code of Conduct. The list is non-exclusive, and covers communication in game, on discord, forums, etc. If you have questions on any of it, please contact an officer or the GM.',
  lastUpdated: '02-Oct-2026',
  sections: [
    {
      heading: 'Rule 1: Be respectful',
      body: [
        'This one rule more or less summarizes the rest of this list. It boils down to "don’t be a jerk". This includes no harassment or trolling, and don\'t go around stirring up drama! Treat everyone with respect and don\'t use the anonymity of an avatar turn you into an ass.',
      ],
    },
    {
      heading:
        'Rule 2: We continuously strive to foster an accepting and safe environment',
      body: [
        'We are a LGBTQ+ friendly and all-around inclusive community. Under no circumstances do we tolerate hate-speech of any kind. Anyone in guild found harassing or trolling other players with racist, sexist, homophobic, xenophobic, and other related subjects or slurs, open themselves up to a swift /gkick.',
        'Note: while fantasy-racism and xenophobia exist in the game and game-lore, when it’s used as a thin veil over obvious real-world bigotry, then it becomes a problem.',
      ],
    },
    {
      heading: 'Rule 3: Try to steer clear of hot-button topics',
      body: [
        'This one is mostly for our discord and guild chat (although in certain cases it can apply to more general chat channels), but try to avoid heated topics which easily stir up arguments and shouting-matches. Topics like religion, politics, etc. tend to stir-up turmoil and anger, even before the insane levels of shenanigans, and the siloed talking-head-propaganda-mills you see today. While many might love to chat endlessly about such things in guild, most generally want to leave behind the news and chaos for a little awhile.',
      ],
    },
    {
      heading: "Rule 4: Don't be vulgar",
      body: [
        'We are all adults here, and not the proverbially sensitive "snowflakes" either. **Regardless**, this doesn\'t mean we want to deal with shit that\'s intentionally crude, obnoxious, offensive, gross, or gruesome.',
        "Therefor, in Discord and guild chats we like to keep things overall civil. When in doubt, aim for around what most would regard as PG-13(ish). While the occasional f-bomb, for example, totally fine (and at times warranted), please avoid objectionable or offensive content...ie: porn/nudes, explicit depictions or descriptions of violence, child or animal abuse, excessive bad language, and so on. Also, everyone's lived-experiences and assumptions are different, as a result, some people are understandably more sensitive to certain topics than others.",
      ],
    },
    {
      heading: 'Rule 5: Do not violate the TOS',
      body: [
        'You clicked the checkbox and accepted the TOS, so do not engage in behavior that violates it. Avoid violating their naming polices, RMT and purchasing from gold-sellers, botting, multi-boxing, etc.',
      ],
    },
    {
      heading: 'Rule 6: Be excellent to one another',
      body: ['**...and party on dude!**'],
    },
  ],
};
