import type { Metadata } from 'next';

import { Container } from '@/components/Container';
import { ContactForm } from '@/components/ContactForm';
import { DiscordServerCard, OfficerContactCard } from '@/components/LinkCard';
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
        description="Discord is the quickest way to contact us or get your toons into the guild! Let us know when you join the Discord what toon(s) you want invited! Also, until an officer or GM gives you the <Adventurer> role, you won't be able to see or post in most of the channels."
      />

      <div className="mt-12 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Message an officer via Discord!
          </h2>
          <div className="mt-4">
            <OfficerContactCard />
          </div>

          <h2 className="mt-8 text-lg font-semibold text-foreground">
            Join our Discord!
          </h2>
          <div className="mt-4">
            <DiscordServerCard />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Send a message
          </h2>
          <p className="mt-2 text-sm text-foreground-muted">
            While we encourage contact via Discord, and require Discord for
            guild membership so people have a place to access announcements,
            organize for group events, and so on, you can also contact us here
            if you would like via email.
          </p>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
