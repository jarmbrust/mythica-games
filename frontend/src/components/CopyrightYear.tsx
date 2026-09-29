'use client';

/**
 * The rest of the footer is server-rendered, so a year computed there is
 * frozen at build time and goes stale after New Year until the next deploy.
 * This tiny island computes the visitor's current year instead. The server
 * HTML may briefly differ from the client value (a visit across midnight on
 * New Year's), hence `suppressHydrationWarning`.
 */
export function CopyrightYear() {
  return <time suppressHydrationWarning>{new Date().getFullYear()}</time>;
}
