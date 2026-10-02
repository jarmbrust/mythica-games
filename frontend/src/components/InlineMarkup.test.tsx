import type { ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { InlineMarkup } from './InlineMarkup';

// Keep the unit test free of the Next runtime: next/link renders an <a> server-side anyway.
vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe('InlineMarkup', () => {
  it('wraps **…** runs in <strong> and drops the markers', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="take **WoW:Forever** casually" />,
    );

    expect(html).toContain('<strong>WoW:Forever</strong>');
    expect(html).not.toContain('**');
  });

  it('renders plain text unchanged', () => {
    expect(renderToStaticMarkup(<InlineMarkup text="no markers" />)).toBe(
      'no markers',
    );
  });

  it('renders multiple bold runs', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="**one** and **two**" />,
    );

    expect(html).toContain('<strong>one</strong>');
    expect(html).toContain('<strong>two</strong>');
  });

  it('leaves unmatched markers literal', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="oops ** unfinished" />,
    );

    expect(html).toBe('oops ** unfinished');
  });

  it('renders an internal link as an anchor to the path', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="see the [Code of Conduct](/rules) page" />,
    );

    // Tolerate any attributes (class, aria-*, etc.) between href and the label.
    expect(html).toMatch(/<a href="\/rules"[^>]*>Code of Conduct<\/a>/);
  });

  it('renders external links with safe rel/target', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="join [our Discord](https://discord.gg/invite)" />,
    );

    expect(html).toContain('href="https://discord.gg/invite"');
    expect(html).toContain('rel="noopener noreferrer"');
    expect(html).toContain('target="_blank"');
  });

  it('supports bold inside a link label', () => {
    const html = renderToStaticMarkup(
      <InlineMarkup text="read [the **rules**](/rules) first" />,
    );

    expect(html).toContain('href="/rules"');
    expect(html).toContain('<strong>rules</strong>');
  });
});
