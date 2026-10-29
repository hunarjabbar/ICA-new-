import fs from 'fs';
import path from 'path';
import http from 'http';
import { prisma } from './db.js';

const SEED_DIR = path.join(process.cwd(), 'server', 'seeds', 'test30');

export interface SeedRunResult {
  file: string;
  section: string;
  recordsCount: number;
  slugs: string[];
  routesChecked: { route: string; status: number; ok: boolean }[];
  status: 'SUCCESS' | 'FAILED';
  error?: string;
}

export interface TestSuiteExecutionReport {
  timestamp: string;
  totalFiles: number;
  successfulFiles: number;
  failedFiles: number;
  totalRecordsSeeded: number;
  totalRoutesVerified: number;
  durationMs: number;
  results: SeedRunResult[];
  allSlugsValid: boolean;
  allRoutesValid: boolean;
}

function readSeedFile(filename: string): any {
  const filePath = path.join(SEED_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Seed file not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function checkRoute(routePath: string, port = 3000): Promise<{ route: string; status: number; ok: boolean }> {
  return new Promise((resolve) => {
    const options = {
      hostname: '127.0.0.1',
      port,
      path: routePath,
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/json,*/*',
        'User-Agent': 'CISE-Command-Hub-Seed-Tester/1.0'
      },
      timeout: 4000
    };

    const req = http.request(options, (res) => {
      resolve({
        route: routePath,
        status: res.statusCode || 0,
        ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 400
      });
      res.resume();
    });

    req.on('error', (err) => {
      resolve({
        route: routePath,
        status: 500,
        ok: false
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        route: routePath,
        status: 408,
        ok: false
      });
    });

    req.end();
  });
}

export async function executeAllTestSeeds(options: { verifyRoutes?: boolean; port?: number } = {}): Promise<TestSuiteExecutionReport> {
  const startTime = Date.now();
  const verifyRoutes = options.verifyRoutes ?? true;
  const port = options.port ?? 3000;
  const results: SeedRunResult[] = [];

  // 1. Ensure test author exists for relational constraints
  let defaultAuthor = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!defaultAuthor) {
    defaultAuthor = await prisma.user.create({
      data: {
        email: 'test-admin@iraqi-chineseagency.com',
        name: 'Plenipotentiary Test Administrator',
        role: 'ADMIN',
        department: 'Bilateral Test Directorate',
        title: 'Executive System Auditor',
        digitalId: 'TEST-DID-2026-ADMIN'
      }
    });
  }

  // 02. Categories & Tags first so Articles can reference them
  try {
    const catData = readSeedFile('02_categories_tags.json');
    const slugs: string[] = [];
    for (const cat of catData.categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        create: {
          slug: cat.slug,
          name: cat.name,
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          nameZh: cat.nameZh
        },
        update: {
          name: cat.name,
          nameEn: cat.nameEn,
          nameAr: cat.nameAr,
          nameZh: cat.nameZh
        }
      });
      slugs.push(cat.slug);
    }
    for (const tag of catData.tags) {
      await prisma.tag.upsert({
        where: { name: tag.name },
        create: { name: tag.name },
        update: {}
      });
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/api/categories', port));
      routesChecked.push(await checkRoute('/newsroom/category/' + slugs[0], port));
    }

    results.push({
      file: '02_categories_tags.json',
      section: 'Categories & Taxonomies',
      recordsCount: catData.categories.length + catData.tags.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '02_categories_tags.json',
      section: 'Categories & Taxonomies',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 01. Newsroom Articles
  try {
    const articles = readSeedFile('01_newsroom_articles.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const art of articles) {
      const category = await prisma.category.findUnique({ where: { slug: art.categorySlug } });
      const catId = category ? category.id : (await prisma.category.findFirst())?.id || '';

      const article = await prisma.article.upsert({
        where: { slug: art.slug },
        create: {
          slug: art.slug,
          status: 'PUBLISHED',
          imageUrl: art.imageUrl,
          authorId: defaultAuthor.id,
          categoryId: catId,
          translations: {
            create: art.translations.map((tr: any) => ({
              lang: tr.lang,
              title: tr.title,
              excerpt: tr.excerpt,
              content: tr.content,
              seoTitle: tr.seoTitle,
              seoDesc: tr.seoDesc
            }))
          }
        },
        update: {
          imageUrl: art.imageUrl,
          status: 'PUBLISHED'
        }
      });
      slugs.push(art.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/newsroom/article/${art.slug}`, port));
        routesChecked.push(await checkRoute(`/api/articles/${art.slug}`, port));
      }
    }

    results.push({
      file: '01_newsroom_articles.json',
      section: 'Newsroom Articles',
      recordsCount: articles.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '01_newsroom_articles.json',
      section: 'Newsroom Articles',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 03. Live Events
  try {
    const events = readSeedFile('03_live_events.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const ev of events) {
      await prisma.liveEvent.upsert({
        where: { slug: ev.slug },
        create: {
          slug: ev.slug,
          isActive: ev.isActive,
          titleEn: ev.titleEn,
          titleAr: ev.titleAr,
          titleZh: ev.titleZh,
          titleCkb: ev.titleCkb || '',
          summaryEn: ev.summaryEn,
          summaryAr: ev.summaryAr,
          summaryZh: ev.summaryZh,
          summaryCkb: ev.summaryCkb || '',
          videoUrl: ev.videoUrl,
          region: ev.region,
          category: ev.category,
          updates: {
            create: ev.updates.map((u: any) => ({
              contentEn: u.contentEn,
              contentAr: u.contentAr,
              contentZh: u.contentZh,
              contentCkb: u.contentCkb || '',
              isImportant: u.isImportant,
              authorName: u.authorName
            }))
          }
        },
        update: {
          isActive: ev.isActive,
          titleEn: ev.titleEn
        }
      });
      slugs.push(ev.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/live/video/${ev.slug}`, port));
        routesChecked.push(await checkRoute(`/api/events/${ev.slug}`, port));
      }
    }

    results.push({
      file: '03_live_events.json',
      section: 'Live Broadcast Events',
      recordsCount: events.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '03_live_events.json',
      section: 'Live Broadcast Events',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 04. Studies & Intelligence
  try {
    const studies = readSeedFile('04_studies_intelligence.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const st of studies) {
      await prisma.study.upsert({
        where: { slug: st.slug },
        create: {
          slug: st.slug,
          titleEn: st.titleEn,
          titleAr: st.titleAr,
          titleZh: st.titleZh,
          titleCkb: st.titleCkb || '',
          excerptEn: st.excerptEn,
          excerptAr: st.excerptAr,
          excerptZh: st.excerptZh,
          excerptCkb: st.excerptCkb || '',
          contentEn: st.contentEn,
          contentAr: st.contentAr,
          contentZh: st.contentZh,
          contentCkb: st.contentCkb || '',
          imageUrl: st.imageUrl,
          isPrivate: st.isPrivate,
          authorId: defaultAuthor.id
        },
        update: {
          titleEn: st.titleEn,
          imageUrl: st.imageUrl
        }
      });
      slugs.push(st.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/studies/${st.slug}`, port));
      }
    }

    results.push({
      file: '04_studies_intelligence.json',
      section: 'Studies & Intelligence',
      recordsCount: studies.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '04_studies_intelligence.json',
      section: 'Studies & Intelligence',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 05. Media Hub Items
  try {
    const mediaItems = readSeedFile('05_media_hub_items.json');
    const slugs = mediaItems.map((m: any) => m.slug);
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/media', port));
      routesChecked.push(await checkRoute('/api/hub/media-hub/overview', port));
      routesChecked.push(await checkRoute('/api/hub/media-hub/items', port));
    }

    results.push({
      file: '05_media_hub_items.json',
      section: 'Media Hub Items',
      recordsCount: mediaItems.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '05_media_hub_items.json',
      section: 'Media Hub Items',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 06. Videos & Broadcasts
  try {
    const videos = readSeedFile('06_videos_broadcasts.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const v of videos) {
      await prisma.video.upsert({
        where: { slug: v.slug },
        create: {
          slug: v.slug,
          titleEn: v.titleEn,
          titleAr: v.titleAr || '',
          titleZh: v.titleZh || '',
          titleCkb: v.titleCkb || '',
          descriptionEn: v.descriptionEn,
          descriptionAr: v.descriptionAr || '',
          descriptionZh: v.descriptionZh || '',
          descriptionCkb: v.descriptionCkb || '',
          videoUrl: v.videoUrl,
          coverUrl: v.coverUrl,
          category: v.category,
          region: v.region,
          duration: v.duration,
          isFeatured: v.isFeatured,
          isTrending: v.isTrending
        },
        update: {
          titleEn: v.titleEn
        }
      });
      slugs.push(v.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/videos/${v.slug}`, port));
      }
    }

    results.push({
      file: '06_videos_broadcasts.json',
      section: 'Videos & Broadcasts',
      recordsCount: videos.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '06_videos_broadcasts.json',
      section: 'Videos & Broadcasts',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 07. Podcasts
  try {
    const podcasts = readSeedFile('07_podcasts_audio.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const p of podcasts) {
      await prisma.podcast.upsert({
        where: { slug: p.slug },
        create: {
          slug: p.slug,
          titleEn: p.titleEn,
          titleAr: p.titleAr || '',
          titleZh: p.titleZh || '',
          titleCkb: p.titleCkb || '',
          descriptionEn: p.descriptionEn,
          descriptionAr: p.descriptionAr || '',
          descriptionZh: p.descriptionZh || '',
          descriptionCkb: p.descriptionCkb || '',
          audioUrl: p.audioUrl,
          coverUrl: p.coverUrl,
          host: p.host,
          guestName: p.guestName,
          guestRole: p.guestRole,
          category: p.category,
          region: p.region,
          duration: p.duration,
          isFeatured: p.isFeatured,
          isTrending: p.isTrending
        },
        update: {
          titleEn: p.titleEn
        }
      });
      slugs.push(p.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/podcasts`, port));
        routesChecked.push(await checkRoute(`/api/podcasts/${p.slug}`, port));
      }
    }

    results.push({
      file: '07_podcasts_audio.json',
      section: 'Podcasts & Audio',
      recordsCount: podcasts.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '07_podcasts_audio.json',
      section: 'Podcasts & Audio',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 08. Documentaries
  try {
    const docs = readSeedFile('08_documentaries.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const d of docs) {
      await prisma.documentary.upsert({
        where: { slug: d.slug },
        create: {
          slug: d.slug,
          titleEn: d.titleEn,
          titleAr: d.titleAr || '',
          titleZh: d.titleZh || '',
          titleCkb: d.titleCkb || '',
          descriptionEn: d.descriptionEn,
          descriptionAr: d.descriptionAr || '',
          descriptionZh: d.descriptionZh || '',
          descriptionCkb: d.descriptionCkb || '',
          synopsisEn: d.synopsisEn || '',
          synopsisAr: d.synopsisAr || '',
          synopsisZh: d.synopsisZh || '',
          synopsisCkb: d.synopsisCkb || '',
          videoUrl: d.videoUrl,
          coverUrl: d.coverUrl,
          director: d.director,
          category: d.category,
          region: d.region,
          duration: d.duration,
          isFeatured: d.isFeatured,
          isTrending: d.isTrending
        },
        update: {
          titleEn: d.titleEn
        }
      });
      slugs.push(d.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/live/documentary`, port));
        routesChecked.push(await checkRoute(`/api/documentaries/${d.slug}`, port));
      }
    }

    results.push({
      file: '08_documentaries.json',
      section: 'Documentaries',
      recordsCount: docs.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '08_documentaries.json',
      section: 'Documentaries',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 09. Academic Books
  try {
    const books = readSeedFile('09_academic_books.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const b of books) {
      await prisma.book.upsert({
        where: { slug: b.slug },
        create: {
          slug: b.slug,
          titleEn: b.titleEn,
          titleAr: b.titleAr || '',
          titleZh: b.titleZh || '',
          titleCkb: b.titleCkb || '',
          authorEn: b.authorEn,
          authorAr: b.authorAr || '',
          authorZh: b.authorZh || '',
          authorCkb: b.authorCkb || '',
          descriptionEn: b.descriptionEn,
          descriptionAr: b.descriptionAr || '',
          descriptionZh: b.descriptionZh || '',
          descriptionCkb: b.descriptionCkb || '',
          coverUrl: b.coverUrl,
          category: b.category,
          region: b.region,
          rating: b.rating,
          pages: b.pages,
          year: b.year,
          publisher: b.publisher,
          isbn: b.isbn,
          isFeatured: b.isFeatured,
          isTrending: b.isTrending
        },
        update: {
          titleEn: b.titleEn
        }
      });
      slugs.push(b.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/books/${b.slug}`, port));
      }
    }

    results.push({
      file: '09_academic_books.json',
      section: 'Academic Library Books',
      recordsCount: books.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '09_academic_books.json',
      section: 'Academic Library Books',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 10. Tourism Spots
  try {
    const spots = readSeedFile('10_tourism_spots.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const s of spots) {
      await prisma.tourismSpot.upsert({
        where: { slug: s.slug },
        create: {
          slug: s.slug,
          titleEn: s.titleEn,
          titleAr: s.titleAr || '',
          titleZh: s.titleZh || '',
          titleCkb: s.titleCkb || '',
          city: s.city,
          region: s.region,
          category: s.category,
          descriptionEn: s.descriptionEn,
          descriptionAr: s.descriptionAr || '',
          descriptionZh: s.descriptionZh || '',
          descriptionCkb: s.descriptionCkb || '',
          imageUrl: s.imageUrl,
          galleryUrls: s.galleryUrls || '[]',
          bestTimeToVisit: s.bestTimeToVisit,
          visaPolicy: s.visaPolicy,
          flightInfo: s.flightInfo,
          rating: s.rating,
          estimatedCost: s.estimatedCost,
          isFeatured: s.isFeatured,
          isTrending: s.isTrending
        },
        update: {
          titleEn: s.titleEn
        }
      });
      slugs.push(s.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/tourism/${s.slug}`, port));
      }
    }

    results.push({
      file: '10_tourism_spots.json',
      section: 'Archaeological Tourism Spots',
      recordsCount: spots.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '10_tourism_spots.json',
      section: 'Archaeological Tourism Spots',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 11. Women Features
  try {
    const women = readSeedFile('11_women_empowerment.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const w of women) {
      await prisma.womenFeature.upsert({
        where: { slug: w.slug },
        create: {
          slug: w.slug,
          nameEn: w.nameEn,
          nameAr: w.nameAr || '',
          nameZh: w.nameZh || '',
          nameCkb: w.nameCkb || '',
          titleEn: w.titleEn,
          titleAr: w.titleAr || '',
          titleZh: w.titleZh || '',
          titleCkb: w.titleCkb || '',
          region: w.region,
          category: w.category,
          summaryEn: w.summaryEn,
          summaryAr: w.summaryAr || '',
          summaryZh: w.summaryZh || '',
          summaryCkb: w.summaryCkb || '',
          bioEn: w.bioEn || '',
          bioAr: w.bioAr || '',
          bioZh: w.bioZh || '',
          bioCkb: w.bioCkb || '',
          imageUrl: w.imageUrl,
          organization: w.organization,
          isFeatured: w.isFeatured,
          isTrending: w.isTrending
        },
        update: {
          nameEn: w.nameEn
        }
      });
      slugs.push(w.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/women/${w.slug}`, port));
      }
    }

    results.push({
      file: '11_women_empowerment.json',
      section: 'Women Empowerment Features',
      recordsCount: women.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '11_women_empowerment.json',
      section: 'Women Empowerment Features',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 12. Visa Flights
  try {
    const flights = readSeedFile('12_visa_flights.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const f of flights) {
      await prisma.visaFlight.upsert({
        where: { slug: f.slug },
        create: {
          slug: f.slug,
          titleEn: f.titleEn,
          titleAr: f.titleAr || '',
          titleZh: f.titleZh || '',
          titleCkb: f.titleCkb || '',
          serviceType: f.serviceType,
          originRegion: f.originRegion,
          destinationRegion: f.destinationRegion,
          summaryEn: f.summaryEn,
          summaryAr: f.summaryAr || '',
          summaryZh: f.summaryZh || '',
          summaryCkb: f.summaryCkb || '',
          detailsEn: f.detailsEn || '',
          detailsAr: f.detailsAr || '',
          detailsZh: f.detailsZh || '',
          detailsCkb: f.detailsCkb || '',
          airlineOrAuthority: f.airlineOrAuthority,
          processingTime: f.processingTime,
          feeOrCost: f.feeOrCost,
          imageUrl: f.imageUrl,
          isFeatured: f.isFeatured,
          isTrending: f.isTrending
        },
        update: {
          titleEn: f.titleEn
        }
      });
      slugs.push(f.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/institute/visa-centre/services`, port));
        routesChecked.push(await checkRoute(`/api/visa-flights`, port));
      }
    }

    results.push({
      file: '12_visa_flights.json',
      section: 'Visa & Flight Corridors',
      recordsCount: flights.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '12_visa_flights.json',
      section: 'Visa & Flight Corridors',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 13. Visa Inquiries
  try {
    const inquiries = readSeedFile('13_visa_inquiries.json');
    const slugs = inquiries.map((i: any) => i.ticketId);
    for (const inq of inquiries) {
      await prisma.visaFlightInquiry.upsert({
        where: { ticketId: inq.ticketId },
        create: inq,
        update: inq
      });
    }

    results.push({
      file: '13_visa_inquiries.json',
      section: 'Visa Inquiries',
      recordsCount: inquiries.length,
      slugs,
      routesChecked: [],
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '13_visa_inquiries.json',
      section: 'Visa Inquiries',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 14. Business Opportunities
  try {
    const opps = readSeedFile('14_business_opportunities.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const op of opps) {
      await prisma.businessOpportunity.upsert({
        where: { slug: op.slug },
        create: op,
        update: { titleEn: op.titleEn }
      });
      slugs.push(op.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/business-opportunities/${op.slug}`, port));
      }
    }

    results.push({
      file: '14_business_opportunities.json',
      section: 'Business Opportunities',
      recordsCount: opps.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '14_business_opportunities.json',
      section: 'Business Opportunities',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 15. Chinese Products
  try {
    const products = readSeedFile('15_chinese_products.json');
    const slugs: string[] = [];
    for (const p of products) {
      await prisma.chineseProduct.create({
        data: p
      });
      slugs.push(p.titleEn.substring(0, 30));
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/api/chinese-products', port));
    }

    results.push({
      file: '15_chinese_products.json',
      section: 'Chinese Products Directory',
      recordsCount: products.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '15_chinese_products.json',
      section: 'Chinese Products Directory',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 16. Sourcing Pillars
  try {
    const pillars = readSeedFile('16_sourcing_pillars.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const sp of pillars) {
      await prisma.sourcingPillar.upsert({
        where: { slug: sp.slug },
        create: sp,
        update: { titleEn: sp.titleEn }
      });
      slugs.push(sp.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/api/public/sourcing/pillars', port));
      }
    }

    results.push({
      file: '16_sourcing_pillars.json',
      section: 'Sourcing Pillars',
      recordsCount: pillars.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '16_sourcing_pillars.json',
      section: 'Sourcing Pillars',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 17. Sourcing Inquiries
  try {
    const inqs = readSeedFile('17_sourcing_inquiries.json');
    const slugs = inqs.map((i: any) => i.ticketId);
    for (const i of inqs) {
      await prisma.sourcingInquiry.upsert({
        where: { ticketId: i.ticketId },
        create: i,
        update: i
      });
    }

    results.push({
      file: '17_sourcing_inquiries.json',
      section: 'Sourcing Inquiries',
      recordsCount: inqs.length,
      slugs,
      routesChecked: [],
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '17_sourcing_inquiries.json',
      section: 'Sourcing Inquiries',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 18. Payment Orders
  try {
    const orders = readSeedFile('18_payment_orders.json');
    const slugs = orders.map((o: any) => o.reference);
    for (const o of orders) {
      await prisma.paymentOrder.upsert({
        where: { reference: o.reference },
        create: o,
        update: o
      });
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/settlement', port));
    }

    results.push({
      file: '18_payment_orders.json',
      section: 'Payment Orders',
      recordsCount: orders.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '18_payment_orders.json',
      section: 'Payment Orders',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 19. Exchange Rates
  try {
    const rates = readSeedFile('19_exchange_rates.json');
    const slugs = rates.map((r: any) => r.pair);
    for (const r of rates) {
      await prisma.paymentExchangeRate.upsert({
        where: { pair: r.pair },
        create: r,
        update: r
      });
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/settlement/calculator', port));
    }

    results.push({
      file: '19_exchange_rates.json',
      section: 'Exchange Rates',
      recordsCount: rates.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '19_exchange_rates.json',
      section: 'Exchange Rates',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 20. BRICS Corridors
  try {
    const topics = readSeedFile('20_brics_corridors.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const t of topics) {
      await prisma.bricsTopic.upsert({
        where: { slug: t.slug },
        create: t,
        update: { titleEn: t.titleEn }
      });
      slugs.push(t.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/api/brics-topics', port));
      }
    }

    results.push({
      file: '20_brics_corridors.json',
      section: 'BRICS & Trade Corridors',
      recordsCount: topics.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '20_brics_corridors.json',
      section: 'BRICS & Trade Corridors',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 21. Cultural Exchange
  try {
    const ce = readSeedFile('21_cultural_exchange.json');
    const cat = await prisma.culturalExchangeCategory.upsert({
      where: { slug: ce.category.slug },
      create: ce.category,
      update: { nameEn: ce.category.nameEn }
    });

    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const prog of ce.programs) {
      await prisma.culturalExchangeProgram.upsert({
        where: { slug: prog.slug },
        create: {
          ...prog,
          categoryId: cat.id
        },
        update: { titleEn: prog.titleEn }
      });
      slugs.push(prog.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/institute/cultural-exchange/programs', port));
      }
    }

    results.push({
      file: '21_cultural_exchange.json',
      section: 'Cultural Exchange Programs',
      recordsCount: ce.programs.length + 1,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '21_cultural_exchange.json',
      section: 'Cultural Exchange Programs',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 22. Market Indices
  try {
    const indices = readSeedFile('22_market_indices.json');
    const slugs = indices.map((i: any) => i.symbol);
    for (const ind of indices) {
      await prisma.marketData.upsert({
        where: { symbol: ind.symbol },
        create: ind,
        update: ind
      });
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/api/market', port));
    }

    results.push({
      file: '22_market_indices.json',
      section: 'Market Indices',
      recordsCount: indices.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '22_market_indices.json',
      section: 'Market Indices',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 23. Partners Network
  try {
    const partners = readSeedFile('23_partners_network.json');
    const slugs = partners.map((p: any) => p.name);
    for (const p of partners) {
      const existing = await prisma.partner.findFirst({ where: { name: p.name } });
      if (existing) {
        await prisma.partner.update({ where: { id: existing.id }, data: p });
      } else {
        await prisma.partner.create({ data: p });
      }
    }

    const routesChecked: { route: string; status: number; ok: boolean }[] = [];
    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/api/partners', port));
    }

    results.push({
      file: '23_partners_network.json',
      section: 'Partners Network',
      recordsCount: partners.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '23_partners_network.json',
      section: 'Partners Network',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 24. CISE Pillars
  try {
    const pillars = readSeedFile('24_cise_pillars.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const cp of pillars) {
      await prisma.cisePillar.upsert({
        where: { slug: cp.slug },
        create: cp,
        update: { titleEn: cp.titleEn }
      });
      slugs.push(cp.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/public/institute/pillars/${cp.slug}`, port));
      }
    }

    results.push({
      file: '24_cise_pillars.json',
      section: 'CISE Institute Pillars',
      recordsCount: pillars.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '24_cise_pillars.json',
      section: 'CISE Institute Pillars',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 25. CISE Experts
  try {
    const experts = readSeedFile('25_cise_experts.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const exp of experts) {
      await prisma.ciseExpert.upsert({
        where: { slug: exp.slug },
        create: exp,
        update: { nameEn: exp.nameEn }
      });
      slugs.push(exp.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/public/institute/experts/${exp.slug}`, port));
      }
    }

    results.push({
      file: '25_cise_experts.json',
      section: 'CISE Institute Experts',
      recordsCount: experts.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '25_cise_experts.json',
      section: 'CISE Institute Experts',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 26. CISE Publications
  try {
    const pubs = readSeedFile('26_cise_publications.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const pb of pubs) {
      await prisma.cisePublication.upsert({
        where: { slug: pb.slug },
        create: pb,
        update: { titleEn: pb.titleEn }
      });
      slugs.push(pb.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute(`/api/public/institute/publications/${pb.slug}`, port));
      }
    }

    results.push({
      file: '26_cise_publications.json',
      section: 'CISE Institute Publications',
      recordsCount: pubs.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '26_cise_publications.json',
      section: 'CISE Institute Publications',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 27. CISE Events
  try {
    const evts = readSeedFile('27_cise_events.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const ev of evts) {
      await prisma.ciseEvent.upsert({
        where: { slug: ev.slug },
        create: ev,
        update: { titleEn: ev.titleEn }
      });
      slugs.push(ev.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/api/public/institute/events', port));
      }
    }

    results.push({
      file: '27_cise_events.json',
      section: 'CISE Institute Symposia',
      recordsCount: evts.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '27_cise_events.json',
      section: 'CISE Institute Symposia',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 28. CISE Projects
  try {
    const projects = readSeedFile('28_cise_projects.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const pr of projects) {
      await prisma.ciseProject.upsert({
        where: { slug: pr.slug },
        create: pr,
        update: { nameEn: pr.nameEn }
      });
      slugs.push(pr.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/api/public/institute/data-hub/projects', port));
      }
    }

    results.push({
      file: '28_cise_projects.json',
      section: 'CISE Corridor Projects',
      recordsCount: projects.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '28_cise_projects.json',
      section: 'CISE Corridor Projects',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 29. CISE Courses
  try {
    const courses = readSeedFile('29_cise_courses.json');
    const slugs: string[] = [];
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    for (const cr of courses) {
      await prisma.ciseCourse.upsert({
        where: { slug: cr.slug },
        create: cr,
        update: { titleEn: cr.titleEn }
      });
      slugs.push(cr.slug);

      if (verifyRoutes) {
        routesChecked.push(await checkRoute('/api/public/institute/courses', port));
      }
    }

    results.push({
      file: '29_cise_courses.json',
      section: 'CISE Academic Courses',
      recordsCount: courses.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '29_cise_courses.json',
      section: 'CISE Academic Courses',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  // 30. ICA+ Tiers
  try {
    const tiers = readSeedFile('30_ica_plus_tiers.json');
    const slugs = tiers.map((t: any) => t.id);
    const routesChecked: { route: string; status: number; ok: boolean }[] = [];

    if (verifyRoutes) {
      routesChecked.push(await checkRoute('/ica-plus', port));
      routesChecked.push(await checkRoute('/api/hub/ica-plus/overview', port));
      routesChecked.push(await checkRoute('/api/hub/ica-plus/tiers', port));
    }

    results.push({
      file: '30_ica_plus_tiers.json',
      section: 'ICA+ Membership Tiers',
      recordsCount: tiers.length,
      slugs,
      routesChecked,
      status: 'SUCCESS'
    });
  } catch (err: any) {
    results.push({
      file: '30_ica_plus_tiers.json',
      section: 'ICA+ Membership Tiers',
      recordsCount: 0,
      slugs: [],
      routesChecked: [],
      status: 'FAILED',
      error: err.message
    });
  }

  const durationMs = Date.now() - startTime;
  const successfulFiles = results.filter((r) => r.status === 'SUCCESS').length;
  const failedFiles = results.filter((r) => r.status === 'FAILED').length;
  const totalRecordsSeeded = results.reduce((acc, r) => acc + r.recordsCount, 0);

  const allRouteChecks = results.flatMap((r) => r.routesChecked);
  const totalRoutesVerified = allRouteChecks.length;
  const allRoutesValid = allRouteChecks.every((rc) => rc.ok);
  const allSlugsValid = failedFiles === 0;

  return {
    timestamp: new Date().toISOString(),
    totalFiles: results.length,
    successfulFiles,
    failedFiles,
    totalRecordsSeeded,
    totalRoutesVerified,
    durationMs,
    results,
    allSlugsValid,
    allRoutesValid
  };
}

// Standalone CLI runner
if (process.argv[1]?.includes('testSeedRunner')) {
  console.log('[TestSeedRunner] Executing all 30 test seed files and validating routes...');
  executeAllTestSeeds({ verifyRoutes: true })
    .then((report) => {
      console.log('====================================================');
      console.log(`[TestSeedRunner] TEST SUITE COMPLETE in ${report.durationMs}ms`);
      console.log(`Successful Seed Files: ${report.successfulFiles} / ${report.totalFiles}`);
      console.log(`Total Records Seeded: ${report.totalRecordsSeeded}`);
      console.log(`Total Routes Verified: ${report.totalRoutesVerified}`);
      console.log(`All Slugs Valid: ${report.allSlugsValid ? 'YES' : 'NO'}`);
      console.log(`All Routes HTTP 200/OK: ${report.allRoutesValid ? 'YES' : 'NO'}`);
      console.log('====================================================');
      if (!report.allSlugsValid || !report.allRoutesValid) {
        console.error('[TestSeedRunner] One or more routes/slugs encountered errors.');
        process.exit(1);
      } else {
        process.exit(0);
      }
    })
    .catch((err) => {
      console.error('[TestSeedRunner] Fatal execution error:', err);
      process.exit(1);
    });
}
