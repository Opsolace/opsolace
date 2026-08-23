import type { ContactPayload, FieldErrors } from "@/types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 10, max: 5000 },
} as const;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Validates an untrusted request body and narrows it to a ContactPayload.
 * Returns field-level errors so the frontend can mark the offending inputs.
 */
export function validateContact(
  body: unknown,
): { ok: true; data: ContactPayload } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const source = (body ?? {}) as Record<string, unknown>;

  const name = asTrimmedString(source.name);
  const email = asTrimmedString(source.email);
  const message = asTrimmedString(source.message);

  if (name.length < LIMITS.name.min) {
    errors.name = "Please tell us your name.";
  } else if (name.length > LIMITS.name.max) {
    errors.name = `Please keep this under ${LIMITS.name.max} characters.`;
  }

  if (!email) {
    errors.email = "Please add an email address.";
  } else if (email.length > LIMITS.email.max || !EMAIL_PATTERN.test(email)) {
    errors.email = "That email address doesn't look right.";
  }

  if (message.length < LIMITS.message.min) {
    errors.message = "Please add a little more detail.";
  } else if (message.length > LIMITS.message.max) {
    errors.message = `Please keep this under ${LIMITS.message.max} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, data: { name, email, message } };
}

/** Bots fill hidden fields humans never see. A filled value means discard. */
export function isHoneypotTripped(body: unknown): boolean {
  const source = (body ?? {}) as Record<string, unknown>;
  return asTrimmedString(source.company).length > 0;
}
