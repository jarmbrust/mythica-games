export type RuleSection = {
  heading: string;
  body: string;
};

export type Rules = {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: readonly RuleSection[];
};

export const rules: Rules = {
  title: "Community Rules",
  intro:
    "TODO: replace with a short introduction explaining why these rules exist and who enforces them.",
  lastUpdated: "2026-09-26",
  sections: [
    {
      heading: "Be respectful",
      body: "TODO: write the expected standard of conduct between members.",
    },
    {
      heading: "No harassment",
      body: "TODO: define what counts as harassment, and what happens when it happens.",
    },
    {
      heading: "Keep it legal",
      body: "TODO: state the rules on piracy, cheats, and account sharing.",
    },
    {
      heading: "No spam or unsolicited promotion",
      body: "TODO: clarify when sharing your own work is welcome versus spam.",
    },
    {
      heading: "Moderation",
      body: "TODO: explain how to report a problem, and what enforcement looks like.",
    },
  ],
};
