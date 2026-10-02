import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { resetRateLimits } from '@/lib/rate-limit';

const { sendContactEmailMock } = vi.hoisted(() => ({
  sendContactEmailMock: vi.fn(),
}));

vi.mock('@/lib/email', () => ({
  sendContactEmail: sendContactEmailMock,
}));

import { POST } from './route';

const validBody = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Joining the guild',
  message: 'Hello! I would like to join.',
};

function postRequest(body: unknown): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    resetRateLimits();
    sendContactEmailMock.mockReset();
    sendContactEmailMock.mockResolvedValue({ status: 'sent' });
    vi.stubEnv('NODE_ENV', 'test');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('discards honeypot submissions with a plain 200 and never sends', async () => {
    const response = await POST(
      postRequest({ ...validBody, company: 'Acme Corp' }),
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendContactEmailMock).not.toHaveBeenCalled();
  });

  it('sends valid submissions and returns 200', async () => {
    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(sendContactEmailMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Ada Lovelace',
        email: 'ada@example.com',
      }),
    );
  });

  it('returns 400 naming only the four visible fields — never the honeypot', async () => {
    const response = await POST(
      postRequest({
        name: '',
        email: 'not-an-email',
        subject: '',
        message: '',
        company: 'a'.repeat(201),
      }),
    );

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.fieldErrors.name).toBeDefined();
    expect(body.fieldErrors.email).toBeDefined();
    expect(body.fieldErrors.subject).toBeDefined();
    expect(body.fieldErrors.message).toBeDefined();
    expect('company' in body.fieldErrors).toBe(false);
  });

  it('returns 429 once the rate limit is exceeded', async () => {
    for (let i = 0; i < 5; i += 1) {
      await POST(postRequest(validBody));
    }

    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(429);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.message).toContain('Too many messages');
  });

  it('returns 502 with a generic message when delivery fails', async () => {
    sendContactEmailMock.mockResolvedValue({
      status: 'failed',
      reason: 'boom',
    });

    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(502);
    const body = await response.json();
    expect(body.ok).toBe(false);
    expect(body.message).toContain('Something went wrong');
  });

  it('returns 503 in production when email is not configured', async () => {
    vi.stubEnv('NODE_ENV', 'production');
    sendContactEmailMock.mockResolvedValue({ status: 'skipped', reason: '…' });

    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(503);
    const body = await response.json();
    expect(body.message).toContain('not configured');
  });

  it('returns a plain 200 in development when email is not configured', async () => {
    sendContactEmailMock.mockResolvedValue({ status: 'skipped', reason: '…' });

    const response = await POST(postRequest(validBody));

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it('returns 400 for an unparseable body', async () => {
    const response = await POST(postRequest('not-json'));

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toContain('Could not read');
  });
});
