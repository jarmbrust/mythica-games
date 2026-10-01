import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { BoldMarkup } from './BoldMarkup';

describe('BoldMarkup', () => {
  it('wraps **…** runs in <strong> and drops the markers', () => {
    const html = renderToStaticMarkup(
      <BoldMarkup text="take **WoW:Forever** casually" />,
    );

    expect(html).toContain('<strong>WoW:Forever</strong>');
    expect(html).not.toContain('**');
  });

  it('renders plain text unchanged', () => {
    expect(renderToStaticMarkup(<BoldMarkup text="no markers" />)).toBe(
      'no markers',
    );
  });

  it('renders multiple bold runs', () => {
    const html = renderToStaticMarkup(
      <BoldMarkup text="**one** and **two**" />,
    );

    expect(html).toContain('<strong>one</strong>');
    expect(html).toContain('<strong>two</strong>');
  });

  it('leaves unmatched markers literal', () => {
    const html = renderToStaticMarkup(
      <BoldMarkup text="oops ** unfinished" />,
    );

    expect(html).toBe('oops ** unfinished');
  });
});
