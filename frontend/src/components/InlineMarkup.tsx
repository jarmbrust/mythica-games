import Link from 'next/link';
import type { ReactNode } from 'react';

const BOLD_PATTERN = /\*\*(.+?)\*\*/g;
// Capture groups put the label and href into the split output as separate parts.
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

function renderBold(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(BOLD_PATTERN)
    .map((part, index) =>
      index % 2 === 1 ? (
        <strong key={`${keyPrefix}-b${index}`}>{part}</strong>
      ) : (
        part
      ),
    );
}

/**
 * Renders the inline conventions supported by content modules:
 * - `**text**` renders as bold
 * - `[label](/path)` renders as a link — internal paths (starting with `/`)
 *   use `next/link`; anything else renders as an external anchor with safe
 *   rel/target.
 *
 * Unmatched markers stay literal. Links cannot span a bold boundary and bold
 * runs cannot contain links.
 */
export function InlineMarkup({ text }: { text: string }) {
  const parts = text.split(LINK_PATTERN);
  const nodes: ReactNode[] = [];

  parts.forEach((part, index) => {
    if (index % 3 === 1) {
      const label = part;
      const href = parts[index + 1];
      if (href === undefined) {
        return;
      }
      const labelNodes = renderBold(label, `${index}-label`);
      nodes.push(
        href.startsWith('/') ? (
          <Link
            key={index}
            href={href}
            className="text-accent transition-colors hover:text-accent-hover"
          >
            {labelNodes}
          </Link>
        ) : (
          <a
            key={index}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className="text-accent transition-colors hover:text-accent-hover"
          >
            {labelNodes}
          </a>
        ),
      );
    } else if (index % 3 === 0) {
      nodes.push(renderBold(part, `${index}-text`));
    }
  });

  return <>{nodes}</>;
}
