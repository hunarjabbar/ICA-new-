# ICA ECOSYSTEM — MAINTENANCE PROGRAM (DAY 31 ONWARD)

**System:** Iraqi-Chinese Agency (ICA) Public Portal & CISE Command Hub  
**Effective Date:** 2026-10-11 (Day 31 Onward)  
**Authority:** Lead Site Reliability Engineer & Post-Launch Review Architect  
**Classification:** Operational Governance & Maintenance Specification  

---

## 1. PURPOSE & GOVERNANCE PRINCIPLES
Following the successful completion of the initial 30-day monitoring window, the Iraqi-Chinese Agency (ICA) ecosystem officially enters steady-state **Maintenance Mode**. 

### Core Governance Rules:
1. **Administrative Authority:** All routine content publications, layout configurations, section reordering, visibility adjustments, and localized copy updates MUST be executed exclusively through the **CISE Command Hub**.
2. **Zero Code Deployments for Content:** Direct application code pushes are strictly reserved for critical security patches, major framework updates, or infrastructure remediations.
3. **Non-Destructive Principle:** All scheduled maintenance operations must maintain 100% backward compatibility with established Prisma data schemas and localized assets.

---

## 2. MAINTENANCE CADENCE MATRIX

| Activity | Frequency | Responsible Role | SLA / Target |
|---|---|---|---|
| **Uptime & Health Probing** | Continuous (60s) | Automated Probing Engine | 99.95%+ Monthly Availability |
| **Error Log Review** | Daily (09:00 UTC) | On-Call SRE | Zero unhandled 5xx exceptions |
| **Performance (RUM) Review** | Weekly (Mondays) | Performance Engineer | LCP < 1.2s, INP < 200ms, CLS < 0.1 |
| **Database Integrity Backup** | Daily Automated | Systems Automation | 100% backup completion verification |
| **Disaster Recovery Drill** | Monthly (1st Tuesday) | Lead SRE | Cold recovery < 15 minutes |
| **Dependency Security Audit** | Monthly (15th) | Security Auditor | Zero Critical / High CVEs |
| **Content & Media Review** | Monthly (Last Friday) | Editorial Director | Visual & metadata currency check |
| **Accessibility (Axe) Audit** | Quarterly | Accessibility Specialist | 0 Critical, 0 Serious violations |
| **Localization Completeness** | Quarterly | Localization Lead | 100% 4-locale parity (en, ar, zh, ck) |
| **Cost & Cloud Resource Audit** | Quarterly | FinOps / Cloud Architect | Usage within planned budget envelopes |
| **Annual Architecture Review** | Annually | Executive Engineering | Ecosystem roadmap alignment |

---

## 3. BACKUP AND DISASTER RECOVERY POLICY
1. **Daily Snapshot:** The primary SQLite database (`prisma/dev2.db`) is backed up daily to isolated cloud storage.
2. **Retention Policy:** 30 daily rolling backups, 12 monthly archival snapshots.
3. **Restore Verification:** Monthly restore drills confirm schema validation and bitwise parity.

---

## 4. SECURITY & PATCH MANAGEMENT
1. **Critical Vulnerability Patching:** Any vulnerability classified as CVSS ≥ 9.0 must be remediated within 24 hours.
2. **Security Headers:** All HTTP responses must strictly retain:
   - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: no-referrer`
   - `Content-Security-Policy` with authorized frame ancestors

---

## 5. ESCALATION & INCIDENT RESPONSE PROTOCOL
- **Severity 1 (P1 - Outage / Security Incident):** Page Lead SRE immediately. Response time < 5 minutes.
- **Severity 2 (P2 - Administrative Surface Impairment):** Notify CISE Command Hub administrator. Response time < 30 minutes.
- **Severity 3 (P3 - Minor Localization or Visual Flaw):** Queue for resolution in the next bi-weekly maintenance sprint.

---

## 6. HANDOVER CERTIFICATION
The maintenance cadence defined herein represents the authoritative operating agreement governing the ICA platform from Day 31 onward.
