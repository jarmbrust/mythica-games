import { describe, expect, it } from 'vitest';

import { contactSchema } from './contact-schema';

const valid = {
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  subject: 'Joining the guild',
  message: 'Hello! I would like to join the community.',
};

function parse(input: Record<string, unknown>) {
  return contactSchema.safeParse(input);
}

describe('contactSchema', () => {
  it('accepts a valid submission', () => {
    expect(parse(valid).success).toBe(true);
  });

  it('trims whitespace from text fields', () => {
    const result = parse({
      ...valid,
      name: '  Ada Lovelace  ',
      subject: '  Joining  ',
      message: '  Hello!  ',
    });

    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.name).toBe('Ada Lovelace');
      expect(result.data.subject).toBe('Joining');
      expect(result.data.message).toBe('Hello!');
    }
  });

  describe('name', () => {
    it('rejects a blank name', () => {
      expect(parse({ ...valid, name: '   ' }).success).toBe(false);
    });

    it('rejects a name over 100 characters', () => {
      expect(parse({ ...valid, name: 'a'.repeat(101) }).success).toBe(false);
    });

    it('accepts a name of exactly 100 characters', () => {
      expect(parse({ ...valid, name: 'a'.repeat(100) }).success).toBe(true);
    });
  });

  describe('email', () => {
    it('rejects a missing email', () => {
      expect(parse({ ...valid, email: undefined }).success).toBe(false);
    });

    it('rejects an invalid email', () => {
      expect(parse({ ...valid, email: 'not-an-email' }).success).toBe(false);
    });

    it('rejects an email over 200 characters', () => {
      const longLocalPart = 'a'.repeat(195);
      expect(
        parse({ ...valid, email: `${longLocalPart}@example.com` }).success,
      ).toBe(false);
    });

    it('accepts an email with surrounding whitespace (trimmed before validation)', () => {
      const result = parse({ ...valid, email: '  ada@example.com  ' });

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.email).toBe('ada@example.com');
      }
    });
  });

  describe('subject', () => {
    it('rejects a blank subject', () => {
      expect(parse({ ...valid, subject: '   ' }).success).toBe(false);
    });

    it('rejects a subject over 150 characters', () => {
      expect(parse({ ...valid, subject: 'a'.repeat(151) }).success).toBe(false);
    });

    const controlCharCases: ReadonlyArray<[string, string]> = [
      ['a carriage return', 'hello\rworld'],
      ['a line feed', 'hello\nworld'],
      ['a CRLF pair', 'hello\r\nworld'],
      ['a null byte', 'hello\u0000world'],
    ];

    it.each(controlCharCases)(
      'rejects a subject containing %s',
      (_label, subject) => {
        expect(parse({ ...valid, subject }).success).toBe(false);
      },
    );

    it('names the single-line rule in the error message', () => {
      const result = parse({ ...valid, subject: 'hello\nworld' });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toBe(
          'Please keep the subject to a single line.',
        );
      }
    });
  });

  describe('message', () => {
    it('rejects a blank message', () => {
      expect(parse({ ...valid, message: '   ' }).success).toBe(false);
    });

    it('rejects a message over 5000 characters', () => {
      expect(parse({ ...valid, message: 'a'.repeat(5001) }).success).toBe(
        false,
      );
    });
  });

  describe('company honeypot', () => {
    it('accepts the field being absent', () => {
      expect(parse(valid).success).toBe(true);
    });

    it('accepts an empty company value', () => {
      expect(parse({ ...valid, company: '' }).success).toBe(true);
    });

    it('accepts a company value up to 200 characters (the trap must not fail validation)', () => {
      expect(parse({ ...valid, company: 'a'.repeat(200) }).success).toBe(true);
    });

    it('rejects a company value over 200 characters', () => {
      expect(parse({ ...valid, company: 'a'.repeat(201) }).success).toBe(false);
    });
  });
});
