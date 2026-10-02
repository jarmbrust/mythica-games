import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { SectionHeading } from '@/components/SectionHeading';
import { branches, type Branch } from '@/content/branches';

export const metadata: Metadata = {
  title: 'Branches',
  description: 'Mythica on different versions of wow.',
  alternates: { canonical: '/branches' },
};

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <article className="flex flex-col rounded-lg border border-surface-border bg-surface-raised p-6">
      <h3 className="text-lg font-semibold text-foreground">{branch.name}</h3>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
        {branch.summary}
      </p>
    </article>
  );
}

export default function BranchesPage() {
  return (
    <Container>
      <SectionHeading
        eyebrow={branches.eyebrow}
        title={branches.title}
        description={branches.intro}
      />

      <h2 className="mt-12 text-lg font-semibold text-foreground">
        {branches.activeHeading}
      </h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {branches.active.map((branch) => (
          <BranchCard key={branch.slug} branch={branch} />
        ))}
      </div>

      <h2 className="mt-12 text-lg font-semibold text-foreground">
        {branches.formerHeading}
      </h2>
      {/*<p className="mt-2 text-sm text-foreground-muted">
        {branches.formerIntro}
      </p>*/}
      <div className="mt-4 grid gap-6 sm:grid-cols-2">
        {branches.former.map((branch) => (
          <BranchCard key={branch.slug} branch={branch} />
        ))}
      </div>
    </Container>
  );
}
