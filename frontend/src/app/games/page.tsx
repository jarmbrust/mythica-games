import type { Metadata } from "next";

import { Container } from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { SectionHeading } from "@/components/SectionHeading";

import { games } from "@/content/games";

export const metadata: Metadata = {
  title: "Games",
  description:
    "TODO: one-sentence description of the Mythica Games project list for search results.",
  alternates: { canonical: "/games" },
};

export default function GamesPage() {
  return (
    <Container>
      <SectionHeading
        eyebrow="Games"
        title="Our games"
        description="TODO: one or two sentences introducing the project list and how the community is involved in each one."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {games.map((game) => (
          <GameCard key={game.slug} game={game} />
        ))}
      </div>
    </Container>
  );
}
