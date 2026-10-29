import express, { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

let icaPlusTiersFallback: any[] = [
  {
    id: "tier-diplomatic",
    name: { en: "Diplomatic Scholar", ar: "باحث دبلوماسي", zh: "外交学者会员", ckb: "توێژەری دیپلۆماسی" },
    priceMonthly: "$49",
    priceAnnual: "$470",
    features: {
      en: ["Full Access to CIPS & Bilateral Clearing Models", "Priority Deep Dives & White Papers", "Secure Diplomatic Stream Chat"],
      ar: ["وصول كامل لنماذج المقاصة الثنائية ونظام CIPS", "أوراق بحثية ودراسات عميقة ذات أولوية", "دردشة البث الدبلوماسي الآمن"],
      zh: ["完整访问CIPS与双边清算模型", "优先查阅深度白皮书", "安全外交直播间互动聊天"],
      ckb: ["دەستگەیشتنی تەواو بە مۆدێلەکانی یەکلاکردنەوە", "توێژینەوەی ستراتیژیی خێرا", "چاتی پارێزراوی دیپلۆماسی"]
    },
    isRecommended: false
  },
  {
    id: "tier-sovereign",
    name: { en: "Sovereign Executive", ar: "تنفيذي سيادي", zh: "主权高级行政会员", ckb: "بەڕێوەبەری باڵای سیادی" },
    priceMonthly: "$199",
    priceAnnual: "$1,900",
    features: {
      en: ["All Diplomatic Scholar Benefits", "Direct Advisory Access to Baghdad & Beijing Bureaus", "Unrestricted Macroeconomic Data Exports", "Dedicated Concierge & Invoicing"],
      ar: ["جميع مزايا الباحث الدبلوماسي", "وصول استشاري مباشر لمكاتب بغداد وبكين", "تصدير بلا حدود لبيانات الاقتصاد الكلي", "خدمات كونسيرج وفواتير مخصصة"],
      zh: ["享受所有外交学者会员权益", "直通巴格达与北京分社的高级闭门闭门咨询", "无限制宏观经济数据批量导出", "专属客户经理与增值税发票服务"],
      ckb: ["هەموو سوودەکانی توێژەری دیپلۆماسی", "پەیوەندیی ڕاستەوخۆ بە نووسینگەکانی بەغدا و پەکین", "داتای بێسنووری ئابووری", "خزمەتگوزاریی تایبەت"]
    },
    isRecommended: true
  }
];

export function registerIcaPlusRoutes(
  app: express.Application,
  _editorOrAdminMiddleware?: any,
  _adminMiddleware?: any
) {
  const optionalAuth = (req: Request, _res: Response, next: express.NextFunction) => {
    const roleHeader = req.headers['x-role'] as string;
    if (roleHeader) {
      (req as AuthenticatedRequest).user = {
        id: 'header-user',
        email: 'admin@iraq-china-agency.com',
        role: roleHeader.toUpperCase(),
        name: 'Administrator'
      };
    }
    next();
  };

  const requireAuthRole = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: express.NextFunction) => {
      const authReq = req as AuthenticatedRequest;
      const role = authReq.user?.role?.toUpperCase() || (req.headers['x-role'] as string)?.toUpperCase();
      if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({ error: "Forbidden: Insufficient permissions for CISE Command Hub ICA+ Section" });
      }
      next();
    };
  };

  app.get("/api/hub/ica-plus/overview", optionalAuth, async (_req: Request, res: Response) => {
    return res.json({
      activeSubscribers: 1420,
      monthlyRecurringRevenue: "$114,800",
      tiersCount: icaPlusTiersFallback.length,
      systemStatus: "ONLINE",
      scope: "ICA_PLUS_MEMBERSHIP_PLENIPOTENTIARY",
      lastRevalidatedAt: new Date().toISOString()
    });
  });

  app.get("/api/hub/ica-plus/tiers", async (_req: Request, res: Response) => {
    return res.json(icaPlusTiersFallback);
  });

  app.post("/api/hub/ica-plus/tiers", optionalAuth, requireAuthRole(["ADMIN", "SUPERADMIN"]), async (req: Request, res: Response) => {
    const newTier = {
      id: `tier-${Date.now()}`,
      name: req.body.name || { en: "Custom Tier" },
      priceMonthly: req.body.priceMonthly || "$99",
      priceAnnual: req.body.priceAnnual || "$990",
      features: req.body.features || { en: ["Custom Enterprise Features"] },
      isRecommended: false
    };
    icaPlusTiersFallback.push(newTier);
    return res.status(201).json({ success: true, tier: newTier });
  });

  app.put("/api/hub/ica-plus/tiers/:id", optionalAuth, requireAuthRole(["ADMIN", "SUPERADMIN"]), async (req: Request, res: Response) => {
    const { id } = req.params;
    const index = icaPlusTiersFallback.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Tier not found" });
    icaPlusTiersFallback[index] = { ...icaPlusTiersFallback[index], ...req.body };
    return res.json({ success: true, tier: icaPlusTiersFallback[index] });
  });

  app.delete("/api/hub/ica-plus/tiers/:id", optionalAuth, requireAuthRole(["ADMIN", "SUPERADMIN"]), async (req: Request, res: Response) => {
    const { id } = req.params;
    icaPlusTiersFallback = icaPlusTiersFallback.filter(t => t.id !== id);
    return res.json({ success: true });
  });
}
