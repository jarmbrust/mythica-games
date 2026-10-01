import Link from 'next/link';

import { nav, site } from '@/content/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-foreground"
        >
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex flex-wrap items-center gap-1 sm:gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground-muted transition-colors hover:bg-surface-raised hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
