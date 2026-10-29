import express, { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
    name?: string;
  };
}

let mediaItemsFallback: any[] = [
  {
    id: "media-1",
    slug: "grand-faw-port-construction-timelapse",
    title: { en: "Grand Faw Deep-Water Port Terminal 1 Construction Timelapse", ar: "فيديو توثيقي لأعمال بناء رصيف ميناء الفاو الكبير", zh: "大法奥深水港1号泊位建设纪实与全景延时影像", ckb: "ڤیدیۆی تۆمارکراوی دروستکردنی وێستگەی بەندەری فاو" },
    type: "video",
    category: "infrastructure",
    url: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200&auto=format&fit=crop",
    duration: "4:25",
    publishDate: "2026-04-12",
    status: "PUBLISHED",
    sourceVertical: "Live Portal"
  },
  {
    id: "media-2",
    slug: "beijing-baghdad-banking-podcast",
    title: { en: "Bilateral Currency Clearing and the RMB-IQD Settlement Corridor", ar: "بودكاست المقاصة الثنائية وممر التسويّة باليوان والدينار", zh: "中伊双边货币清算与人民币-第纳尔结算通道播客专题", ckb: "پۆدکاستی یەکلاکردنەوەی دارایی نێوان یوان و دینار" },
    type: "podcast",
    category: "finance",
    url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop",
    duration: "28:10",
    publishDate: "2026-04-10",
    status: "PUBLISHED",
    sourceVertical: "ICA Newsroom"
  },
  {
    id: "media-3",
    slug: "silk-road-economic-belt-infographic",
    title: { en: "Interactive Infographic: The Eurasian Logistics Corridor & Oil Trunk Routes", ar: "إنفوجرافيك تفاعلي: ممر الخدمات اللوجستية الأوراسية وشبكة أنابيب النفط", zh: "欧亚物流走廊与国家油气干线互动式数据图表", ckb: "اینفۆگرافیکی تێکەڵ: ڕێڕەوی لۆجستی ئۆراسیا و هێڵەکانی نەوت" },
    type: "infographic",
    category: "trade",
    url: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop",
    duration: "Data Map",
    publishDate: "2026-04-08",
    status: "PUBLISHED",
    sourceVertical: "Public Portal"
  }
];

export function registerMediaHubRoutes(
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
        return res.status(403).json({ error: "Forbidden: Insufficient permissions for CISE Command Hub Media Hub Section" });
      }
      next();
    };
  };

  app.get("/api/hub/media-hub/overview", optionalAuth, async (_req: Request, res: Response) => {
    return res.json({
      totalMediaItems: mediaItemsFallback.length,
      videosCount: mediaItemsFallback.filter(m => m.type === 'video').length,
      podcastsCount: mediaItemsFallback.filter(m => m.type === 'podcast').length,
      infographicsCount: mediaItemsFallback.filter(m => m.type === 'infographic').length,
      systemStatus: "ONLINE",
      scope: "MEDIA_HUB_PLENIPOTENTIARY",
      lastRevalidatedAt: new Date().toISOString()
    });
  });

  app.get("/api/hub/media-hub/items", async (_req: Request, res: Response) => {
    return res.json(mediaItemsFallback);
  });

  app.post("/api/hub/media-hub/items", optionalAuth, requireAuthRole(["ADMIN", "EDITOR", "SUPERADMIN"]), async (req: Request, res: Response) => {
    try {
      const newItem = {
        id: `media-${Date.now()}`,
        slug: req.body.slug || `media-item-${Date.now()}`,
        title: req.body.title || { en: req.body.titleEn || "Untitled Media" },
        type: req.body.type || "video",
        category: req.body.category || "general",
        url: req.body.url || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200",
        duration: req.body.duration || "5:00",
        publishDate: new Date().toISOString().split('T')[0],
        status: "PUBLISHED",
        sourceVertical: "Media Hub"
      };
      mediaItemsFallback.unshift(newItem);
      return res.status(201).json({ success: true, item: newItem });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/hub/media-hub/items/:id", optionalAuth, requireAuthRole(["ADMIN", "EDITOR", "SUPERADMIN"]), async (req: Request, res: Response) => {
    const { id } = req.params;
    const index = mediaItemsFallback.findIndex(m => m.id === id);
    if (index === -1) return res.status(404).json({ error: "Media item not found" });
    mediaItemsFallback[index] = { ...mediaItemsFallback[index], ...req.body };
    return res.json({ success: true, item: mediaItemsFallback[index] });
  });

  app.delete("/api/hub/media-hub/items/:id", optionalAuth, requireAuthRole(["ADMIN", "EDITOR", "SUPERADMIN"]), async (req: Request, res: Response) => {
    const { id } = req.params;
    mediaItemsFallback = mediaItemsFallback.filter(m => m.id !== id);
    return res.json({ success: true });
  });
}
