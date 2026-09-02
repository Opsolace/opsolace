# Opsolace

> Operations, at ease.

Opsolace builds custom systems and simplifies messy operational work so businesses can reduce friction, automate repetitive processes, and give their teams time back.

## Page Purpose

The homepage positions Opsolace as a premium operations and systems partner. Its central idea is that good operations should make work feel lighter, not heavier.

The page moves visitors through this story:

1. Operations can be calmer.
2. Growing businesses often depend on workarounds.
3. Opsolace connects systems and improves workflows.
4. Better operations create clarity, time, and room to focus.
5. Visitors can start a conversation through the contact form.

## Page Structure

The homepage is composed in `app/page.tsx` from independent section components:

- `SiteNav` - fixed responsive navigation with a desktop scrolled state and mobile menu.
- `Hero` - primary value proposition with the animated Three.js systems sculpture.
- `PrinciplesStrip` - compact visual statement for less friction, more clarity, and better work.
- `ProblemSection` - explains the operational weight created by growth.
- `StorySection` - explains the relationship between Ops and Solace.
- `ServicesSection` - presents operational systems, workflow automation, custom software, and operations improvement.
- `TransformationSection` - compares operational friction before Opsolace with the clearer state after.
- `ProcessSection` - explains the Understand, Untangle, Build, and Improve process.
- `FinalCtaSection` - presents the contact form and starts an enquiry.
- `SiteFooter` - provides navigation, contact details, and brand closure.

## Code Organization

```text
app/
  api/contact/route.ts  # POST /api/contact - contact form endpoint
  page.tsx              # Homepage composition
  globals.css           # Global tokens, typography, accessibility, motion
  layout.tsx            # Metadata, fonts, root layout
  favicon.ico           # Opsolace favicon
  icon.png              # Source favicon image

components/
  sections/             # One file per homepage section
  ui/                   # Reusable interaction and presentation primitives
  hero-scene.tsx        # Three.js scene
  hero-scene-loader.tsx # Client boundary for the Three.js scene
  site-nav.tsx          # Responsive navigation

lib/
  site-data.ts          # Centralized page content arrays
  contact.ts            # Contact payload validation and honeypot check
  rate-limit.ts         # In-memory per-IP fixed-window limiter
  send-enquiry.ts       # Resend delivery over the REST API

types/
  site.ts               # Shared TypeScript contracts
  contact.ts            # Contact request/response contracts

public/
  Opsolace SVG.svg      # Primary wordmark asset
  openapi.json          # OpenAPI 3.1 spec for the contact endpoint
  api-docs.html         # Swagger UI viewer, served at /api-docs
```

## Visual System

- Navy: `#1F2949`
- Emerald: `#23A875`
- Mint: `#DFF4E9`
- Paper: `#F5F7F3`

The page uses Geist Sans for the main interface and Geist Mono for labels, principles, and operational metadata. Layouts use Tailwind CSS utilities, with global CSS reserved for theme tokens, shared motion, focus styles, and accessibility behavior.

## Interaction Notes

- The navigation is fixed and changes appearance after the page scrolls.
- The mobile menu opens from the navigation button, closes after link selection, and supports the Escape key.
- Section content reveals when it enters the viewport through `ScrollReveal`.
- The hero Three.js sculpture uses a central operational core, orbiting systems, connecting lines, and satellites.
- The Three.js scene and CSS reveals respect `prefers-reduced-motion`.
- The contact form currently opens a prefilled email to `hello.opsolace@outlook.com`. The `POST /api/contact` endpoint below is built and ready, but the form is not yet wired to it - that integration is the frontend team's.

## Contact API

A Route Handler at `app/api/contact/route.ts` that validates a submission, screens for bots,
then delivers the enquiry through Resend's REST API. No email SDK is installed - delivery is a
plain `fetch`.

The endpoint is live and tested. The homepage form does not call it yet; this section is the
contract for whoever wires it up.

### `POST /api/contact`

Request body (JSON):

| Field     | Type   | Required | Notes                                    |
| --------- | ------ | -------- | ---------------------------------------- |
| `name`    | string | yes      | 2-100 characters after trimming          |
| `email`   | string | yes      | Must parse as an email, max 254          |
| `message` | string | yes      | 10-5000 characters after trimming        |
| `company` | string | no       | Honeypot. Leave empty; bots fill it      |

