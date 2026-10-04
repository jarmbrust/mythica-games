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
        'We are a LGBTQ+ friendly and all-around inclusive community. Under no circumstances do we tolerate hate-speech of any kind. Anyone in guild found harassing or trolling other players with racist, sexist, homophobic, xenophobic, and other related subjects or slurs, open themselves up to a swift /gkick.',
        'Note: while fantasy-racism and xenophobia exist in the game and game-lore, when it’s used as a thin veil over obviously real-world bigotry, then it becomes a problem.',
      ],
    },
    {
      heading: 'Rule 3: Stay clear of hot-button topics',
      body: [
        'This one is mostly for our discord and guild chat (although in some cases it can certain apply to more general chat channels), but try to avoid heated topics which easily stir up arguments and shouting-matches. Topics like religion, politics, and so on tend to stir-up turmoil and anger, not legitimate discussion or debate (welcome to the internet).',
        'We live in a society with political turmoil and the siloed propaganda, fulled by random influncers and corporate media talking-heads of all sorts. While many might love to chat endlessly about such things in guild, many others generally want to leave behind the news and chaos for at least a little awhile.',
      ],
    },
    {
      heading: "Rule 4: Don't be vulgar",
      body: [
        "We are all adults here, but this doesn't mean we want to deal with crap that's intentionally crude, obnoxious, offensive, gross, or gruesome.",
        'Therefor, in Discord and guild chats we like to keep things overall civil. In many cases this also applies on server/instance/pvp channels and forums as well. When in doubt, aim for around what most would regard as PG-13(ish). While the occasional f-bomb totally fine, objectionable or offensive content in not allowed, for example: porn/nudes, explicit depictions or descriptions of violence, child or animal abuse, excessive bad language, and so on.',
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
        'Many of us have played this game for years, some as early as 2004/2005, and have raided on many levels. However, with age (sometimes) comes wisdom, and a lot of real-life commitments and interests, and not caring quite as much about the pixels our toons wear. ',
        "Don't get me wrong, when we group for instances, raids, and so on, we pay attention and perform our roles to the best of our abilities, however, we are not doing it for the pixels, and not doing it for the bragging-rights, we are doing it to have fun with friends.",
      ],
    },
  ],
};
