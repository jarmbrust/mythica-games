import Image from 'next/image';

import { site } from '@/content/site';

/**
 * Fixed, full-viewport background layer. The element is position:fixed with a
 * negative z-index, so the page content scrolls over it while the image stays
 * put. A surface-coloured overlay keeps text legible over brighter artwork.
 */
export function BackgroundImage() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Image
        src={site.backgroundImage}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-surface/60" />
    </div>
  );
}
