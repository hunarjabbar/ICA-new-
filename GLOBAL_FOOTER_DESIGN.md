# GLOBAL FOOTER DESIGN SPECIFICATION — ICA (IRAQI-CHINESE AGENCY)

**Role:** Lead Systems Architect, Design Systems Architect, Localization Lead, and RBAC Specialist  
**Project:** ICA (Iraqi-Chinese Agency)  
**Document Version:** 1.0.0-final  
**Timestamp:** 2026-10-11T02:20:00Z  

---

## 1. Executive Summary & Architecture
The ICA Global Footer is the single canonical footer component across the entire Iraqi-Chinese Agency ecosystem. It consolidates all legacy and variant footers (`PortalFooter`, `FooterVisionMission`, `HubLoginFooter`, `CiseHubFooterLogin`) into a unified, hot-red, white, and dark-neutral interface. It supports full trilingual and Sorani Kurdish localization (`en`, `ar`, `zh`, `ck`), CSS logical properties for RTL layout mirroring, WCAG 2.1 AA accessibility, and dynamic CRUD management from the CISE Command Hub.

---

## 2. Target Footer Structure (6 Sections)

### SECTION 1 — BRAND ROW
- ICA Wordmark with hot-red branding accent (`#e3001b`)
- Sovereign Tagline & TLS SSL cryptographic handshake verification indicator
- Primary CTA: "Subscribe to the ICA Newsletter"

### SECTION 2 — COLUMNS ROW (6 Desktop / 2 Tablet / 1 Mobile)
1. **About**: About the ICA, Charter & Governance, Partners, Contact
2. **Initiatives**: Summit, Chinese Centre, Visa Centre, Payment Settlement, Insurance, Consultancy, Cultural Exchange, ICA+
3. **Research**: Research Pillars, Publications, Data Hub, Experts
4. **Media**: Newsroom, Live, ICA+, Media Hub
5. **Legal**: Terms of Service, Privacy Policy, AML/KYC, Sanctions Policy, Cookie Policy
6. **Connect**: Newsletter, Social Links, RSS Feeds

### SECTION 3 — NEWSLETTER SIGNUP BAND
- Full-width band on alternate surface (`#111111`) with email input, submit button, state handling (loading, success, error)

### SECTION 4 — SUPPORTING STRIP
- Language switcher (en, ar, zh, ck) on inline-start edge
- Download App card variant on inline-end edge

### SECTION 5 — LEGAL ROW
- Copyright notice, legal compliance links, and back-to-top button

### SECTION 6 — PARTNERS MARQUEE
- Optional compact partner marquee enabled from CISE Command Hub

---

## 3. Data Model & Prisma Schema
```prisma
model FooterConfig {
  id                    String          @id @default(cuid())
  tagline               String          @default("Bilateral Strategic Intelligence & Economic Integration Codex")
  ctaLabel              String          @default("Subscribe to the ICA Newsletter")
  ctaHref               String          @default("#newsletter")
  newsletterEnabled     Boolean         @default(true)
  newsletterHeading     String          @default("Diplomatic Dispatches & Economic Briefs")
  newsletterBody        String          @default("Receive real-time sovereign intelligence, bilateral trade indices, and strategic analysis directly to your secure inbox.")
  newsletterPlaceholder String          @default("Enter official email address...")
  newsletterSubmit      String          @default("Subscribe")
  newsletterSuccess     String          @default("Successfully subscribed to secure bilateral channel.")
  newsletterError       String          @default("Subscription transmission failed. Please verify network credentials.")
  showLanguageSwitcher  Boolean         @default(true)
  showDownloadApp       Boolean         @default(true)
  copyrightText         String          @default("© 2026 Iraqi-Chinese Agency. All Diplomatic Rights Reserved.")
  showBackToTop         Boolean         @default(true)
  partnersEnabled       Boolean         @default(true)
  partnersHeading       String          @default("Accredited Sovereign & Corporate Partners")
  marqueeEnabled        Boolean         @default(true)
  status                String          @default("PUBLISHED")
  createdAt             DateTime        @default(now())
  updatedAt             DateTime        @updatedAt
  columns               FooterColumn[]
}

model FooterColumn {
  id           String        @id @default(cuid())
  configId     String
  heading      String
  displayOrder Int           @default(0)
  status       String        @default("PUBLISHED")
  config       FooterConfig  @relation(fields: [configId], references: [id], onDelete: Cascade)
  links        FooterLink[]
}

model FooterLink {
  id           String        @id @default(cuid())
  columnId     String
  label        String
  href         String
  external     Boolean       @default(false)
  displayOrder Int           @default(0)
  status       String        @default("PUBLISHED")
  column       FooterColumn  @relation(fields: [columnId], references: [id], onDelete: Cascade)
}
```

---

## 4. RBAC & CISE Command Hub CRUD Routes
- **Scopes**: `footer:read`, `footer:write`, `footer:delete`, `footer:publish`
- **Routes**: `/hub/footer`, `/hub/footer/config`, `/hub/footer/columns`, `/hub/footer/links`, `/hub/footer/newsletter`, `/hub/footer/legal`, `/hub/footer/partners`, `/hub/footer/preview`, `/hub/footer/history`, `/hub/footer/audit`

---

## 5. Localization & Accessibility
- Trilingual + Sorani (`en`, `ar`, `zh`, `ck`) under `footer.*` namespace.
- WCAG 2.1 AA contrast, 44x44px touch targets, `prefers-reduced-motion` compliance, CSS logical properties (`start`, `end`, `ps`, `pe`).
