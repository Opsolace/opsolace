import type { ContactPayload } from "@/types/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** User content lands inside an HTML email, so every value is escaped. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Headers are newline-delimited; strip breaks before using a value in one. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

/**
 * Reads an env var the way a .env file would.
 *
 * Dashboard fields (Vercel, Railway) store what you type verbatim, so a value
 * pasted as `"Opsolace <hi@example.com>"` keeps its quotes and the provider
 * rejects the send - while the same text in .env.local works, because dotenv
 * strips them. Normalising here makes both sources behave identically.
 */
function readEnv(name: string): string | undefined {
  const raw = process.env[name]?.trim();
  if (!raw) return undefined;
  return raw.replace(/^(["'])([\s\S]*)\1$/, "$2").trim() || undefined;
}

export async function sendEnquiry({ name, email, message }: ContactPayload) {
  const apiKey = readEnv("RESEND_API_KEY");
  const from = readEnv("CONTACT_FROM_EMAIL");
  const to = readEnv("CONTACT_TO_EMAIL");

  if (!apiKey || !from || !to) {
    throw new Error(
      "Contact email is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL and CONTACT_TO_EMAIL.",
    );
  }

  const safeName = singleLine(name);
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `Opsolace enquiry from ${safeName}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(
      `Resend rejected the message (${response.status}): ${detail.slice(0, 300)}`,
    );
  }
}
