import Link from "next/link";

import { nav, site } from "@/content/site";
import { socials } from "@/content/socials";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-surface-border">
      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="font-bold text-foreground">{site.name}</p>
            <p className="mt-1 text-sm text-foreground-muted">{site.tagline}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                rel="noopener noreferrer"
                target="_blank"
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-foreground-muted">
          &copy; {new Date().getFullYear()} {site.name}
        </p>
      </div>
    </footer>
  );
}
