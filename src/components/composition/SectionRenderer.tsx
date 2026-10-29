import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Radio, Activity, BarChart3, Globe, TrendingUp, 
  Layers, BookOpen, LineChart, Users, Film, Calendar, 
  Building2, Mail, Smartphone, ExternalLink, ChevronRight, 
  Play, Download, CheckCircle, Clock, ArrowUpRight, ShieldCheck,
  Eye, Edit3
} from 'lucide-react';
import { toast } from 'sonner';
import { 
  PageSectionModel, 
  SectionItemModel, 
  CanonicalSectionType,
  safeJsonParse, 
  getLocalizedText,
  getCanonicalSectionTitle
} from '../../types/composition';
import { Locale } from '../../types';
import { StyleOverrides } from '../../types/controlModel';

interface SectionRendererProps {
  section: PageSectionModel;
  lang?: Locale | string;
  isPreview?: boolean;
  onEdit?: () => void;
  className?: string;
  isLoading?: boolean;
}

function SectionSkeleton({ type }: { type: string }) {
  return (
    <div className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
            <div className="h-8 w-72 bg-neutral-300 dark:bg-neutral-700 rounded-lg"></div>
          </div>
          <div className="h-10 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-xl hidden sm:block"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 space-y-4 shadow-sm">
              <div className="h-48 w-full bg-neutral-200 dark:bg-neutral-700 rounded-xl"></div>
              <div className="h-5 w-3/4 bg-neutral-300 dark:bg-neutral-600 rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded"></div>
                <div className="h-3 w-5/6 bg-neutral-200 dark:bg-neutral-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  lang = 'en',
  isPreview = false,
  onEdit,
  className = '',
  isLoading = false
}) => {
  // If hidden and not in preview mode, don't render
  if (section.visibility === 'hidden' && !isPreview) {
    return null;
  }

  // Parse config and style overrides
  const config = safeJsonParse<Record<string, any>>(section.config, {});
  const styleOverrides = safeJsonParse<StyleOverrides>(section.styleOverride, {});
  const items = section.items || [];

  // Compute inline styles from overrides
  const customStyle: React.CSSProperties = {
    backgroundColor: styleOverrides.backgroundColor || undefined,
    color: styleOverrides.textColor || undefined,
    borderColor: styleOverrides.borderColor || undefined,
    borderRadius: styleOverrides.borderRadius || undefined,
    padding: styleOverrides.padding || undefined,
    margin: styleOverrides.margin || undefined,
    boxShadow: styleOverrides.shadow || undefined
  };

  const isRtl = lang === 'ar' || lang === 'ckb';

  if (isLoading) {
    return (
      <div 
        className={`relative group w-full transition-all duration-300 ${className}`}
        style={customStyle}
        data-section-id={section.id}
        data-section-type={section.type}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <SectionSkeleton type={section.type} />
      </div>
    );
  }

  return (
    <div 
      className={`relative group w-full opacity-100 pointer-events-auto ${section.visibility === 'hidden' ? 'opacity-60 border-2 border-dashed border-amber-400' : ''} ${className}`}
      style={customStyle}
      data-section-id={section.id}
      data-section-type={section.type}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Admin Quick Indicator / Edit Badge in Preview */}
      {isPreview && (
        <div className="absolute top-3 end-3 z-30 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-lg pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="uppercase tracking-wider">{section.type}</span>
          {section.visibility === 'hidden' && (
            <span className="text-amber-400">(HIDDEN)</span>
          )}
          {onEdit && (
            <button
              onClick={onEdit}
              className="ms-1 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1"
              title="Edit in CISE Command Hub"
            >
              <Edit3 size={11} />
            </button>
          )}
        </div>
      )}

      {/* Render the specific canonical type */}
      {renderCanonicalType(section.type as CanonicalSectionType, section, items, config, lang)}
    </div>
  );
};

function renderCanonicalType(
  type: CanonicalSectionType,
  section: PageSectionModel,
  items: SectionItemModel[],
  config: Record<string, any>,
  lang: string
) {
  switch (type) {
    case 'hero':
      return <RenderHero section={section} items={items} config={config} lang={lang} />;
    case 'live-broadcast':
      return <RenderLiveBroadcast section={section} items={items} config={config} lang={lang} />;
    case 'ticker':
      return <RenderTicker section={section} items={items} config={config} lang={lang} />;
    case 'stats-strip':
      return <RenderStatsStrip section={section} items={items} config={config} lang={lang} />;
    case 'world-stories':
      return <RenderWorldStories section={section} items={items} config={config} lang={lang} />;
    case 'trending':
      return <RenderTrending section={section} items={items} config={config} lang={lang} />;
    case 'strategic-initiatives':
      return <RenderStrategicInitiatives section={section} items={items} config={config} lang={lang} />;
    case 'featured-publications':
      return <RenderFeaturedPublications section={section} items={items} config={config} lang={lang} />;
    case 'data-snapshot':
      return <RenderDataSnapshot section={section} items={items} config={config} lang={lang} />;
    case 'expert-spotlight':
      return <RenderExpertSpotlight section={section} items={items} config={config} lang={lang} />;
    case 'media-preview':
      return <RenderMediaPreview section={section} items={items} config={config} lang={lang} />;
    case 'upcoming-events':
      return <RenderUpcomingEvents section={section} items={items} config={config} lang={lang} />;
    case 'partners-marquee':
      return <RenderPartnersMarquee section={section} items={items} config={config} lang={lang} />;
    case 'partners-marquee-black':
      return <RenderPartnersMarqueeBlack section={section} items={items} config={config} lang={lang} />;
    case 'newsletter-signup':
      return <RenderNewsletterSignup section={section} items={items} config={config} lang={lang} />;
    case 'app-download-pwa':
      return <RenderAppDownloadPwa section={section} items={items} config={config} lang={lang} />;
    default:
      return <RenderFallbackSection section={section} items={items} lang={lang} />;
  }
}

