import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';
import { ContactCards } from '@/components/LinkCard';
import { SectionHeading } from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Ways to contact the officers.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <Container>
      <SectionHeading
        eyebrow="Contact"
        title="Contact the officers"
        description="Discord is the quickest way to get your toons into the guild, just call out when you land on the server that you need an invite into the guild, also, until an officer or GM gives you the adventurer role, you won\'t be able to see or post in a lot of channels."
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
            You can also send a message from here below. It is a great place to
            ask questions about the guild and so forth! Although, don't be shy
            about just jumping into discord and asking there too!
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
