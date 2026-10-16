import type { ReactNode } from 'react';

import { discordInviteCard, officerDiscordCard } from '@/content/socials';

function Card({
  icon,
  label,
  value,
  details,
  href,
}: {
  icon: ReactNode;
  label: string;
  value?: string;
  details?: readonly string[];
  href: string;
}) {
  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      className="group flex items-start gap-4 rounded-lg border border-surface-border bg-surface-raised p-5 transition-colors hover:border-accent"
    >
      <span className="mt-0.5 shrink-0 text-accent">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-foreground">
          {label}
        </span>
        {value ? (
          <span className="mt-1 block wrap-break-word text-sm text-foreground-muted group-hover:text-foreground">
            {value}
          </span>
        ) : null}
        {details ? (
          <ul className="mt-1 space-y-1 pl-3">
            {details.map((id) => (
              <li
                key={id}
                className="marker:text-accent marker:content-['▸'] text-sm text-foreground-muted group-hover:text-foreground"
              >
                {id}
              </li>
            ))}
          </ul>
        ) : null}
      </span>
    </a>
  );
}

export function OfficerContactCard() {
  return (
    <Card
      icon={<ChatBubbleIcon />}
      label={officerDiscordCard.label}
      href={officerDiscordCard.href}
      details={officerDiscordCard.ids}
    />
  );
}

export function DiscordServerCard() {
  return (
    <Card
      icon={<ChatBubbleIcon />}
      label={discordInviteCard.label}
      value="Join the community server"
      href={discordInviteCard.href}
    />
  );
}

function ChatBubbleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-6 w-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
      />
    </svg>
  );
}
