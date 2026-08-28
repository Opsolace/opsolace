import type { ContactPayload, ContactResponse, FieldErrors } from "@/types/contact";
import { API_BASE_URL } from ".";

/**
 * Expected API failures are returned, not thrown - throwing an Error collapses
 * the response to a single string and loses the per-field detail the UI needs.
 * Only the message and fields ever reach a visitor.
 */
/**
 * What the browser sends. `company` is the honeypot - it is part of the request
 * but never part of the validated payload the server works with.
 */
export type ContactSubmission = ContactPayload & { company?: string };

export type ContactResult =
  | { ok: true }
  | { ok: false; message: string; fields: FieldErrors };

const UNREACHABLE =
  "We couldn't reach the server. Please check your connection and try again.";

const UNEXPECTED =
  "Something went wrong on our end. Please try again, or email us directly at hello.opsolace@outlook.com.";

/** Turns the Retry-After header into something a person can act on. */
function rateLimitMessage(retryAfter: string | null): string {
  const seconds = Number(retryAfter);
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "Too many enquiries from this connection. Please try again shortly.";
  }
  const minutes = Math.ceil(seconds / 60);
  const unit = minutes === 1 ? "minute" : "minutes";
  return `Too many enquiries from this connection. Please try again in about ${minutes} ${unit}.`;
}

export async function sendContactEnquiry(
  payload: ContactSubmission,
): Promise<ContactResult> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Offline, DNS failure, request blocked - never reached the server.
    return { ok: false, message: UNREACHABLE, fields: {} };
  }

  let data: ContactResponse | null = null;
  try {
    data = (await response.json()) as ContactResponse;
  } catch {
    data = null;
  }

  if (response.ok && data?.ok) return { ok: true };

  if (response.status === 429) {
    return {
      ok: false,
      message: rateLimitMessage(response.headers.get("Retry-After")),
      fields: {},
    };
  }

  // The API sends a message written for visitors; prefer it over anything local.
  if (data && data.ok === false) {
    return {
      ok: false,
      message: data.message || UNEXPECTED,
      fields: data.fields ?? {},
    };
  }

  return { ok: false, message: UNEXPECTED, fields: {} };
}
