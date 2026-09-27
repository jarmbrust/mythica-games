export type GameStatus = "live" | "in-development" | "archived";

export type Game = {
  slug: string;
  title: string;
  summary: string;
  status: GameStatus;
  links: readonly { label: string; href: string }[];
};

export const statusLabels: Record<GameStatus, string> = {
  live: "Live",
  "in-development": "In Development",
  archived: "Archived",
};

export const games: readonly Game[] = [
  {
    slug: "placeholder-game-one",
    title: "TODO: Game Title One",
    summary:
      "TODO: one or two sentences describing what this game is and who it is for.",
    status: "live",
    links: [
      { label: "Play", href: "https://example.com/your-game-here" },
      { label: "Source", href: "https://github.com/your-org-here" },
    ],
  },
  {
    slug: "placeholder-game-two",
    title: "TODO: Game Title Two",
    summary:
      "TODO: one or two sentences describing what this game is and who it is for.",
    status: "live",
    links: [{ label: "Play", href: "https://example.com/your-game-here" }],
  },
  {
    slug: "placeholder-game-three",
    title: "TODO: Game Title Three",
    summary:
      "TODO: one or two sentences describing what this game is and who it is for.",
    status: "in-development",
    links: [{ label: "Devlog", href: "https://example.com/your-devlog-here" }],
  },
  {
    slug: "placeholder-game-four",
    title: "TODO: Game Title Four",
    summary:
      "TODO: one or two sentences describing what this game is and why it is no longer maintained.",
    status: "archived",
    links: [],
  },
];
