import { statusLabels, type Game } from '@/content/games';

const statusStyles: Record<Game['status'], string> = {
  live: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300',
  'in-development': 'border-amber-500/40 bg-amber-500/10 text-amber-300',
  archived: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-400',
};

export function GameCard({ game }: { game: Game }) {
  return (
    <article className="flex flex-col rounded-lg border border-surface-border bg-surface-raised p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-foreground">{game.title}</h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[game.status]}`}
        >
          {statusLabels[game.status]}
        </span>
      </div>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground-muted">
        {game.summary}
      </p>

      {game.links.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-4">
          {game.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
