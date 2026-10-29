# ICA Newsroom Adaptation Contract

**Administrative Control Surface**: CISE Command Hub  
**Date**: 2026-10-14  
**Status**: APPROVED & BINDING  

---

## 1. Scope & Ecosystem Architecture
The ICA Newsroom is the sovereign editorial vertical of the Iraqi-Chinese Agency. Its administrative control surface is integrated **INSIDE** the CISE Command Hub.

The ICA Newsroom comprises:
- Public Newsroom Portal (`/:lang/newsroom/*`)
  - Newsroom Landing Page (`/:lang/newsroom`)
  - Full-Text Article Dossier (`/:lang/newsroom/:slug`)
  - Bilateral Category & Desk Dossiers (`/:lang/newsroom/category/:category`)
  - Subject Tag Taxonomy (`/:lang/newsroom/tag/:tag`)
  - Accredited Correspondents (`/:lang/newsroom/author/:author`)
  - Chronological Archive (`/:lang/newsroom/archive`)
  - Full-Text Search Ledger (`/:lang/newsroom/search`)
  - Syndication Feeds (`/:lang/newsroom/feed/:feedType` - RSS 2.0, Atom 1.0, JSON Feed 1.1)
  - Ecosystem Sitemap (`/:lang/newsroom/sitemap`)
- CISE Command Hub Editorial Desk (`/:lang/newsroom/hub/*` and `/:lang/hub/management`)
  - Editorial Overview & Metrics Dashboard
  - Articles & Dispatches CRUD
  - Bilateral Desks & Categories CRUD
  - Subject Tags CRUD
  - Accredited Correspondents CRUD
  - Wire Ticker & Breaking Communiqués CRUD
  - Syndication Feeds & Revalidation Control
  - Readership Analytics & Syndication Telemetry
  - Editorial Policies & Settings

---

## 2. Shared Canonical Contracts

### 2.1 Container & Grid Contract
- Fluid width with responsive max constraint (`max-w-7xl mx-auto`).
- Mobile padding: `p-4 sm:p-6 lg:p-8`.
- Article reading measure: `max-w-3xl` or `max-inline-size: 68ch` for optimal long-form readability.
- News card grid contract:
  - 320px–639px: Single column (`grid-cols-1`).
  - 640px–1023px: 2 columns (`sm:grid-cols-2`).
  - 1024px+: 3 or 4 columns (`lg:grid-cols-3` or `xl:grid-cols-4`).
- Horizontal overflow rule: Strict `document.documentElement.scrollWidth <= document.documentElement.clientWidth` across all viewports from 320px to 2560px.

### 2.2 Typography Scale & Reading Measure
- Root 16px baseline.
- Editorial headline scale: `font-serif text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight leading-tight`.
- Subheadings: `font-serif text-xl sm:text-2xl font-bold text-neutral-900`.
- Section tags: `text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider`.
- Lead excerpts: `text-sm sm:text-base text-neutral-700 leading-relaxed`.
- Body text: `text-sm sm:text-base text-neutral-800 leading-relaxed font-sans`.
- Article body typography: strictly formatted with reading measure (`max-w-prose` / `max-inline-size: 68ch`), high-contrast body text, and styled pull-quotes.

### 2.3 Card Contract
- Surface: `.ica-card-interactive` or `bg-white border border-[#E5E7EB] rounded-2xl shadow-xs transition-all hover:border-[var(--color-brand-800)]`.
- Touch target: Every interactive button, link, and tab must satisfy a minimum bounding box of 44×44px on mobile devices.
- Badge system: Consistent editorial badges for Breaking News (`bg-[var(--color-brand-800)] text-white`), Category desks (`bg-[#FEE2E2] text-[#991B1B]`), and Status (`bg-emerald-100 text-emerald-800`).

### 2.4 Logical CSS Properties & RTL
- Physical directional properties are strictly replaced with:
  - `ms-` / `me-` (margin inline start/end)
  - `ps-` / `pe-` (padding inline start/end)
  - `border-s` / `border-e` (border inline start/end)
  - `text-start` / `text-end`
  - `start-0` / `end-0`
- Direction container `dir={isRtl ? 'rtl' : 'ltr'}`.
- Chevron and arrow icons: conditionally flipped with `rtl:rotate-180`.

### 2.5 Palette Contract
- Hot-red: `#DC2626` / `var(--color-brand-800)`
- White: `#FFFFFF`
- Black: `#000000` / `#0A0A0C`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`
- Text Muted: `#4B5563`
- Accent Crimson: `#991B1B`

### 2.6 Localization & Fallback Discipline
- Supported locales: English (`en`), Arabic (`ar`), Chinese (`zh`), Central Kurdish (`ck` / `ckb`).
- Zero untranslated English fallbacks across all UI chrome, filters, buttons, badges, table headers, and system messages.
- Proper nouns (e.g. "ICA", "CISE Command Hub", "Baghdad", "Beijing", "Erbil", "RSS", "Atom", "JSON") permitted.

### 2.7 Full CRUD Integration with CISE Command Hub
- Every content type (Articles, Categories, Tags, Authors, Ticker items, Feeds) is manageable from both the dedicated Newsroom Hub section (`/:lang/newsroom/hub/*`) and the unified CISE Command Hub section (`/:lang/hub/management`).
- Mutations propagate through REST API endpoints (`/api/hub/newsroom/*`) with RBAC enforcement (`ADMIN`, `EDITOR`).
- Live revalidation triggers push updates to RSS/Atom/JSON feeds and public views.
