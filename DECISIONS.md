# Technical & Design Decisions — Lost & Found Marketing Page

### Submission for Acdyon Technologies Frontend Engineering Challenge (Part 2 — Premium Home Page)

---

## 1. Why React + TypeScript + Vite over Vanilla HTML/JS or Python?

- **Why React + TypeScript?**: TypeScript guarantees type safety across component props (`SampleItem`, `FeatureCard`, `NavbarProps`) and state transitions, catching data bugs at compile time and eliminating runtime `undefined` crashes.
- **Why Vite over legacy bundlers?**: Instant HMR (Hot Module Replacement) and fast production builds (`tsc && vite build` in 6 seconds).
- **Why interactive multimodal matching over static screenshots?**: Static screenshots fail to communicate the core value of an AI vector product. By building a clickable, real-time match scenario simulator (showing Gemini 1.5 768-dim embeddings, cosine distance scores, and candidate photo comparisons), the user instantly experiences *how* the product works in the first 3 seconds.
- **Why technical proof over testimonial walls?**: The challenge explicitly penalizes fake testimonials, fabricated user counts, or fake partner logos. I leaned heavily into **honest technical transparency**: detailing the real Android Jetpack Compose + Spring Boot 3 + MongoDB Atlas Vector Search stack and benchmark performance numbers (118ms query response) instead of inventing user quotes.

---

## 2. One trade-off made under the time limit & what I'd do with a full week

- **Trade-off made**: The visual scanner and confidence scores in the product-in-action demo run via client-side state simulation rather than communicating with a live MongoDB Vector Search backend.
- **What I'd build with a full week**:
  1. Deploy a live Spring Boot microservice connected to MongoDB Atlas with pre-seeded test embeddings.
  2. Implement drag-and-drop user image upload directly on the marketing page to run live Gemini 1.5 Flash multimodal feature extraction in real-time.
  3. Add an interactive WebGL or Canvas 3D cluster visualizer showing vector space distance embeddings.

---

## 3. AI Tool Usage & Verification

- **AI Assistance**: AI was utilized to accelerate component scaffolding (Tailwind CSS layout primitives, Framer Motion scroll reveal orchestration, and SVG icon pairing).
- **Personal Verification & Modifications**:
  - **Honesty in copy audit**: Reviewed every line of copy across all sections to ensure zero fabricated user counts, fake star ratings, or fake company logos.
  - **Dark mode contrast & theme consistency**: Hand-audited text contrast and background layer values across both light (`#FAF9F6`) and dark (`#0B0F19`) themes to guarantee zero half-dark or low-contrast elements.
  - **Responsive breakpoint validation**: Tested layout integrity at 390px (mobile), 768px (tablet drawer navigation), and 1440px (desktop grid) to ensure zero horizontal scrolling or cut-off elements.
  - **Easter Egg Implementation**: Added an interactive Konami code event listener (`↑ ↑ ↓ ↓ ← → ← → b a`) and DevTools console log badge.
