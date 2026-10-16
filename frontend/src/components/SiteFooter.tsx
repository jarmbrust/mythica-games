import { CopyrightYear } from '@/components/CopyrightYear';
import { site } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-surface-border">
      <div className="mx-auto w-full px-6 py-12">
        <p className="text-sm text-foreground-muted">
          &copy; <CopyrightYear /> {site.name}
        </p>
        <div className="mt-2 space-y-1 text-xs text-foreground-muted">
          {site.legalNote.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
