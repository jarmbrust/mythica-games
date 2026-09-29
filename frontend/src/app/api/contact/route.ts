import { z } from 'zod';

import { contactSchema } from '@/lib/contact-schema';
import { sendContactEmail } from '@/lib/email';
import { checkRateLimit } from '@/lib/rate-limit';

const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 };

function getClientKey(request: Request): string {
  // Behind Vercel's proxy the first hop of x-forwarded-for is the client IP.
  // Locally the header is absent, so all requests share one bucket.
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() ?? 'local';
}

export async function POST(request: Request) {
  if (!checkRateLimit(getClientKey(request), RATE_LIMIT)) {
    return Response.json(
      {
        ok: false,
        message: 'Too many messages. Please wait a few minutes and try again.',
      },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, message: 'Could not read the request body.' },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    const fieldErrors = z.flattenError(parsed.error).fieldErrors;
    return Response.json(
      {
        ok: false,
        message: 'Please check the highlighted fields.',
        // Only the four visible fields are ever returned. `company` is the
        // honeypot, and naming it in a validation response would tell bot
        // authors exactly how the form is protected.
        fieldErrors: {
          name: fieldErrors.name,
          email: fieldErrors.email,
          subject: fieldErrors.subject,
          message: fieldErrors.message,
        },
      },
      { status: 400 },
    );
  }

  if (parsed.data.company) {
    return Response.json({ ok: true });
  }

  const result = await sendContactEmail(parsed.data);

  if (result.status === 'failed') {
    console.error('[contact] delivery failed:', result.reason);
    return Response.json(
      {
        ok: false,
        message: 'Something went wrong sending your message. Please try again.',
      },
      { status: 502 },
    );
  }

  if (result.status === 'skipped') {
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] email not configured:', result.reason);
      return Response.json(
        {
          ok: false,
          message:
            'Contact form is not configured. Please email us directly instead.',
        },
        { status: 503 },
      );
    }

    console.warn('[contact] skipped in development:', result.reason);
  }

  return Response.json({ ok: true });
}
