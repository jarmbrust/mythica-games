import Link from 'next/link';

import { BoldMarkup } from '@/components/BoldMarkup';
import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { discordInvite } from '@/content/socials';

export default function HomePage() {
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
              {home.heroPrimaryCta}
            </a>
            <Link
              href="/branches"
              className="rounded-md border border-surface-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-raised"
            >
              {home.heroSecondaryCta}
            </Link>
          </div>
        </section>
      </Container>

      <Container>
        <section className="py-16">
          <SectionHeading eyebrow={home.aboutEyebrow} title={home.aboutTitle} />
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-foreground-muted">
            {home.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>
                <BoldMarkup text={paragraph} />
              </p>
            ))}
          </div>
        </section>
      </Container>

      <Container>
        <section className="py-16">
          <div className="rounded-lg border border-surface-border bg-surface-raised p-8 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {home.closingTitle}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-foreground-muted">
              {home.closingBody}
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
