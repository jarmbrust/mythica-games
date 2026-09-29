import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { RulesProse } from '@/components/RulesProse';
import { rules } from '@/content/rules';

export const metadata: Metadata = {
  title: rules.title,
  description:
    'TODO: one-sentence description of the Mythica Games code of conduct for search results.',
  alternates: { canonical: '/rules' },
};

export default function RulesPage() {
  return (
    <Container>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {rules.title}
      </h1>
      <div className="mt-8">
        <RulesProse rules={rules} />
      </div>
    </Container>
  );
}