// ================= 1. HERO =================
function RenderHero({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const defaultHeadline = lang === 'ar' ? 'الشراكة السيادية العراقية الصينية والبوابة الاستراتيجية' :
    lang === 'zh' ? '中伊战略伙伴关系与主权经贸发展中枢' :
    lang === 'ckb' ? 'هاوبەشی سەروەری عێراقی-چینی و دەروازەی ستراتیژی' :
    'Sino-Iraqi Sovereign Partnership & Strategic Gateway';

  const defaultEyebrow = lang === 'ar' ? 'البوابة الدبلوماسية والاقتصادية الثنائية الرسمية' :
    lang === 'zh' ? '官方双边外交与经贸中枢' :
    lang === 'ckb' ? 'دەروازەی فەرمی دیپلۆماسی و ئابووری دوولایەنە' :
    'OFFICIAL BILATERAL DIPLOMATIC & ECONOMIC GATEWAY';

  const defaultBody = lang === 'ar' ? 'المعلومات الاستخباراتية السيادية المباشرة، وقنوات التكامل الاقتصادي، وجسور التبادل الثقافي بين العراق والصين.' :
    lang === 'zh' ? '连接伊拉克共和国与中华人民共和国的主权战略情报、本币清算通道与人文交流纽带。' :
    lang === 'ckb' ? 'زانیارییە ستراتیژییەکان، کەناڵەکانی دارایی و پەیوەندییە کەلتوورییەکان.' :
    'Direct sovereign intelligence, economic integration rails, and strategic partnership.';

  const defaultCta = lang === 'ar' ? 'استكشف المبادرات' :
    lang === 'zh' ? '探索重点项目' :
    lang === 'ckb' ? 'دەستپێشخەرییەکان ببینە' :
    'Explore Initiatives';

  const headline = getLocalizedText(item.title, lang, defaultHeadline);
  const eyebrow = getLocalizedText(item.subtitle, lang, defaultEyebrow);
  const body = getLocalizedText(item.body, lang, defaultBody);
  const ctaLabel = getLocalizedText(item.ctaLabel, lang, defaultCta);
  const ctaHref = item.ctaHref || `/${lang}/initiatives`;

  return (
    <section className="w-full relative overflow-hidden bg-red-600 text-white py-12 sm:py-16 lg:py-20 2xl:py-24 px-4 sm:px-6 lg:px-8 border-b border-red-700 shadow-md">
      <div className="relative z-10 w-full max-w-5xl 2xl:max-w-6xl mx-auto text-center space-y-4 sm:space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-[10px] sm:text-xs font-black tracking-widest uppercase backdrop-blur-xs">
          <Sparkles size={13} className="text-white shrink-0" />
          <span className="truncate">{eyebrow}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-black tracking-tight text-white leading-tight ica-heading">
          {headline}
        </h1>
        <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-red-50 font-medium leading-relaxed px-2">
          {body}
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto">
          <Link
            to={ctaHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-red-50 active:scale-98 text-red-600 font-black rounded-xl text-xs sm:text-sm transition-all shadow-md hover:shadow-lg min-h-[48px] w-full sm:w-auto"
          >
            <span>{ctaLabel}</span>
            <ChevronRight size={16} className="rtl:rotate-180" />
          </Link>
          <Link
            to={`/${lang}/settlement`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-red-700 hover:bg-red-800 text-white font-black rounded-xl text-xs sm:text-sm transition-all border border-red-500/50 shadow-xs min-h-[48px] w-full sm:w-auto"
          >
            <span>{lang === 'ar' ? 'بوابة التسوية المالية' : lang === 'zh' ? '结算网关' : lang === 'ckb' ? 'دەروازەی پاکتاو' : 'Settlement Gateway'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ================= 2. LIVE BROADCAST =================
function RenderLiveBroadcast({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const defaultTitle = lang === 'ar' ? 'بث حي: منتدى الغرفة الدبلوماسية بغداد-بكين 2026' :
    lang === 'zh' ? '正在直播：2026巴格达-北京双边外交与投资论坛' :
    lang === 'ckb' ? 'پەخشی ڕاستەوخۆ: کۆڕبەندی بەغدا-پەکین ٢٠٢٦' :
    'ON AIR: Baghdad-Beijing Diplomatic Chamber Forum 2026';

  const defaultSub = lang === 'ar' ? 'بث متزامن فائق الدقة بـ 4 لغات' :
    lang === 'zh' ? '四语同声传译 4K 超低延迟直播' :
    lang === 'ckb' ? 'پەخشی چوارزمانە بە کوالیتی بەرز' :
    'Simultaneous 4K Quad-Lingual Transmission';

  const defaultCta = lang === 'ar' ? 'شاهد البث الحي' :
    lang === 'zh' ? '进入直播大厅' :
    lang === 'ckb' ? 'سەیری پەخش بکە' :
    'Join Broadcast Stream';

  const title = getLocalizedText(item.title, lang, defaultTitle);
  const subtitle = getLocalizedText(item.subtitle, lang, defaultSub);
  const ctaLabel = getLocalizedText(item.ctaLabel, lang, defaultCta);
  const ctaHref = item.ctaHref || `/${lang}/live`;

  return (
    <div className="w-full bg-red-700 text-white py-3 sm:py-3.5 px-3 sm:px-8 border-y border-red-800 shadow-md">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-start">
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap justify-center sm:justify-start">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-white text-red-600 text-[10px] sm:text-[11px] font-black px-2 sm:px-2.5 py-1 rounded-md uppercase tracking-widest shadow-sm">
            <Radio size={13} className="animate-pulse shrink-0" />
            <span>{lang === 'ar' ? 'مباشر' : lang === 'zh' ? '正在直播' : lang === 'ckb' ? 'ڕاستەوخۆ' : 'LIVE'}</span>
          </div>
          <div className="min-w-0">
            <span className="text-xs sm:text-sm font-black text-white tracking-wide">{title}</span>
            <span className="hidden sm:inline-block ms-2 text-xs text-red-100 font-medium">| {subtitle}</span>
          </div>
        </div>
        <Link
          to={ctaHref}
          className="inline-flex items-center justify-center gap-2 text-xs font-black text-red-600 bg-white hover:bg-red-50 px-4 py-2 rounded-lg shadow-sm transition-all shrink-0 w-full sm:w-auto min-h-[40px]"
        >
          <Play size={13} className="text-red-600 fill-current shrink-0" />
          <span>{ctaLabel}</span>
        </Link>
      </div>
    </div>
  );
}

// ================= 3. TICKER =================
function RenderTicker({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <div className="w-full bg-neutral-900 text-neutral-200 py-2.5 px-3 sm:px-6 border-b border-neutral-800 text-xs font-sans">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-red-400 font-black uppercase tracking-wider shrink-0 bg-red-950/60 px-2 py-1 rounded">
          <Activity size={13} className="shrink-0" />
          <span>{lang === 'ar' ? 'البرقيات' : lang === 'zh' ? '即时电讯' : lang === 'ckb' ? 'تێلیگراف' : 'WIRE'}</span>
        </div>
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-6 sm:gap-8 whitespace-nowrap">
          {items.map((item, idx) => {
            const fallbackHeadline = lang === 'ar' ? `برقية استخبارية #${idx + 1}` :
              lang === 'zh' ? `双边机要电讯 #${idx + 1}` :
              lang === 'ckb' ? `تێلیگرافی بەپەلە #${idx + 1}` :
              `Telegraph dispatch #${idx + 1}`;
            const headline = getLocalizedText(item.title, lang, fallbackHeadline);
            return (
              <Link 
                key={item.id || idx}
                to={item.ctaHref || `/${lang}/newsroom`}
                className="hover:text-white transition-colors flex items-center gap-2 group min-h-[36px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                <span className="truncate">{headline}</span>
                <ArrowUpRight size={11} className="opacity-50 group-hover:opacity-100 transition-opacity rtl:rotate-270 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ================= 4. STATS STRIP =================
function RenderStatsStrip({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="w-full bg-white dark:bg-neutral-950 py-8 sm:py-10 px-4 sm:px-6 lg:px-8 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
        {items.map((it, idx) => {
          const val = getLocalizedText(it.title, lang, '0');
          const lbl = getLocalizedText(it.subtitle, lang, lang === 'ar' ? 'مؤشر كمي' : lang === 'zh' ? '战略指标' : lang === 'ckb' ? 'ئامار' : 'Metric');
          return (
            <div key={it.id || idx} className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-100 dark:border-neutral-800/80">
              <div className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-black text-red-700 dark:text-red-500 tracking-tight font-serif mb-1">
                {val}
              </div>
              <div className="text-[11px] sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                {lbl}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ================= 5. WORLD STORIES =================
function RenderWorldStories({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Globe className="text-red-700 shrink-0" size={22} />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'قسم التقارير والتحليلات الدولية' : lang === 'zh' ? '全球战略视野与深度专稿' : lang === 'ckb' ? 'ڕاپۆرتە جیهانی و ستراتیژییەکان' : 'World Stories & Strategic Analysis')}
            </h2>
          </div>
          <Link to={`/${lang}/newsroom`} className="text-xs font-bold text-red-700 dark:text-red-400 hover:underline flex items-center gap-1 self-start sm:self-auto min-h-[36px]">
            <span>{lang === 'ar' ? 'عرض الكل' : lang === 'zh' ? '查看全部' : lang === 'ckb' ? 'هەمووی ببینە' : 'View All'}</span>
            <ChevronRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <Globe className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Global strategic analysis reports pending publication...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackTitle = lang === 'ar' ? 'ملف دبلوماسي' : lang === 'zh' ? '双边机要分析' : lang === 'ckb' ? 'شیکاری دیپلۆماسی' : 'Diplomatic Dossier';
            const title = getLocalizedText(it.title, lang, fallbackTitle);
            const body = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="text-[10px] sm:text-[11px] font-black text-red-700 uppercase tracking-widest">
                    {lang === 'ar' ? 'استخبارات ثنائية' : lang === 'zh' ? '双边战略情报' : lang === 'ckb' ? 'هەواڵگری دوولایەنە' : 'BILATERAL INTELLIGENCE'}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {body}
                  </p>
                </div>
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                  <Link to={it.ctaHref || `/${lang}/newsroom`} className="text-xs font-bold text-red-700 hover:text-red-800 flex items-center gap-1 min-h-[36px]">
                    <span>{lang === 'ar' ? 'قراءة التحليل' : lang === 'zh' ? '深度研读' : lang === 'ckb' ? 'خوێندنەوەی شیکاری' : 'Read Dossier'}</span>
                    <ArrowUpRight size={13} className="rtl:rotate-270" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 6. TRENDING =================
function RenderTrending({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <TrendingUp className="text-red-700 shrink-0" size={20} />
          <h2 className="text-lg sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
            {getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'الأكثر قراءة وتداولاً' : lang === 'zh' ? '高关注度热门议题排行榜' : lang === 'ckb' ? 'باوترین بابەتەکان' : 'Trending Bilateral Decrees & Policy Papers')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {items.map((it, idx) => {
            const fallbackHighlight = lang === 'ar' ? 'موضوع متصدر' : lang === 'zh' ? '焦点议题' : lang === 'ckb' ? 'بابەتی باو' : 'Trending Highlight';
            const title = getLocalizedText(it.title, lang, fallbackHighlight);
            return (
              <Link
                key={it.id || idx}
                to={it.ctaHref || `/${lang}/newsroom`}
                className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-red-600 bg-neutral-50/50 dark:bg-neutral-900/40 transition-colors group min-h-[48px]"
              >
                <span className="text-xl sm:text-2xl font-black text-neutral-300 dark:text-neutral-700 group-hover:text-red-600 transition-colors shrink-0 font-serif">
                  0{idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-red-700 transition-colors leading-snug">
                  {title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 7. STRATEGIC INITIATIVES =================
function RenderStrategicInitiatives({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const fallbackSectionTitle = lang === 'ar' ? 'المبادرات الاستراتيجية الثماني' : 
                               lang === 'zh' ? '八大主权旗舰战略举措' : 
                               lang === 'ckb' ? 'دەستپێشخەرییە ستراتیژییەکان' : 
                               'Eight Sovereign Bilateral Initiatives';

  const defaultBadge = lang === 'ar' ? 'المشاريع السيادية لمعهد CISE' : 
                       lang === 'zh' ? 'CISE 主权旗舰工程' : 
                       lang === 'ckb' ? 'پڕۆژە سەروەرییەکانی CISE' : 
                       'CISE SOVEREIGN FLAGSHIPS';

  const defaultCta = lang === 'ar' ? 'استكشف المبادرة' : 
                     lang === 'zh' ? '查看举措' : 
                     lang === 'ckb' ? 'دەستپێشخەری ببینە' : 
                     'Access Initiative';

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-8 sm:space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600">
            <Layers size={14} className="shrink-0" />
            <span>{defaultBadge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-neutral-900 dark:text-white font-serif tracking-tight">
            {getCanonicalSectionTitle(section, lang, fallbackSectionTitle)}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <Layers className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Strategic initiatives data synchronization in progress...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackInitiative = lang === 'ar' ? 'مبادرة استراتيجية' : lang === 'zh' ? '战略举措' : lang === 'ckb' ? 'دەستپێشخەری ستراتیژی' : 'Strategic Initiative';
            const title = getLocalizedText(it.title, lang, fallbackInitiative);
            const subtitle = getLocalizedText(it.subtitle, lang, '');
            const ctaLabel = getLocalizedText(it.ctaLabel, lang, defaultCta);

            return (
              <Link
                key={it.id || idx}
                to={it.ctaHref || `/${lang}/initiatives`}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:border-red-600 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group min-h-[190px]"
              >
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-xs group-hover:scale-105 transition-transform">
                    {idx + 1}
                  </div>
                  <h3 className="text-base sm:text-lg font-black text-neutral-900 dark:text-white group-hover:text-red-600 transition-colors">
                    {title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {subtitle}
                  </p>
                </div>
                <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-between text-xs font-bold text-red-600 min-h-[36px]">
                  <span>{ctaLabel}</span>
                  <ChevronRight size={15} className="rtl:rotate-180" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 8. FEATURED PUBLICATIONS =================
function RenderFeaturedPublications({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const fallbackSectionTitle = lang === 'ar' ? 'الدراسات والبحوث الاستراتيجية المحكمة' : 
                               lang === 'zh' ? '智库权威学术著作与深度报告' : 
                               lang === 'ckb' ? 'توێژینەوە و بڵاوکراوە نایابەکان' : 
                               'Peer-Reviewed Strategic Publications';

  const defaultArchiveLabel = lang === 'ar' ? 'أرشيف الدراسات' : 
                              lang === 'zh' ? '学术报告库' : 
                              lang === 'ckb' ? 'ئەرشیفی توێژینەوە' : 
                              'Publications Archive';

  const defaultBadge = lang === 'ar' ? 'دراسة محكمة' : 
                       lang === 'zh' ? '同行评审权威报告' : 
                       lang === 'ckb' ? 'توێژینەوەی باوەڕپێکراو' : 
                       'PEER-REVIEWED';

  const defaultDownloadLabel = lang === 'ar' ? 'تحميل الوثيقة' : 
                               lang === 'zh' ? '下载全文' : 
                               lang === 'ckb' ? 'دابەزاندنی فایل' : 
                               'Download Dossier';

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <BookOpen className="text-red-700 shrink-0" size={22} />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getCanonicalSectionTitle(section, lang, fallbackSectionTitle)}
            </h2>
          </div>
          <Link to={`/${lang}/institute/publications`} className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1 self-start sm:self-auto min-h-[36px]">
            <span>{defaultArchiveLabel}</span>
            <ChevronRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <BookOpen className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Academic research library indexing in progress...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackTitle = lang === 'ar' ? 'دراسة بحثية' : lang === 'zh' ? '学术课题报告' : lang === 'ckb' ? 'توێژینەوە' : 'Research Study';
            const title = getLocalizedText(it.title, lang, fallbackTitle);
            const body = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5 sm:space-y-3">
                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-50 dark:bg-red-950/60 px-2 py-0.5 rounded">
                    {defaultBadge}
                  </span>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                    {body}
                  </p>
                </div>
                <Link to={it.ctaHref || `/${lang}/institute/publications`} className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1 min-h-[36px]">
                  <Download size={13} className="shrink-0" />
                  <span>{defaultDownloadLabel}</span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 9. DATA SNAPSHOT =================
function RenderDataSnapshot({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-4 sm:space-y-6">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <LineChart className="text-red-600 shrink-0" size={22} />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
            {getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'مرصد البيانات الاقتصادية والمشاريع' : lang === 'zh' ? '经贸大数据与重点工程全景看板' : lang === 'ckb' ? 'داتای ئابووری و چاودێری پڕۆژەکان' : 'Real-Time Economic & Corridor Data Telemetry')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
              <LineChart className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Economic telemetry sensors initializing...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const title = getLocalizedText(it.title, lang, '');
            const subtitle = getLocalizedText(it.subtitle, lang, '');
            return (
              <div key={it.id || idx} className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-xs space-y-2">
                <div className="text-2xl sm:text-3xl font-black text-red-600 font-serif">
                  {title}
                </div>
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  {subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 10. EXPERT SPOTLIGHT =================
function RenderExpertSpotlight({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const fallbackSectionTitle = lang === 'ar' ? 'نخبة الخبراء والزملاء الأكاديميين' : 
                               lang === 'zh' ? '双边顶尖专家与学术导师智库' : 
                               lang === 'ckb' ? 'پسپۆڕان و توێژەرانی باڵا' : 
                               'Bilateral Senior Fellows & Accredited Experts';

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center gap-2.5 sm:gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3 sm:pb-4">
          <Users className="text-red-600 shrink-0" size={22} />
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
            {getCanonicalSectionTitle(section, lang, fallbackSectionTitle)}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
              <Users className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Diplomatic fellows accreditation in progress...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackName = lang === 'ar' ? 'الخبير الدبلوماسي' : lang === 'zh' ? '特聘学者' : lang === 'ckb' ? 'پسپۆڕی باڵا' : 'Fellow Name';
            const fallbackTitle = lang === 'ar' ? 'زميل أكاديمي أول' : lang === 'zh' ? '资深特聘研究员' : lang === 'ckb' ? 'توێژەری باڵا' : 'Senior Fellow';
            const name = getLocalizedText(it.title, lang, fallbackName);
            const title = getLocalizedText(it.subtitle, lang, fallbackTitle);
            const bio = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5 sm:space-y-3">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-red-600 text-white font-black flex items-center justify-center text-sm sm:text-base shadow-xs">
                  {name.charAt(0)}
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                  {name}
                </h3>
                <div className="text-xs text-red-600 dark:text-red-400 font-bold">
                  {title}
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {bio}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 11. MEDIA PREVIEW =================
function RenderMediaPreview({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const fallbackThumbnails = [
    'https://images.unsplash.com/photo-1541888946425-d0fbb1861564?auto=format&fit=crop&w=1200&q=80', // Strategic rail & bridges
    'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80', // Grand Faw maritime port & logistics
    'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&w=1200&q=80', // Historic Silk Road heritage & Chang'an
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80', // Energy grid & industrial infrastructure
  ];

  const durations = ['28:45', '42:10', '35:18', '19:40'];
  const viewCounts = ['14.2K', '28.9K', '19.4K', '33.1K'];
  const categoryPills = [
    lang === 'ar' ? 'وثائقي استراتيجي' : lang === 'zh' ? '国家级纪录片' : lang === 'ckb' ? 'دۆکیۆمێنتاری' : 'Strategic Doc',
    lang === 'ar' ? 'حوار وزاري خاص' : lang === 'zh' ? '部长级专访' : lang === 'ckb' ? 'دیداری تایبەت' : 'Ministerial Dialogue',
    lang === 'ar' ? 'سلسلة حضارية' : lang === 'zh' ? '人文历史系列' : lang === 'ckb' ? 'مێژووی کەلتووری' : 'Cultural Series',
    lang === 'ar' ? 'تحقيق ميداني' : lang === 'zh' ? '现场特写调研' : lang === 'ckb' ? 'ڕاپۆرتی مەیدانی' : 'Field Report',
  ];

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Film className="text-red-600 shrink-0" size={22} />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'معاينة الإنتاج المرئي والوثائقيات' : lang === 'zh' ? '融媒体视听与纪录片专区' : lang === 'ckb' ? 'میدیای بینراو و دۆکیۆمێنتاری' : '4K Documentary Reels & Leadership Dialogues')}
            </h2>
          </div>
          <Link to={`/${lang}/media`} className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 self-start sm:self-auto min-h-[36px]">
            <span>{lang === 'ar' ? 'المركز الإعلامي' : lang === 'zh' ? '融媒体中心' : lang === 'ckb' ? 'ناوەندی میدیا' : 'Media Hub'}</span>
            <ChevronRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-800 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700">
              <Film className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Digital archives synchronization in progress...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackTitle = lang === 'ar' ? 'فيديو وثائقي' : lang === 'zh' ? '主权纪录片' : lang === 'ckb' ? 'ڤیدیۆی دۆکیۆمێنتاری' : 'Documentary Video';
            const title = getLocalizedText(it.title, lang, fallbackTitle);
            const sub = getLocalizedText(it.subtitle, lang, '');
            const thumbUrl = it.image || fallbackThumbnails[idx % fallbackThumbnails.length];
            const duration = durations[idx % durations.length];
            const views = viewCounts[idx % viewCounts.length];
            const categoryPill = categoryPills[idx % categoryPills.length];

            return (
              <Link 
                key={it.id || idx} 
                to={it.ctaHref || `/${lang}/media`} 
                className="group space-y-3 bg-white dark:bg-neutral-800 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-xs hover:border-red-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-video rounded-xl bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden group/thumb shadow-inner">
                  <img
                    src={thumbUrl}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 group-hover:from-black/90 transition-colors" />
                  
                  {/* Glowing centered play badge */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white backdrop-blur-md flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all duration-300 border border-white/30">
                      <Play size={20} className="fill-current translate-x-0.5 rtl:-translate-x-0.5" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-2.5 start-2.5 flex items-center gap-1.5 pointer-events-none">
                    <span className="text-[10px] bg-red-600 text-white font-mono font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      4K HDR
                    </span>
                    <span className="text-[10px] bg-black/60 backdrop-blur-md text-white/90 font-bold px-2 py-0.5 rounded border border-white/10">
                      {categoryPill}
                    </span>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2.5 end-2.5 text-[11px] bg-black/80 backdrop-blur-md text-white font-mono font-bold px-2 py-0.5 rounded border border-white/10 pointer-events-none">
                    {duration}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white group-hover:text-red-600 transition-colors leading-snug line-clamp-2 font-serif">
                    {title}
                  </h3>
                  {sub && (
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1">
                      {sub}
                    </div>
                  )}
                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-red-600 border-t border-neutral-100 dark:border-neutral-700/60 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Play size={12} className="fill-current" />
                      {lang === 'ar' ? 'تشغيل المقطع' : lang === 'zh' ? '观看正片' : lang === 'ckb' ? 'ئێستا سەیر بکە' : 'Watch Feature'}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal font-mono">
                      {views} {lang === 'ar' ? 'مشاهدة' : lang === 'zh' ? '次播放' : lang === 'ckb' ? 'بینین' : 'views'}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 12. UPCOMING EVENTS =================
function RenderUpcomingEvents({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-6 sm:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 sm:pb-4 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Calendar className="text-red-700 shrink-0" size={22} />
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
              {getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'الأجندة والفعاليات الثنائية القادمة' : lang === 'zh' ? '近期重要双边经贸活动与论坛' : lang === 'ckb' ? 'ڕووداو و کۆڕبەندە داهاتووەکان' : 'Upcoming Bilateral Summits & Forums')}
            </h2>
          </div>
          <Link to={`/${lang}/summit`} className="text-xs font-bold text-red-700 hover:underline flex items-center gap-1 self-start sm:self-auto min-h-[36px]">
            <span>{lang === 'ar' ? 'جدول الفعاليات' : lang === 'zh' ? '峰会议程' : lang === 'ckb' ? 'بەرنامەی لووتکە' : 'Summit Agenda'}</span>
            <ChevronRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.length === 0 && (
            <div className="col-span-full py-12 text-center bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
              <Calendar className="mx-auto text-neutral-300 mb-2" size={32} />
              <p className="text-xs text-neutral-400 font-bold uppercase tracking-widest">Upcoming diplomatic summits under coordination...</p>
            </div>
          )}
          {items.map((it, idx) => {
            const fallbackTitle = lang === 'ar' ? 'منتدى ثنائي' : lang === 'zh' ? '双边高层论坛' : lang === 'ckb' ? 'کۆڕبەندی دوولایەنە' : 'Bilateral Forum';
            const fallbackVenue = lang === 'ar' ? 'السليمانية / بكين' : lang === 'zh' ? '苏莱曼尼亚 / 北京' : lang === 'ckb' ? 'سلێمانی / پەکین' : 'Sulaymaniyah / Beijing';
            const title = getLocalizedText(it.title, lang, fallbackTitle);
            const venue = getLocalizedText(it.subtitle, lang, fallbackVenue);
            const desc = getLocalizedText(it.body, lang, '');
            return (
              <div key={it.id || idx} className="p-5 sm:p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-2.5 sm:space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-red-700">
                  <Clock size={13} className="shrink-0" />
                  <span>{lang === 'ar' ? 'جدول فعاليات ٢٠٢٦' : lang === 'zh' ? '2026年度议程' : lang === 'ckb' ? 'خشتەی ٢٠٢٦' : '2026 CALENDAR'}</span>
                </div>
                <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-snug">
                  {title}
                </h3>
                <div className="text-xs text-neutral-500 font-medium">{venue}</div>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                  {desc}
                </p>
                <div className="pt-2 sm:pt-3">
                  <Link to={it.ctaHref || `/${lang}/summit`} className="text-xs font-bold text-red-700 hover:underline min-h-[36px] inline-flex items-center">
                    {lang === 'ar' ? 'التسجيل والحضور' : lang === 'zh' ? '参会报名' : lang === 'ckb' ? 'تۆمارکردن' : 'Register Attendee'} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 13. PARTNERS MARQUEE =================
function RenderPartnersMarquee({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const marqueeItems = items.length > 0 ? items : [
    { id: 'p1', title: 'CSCEC - China State Construction', href: 'https://english.cscec.com', logo: '🏗️' },
    { id: 'p2', title: 'CNOOC - China National Offshore Oil', href: 'https://www.cnoocltd.com', logo: '🛢️' },
    { id: 'p3', title: 'Sinopec Group', href: 'https://www.sinopecgroup.com', logo: '⚡' },
    { id: 'p4', title: 'Industrial and Commercial Bank of China', href: 'https://www.icbc.com.cn', logo: '🏦' },
    { id: 'p5', title: 'Central Bank of Iraq (CBI)', href: 'https://cbi.iq', logo: '🏛️' },
    { id: 'p6', title: 'Ministry of Transport - Republic of Iraq', href: 'https://mot.gov.iq', logo: '🚢' },
    { id: 'p7', title: 'Grand Faw Port Authority', href: 'https://grandfaw.iq', logo: '⚓' },
    { id: 'p8', title: 'Trade Bank of Iraq (TBI)', href: 'https://www.tbiraq.com', logo: '💳' }
  ];

  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="w-full py-8 sm:py-10 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 overflow-hidden relative">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 mb-4 sm:mb-5 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500 bg-neutral-200/60 dark:bg-neutral-800/60 px-3.5 py-1.5 rounded-full">
          <Building2 size={14} className="shrink-0 text-brand-800 dark:text-brand-400" />
          <span>{getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'شريط الشركاء الاستراتيجيين' : lang === 'zh' ? '战略合作伙伴主权机构方阵' : lang === 'ckb' ? 'هاوبەشە ستراتیژییە باوەڕپێکراوەکان' : 'Strategic Partners & Accredited Ministries Marquee')}</span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Edge Gradient Scrims Vanished per User Request */}

        <div className="flex w-max animate-marquee hover:pause-animation items-center gap-4 sm:gap-6 py-2">
          {duplicatedItems.map((it: any, idx) => {
            const name = getLocalizedText(it.title, lang, `Partner ${idx + 1}`);
            const href = it.href || it.ctaHref || `/${lang}/institute/partnerships`;
            const badgeLogo = it.logo || '🏛️';

            return (
              <div 
                key={`${it.id || idx}-${idx}`} 
                className="group px-4 sm:px-5 py-3 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shadow-xs hover:border-brand-800 dark:hover:border-brand-600 transition-all duration-300 shrink-0 flex items-center gap-3.5 min-w-[240px]"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-lg shrink-0 group-hover:bg-brand-800 group-hover:text-white transition-colors">
                  {badgeLogo}
                </div>
                <div className="flex flex-col text-start flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate max-w-[180px]">
                    {name}
                  </span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-800 dark:text-brand-400 hover:underline mt-0.5"
                  >
                    <span>{lang === 'ar' ? 'زيارة الموقع' : lang === 'zh' ? '访问官方网站' : lang === 'ckb' ? 'سەردانی ماڵپەڕ' : 'Visit Website'}</span>
                    <ExternalLink size={10} className="rtl:rotate-180" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 13B. PARTNERS MARQUEE (BLACK EDITION) =================
function RenderPartnersMarqueeBlack({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const marqueeItems = items.length > 0 ? items : [
    { id: 'bp1', title: 'Sino-Iraqi Sovereign Energy Reserve', href: 'https://cbi.iq', logo: '🏛️' },
    { id: 'bp2', title: 'Beijing International Clearing Bank', href: 'https://www.icbc.com.cn', logo: '⚡' },
    { id: 'bp3', title: 'Grand Faw Deepwater Terminal Corp', href: 'https://grandfaw.iq', logo: '⚓' },
    { id: 'bp4', title: 'Silk Road Strategic Fund Beijing', href: 'https://english.cscec.com', logo: '🌐' },
    { id: 'bp5', title: 'Basra Petrochemical Sovereign Grid', href: 'https://www.cnoocltd.com', logo: '🛢️' },
    { id: 'bp6', title: 'Baghdad Ministry of Finance Clearing', href: 'https://mot.gov.iq', logo: '💼' }
  ];

  const duplicatedItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section className="w-full py-12 sm:py-16 bg-black text-white border-y border-neutral-900 overflow-hidden relative shadow-2xl">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-neutral-300 bg-neutral-900/95 border border-neutral-800 px-4 py-2 rounded-full shadow-lg">
          <Building2 size={15} className="text-white shrink-0" />
          <span>{getCanonicalSectionTitle(section, lang, lang === 'ar' ? 'شريط الشركاء الاستراتيجيين (الإصدار الأسود)' : lang === 'zh' ? '战略合作伙伴方阵 (黑金尊享版)' : lang === 'ckb' ? 'هاوبەشە ستراتیژییەکان (نەشری ڕەش)' : 'Strategic Partners Marquee (Black Edition)')}</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto font-medium">
          {lang === 'ar' ? 'الشبكة السيادية الخاصة للشركاء الاستراتيجيين والمؤسسات المصرفية' : lang === 'zh' ? '主权战略合作伙伴与金融机构专属黑金方阵' : lang === 'ckb' ? 'تۆڕی تایبەتی هاوبەشە ستراتیژییەکان و دامەزراوە داراییەکان' : 'Exclusive Sovereign Black Edition Partner Network & Financial Clearing Conclave'}
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* No edge gradients for better visual clarity */}

        <div className="flex w-max animate-marquee hover:pause-animation items-center gap-5 sm:gap-6 py-3">
          {duplicatedItems.map((it: any, idx) => {
            const name = getLocalizedText(it.title, lang, `Elite Partner ${idx + 1}`);
            const href = it.href || it.ctaHref || `/${lang}/institute/partnerships`;
            const badgeLogo = it.logo || '🏛️';

            return (
              <div 
                key={`${it.id || idx}-${idx}`} 
                className="group px-5 sm:px-6 py-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 shadow-2xl hover:border-neutral-600 transition-all duration-300 shrink-0 flex items-center gap-4 min-w-[260px]"
              >
                <div className="w-11 h-11 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-xl shrink-0 group-hover:bg-white group-hover:text-black transition-colors shadow-inner">
                  {badgeLogo}
                </div>
                <div className="flex flex-col text-start flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-black text-white truncate max-w-[190px] tracking-tight">
                    {name}
                  </span>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-400 hover:text-white transition-colors mt-0.5"
                  >
                    <span>{lang === 'ar' ? 'الوصول للشبكة' : lang === 'zh' ? '访问尊享专区' : lang === 'ckb' ? 'سەردانی تۆڕ' : 'Elite Network'}</span>
                    <ExternalLink size={10} className="rtl:rotate-180" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ================= 14. NEWSLETTER SIGNUP =================
function RenderNewsletterSignup({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const defaultTitle = lang === 'ar' ? 'الاشتراك في برقيات التلغراف الدبلوماسية' :
    lang === 'zh' ? '订阅双边机要外交电报内参' :
    lang === 'ckb' ? 'بەشداری لە تێلیگرافە دیپلۆماسییەکان' :
    'Subscribe to Diplomatic Telegraph Dispatches';

  const defaultBody = lang === 'ar' ? 'برقيات استخبارية يومية مباشرة للمندوبين المعتمدين والمديرين التنفيذيين.' :
    lang === 'zh' ? '直接面向认证代表与企业高管的每日机要战略内参直达服务。' :
    lang === 'ckb' ? 'پەیامی هەواڵگری ڕۆژانە بۆ نوێنەران و بەڕێوەبەرانی جێبەجێکار.' :
    'Direct daily intelligence wires for licensed delegates and corporate executives.';

  const defaultCta = lang === 'ar' ? 'اشترك الآن' :
    lang === 'zh' ? '立即订阅' :
    lang === 'ckb' ? 'ئێستا بەشداربە' :
    'Subscribe Now';

  const title = getCanonicalSectionTitle(section, lang, defaultTitle);
  const body = getLocalizedText(item.body, lang, defaultBody);
  const cta = getLocalizedText(item.ctaLabel, lang, defaultCta);

  return (
    <section className="w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-red-600 text-white border-b border-red-700 shadow-sm">
      <div className="w-full max-w-3xl mx-auto text-center space-y-4 sm:space-y-6">
        <Mail size={32} className="mx-auto text-white shrink-0" />
        <h2 className="text-xl sm:text-3xl lg:text-4xl font-black font-serif text-white tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-base text-red-100 max-w-xl mx-auto font-medium">
          {body}
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 max-w-md mx-auto w-full">
          <input
            type="email"
            placeholder={lang === 'ar' ? 'أدخل البريد المؤسسي...' : lang === 'zh' ? '输入企业工作邮箱...' : lang === 'ckb' ? 'ئیمەیڵ بنووسە...' : 'Enter enterprise email...'}
            className="flex-1 px-4 py-3 rounded-xl bg-white text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white border-none shadow-sm min-h-[48px] w-full"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-neutral-900 hover:bg-black font-black text-white rounded-xl text-xs sm:text-sm transition-all shrink-0 cursor-pointer shadow-md min-h-[48px] w-full sm:w-auto"
          >
            {cta}
          </button>
        </form>
      </div>
    </section>
  );
}

// ================= 15. APP DOWNLOAD PWA =================
function RenderAppDownloadPwa({ section, items, config, lang }: { section: PageSectionModel; items: SectionItemModel[]; config: any; lang: string }) {
  const item = items[0] || {};
  const defaultTitle = lang === 'ar' ? 'تثبيت تطبيق PWA السيادي المشفر على الهاتف' :
    lang === 'zh' ? '在手机端部署主权级离线加密 PWA 应用' :
    lang === 'ckb' ? 'دامەزراندنی ئەپی پارێزراوی PWA لەسەر مۆبایل' :
    'Deploy Sovereign Encrypted PWA to Mobile';

  const defaultBody = lang === 'ar' ? 'تثبيت فوري مع دعم المصادقة البيومترية والمزامنة دون إنترنت.' :
    lang === 'zh' ? '即时安装，支持生物识别身份验证与离线电讯机密缓存。' :
    lang === 'ckb' ? 'دامەزراندنی خێرا بە ناسینەوەی بایۆمەتری و کارکردنی بێ ئینتەرنێت.' :
    'Instant installation with biometric authentication and offline telegraph caching.';

  const defaultCta = lang === 'ar' ? 'تثبيت تطبيق PWA الآمن' :
    lang === 'zh' ? '安装安全离线客户端' :
    lang === 'ckb' ? 'ئەپی پارێزراو دابەزێنە' :
    'Install Secure PWA';

  const title = getLocalizedText(item.title, lang, defaultTitle);
  const body = getLocalizedText(item.body, lang, defaultBody);
  const cta = getLocalizedText(item.ctaLabel, lang, defaultCta);

  return (
    <section className="w-full py-10 sm:py-14 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800">
      <div className="w-full max-w-4xl 2xl:max-w-5xl mx-auto rounded-3xl bg-red-50 dark:bg-neutral-900 text-neutral-900 dark:text-white p-6 sm:p-10 lg:p-12 border-2 border-red-200 dark:border-red-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-xs">
        <div className="space-y-3 sm:space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 text-xs font-black text-red-600 uppercase tracking-widest">
            <Smartphone size={15} className="shrink-0" />
            <span>{lang === 'ar' ? 'تطبيق الويب التقدمي المشفر' : lang === 'zh' ? '主权离线加密移动客户端' : lang === 'ckb' ? 'ئەپی پارێزراوی PWA' : 'PROGRESSIVE WEB APPLICATION'}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black font-serif text-neutral-900 dark:text-white">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            {body}
          </p>
        </div>
        <button
          onClick={() => {
            toast(lang === 'ar' ? 'بدء تثبيت تطبيق الويب التقدمي PWA؟' : lang === 'zh' ? '启动 PWA 客户端安装流程？' : lang === 'ckb' ? 'دەستپێکردنی دامەزراندنی PWA؟' : 'Launch PWA Installation flow?', {
              action: {
                label: lang === 'ar' ? 'تثبيت' : lang === 'zh' ? '安装' : lang === 'ckb' ? 'دامەزراندن' : 'Install',
                onClick: () => console.log('Triggered PWA install')
              }
            });
          }}
          className="px-6 py-3.5 sm:py-4 bg-red-600 hover:bg-red-700 active:scale-98 text-white font-black rounded-2xl text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer flex items-center justify-center gap-2 min-h-[48px] w-full md:w-auto"
        >
          <Smartphone size={18} className="shrink-0" />
          <span>{cta}</span>
        </button>
      </div>
    </section>
  );
}

// ================= FALLBACK =================
function RenderFallbackSection({ section, items, lang }: { section: PageSectionModel; items: SectionItemModel[]; lang: string }) {
  return (
    <section className="w-full py-10 px-4 bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-300 dark:border-neutral-800">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto space-y-3">
        <div className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-widest">
          Generic Section Type: {section.type}
        </div>
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white font-serif">
          {getCanonicalSectionTitle(section, lang, typeof section.name === 'string' ? section.name : '')}
        </h3>
        <div className="text-xs text-neutral-600 dark:text-neutral-400">
          {lang === 'ar' ? `عدد العناصر: ${items.length}` : lang === 'zh' ? `项目数: ${items.length}` : lang === 'ckb' ? `ژمارەی بابەتەکان: ${items.length}` : `Items count: ${items.length}`}
        </div>
      </div>
    </section>
  );
}
