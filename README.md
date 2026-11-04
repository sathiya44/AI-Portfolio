# Sathiya Sankar — Personal Engineering Portfolio

A personal portfolio web application for **Sathiya Sankar**, Full-Stack Engineer, featuring an integrated client-side AI technical assistant grounded in his verified ATS resume.

Audience: Engineering managers, founders, and senior engineers.  
Primary purpose: Prove that Sathiya builds production-grade, reliable web systems and LLM integrations quickly and credibly.

---

## Design Principles

- **No neon gimmicks**: Clean, authoritative, warm charcoal (`#111215`) background with bone-white text (`#f3f3f0`) and subtle structural rules (`#23252c`).
- **Two distinct typefaces**:
  - **Newsreader**: Editorial serif for headlines and architectural statements.
  - **IBM Plex Sans**: High-clarity technical sans for body copy, code, and tabular metrics.
- **Lines under 75 characters**: Constrained to `max-w-prose` (`68ch`) for sustained reading comfort.
- **One bold typographic moment**: The opening premise in the hero; everything else is restrained, quiet, and legible.
- **Varied scale and density**:
  - Asymmetric deep architecture case studies for flagship systems (**Karyaa** & **Herbet Studio**).
  - Comparative grid for secondary systems (**Post Analysis** & **Menuval**).
  - Chronological ledger for work experience (**Herbet Agency** & **Infinite Bull's Eye**).
  - Dense categorized inventory for skills and education (**MCA** & **BSc Computer Science**).
- **Plain, first-person copy**: Names what was built, for whom, and the measured outcome.
- **Single page-load motion moment**: Subtle entrance on load; motion otherwise only occurs in direct response to user interaction (drawer / modal toggles), with full `prefers-reduced-motion` compliance.
- **Accessibility**: High-contrast text exceeding AA/AAA standards, visible keyboard `:focus-visible` rings, and responsive down to 360px.

---

## Client-Side AI Assistant

- **Grounded Persona**: Direct client-side calls to Google Gemini API (`gemini-3.8-flash` / `gemini-2.5-flash`), strictly instructed on the verified ATS resume document (`src/data/atsResumeReference.ts`).
- **Heuristic Demo Fallback**: When no API key is configured, an integrated local heuristic engine answers common recruiter inquiries instantly.
- **Privacy & Safety**: Client-side storage of API keys in `localStorage`, low temperature (`0.25`), and strict context bounds to eliminate hallucinations.

---

## Development

```bash
# Install dependencies
pnpm install

# Start local development server
pnpm dev

# Typecheck and build production distribution
pnpm build
pnpm preview
```
