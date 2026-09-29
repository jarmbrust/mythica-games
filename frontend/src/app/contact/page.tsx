import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';
import { ContactCards } from '@/components/LinkCard';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'TODO: one-sentence description of how to reach the Mythica Games team for search results.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Container>
      <SectionHeading
        eyebrow="Contact"
        title="Get in touch"
        description="TODO: one or two sentences about what happens after someone reaches out, and what to expect."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Other ways to reach us
          </h2>
          <div className="mt-4">
            <ContactCards />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            TODO: note on response time, and whether Discord is faster.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
