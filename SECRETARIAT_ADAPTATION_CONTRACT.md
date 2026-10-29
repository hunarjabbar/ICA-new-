# ICA Secretariat Command Hub Adaptation Contract

**Administrative Context**: Section of the CISE Command Hub  
**Date**: 2026-10-14  
**Status**: APPROVED & BINDING  

---

## 1. Scope & Ecosystem Architecture
The ICA Secretariat Command Hub is the administrative surface that lives **INSIDE** the CISE Command Hub. It governs the Iraqi-Chinese Agency sovereign plenary:
- Strategic Directives & Bilateral Content
- Eight Flagship Bilateral Initiatives
- Media Library & Broadcast Syndicates
- Institutional Subscribers & Ledger Records
- Sovereign Forms & Foreign Diplomatic Inquiries
- RBAC Scope Management
- Audit Trail & Cryptographic Records
- Plenipotentiary System Settings

---

## 2. Shared Canonical Contracts

### 2.1 Container & Grid Contract
- Fluid width with responsive max constraint (`max-w-7xl mx-auto`).
- Mobile padding: `p-4 sm:p-6 lg:p-10`.
- KPI grid contract:
  - 320px–639px: Single column (`grid-cols-1`) or `grid-cols-2` with min 140px card width.
  - 640px–1023px: 2 columns (`sm:grid-cols-2`).
  - 1024px+: 4 columns (`lg:grid-cols-4`).
- No horizontal scroll: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.

### 2.2 Typography Scale
- Root 16px baseline.
- Headings: `font-serif text-2xl sm:text-3xl font-black text-neutral-900`.
- Section tags: `text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider`.
- Body text: `text-xs sm:text-sm text-neutral-600`.
- Metric numbers: `text-2xl sm:text-3xl font-black text-neutral-900`.

### 2.3 Card Contract
- Surface: `.ica-card-interactive` or `bg-white border border-[#E5E7EB] rounded-2xl shadow-xs`.
- Touch target: Every interactive button or link must have a minimum bounding box of 44×44px on mobile devices.
- CTA placement: Flex container with `flex-wrap` and `gap-3`.

### 2.4 Logical CSS Properties & RTL
- Physical directional properties (`margin-left`, `margin-right`, `padding-left`, `padding-right`, `border-left`, `border-right`, `text-align: left/right`) are strictly replaced with:
  - `ms-` / `me-` (margin inline start/end)
  - `ps-` / `pe-` (padding inline start/end)
  - `border-s` / `border-e` (border inline start/end)
  - `text-start` / `text-end`
- Direction container `dir={isRtl ? 'rtl' : 'ltr'}`.

### 2.5 Palette Contract
- Hot-red: `#DC2626` / `var(--color-brand-800)`
- White: `#FFFFFF`
- Black: `#000000` / `#0A0A0C`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`
- Text Muted: `#4B5563`

### 2.6 Motion & Accessibility Contract
- WCAG 2.1 AA compliance: contrast ratio >= 4.5:1.
- All animations wrapped with `prefers-reduced-motion` guards.
- Screen reader ARIA tags on all toggle buttons, dialogs, and tables.
