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

export async function sendEnquiry({ name, email, message }: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

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