Responses:

| Status | Body                                                                        | Meaning                          |
| ------ | --------------------------------------------------------------------------- | -------------------------------- |
| `200`  | `{ "ok": true }`                                                              | Delivered                        |
| `400`  | `{ "ok": false, "error": "validation_error", "message": ..., "fields": {...} }` | Per-field errors to display      |
| `400`  | `{ "ok": false, "error": "invalid_json", "message": ... }`                     | Body was not valid JSON          |
| `429`  | `{ "ok": false, "error": "rate_limited", "message": ... }`                     | Includes a `Retry-After` header  |
| `502`  | `{ "ok": false, "error": "delivery_failed", "message": ... }`                  | Provider rejected the send       |

`fields` is keyed by input name, so an error can be rendered against the input it belongs to.
Every failure carries a `message` that is safe to show a visitor - provider details are logged
server-side only.

A submission with the honeypot filled returns `200 { "ok": true }` without sending anything, so
a bot cannot learn it was caught.

Requests are limited to 5 per IP per 10 minutes. Override with `CONTACT_RATE_LIMIT` and
`CONTACT_RATE_WINDOW_MS` - useful in a preview environment where you are testing repeatedly and
do not want to wait out the window. The counter lives in server memory, so on a serverless host
each instance counts separately and the real limit is looser. That is enough for drive-by spam;
swap in a shared store (Upstash, Redis) if it needs to be a guarantee.

When testing, leave `company` out of the request entirely. It is the honeypot: any non-empty
value returns `200 {"ok": true}` while discarding the enquiry, which looks like success but
sends no email.

### Interactive reference (Swagger)

With the dev server running, open **http://localhost:3000/api-docs** for a Swagger UI page
backed by the OpenAPI 3.1 spec at `/openapi.json`. Use **Try it out** to call the endpoint
against the running origin - it ships with three ready-made request examples: a valid enquiry,
one that trips every validation rule, and one with the honeypot filled.

Note that **Try it out** sends real enquiries, and the 5-per-10-minutes rate limit applies.
Restart the dev server to reset the counter.

Source files: `public/openapi.json` (spec) and `public/api-docs.html` (viewer). The clean
`/api-docs` path comes from a rewrite in `next.config.ts`. The page is marked `noindex`.

Example:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada Lovelace","email":"ada@example.com","message":"We need help untangling our ops."}'
```

## Development

Install dependencies and start the local server:

```bash
npm install
cp .env.example .env.local   # then fill in the Resend values
npm run dev
```

The contact endpoint needs three environment variables. Without them it returns `502
delivery_failed` and logs the reason:

| Variable             | Purpose                                                         |
| -------------------- | --------------------------------------------------------------- |
| `RESEND_API_KEY`     | API key from https://resend.com/api-keys                         |
| `CONTACT_FROM_EMAIL` | Sender, on a domain verified in Resend                           |
| `CONTACT_TO_EMAIL`   | Inbox that receives enquiries                                    |

Until the sending domain is verified, `Opsolace <onboarding@resend.dev>` works as
`CONTACT_FROM_EMAIL` for testing. These must also be set on the deployment host - `.env.local`
is not deployed, and env changes on most hosts only take effect on the next deploy.

`CONTACT_FROM_EMAIL` takes either `email@example.com` or `Name <email@example.com>`. Surrounding
quotes and stray whitespace are stripped before use, so a value pasted into a host dashboard as
`"Opsolace <hello@opsolace.com>"` behaves the same as the unquoted form. A `.env` file strips
quotes itself; dashboard fields do not, and the provider rejects the quoted address.

Useful checks:

```bash
npm run lint
npm run build
```

## Future Extensions

This page can later grow with:

- CRM integration or persistence for submissions.
- Case studies and client outcomes.
- Dedicated service detail pages.
- A richer Three.js interaction layer.
- A shared-store rate limiter and CAPTCHA if spam volume grows.
- Analytics and conversion tracking.
- CMS-managed content using the existing typed data boundaries.