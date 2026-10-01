import type { ReactNode } from 'react';

function splitRuns(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((run, index) =>
    index % 2 === 1 ? <strong key={index}>{run}</strong> : run,
  );
}

/**
 * Renders the one inline convention supported by content modules:
 * `**text**` renders as bold. Unmatched markers stay literal.
 */
export function BoldMarkup({ text }: { text: string }) {
  return <>{splitRuns(text)}</>;
}
