import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import {
  community,
  statusLabels,
  type CommunityEntry,
} from '@/content/community';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Mythica on different versions of wow.',
  alternates: { canonical: '/community' },
};

const statusStyles: Record<keyof typeof statusLabels, string> = {
  active: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  upcoming: 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  former: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-400',
};

function CommunityCard({ entry }: { entry: CommunityEntry }) {
  return (
    <article className="flex flex-col rounded-lg border border-surface-border bg-surface-raised p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{entry.name}</h3>
        {entry.status ? (
          <span
            className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[entry.status]}`}
          >
            {statusLabels[entry.status]}
          </span>
        ) : null}
      </div>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
        {entry.summary}
      </p>
    </article>
  );
}

export default function CommunityPage() {
  return (
    <Container>
      <SectionHeading
        eyebrow={community.eyebrow}
        title={community.title}
        description={community.intro}
      />

      {community.sections.map((section) => (
        <section key={section.slug}>
          <h2 className="mt-12 text-lg font-semibold text-foreground">
            {section.heading}
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">{section.intro}</p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {section.entries.map((entry) => (
              <CommunityCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </section>
      ))}
    </Container>
  );
}
