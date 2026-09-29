import { ImageResponse } from 'next/og';

import { site } from '@/content/site';

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0b0d12',
        padding: 80,
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 76,
          fontWeight: 700,
          color: '#e7eaf0',
          letterSpacing: -2,
        }}
      >
        {site.name}
      </div>
      <div
        style={{
          display: 'flex',
          marginTop: 24,
          fontSize: 32,
          color: '#7c5cff',
        }}
      >
        {site.tagline}
      </div>
    </div>,
    { ...size },
  );
}
