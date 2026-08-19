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
- `StatementSection` - creates an emotional brand pause around lighter work.
- `FinalCtaSection` - presents the contact form and starts an enquiry.
- `SiteFooter` - provides navigation, contact details, and brand closure.

## Code Organization

```text
app/
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

types/
  site.ts               # Shared TypeScript contracts

public/
  Opsolace SVG.svg      # Primary wordmark asset
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
- The contact form opens a prefilled email to `hello.opsolace@outlook.com`.

## Development

Install dependencies and start the local server:

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
```

## Future Extensions

This page can later grow with:

- A real form submission endpoint or CRM integration.
- Case studies and client outcomes.
- Dedicated service detail pages.
- A richer Three.js interaction layer.
- Analytics and conversion tracking.
- CMS-managed content using the existing typed data boundaries.