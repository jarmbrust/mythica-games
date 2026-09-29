import type { Rules } from '@/content/rules';

export function RulesProse({ rules }: { rules: Rules }) {
  return (
    <div className="max-w-3xl">
      <p className="text-base leading-relaxed text-foreground-muted">
        {rules.intro}
      </p>

      <dl className="mt-12 space-y-10">
        {rules.sections.map((section) => (
          <div key={section.heading}>
            <dt className="text-lg font-semibold text-foreground">
              {section.heading}
            </dt>
            <dd className="mt-2 text-base leading-relaxed text-foreground-muted">
              {section.body}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-12 text-sm text-foreground-muted">
        Last updated: {rules.lastUpdated}
      </p>
    </div>
  );
}
