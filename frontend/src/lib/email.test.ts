import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ContactInput } from './contact-schema';

const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));

vi.mock('resend', () => {
  // Declared inside the factory on purpose: vi.mock factories are hoisted to
  // the top of the file, so a top-level class here would be in the temporal
  // dead zone when the factory runs. The factory executes lazily when
  // `resend` is first imported, and everything inside it evaluates normally.
  class MockResend {
    emails = { send: sendMock };
  }

  return { Resend: MockResend };
});

import { sendContactEmail } from './email';

const input: ContactInput = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Joining the guild',
  message: 'Hello! I would like to join.',
};

function stubConfig(): void {
  vi.stubEnv('RESEND_API_KEY', 're_test_key');
  vi.stubEnv('CONTACT_FROM_EMAIL', 'officers@send.mythica.games');
  vi.stubEnv(
    'CONTACT_TO_EMAIL',
    'officer-one@example.com, officer-two@example.com',
  );
}

describe('sendContactEmail', () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: 'email-1' }, error: null });
    stubConfig();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('skips and does not send when the API key is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');

    const result = await sendContactEmail(input);

    expect(result).toEqual({
      status: 'skipped',
      reason: expect.stringContaining('Missing configuration'),
    });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('skips and does not send when there are no recipients', async () => {
    vi.stubEnv('CONTACT_TO_EMAIL', '  ');

    const result = await sendContactEmail(input);

    expect(result.status).toBe('skipped');
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('sends with the correct envelope', async () => {
    const result = await sendContactEmail(input);

    expect(result).toEqual({ status: 'sent' });
    expect(sendMock).toHaveBeenCalledTimes(1);

    const payload = sendMock.mock.calls[0][0];
    expect(payload.from).toBe('officers@send.mythica.games');
    expect(payload.to).toEqual([
      'officer-one@example.com',
      'officer-two@example.com',
    ]);
    expect(payload.replyTo).toBe('ada@example.com');
    expect(payload.subject).toBe('[Mythica Games] Joining the guild');
    expect(payload.text).toContain('Hello! I would like to join.');
  });

  it('HTML-escapes every user-supplied value', async () => {
    const hostile: ContactInput = {
      name: '<script>alert("x")</script>',
      email: 'ada@example.com',
      subject: "subject's <&>",
      message: 'message with <img src=x onerror=alert(1)> & quotes',
    };

    const result = await sendContactEmail(hostile);

    expect(result).toEqual({ status: 'sent' });
    const html = sendMock.mock.calls[0][0].html;
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
    expect(html).toContain('&quot;');
    expect(html).toContain('&#39;');
    expect(html).toContain('&amp;');
  });

  it('reports a failure when Resend returns an error', async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { message: 'Invalid API key' },
    });

    const result = await sendContactEmail(input);

    expect(result).toEqual({ status: 'failed', reason: 'Invalid API key' });
  });
});
