import { Resend } from 'resend';

import type { ContactInput } from './contact-schema';

export type SendResult =
  | { status: 'sent' }
  | { status: 'skipped'; reason: string }
  | { status: 'failed'; reason: string };

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtml(input: ContactInput): string {
  const row = (label: string, value: string) => `
      <tr>
        <td style="padding:8px 16px 8px 0;color:#6b7280;white-space:nowrap;vertical-align:top;">${label}</td>
        <td style="padding:8px 0;color:#111827;">${escapeHtml(value)}</td>
      </tr>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f3f4f6;font-family:ui-sans-serif,system-ui,sans-serif;">
    <table role="presentation" style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;padding:24px;">
      <tr>
        <td style="padding-bottom:16px;border-bottom:1px solid #e5e7eb;">
          <h1 style="margin:0;font-size:18px;color:#111827;">New contact form submission</h1>
        </td>
      </tr>
      <tr>
        <td style="padding-top:16px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
            ${row('Name', input.name)}
            ${row('Email', input.email)}
            ${row('Subject', input.subject)}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding-top:16px;">
          <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">Message</p>
          <div style="color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(input.message)}</div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildText(input: ContactInput): string {
  return [
    'New contact form submission',
    '',
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Subject: ${input.subject}`,
    '',
    'Message:',
    input.message,
  ].join('\n');
}

function getRecipients(): string[] {
  return (process.env.CONTACT_TO_EMAIL ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
}

export async function sendContactEmail(
  input: ContactInput,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const recipients = getRecipients();

  if (!apiKey || !from || recipients.length === 0) {
    return {
      status: 'skipped',
      reason: `Missing configuration (apiKey=${Boolean(apiKey)}, from=${Boolean(from)}, recipients=${recipients.length}).`,
    };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: recipients,
    replyTo: input.email,
    subject: `[Mythica Games] ${input.subject}`,
    html: buildHtml(input),
    text: buildText(input),
  });

  if (error) {
    return { status: 'failed', reason: error.message };
  }

  return { status: 'sent' };
}
