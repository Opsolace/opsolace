import type { NextRequest } from "next/server";
import { isHoneypotTripped, validateContact } from "@/lib/contact";
import { checkRateLimit, clientIpFrom } from "@/lib/rate-limit";
import { sendEnquiry } from "@/lib/send-enquiry";
import type { ContactResponse } from "@/types/contact";

/** Reads a positive integer env var, falling back when unset or malformed. */
function intEnv(name: string, fallback: number): number {
  const parsed = Number(process.env[name]?.trim());
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

// Defaults suit production. Raise CONTACT_RATE_LIMIT in a preview environment
// to test without waiting out the window.
const RATE_LIMIT = {
  limit: intEnv("CONTACT_RATE_LIMIT", 5),
  windowMs: intEnv("CONTACT_RATE_WINDOW_MS", 10 * 60 * 1000),
};

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, { status, headers });
}

export async function POST(request: NextRequest) {
  const ip = clientIpFrom(request.headers);
  const { allowed, retryAfterSeconds } = checkRateLimit(ip, RATE_LIMIT);

  if (!allowed) {
    return json(
      {
        ok: false,
        error: "rate_limited",
        message: "Too many enquiries from this address. Please try again shortly.",
      },
      429,
      { "Retry-After": String(retryAfterSeconds) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, error: "invalid_json", message: "Expected a JSON body." },
      400,
    );
  }

  // Accept and discard: a bot that gets an error learns how to get past it.
  if (isHoneypotTripped(body)) return json({ ok: true }, 200);

  const result = validateContact(body);
  if (!result.ok) {
    return json(
      {
        ok: false,
        error: "validation_error",
        message: "Please check the highlighted fields.",
        fields: result.errors,
      },
      400,
    );
  }

  try {
    await sendEnquiry(result.data);
  } catch (error) {
    // Logged server-side only; the provider's reason is not the visitor's problem.
    console.error("[contact] delivery failed", error);
    return json(
      {
        ok: false,
        error: "delivery_failed",
        message: "We couldn't send that just now. Please try again or email us directly.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
