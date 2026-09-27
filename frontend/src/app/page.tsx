import Link from "next/link";

import { Container } from "@/components/Container";
import { GameCard } from "@/components/GameCard";
import { SectionHeading } from "@/components/SectionHeading";
import { games } from "@/content/games";
import { site } from "@/content/site";
import { discordInvite } from "@/content/socials";

export default function HomePage() {
  const featured = games.filter((game) => game.status !== "archived");

  return (
    <>
      <Container>
        <section className="py-12 text-center sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            {site.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-foreground-muted">
            {site.tagline}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={discordInvite}
              rel="noopener noreferrer"
              target="_blank"
              className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
            >
              Join the Discord
            </a>
            <Link
              href="/games"
              className="rounded-md border border-surface-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-raised"
            >
              Browse our games
            </Link>
          </div>
        </section>
      </Container>

      <Container>
        <section className="py-16">
          <SectionHeading
            eyebrow="About"
            title="An online gaming community"
            description="TODO: two or three sentences about who we are, what the community does, and what makes it worth joining."
          />
        </section>
      </Container>

      <Container>
        <section className="py-16">
          <SectionHeading
            eyebrow="Games"
            title="What we're building"
            description="TODO: one sentence framing the current project lineup."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {featured.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </div>
          <p className="mt-8">
            <Link
              href="/games"
              className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
            >
              See all games →
            </Link>
          </p>
        </section>
      </Container>

      <Container>
        <section className="py-16">
          <div className="rounded-lg border border-surface-border bg-surface-raised p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              TODO: closing call to action
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-foreground-muted">
              TODO: one or two sentences inviting the reader to get involved,
              then a link to the contact page and the rules.
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
