# Media Hub & ICA+ Adaptation & Architectural Contract

**Ecosystem Authority**: Iraqi-Chinese Agency (ICA)  
**Governing Control Surface**: CISE Command Hub  
**Verticals Covered**: Media Hub (`/media/*`), ICA+ (`/ica-plus/*`)  
**Standard**: Hot-Red White-Black Palette (`#e3001b`, `#ffffff`, `#0a0a0a`), WCAG 2.1 AA, CSS Logical Properties, Quadlingual (EN, AR, ZH, CKB)

---

## 1. Terminology (Binding)
1. The administrative control surface is referred to exclusively as the **"CISE Command Hub"**.
2. The media aggregation vertical is referred to exclusively as the **"Media Hub"**.
3. The premium membership vertical is referred to exclusively as **"ICA+"**.

---

## 2. Core Responsive & Accessibility Contracts

### 2.1 Container & Layout Contract
- Maximum content measure: `max-w-7xl` (1280px) for general aggregators; `68ch` to `75ch` for long-form editorial views.
- Gutters: Fluid horizontal padding `px-4 sm:px-6 lg:px-8`.
- Zero horizontal scroll: `overflow-x: hidden` enforced on page wrapper boundaries; all flex children with potential long text enforce `min-w-0`.

### 2.2 Typography Scale (CSS Rem-Based)
- Eyebrow / Overline: `text-[10px]` to `text-xs font-bold uppercase tracking-widest text-brand-800`.
- Page Title: `text-2xl sm:text-3xl md:text-4xl font-black text-ink-900 tracking-tight`.
- Section Heading: `text-xl sm:text-2xl font-black text-ink-900 tracking-tight`.
- Body Copy: `text-sm sm:text-base text-neutral-600 leading-relaxed font-normal`.
- Microcopy / Badges: `text-[10px]` to `text-xs font-bold`.
- Strict ban on fixed pixel font sizes in dynamic layouts.

### 2.3 Hot-Red Palette Tokens
- Brand Primary: `#e3001b` (`var(--color-brand-800)`, Tailwind `bg-brand-800`)
- Brand Dark Accent: `#b30016` (`var(--color-brand-900)`)
- Brand Light Wash: `#fff5f5` (`var(--color-brand-50)`)
- Surface Light: `#ffffff` (`var(--color-paper-light)`)
- Surface Dark: `#0a0a0a` / `#121212` (`var(--color-paper-dark)`)
- Neutral Borders: `#e5e7eb` / `#262626`

### 2.4 Logical Properties & RTL Mirroring
- Use `ps-*` and `pe-*` for horizontal padding; `ms-*` and `me-*` for horizontal margin.
- Use `start-0` and `end-0` for absolute/fixed positioning.
- Use `border-s-*` and `border-e-*` for directional borders.
- Sorani Kurdish (`ckb`/`ck`) and Arabic (`ar`) automatically mirror via `dir="rtl"`.

### 2.5 Mobile Touch Targets
- All interactive buttons, tabs, links, audio controls, and paywall actions enforce a minimum bounding box of **44×44px** on mobile viewports.

---

## 3. Media Hub Specific Contracts

### 3.1 Aggregation Contract
- **Sources**: Aggregates dispatches from the ICA Newsroom, broadcasts from the Live Portal, and feature articles from the Public Portal.
- **Deduplication**: Enforced via canonical slug / URI matching.
- **Ordering**: Strict descending chronological sort by `publishDate` or `publishedAt`.
- **Filtering**: Real-time faceted filtering by Media Type (`video`, `podcast`, `infographic`, `documentary`, `article`), Category, and Language (`en`, `ar`, `zh`, `ck`).
- **Search**: Faceted full-text keyword matching across titles and descriptions in all four languages.
- **Provenance Badges**: Every aggregated card must display its source vertical (e.g., `ICA Newsroom`, `Live Portal`, `Public Portal`).

### 3.2 Media Card Contract
- Responsive grid: 1 column on mobile (<640px), 2 columns on tablet (640-1023px), 3 or 4 columns on desktop (>=1024px).
- Fixed aspect ratio for posters: `16:9` (`aspect-video`) with `object-cover`.
- Bottom-pinned actions to guarantee equal-height cards across uneven titles.
- Chips and badges for duration, source vertical, and publish date.

### 3.3 Podcast Player Contract
- Fully responsive persistent or embedded audio player bar.
- Controls: Play/Pause, Seek bar with elapsed/total time, Volume slider, Mute toggle, Speed rate selector (0.75x, 1x, 1.25x, 1.5x, 2x), and Download link.
- Keyboard accessible: Space to toggle play/pause, Arrow keys for seek and volume.
- Minimum 44×44px hit-box per button on mobile.

### 3.4 Photo Gallery & Lightbox Contract
- Fluid masonry or responsive thumbnail grid.
- Fullscreen modal lightbox with keyboard arrow navigation, Escape to close, and touch-swipe gestures.
- Multilingual captions rendered in the active locale.

### 3.5 Infographic Viewer Contract
- High-definition interactive SVG/raster container.
- Pan, zoom controls (+, -, reset), fullscreen modal trigger, and direct raw export.

---

## 4. ICA+ Specific Contracts

### 4.1 Paywall Contract
- **Unauthenticated Users**: Content blurred or truncated at 200 words; paywall modal/banner overlay with login CTA and tier upgrade button.
- **Free-Tier Users**: Content preview visible; upgrade banner displayed with benefit differentiation.
- **Premium Members (Diplomatic / Sovereign Tiers)**: Paywall disabled; full un-gated content rendered with raw export buttons and analytical tooling.
- Seamless RTL layout and keyboard accessibility for all paywall gates.

### 4.2 Member Gating Contract
- Client and server-side RBAC verification via authentication token and user role (`DIPLOMATIC_SCHOLAR`, `SOVEREIGN_EXECUTIVE`, `ADMIN`, `SUPERADMIN`).
- Graceful fallbacks and clear upgrade path upon 403 Forbidden.

### 4.3 Membership Tier Contract
- Responsive 2-column or 3-column tier comparison grid.
- Prominent highlight for recommended tier (`Sovereign Executive`).
- Transparent monthly and annual billing toggles with discount tags.
- Detailed quadlingual feature checklists.

### 4.4 Billing & Invoicing Contract
- Responsive billing management panel: active plan, next charge date, payment method details.
- Self-service invoice downloads (PDF) and plan upgrade/cancellation flows.

### 4.5 Member Dashboard Contract
- Summary cards: Active Membership Tier, Digital ID clearance badge, Expired/Renewal countdown.
- Reading history, saved intelligence dispatches, and exclusive CIPS/mBridge data export feeds.

---

## 5. CISE Command Hub Synchronization Contract
- Every Media Hub item and ICA+ tier/member record is fully CRUD-manageable inside the **CISE Command Hub** (`/hub/management`).
- Real-time cache revalidation: Mutations propagate immediately to public viewports without requiring application rebuilds.
- Immutable audit logging: Every administrative creation, modification, soft-delete, and status toggle records actor credentials, timestamp, and delta.
