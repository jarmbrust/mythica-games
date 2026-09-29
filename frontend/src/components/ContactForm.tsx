'use client';

import { useRef, useState } from 'react';

import type { FieldErrors } from '@/lib/contact-schema';

type Status = 'idle' | 'submitting' | 'success' | 'error';

type ContactApiSuccess = { ok: true };
type ContactApiFailure = {
  ok: false;
  message?: string;
  fieldErrors?: FieldErrors;
};
type ContactApiResponse = ContactApiSuccess | ContactApiFailure;

/**
 * Guards against non-JSON or misshapen bodies (e.g. a proxy's HTML error
 * page) so `JSON.parse` output is checked before we trust its shape.
 */
function isContactApiResponse(value: unknown): value is ContactApiResponse {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  return typeof (value as { ok?: unknown }).ok === 'boolean';
}

const inputClasses =
  'w-full rounded-md border border-surface-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-foreground-muted focus:border-accent focus:outline-none';

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  // Synchronous in-flight guard: state-based checks re-render too slowly to
  // catch a same-tick double submit.
  const submitLock = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitLock.current) {
      return;
    }
    submitLock.current = true;
    setStatus('submitting');
    setMessage('');
    setFieldErrors({});

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          company: data.get('company'),
        }),
      });

      let parsed: unknown;
      try {
        parsed = JSON.parse(await response.text());
      } catch {
        // Non-JSON body (e.g. a proxy's HTML error page) — treat as
        // an unexpected response, not a network failure.
        parsed = undefined;
      }

      if (!isContactApiResponse(parsed)) {
        setStatus('error');
        setMessage(
          'The server returned an unexpected response. Please try again.',
        );
        return;
      }

      // The body's `ok` mirrors the status code: every response from the
      // route handler, including validation failures and 429s, carries it.
      if (!parsed.ok) {
        setStatus('error');
        setMessage(parsed.message ?? 'Something went wrong. Please try again.');
        setFieldErrors(parsed.fieldErrors ?? {});
        return;
      }

      form.reset();
      setStatus('success');
      setMessage('Thanks — your message is on its way.');
    } catch {
      setStatus('error');
      setMessage('Could not reach the server. Please try again.');
    } finally {
      submitLock.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-surface-border bg-surface-raised p-6">
        <p role="status" className="text-sm font-medium text-foreground">
          {message}
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} />
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-foreground"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={`mt-1.5 ${inputClasses}`}
          aria-invalid={Boolean(fieldErrors.name)}
          aria-describedby={fieldErrors.name ? 'name-error' : undefined}
        />
        {fieldErrors.name ? (
          <p id="name-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.name[0]}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className={`mt-1.5 ${inputClasses}`}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? 'email-error' : undefined}
        />
        {fieldErrors.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.email[0]}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-foreground"
        >
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className={`mt-1.5 ${inputClasses}`}
          aria-invalid={Boolean(fieldErrors.subject)}
          aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
        />
        {fieldErrors.subject ? (
          <p id="subject-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.subject[0]}
          </p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`mt-1.5 resize-y ${inputClasses}`}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? 'message-error' : undefined}
        />
        {fieldErrors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-red-400">
            {fieldErrors.message[0]}
          </p>
        ) : null}
      </div>

      {status === 'error' && message ? (
        <p role="alert" className="text-sm text-red-400">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
