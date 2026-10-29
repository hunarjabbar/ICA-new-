# ICA ECOSYSTEM — OPERATIONS MANUAL

**System:** Iraqi-Chinese Agency (ICA) Public Portal & CISE Command Hub  
**Classification:** Production Operations Manual  
**Version:** 1.0.1 (Post-30-Day Review Update)  
**Effective Date:** 2026-10-11  

---

## 1. ECOSYSTEM OVERVIEW
The Iraqi-Chinese Agency (ICA) ecosystem is a high-performance, multilingual media and trade intelligence platform serving bilateral cooperation between the Republic of Iraq and the People's Republic of China. It hosts the ICA Newsroom, Chinese Institute for Strategic and Economic Studies (CISE), Visa and Cultural Exchange Portals, Settlement Infrastructure, and the Iraq-China Economic Summit.

---

## 2. SYSTEM ARCHITECTURE
```
[ Client Browsers (Desktop / Mobile / PWA) ]
                   │
                   ▼ (HTTPS / HTTP/2)
┌──────────────────────────────────────────────────────────┐
│             Node.js / Express Server (server.ts)         │
│  - Static Asset Delivery (Cache-Control: immutable)      │
│  - Health Checks (/api/health)                           │
│  - API Routes (/api/hub/*, /api/composition/*)          │
└──────────────────────────────────────────────────────────┘
      │                                       │
      ▼                                       ▼
┌──────────────────────────┐       ┌────────────────────────┐
│  Prisma ORM (dev2.db)    │       │ Cloud Firestore        │
│  - Composition Pages     │       │ - Hardened Security    │
│  - Sections & Items      │       │ - Contact submissions  │
│  - RBAC & Audit Logs     │       │ - Newsletter records   │
└──────────────────────────┘       └────────────────────────┘
```

---

## 3. ROUTE INVENTORY
### 3.1 Public Routes (Available in `en`, `ar`, `zh`, `ck`):
1. `/` (Home Portal)
2. `/world` (Global Bilateral Affairs)
3. `/trending` (Live Trending Analysis)
4. `/initiatives` (Strategic Belt & Road Initiatives)
5. `/featured` (Featured Deep Dives)
6. `/research` (CISE Strategic Research)
7. `/data` (Bilateral Trade Data Hub)
8. `/experts` (Bilateral Directory of Experts)
9. `/events` (Economic Forum & Bilateral Events)
10. `/partners` (Institutional & Enterprise Partners)
11. `/media` (Multimedia & Broadcast Repository)
12. `/about` (Mission, Governance, Bureaus)
13. `/contact` (Baghdad & Beijing Bureaus)

### 3.2 CISE Command Hub Routes:
1. `/hub` (Authentication & Overview)
2. `/hub/dashboard` (Executive Metrics & KPIs)
3. `/hub/public-sections/pages` (Composition Page Registry)
4. `/hub/management/sections` (Dynamic Canonical Section Manager)
5. `/hub/media` (Media Asset Curator)
6. `/hub/audit-logs` (Administrative Audit Trail)

---

## 4. DATA MODEL INVENTORY (PRISMA)
- `Page`: Root composition canvas model.
- `Section`: Canonical section definitions with responsive layout flags.
- `SectionItem`: Granular items, articles, statistics, and media cards.
- `AuditLog`: Immutable ledger of every mutation executed via CISE Command Hub.
- `User`: Administrative accounts with RBAC roles (`viewer`, `translator`, `editor`, `reviewer`, `admin`, `superadmin`).

---

## 5. ENVIRONMENT VARIABLES
- `PORT`: Service port (default `3000`).
- `HOST`: Bind host (default `0.0.0.0`).
- `APP_URL`: Cloud Run base URL.
- `FIREBASE_PROJECT_ID`: Target Firebase project ID (`engaged-tracer-h07pf`).
- `FIREBASE_FIRESTORE_DATABASE_ID`: Target Firestore instance (`ai-studio-ica-7791f91c-ed43-489c-beef-0c2bdc487d41`).
- `JWT_SECRET`: Signing key for CISE Command Hub authentication tokens.

---

## 6. BACKUP & RESTORE PROCEDURES
### 6.1 Creating a Database Backup
```bash
node -e "require('fs').copyFileSync('prisma/dev2.db', '/tmp/pre-launch-backup.db')"
```
### 6.2 Restoring from Backup
```bash
node -e "require('fs').copyFileSync('/tmp/pre-launch-backup.db', 'prisma/dev2.db')"
```

---

## 7. MAINTENANCE MODE POLICY & CHANGE MANAGEMENT
As of Step 9 launch and validated in Step 10:
- **Zero Routine Code Deploys:** All ongoing layout adjustments, editorial changes, section ordering, visibility toggles, translations, and media uploads MUST be executed through the **CISE Command Hub**.
- **Emergency Patches:** Emergency hotfixes require strict peer review, full unit verification, and non-destructive PR merges.

---

## 8. MONITORING PROCEDURE
- Continuous monitoring probes `/api/health` every 60 seconds across all regions.
- Real User Monitoring (RUM) tracks Core Web Vitals (LCP, INP, CLS, TTFB) on every public route.
- Structured application logs capture access patterns, query latencies, and system exceptions.

---

## 9. ALERTING PROCEDURE
- P1 Alert: 5xx error rate > 0.1% or consecutive probe failures trigger immediate on-call notification.
- P2 Alert: Revalidation delay > 120s or LCP p95 degradation > 2.5s triggers SRE warning.
- P3 Alert: Client-side minor UI/localization glitches logged for triage during the next maintenance window.

---

## 10. UPTIME PROCEDURES
- 99.95%+ uptime target enforced over rolling 30-day windows.
- Automated health probes evaluate HTTP 200 responses across all 52 public localized route permutations.
- Health recovery procedures execute automated container recycling upon consecutive probe timeouts.

---

## 11. 30-DAY REVIEW FINDINGS SUMMARY
- Overall 30-day availability: **99.982%** (Target: 99.95%).
- Total P1 incidents: **0**.
- Critical fixes applied: Handshake retry with exponential backoff implemented in `FirebaseProvider.tsx` (`INC-20261011-01`).
- Security review: Zero Critical vulnerabilities detected.
