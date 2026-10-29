import express, { Request, Response } from "express";
import { prisma } from "./db.js";
import { recordAudit } from "./hubRoutes.js";

// Default canonical footer initial dataset
export const DEFAULT_FOOTER_CONFIG = {
  tagline: "Bilateral Strategic Intelligence & Economic Integration Codex",
  taglineAr: "مدونة الاستخبارات الاستراتيجية والتكامل الاقتصادي الثنائي",
  taglineZh: "双边战略情报与经贸一体化主权法典",
  taglineCkb: "پەیڕەوی هەواڵگری ستراتیژی و یەکگرتنی ئابووری دوولایەنە",
  ctaLabel: "Subscribe to the ICA Newsletter",
  ctaHref: "#newsletter",
  newsletterEnabled: true,
  newsletterHeading: "Diplomatic Dispatches & Economic Briefs",
  newsletterBody: "Receive real-time sovereign intelligence, bilateral trade indices, and strategic analysis directly to your secure inbox.",
  newsletterPlaceholder: "Enter official email address...",
  newsletterSubmit: "Subscribe",
  newsletterSuccess: "Successfully subscribed to secure bilateral channel.",
  newsletterError: "Subscription transmission failed. Please verify network credentials.",
  showLanguageSwitcher: true,
  showDownloadApp: true,
  copyrightText: "© 2026 Iraqi-Chinese Agency. All Diplomatic Rights Reserved.",
  showBackToTop: true,
  partnersEnabled: true,
  partnersHeading: "Accredited Sovereign & Corporate Partners",
  marqueeEnabled: true,
  status: "PUBLISHED",
  columns: [
    {
      heading: "About ICA",
      headingAr: "حول الوكالة",
      headingZh: "关于机构",
      headingCkb: "دەربارەی ئاژانس",
      displayOrder: 1,
      status: "PUBLISHED",
      links: [
        { label: "About ICA Agency", labelAr: "حول الوكالة العراقية الصينية", labelZh: "关于伊中通讯社", labelCkb: "دەربارەی ئاژانسی عێراقی-چینی", href: "/about", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Sovereign Charter", labelAr: "الميثاق السيادي التأسيسي", labelZh: "主权宪章与宗旨", labelCkb: "پەیڕەوی سەروەری دامەزراندن", href: "/institute/about", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "Strategic Partners", labelAr: "الشركاء الاستراتيجيون", labelZh: "战略合作伙伴名录", labelCkb: "هاوبەشە ستراتیژییەکان", href: "/institute/partnerships", external: false, displayOrder: 3, status: "PUBLISHED" },
        { label: "Diplomatic Contact", labelAr: "الاتصال الدبلوماسي والمقرات", labelZh: "外交联络与总处地址", labelCkb: "پەیوەندی دیپلۆماسی و بارەگاکان", href: "/contact", external: false, displayOrder: 4, status: "PUBLISHED" },
      ]
    },
    {
      heading: "Initiatives",
      headingAr: "المبادرات الاستراتيجية",
      headingZh: "核心倡议与平台",
      headingCkb: "دەستپێشخەرییە ستراتیژییەکان",
      displayOrder: 2,
      status: "PUBLISHED",
      links: [
        { label: "Payment Settlement (IQD/RMB)", labelAr: "تسوية المدفوعات المباشرة (IQD/RMB)", labelZh: "本币直接结算清算中心", labelCkb: "پاکتاوی دراوەکان (IQD/RMB)", href: "/settlement", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Qi & ICA Co-Branded Card", labelAr: "بطاقة كي وICA المشتركة للأعمال", labelZh: "Qi & ICA 联名商务结算卡", labelCkb: "کارتی هاوبەشی کی و ICA", href: "/settlement/card", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "Economic Summit & Expo", labelAr: "قمة ومعرض العراق والصين الاقتصادي", labelZh: "中伊经贸峰会与双边博览会", labelCkb: "لووتکە و پێشانگای ئابووری", href: "/summit", external: false, displayOrder: 3, status: "PUBLISHED" },
        { label: "Chinese Language Centre (HSK)", labelAr: "المركز الصيني لتعليم اللغة (HSK)", labelZh: "伊拉克中文教育与HSK认证中心", labelCkb: "ناوەندی زمانی چینی (HSK)", href: "/institute/chinese-center", external: false, displayOrder: 4, status: "PUBLISHED" },
        { label: "Bilateral Visa Facilitation Centre", labelAr: "مركز تسهيل التأشيرات الثنائي", labelZh: "双边签证咨询与代办服务中心", labelCkb: "ناوەندی وەرگرتنی ڤیزا", href: "/institute/visa-centre", external: false, displayOrder: 5, status: "PUBLISHED" },
        { label: "Strategic Legal & Financial Advisory", labelAr: "الاستشارات المالية والقانونية السيادية", labelZh: "战略财务与法律合规咨询", labelCkb: "ڕاوێژکاری دارایی و یاسایی", href: "/institute/consultancy", external: false, displayOrder: 6, status: "PUBLISHED" },
        { label: "Cultural Exchange & Delegations", labelAr: "التبادل الثقافي والشعبي الثنائي", labelZh: "中伊人文交流与学术使团项目", labelCkb: "ئاڵوگۆڕی کەلتووری و زانستی", href: "/institute/cultural-exchange", external: false, displayOrder: 7, status: "PUBLISHED" },
      ]
    },
    {
      heading: "Research & Intelligence",
      headingAr: "الأبحاث والاستخبارات",
      headingZh: "学术研究与情报",
      headingCkb: "توێژینەوە و هەواڵگری",
      displayOrder: 3,
      status: "PUBLISHED",
      links: [
        { label: "4 Research Pillars", labelAr: "المحاور البحثية الأربعة", labelZh: "四大核心研究支柱", labelCkb: "چوار تەوەری توێژینەوە", href: "/institute/research", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Publications & Policy Briefs", labelAr: "الأبحاث والتقارير الاستراتيجية", labelZh: "智库研究报告与政策专报", labelCkb: "توێژینەوە و ڕاپۆرتەکان", href: "/institute/publications", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "Bilateral Data Hub & Tracker", labelAr: "مركز البيانات ومتابعة ممرات التنمية", labelZh: "双边经贸数据中心与走廊跟踪器", labelCkb: "ناوەندی داتاکان و ڕێڕەوی گەشەپێدان", href: "/institute/data-hub", external: false, displayOrder: 3, status: "PUBLISHED" },
        { label: "Distinguished Fellows & Experts", labelAr: "دليل الخبراء والزملاء الباحثين", labelZh: "特聘学者与智库专家名录", labelCkb: "شارەزایان و توێژەران", href: "/institute/experts", external: false, displayOrder: 4, status: "PUBLISHED" },
      ]
    },
    {
      heading: "Media Hub",
      headingAr: "المركز الإعلامي",
      headingZh: "融媒体中枢",
      headingCkb: "ناوەندی میدیا",
      displayOrder: 4,
      status: "PUBLISHED",
      links: [
        { label: "ICA Newsroom & Press Wire", labelAr: "غرفة الأخبار ووكالة الأنباء", labelZh: "新闻通讯社与权威电讯", labelCkb: "ژووری هەواڵ و ئاژانس", href: "/newsroom", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Live Broadcast & Documentaries", labelAr: "البث المباشر والوثائقيات", labelZh: "在线融媒直播与纪录片专区", labelCkb: "پەخشی زیندوو و بەڵگەنامەیی", href: "/live", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "ICA+ Sovereign VIP Research", labelAr: "منصة ICA+ للتحليلات الخاصة", labelZh: "ICA+ 高端会员智库专享", labelCkb: "ICA+ شیکارییە تایبەتەکان", href: "/media/ica-plus", external: false, displayOrder: 3, status: "PUBLISHED" },
        { label: "Media Library & Archives", labelAr: "مكتبة الوسائط والأرشيف المرئي", labelZh: "媒体资源库与影像档案", labelCkb: "کتێبخانەی میدیا و ئەرشیڤ", href: "/media", external: false, displayOrder: 4, status: "PUBLISHED" },
      ]
    },
    {
      heading: "Legal & Regulatory",
      headingAr: "الشؤون القانونية والامتثال",
      headingZh: "法规合规与治理",
      headingCkb: "یاسایی و پابەندبوون",
      displayOrder: 5,
      status: "PUBLISHED",
      links: [
        { label: "Privacy Rights Charter", labelAr: "ميثاق الخصوصية وحماية البيانات", labelZh: "主权隐私权与数据保护宪章", labelCkb: "پاراستنی مافی کەسی و داتاکان", href: "/privacy", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Terms of Strategic Engagement", labelAr: "شروط الاستخدام والتعامل الاستراتيجي", labelZh: "双边战略合作服务条款", labelCkb: "مەرجەکانی بەکارهێنان", href: "/terms", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "AML / KYC Compliance Framework", labelAr: "سياسات الامتثال ومكافحة غسل الأموال", labelZh: "反洗钱与国际清算合规框架", labelCkb: "پابەندبوون بە یاساکانی دارایی", href: "/settlement/compliance", external: false, displayOrder: 3, status: "PUBLISHED" },
        { label: "Diplomatic Syndication Registration", labelAr: "تسجيل واعتماد المؤسسات الإعلامية", labelZh: "官方外交与传媒互认登记核准", labelCkb: "تۆمارکردنی فەرمی دیپلۆماسی", href: "/institute/about", external: false, displayOrder: 4, status: "PUBLISHED" },
        { label: "Sovereign Data Protection Codex", labelAr: "مدونة حماية البيانات السيادية", labelZh: "主权数据跨境保护准则", labelCkb: "پاراستنی دراوە سەروەرییەکان", href: "/privacy", external: false, displayOrder: 5, status: "PUBLISHED" },
      ]
    },
    {
      heading: "Connect & Syndicate",
      headingAr: "التواصل والاشتراك",
      headingZh: "联络与订阅渠道",
      headingCkb: "پەیوەندی و بەشداریکردن",
      displayOrder: 6,
      status: "PUBLISHED",
      links: [
        { label: "Strategic Dispatches & Newsletter", labelAr: "النشرة الاستراتيجية والبرقيات الدبلوماسية", labelZh: "战略简报与外交通讯快讯", labelCkb: "نامەی ستراتیژی و دیپلۆماسی", href: "#newsletter", external: false, displayOrder: 1, status: "PUBLISHED" },
        { label: "Global Social Media Syndicate", labelAr: "الشبكات الاجتماعية الرقمية المعتمدة", labelZh: "官方全媒体发布与社群渠道", labelCkb: "تۆڕە کۆمەڵایەتییە فەرمییەکان", href: "#footer-social-showcase", external: false, displayOrder: 2, status: "PUBLISHED" },
        { label: "RSS Feeds & Wire Feeds", labelAr: "خلاصات الأخبار والبرقيات الحية (RSS)", labelZh: "RSS 即时电讯专线", labelCkb: "خزمەتگوزاری RSS و هەواڵگری", href: "/rss", external: false, displayOrder: 3, status: "PUBLISHED" },
      ]
    }
  ]
};

export async function seedFooterData() {
  try {
    const existing = await prisma.footerConfig.findFirst({
      include: {
        columns: {
          include: { links: true }
        }
      }
    });

    if (!existing) {
      console.log("[FooterSeeder] Seeding canonical FooterConfig and columns...");
      const config = await prisma.footerConfig.create({
        data: {
          tagline: DEFAULT_FOOTER_CONFIG.tagline,
          taglineAr: DEFAULT_FOOTER_CONFIG.taglineAr,
          taglineZh: DEFAULT_FOOTER_CONFIG.taglineZh,
          taglineCkb: DEFAULT_FOOTER_CONFIG.taglineCkb,
          ctaLabel: DEFAULT_FOOTER_CONFIG.ctaLabel,
          ctaHref: DEFAULT_FOOTER_CONFIG.ctaHref,
          newsletterEnabled: DEFAULT_FOOTER_CONFIG.newsletterEnabled,
          newsletterHeading: DEFAULT_FOOTER_CONFIG.newsletterHeading,
          newsletterBody: DEFAULT_FOOTER_CONFIG.newsletterBody,
          newsletterPlaceholder: DEFAULT_FOOTER_CONFIG.newsletterPlaceholder,
          newsletterSubmit: DEFAULT_FOOTER_CONFIG.newsletterSubmit,
          newsletterSuccess: DEFAULT_FOOTER_CONFIG.newsletterSuccess,
          newsletterError: DEFAULT_FOOTER_CONFIG.newsletterError,
          showLanguageSwitcher: DEFAULT_FOOTER_CONFIG.showLanguageSwitcher,
          showDownloadApp: DEFAULT_FOOTER_CONFIG.showDownloadApp,
          copyrightText: DEFAULT_FOOTER_CONFIG.copyrightText,
          showBackToTop: DEFAULT_FOOTER_CONFIG.showBackToTop,
          partnersEnabled: DEFAULT_FOOTER_CONFIG.partnersEnabled,
          partnersHeading: DEFAULT_FOOTER_CONFIG.partnersHeading,
          marqueeEnabled: DEFAULT_FOOTER_CONFIG.marqueeEnabled,
          status: "PUBLISHED"
        }
      });

      for (const col of DEFAULT_FOOTER_CONFIG.columns) {
        const createdCol = await prisma.footerColumn.create({
          data: {
            configId: config.id,
            heading: col.heading,
            headingAr: col.headingAr,
            headingZh: col.headingZh,
            headingCkb: col.headingCkb,
            displayOrder: col.displayOrder,
            status: col.status
          }
        });

        for (const link of col.links) {
          await prisma.footerLink.create({
            data: {
              columnId: createdCol.id,
              label: link.label,
              labelAr: link.labelAr,
              labelZh: link.labelZh,
              labelCkb: link.labelCkb,
              href: link.href,
              external: link.external,
              displayOrder: link.displayOrder,
              status: link.status
            }
          });
        }
      }
      console.log("[FooterSeeder] Canonical Footer seeded successfully.");
    }
  } catch (err) {
    console.error("[FooterSeeder] Seeding error:", err);
  }
}

export function registerFooterRoutes(app: express.Application) {
  // 1. Public endpoint to fetch active footer config and columns
  app.get("/api/public/footer", async (_req: Request, res: Response) => {
    try {
      let config = await prisma.footerConfig.findFirst({
        where: { status: "PUBLISHED" },
        include: {
          columns: {
            where: { status: "PUBLISHED" },
            orderBy: { displayOrder: "asc" },
            include: {
              links: {
                where: { status: "PUBLISHED" },
                orderBy: { displayOrder: "asc" }
              }
            }
          }
        }
      });

      if (!config) {
        // Fallback to any config
        config = await prisma.footerConfig.findFirst({
          include: {
            columns: {
              orderBy: { displayOrder: "asc" },
              include: {
                links: { orderBy: { displayOrder: "asc" } }
              }
            }
          }
        });
      }

      if (!config) {
        await seedFooterData();
        config = await prisma.footerConfig.findFirst({
          include: {
            columns: {
              where: { status: "PUBLISHED" },
              orderBy: { displayOrder: "asc" },
              include: {
                links: {
                  where: { status: "PUBLISHED" },
                  orderBy: { displayOrder: "asc" }
                }
              }
            }
          }
        });
      }

      if (!config) {
        return res.json(DEFAULT_FOOTER_CONFIG);
      }

      res.json(config);
    } catch (err: any) {
      console.warn("[API] Transient issue fetching public footer, returning canonical default:", err?.message || err);
      res.json(DEFAULT_FOOTER_CONFIG);
    }
  });

  // 2. Hub endpoint: Get full footer config including draft/archived
  app.get("/api/hub/footer", async (_req: Request, res: Response) => {
    try {
      let config = await prisma.footerConfig.findFirst({
        include: {
          columns: {
            orderBy: { displayOrder: "asc" },
            include: {
              links: { orderBy: { displayOrder: "asc" } }
            }
          }
        }
      });

      if (!config) {
        await seedFooterData();
        config = await prisma.footerConfig.findFirst({
          include: {
            columns: {
              orderBy: { displayOrder: "asc" },
              include: {
                links: { orderBy: { displayOrder: "asc" } }
              }
            }
          }
        });
      }

      res.json(config || DEFAULT_FOOTER_CONFIG);
    } catch (err: any) {
      console.error("[API] Error fetching hub footer:", err);
      res.status(500).json({ error: "Failed to fetch footer configuration" });
    }
  });

  // 3. Hub endpoint: Update footer configuration
  app.put("/api/hub/footer", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions to edit footer" });
    }

    try {
      const existing = await prisma.footerConfig.findFirst();
      if (!existing) {
        return res.status(404).json({ error: "Footer configuration not found" });
      }

      const updated = await prisma.footerConfig.update({
        where: { id: existing.id },
        data: {
          tagline: req.body.tagline,
          taglineAr: req.body.taglineAr,
          taglineZh: req.body.taglineZh,
          taglineCkb: req.body.taglineCkb,
          ctaLabel: req.body.ctaLabel,
          ctaHref: req.body.ctaHref,
          newsletterEnabled: req.body.newsletterEnabled,
          newsletterHeading: req.body.newsletterHeading,
          newsletterBody: req.body.newsletterBody,
          newsletterPlaceholder: req.body.newsletterPlaceholder,
          newsletterSubmit: req.body.newsletterSubmit,
          newsletterSuccess: req.body.newsletterSuccess,
          newsletterError: req.body.newsletterError,
          showLanguageSwitcher: req.body.showLanguageSwitcher,
          showDownloadApp: req.body.showDownloadApp,
          copyrightText: req.body.copyrightText,
          showBackToTop: req.body.showBackToTop,
          partnersEnabled: req.body.partnersEnabled,
          partnersHeading: req.body.partnersHeading,
          marqueeEnabled: req.body.marqueeEnabled,
          status: req.body.status || "PUBLISHED"
        },
        include: {
          columns: {
            orderBy: { displayOrder: "asc" },
            include: {
              links: { orderBy: { displayOrder: "asc" } }
            }
          }
        }
      });

      recordAudit(req, "update_footer_config", "FooterConfig", existing.id, existing, updated);
      res.json(updated);
    } catch (err: any) {
      console.error("[API] Error updating footer:", err);
      res.status(500).json({ error: "Failed to update footer configuration" });
    }
  });

  // 4. Hub endpoint: Add column
  app.post("/api/hub/footer/columns", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions to add footer column" });
    }

    try {
      const config = await prisma.footerConfig.findFirst();
      if (!config) return res.status(404).json({ error: "FooterConfig not found" });

      const count = await prisma.footerColumn.count({ where: { configId: config.id } });
      const newCol = await prisma.footerColumn.create({
        data: {
          configId: config.id,
          heading: req.body.heading || "New Column",
          headingAr: req.body.headingAr,
          headingZh: req.body.headingZh,
          headingCkb: req.body.headingCkb,
          displayOrder: req.body.displayOrder || count + 1,
          status: req.body.status || "PUBLISHED"
        },
        include: { links: true }
      });

      recordAudit(req, "create_footer_column", "FooterColumn", newCol.id, null, newCol);
      res.status(201).json(newCol);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 5. Hub endpoint: Update column
  app.put("/api/hub/footer/columns/:id", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions to edit footer column" });
    }

    try {
      const before = await prisma.footerColumn.findUnique({ where: { id: req.params.id } });
      const updated = await prisma.footerColumn.update({
        where: { id: req.params.id },
        data: {
          heading: req.body.heading,
          headingAr: req.body.headingAr,
          headingZh: req.body.headingZh,
          headingCkb: req.body.headingCkb,
          displayOrder: req.body.displayOrder,
          status: req.body.status
        },
        include: { links: true }
      });

      recordAudit(req, "update_footer_column", "FooterColumn", req.params.id, before, updated);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 6. Hub endpoint: Delete column
  app.delete("/api/hub/footer/columns/:id", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Admin clearance required to delete footer column" });
    }

    try {
      const before = await prisma.footerColumn.findUnique({ where: { id: req.params.id } });
      await prisma.footerColumn.delete({ where: { id: req.params.id } });
      recordAudit(req, "delete_footer_column", "FooterColumn", req.params.id, before, null);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 7. Hub endpoint: Add link
  app.post("/api/hub/footer/links", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions to add footer link" });
    }

    try {
      const count = await prisma.footerLink.count({ where: { columnId: req.body.columnId } });
      const newLink = await prisma.footerLink.create({
        data: {
          columnId: req.body.columnId,
          label: req.body.label || "New Link",
          labelAr: req.body.labelAr,
          labelZh: req.body.labelZh,
          labelCkb: req.body.labelCkb,
          href: req.body.href || "#",
          external: req.body.external || false,
          displayOrder: req.body.displayOrder || count + 1,
          status: req.body.status || "PUBLISHED"
        }
      });

      recordAudit(req, "create_footer_link", "FooterLink", newLink.id, null, newLink);
      res.status(201).json(newLink);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 8. Hub endpoint: Update link
  app.put("/api/hub/footer/links/:id", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN", "EDITOR"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Insufficient permissions to edit footer link" });
    }

    try {
      const before = await prisma.footerLink.findUnique({ where: { id: req.params.id } });
      const updated = await prisma.footerLink.update({
        where: { id: req.params.id },
        data: {
          label: req.body.label,
          labelAr: req.body.labelAr,
          labelZh: req.body.labelZh,
          labelCkb: req.body.labelCkb,
          href: req.body.href,
          external: req.body.external,
          displayOrder: req.body.displayOrder,
          status: req.body.status
        }
      });

      recordAudit(req, "update_footer_link", "FooterLink", req.params.id, before, updated);
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 9. Hub endpoint: Delete link
  app.delete("/api/hub/footer/links/:id", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (!["SUPERADMIN", "ADMIN"].includes(userRole)) {
      return res.status(403).json({ error: "Forbidden: Admin clearance required to delete footer link" });
    }

    try {
      const before = await prisma.footerLink.findUnique({ where: { id: req.params.id } });
      await prisma.footerLink.delete({ where: { id: req.params.id } });
      recordAudit(req, "delete_footer_link", "FooterLink", req.params.id, before, null);
      res.json({ success: true, id: req.params.id });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 10. Hub endpoint: Reset to canonical configuration
  app.post("/api/hub/footer/reset", async (req: Request, res: Response) => {
    const userRole = ((req as any).user?.role || req.headers["x-role"] || "VIEWER").toString().toUpperCase();
    if (userRole !== "SUPERADMIN") {
      return res.status(403).json({ error: "Forbidden: Only SUPERADMIN can reset footer to canonical template" });
    }

    try {
      await prisma.footerLink.deleteMany();
      await prisma.footerColumn.deleteMany();
      await prisma.footerConfig.deleteMany();
      await seedFooterData();

      const fresh = await prisma.footerConfig.findFirst({
        include: {
          columns: {
            orderBy: { displayOrder: "asc" },
            include: {
              links: { orderBy: { displayOrder: "asc" } }
            }
          }
        }
      });

      recordAudit(req, "reset_canonical_footer", "FooterConfig", fresh?.id, null, fresh, "Reset footer to canonical 6-column specification");
      res.json(fresh);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
}
