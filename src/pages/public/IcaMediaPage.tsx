import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Video, Radio, ArrowRight, Play, Film, Tv, Clapperboard, Users, 
  BookOpen, Mic, Image, BarChart3, Clock, Calendar, CheckCircle2 
} from 'lucide-react';
import { portalStore } from '../../data/portalData';
import { getPortalTranslation } from '../../locales/portalTranslations';
import { PortalLocale } from '../../types/portals';
import { IcaPlusSection } from '../../components/IcaPlusSection';
import { PodcastPlayer } from '../../components/media/PodcastPlayer';
import { PhotoGallery } from '../../components/media/PhotoGallery';
import { InfographicViewer } from '../../components/media/InfographicViewer';
import { apiFetch } from '../../lib/api';

const SAMPLE_GALLERY_PHOTOS = [
  {
    id: 'p1',
    url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
    title: { en: 'Grand Faw Deep-Water Port Terminal 1', ar: 'أعمال بناء رصيف ميناء الفاو الكبير', zh: '大法奥深水港1号泊位建设纪实', ckb: 'دروستکردنی بەندەری فاو' },
    caption: { en: 'Automated container gantry cranes installed by joint engineering teams in Basra.', ar: 'رافعات الحاويات المؤتمتة المنفذة بواسطة فرق هندسية مشتركة في البصرة.', zh: '中伊工程团队联合完成法奥港集装箱轨道吊装作业。', ckb: 'دانانی کرینی پێشکەوتوو لە بەندەری فاو.' },
    location: 'Basra, Iraq',
    photographer: 'CISE Media Bureau',
    date: '2026-09-20'
  },
  {
    id: 'p2',
    url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    title: { en: 'Strategic Energy & Refined Products Complex', ar: 'منشأة التخزين الاستراتيجي للطاقة', zh: '中伊战略原油储备与炼化综合基地', ckb: 'کۆگای ستراتیژی وزە' },
    caption: { en: 'Expansion of storage capacity connecting Nineveh baseload power to central Iraq.', ar: 'توسيع سعة التخزين لربط طاقة الحمل الأساسي بنينوى بوسط العراق.', zh: '连接尼尼微基荷电力与伊拉克中部电网的储能综合设施。', ckb: 'فراوانکردنی توانای هەڵگرتن بۆ کارەبای نەینەوا.' },
    location: 'Nineveh / Missan',
    photographer: 'State Media Pool',
    date: '2026-09-14'
  },
  {
    id: 'p3',
    url: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800',
    title: { en: 'Silk Road Logistics Coordination Session', ar: 'جلسة التنسيق اللوجستي لطريق الحرير', zh: '丝绸之路跨境物流数据中枢协调会', ckb: 'کۆبوونەوەی هەماهەنگی لۆجستی ڕێگای ئاوریشم' },
    caption: { en: 'Multimodal freight routing protocols under the Belt and Road Initiative framework.', ar: 'بروتوكولات الشحن متعدد الوسائط ضمن إطار مبادرة الحزام والطريق.', zh: '一带一路倡议下多式联运大宗货运智能调度协同演练。', ckb: 'ڕێککەوتنی گواستنەوەی چەندجۆری لە چوارچێوەی دەستپێشخەریی پشتێن و ڕێگا.' },
    location: 'Beijing Secretariat',
    photographer: 'ICA Diplomatic Press',
    date: '2026-09-08'
  },
  {
    id: 'p4',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    title: { en: 'Bilateral Currency Clearing Center Groundbreaking', ar: 'تدشين مجمع المقاصة المصرفية الثنائية', zh: '中伊双边本币清算与宏观金融大厦奠基', ckb: 'دەستپێکردنی ناوەندی یەکلاکردنەوەی دارایی' },
    caption: { en: 'Digital RMB and Iraqi Dinar sovereign direct settlement terminal headquarters.', ar: 'المقر الرئيسي لمحطة التسوية المباشرة السيادية باليوان الرقمي والدينار العراقي.', zh: '数字人民币与伊拉克第纳尔主权直连结算中枢大厦建设。', ckb: 'بارەگای سەرەکی یەکلاکردنەوەی ڕاستەوخۆ بە یوان و دینار.' },
    location: 'Baghdad Green Zone',
    photographer: 'Baghdad Bureau',
    date: '2026-09-01'
  }
];

const SAMPLE_INFOGRAPHIC = {
  id: 'info-1',
  title: {
    en: 'Bilateral Currency Clearing & The RMB-IQD Settlement Corridor',
    ar: 'مخطط المقاصة الثنائية وممر التسوية المباشرة باليوان والدينار',
    zh: '中伊双边货币清算与人民币-第纳尔结算走廊全景数据架构',
    ckb: 'نەخشەی یەکلاکردنەوەی دارایی و مەمەری یوان-دینار'
  },
  description: {
    en: 'Comprehensive structural map detailing the PBOC and Central Bank of Iraq direct clearing network, bypassing intermediary SWIFT messaging for trade invoices.',
    ar: 'خريطة هيكلية شاملة توضح شبكة المقاصة المباشرة بين بنك الشعب الصيني والبنك المركزي العراقي، متجاوزة أنظمة المراسلة الوسيطة.',
    zh: '全面解析中国人民银行与伊拉克中央银行直连清算网络的数据架构，免除第三方SWIFT中介清算通道。',
    ckb: 'نەخشەیەکی ڕوونکەرەوە بۆ تۆڕی یەکلاکردنەوەی ڕاستەوخۆ لە نێوان بانکی ناوەندی عێراق و بانکی گەلی چین.'
  },
  imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
  dimensions: '3840 × 2160 UHD Vector',
  source: 'CISE Institute Macroeconomics Desk',
  date: '2026-10-10'
};

const SAMPLE_PODCAST = {
  id: 'pod-spotlight',
  title: 'Episode 18: Sovereign Clearing and the 2030 Belt and Road Masterplan',
  host: 'Dr. Tariq Al-Hashemi & Prof. Li Jun',
  guest: 'Director General of Maritime Infrastructure',
  duration: '34:20',
  audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  coverUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
  category: 'Strategic Finance'
};

export function IcaMediaPage() {
  const { lang = 'en' } = useParams<{ lang: string }>();
  const currentLang = (lang === 'ck' ? 'ckb' : lang) as PortalLocale;
  const t = (key: string) => getPortalTranslation(currentLang, key);

  const [apiItems, setApiItems] = useState<any[]>([]);
  const liveStream = portalStore.getLiveStream();
  const fallbackItems = portalStore.getMediaItems();

  useEffect(() => {
    const loadMediaItems = async () => {
      try {
        const res = await apiFetch('/api/hub/media-hub/items');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setApiItems(data);
          }
        }
      } catch (err) {
        console.warn('Fallback to local portal data for Media Hub items');
      }
    };
    loadMediaItems();
  }, []);

  // Merge server API items with fallback portalStore items
  const displayItems = apiItems.length > 0 ? apiItems : fallbackItems;

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen py-8 sm:py-12 text-start">
      <div className="w-full max-w-7xl 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E7EB] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-brand-800)] font-bold uppercase tracking-wider mb-2">
              <Video size={14} />
              <span>{t('nav.media')}</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-[#000000] tracking-tight">
              {t('publicPortal.mediaHeading')}
            </h1>
            <p className="text-sm text-[#4B5563] mt-2 max-w-2xl leading-relaxed">
              {t('publicPortal.mediaSubtitle')}
            </p>
          </div>

          <Link
            to={`/${currentLang}/live`}
            className="min-h-[44px] px-6 py-3 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <span>{t('publicPortal.exploreMediaHub')}</span>
            <ArrowRight size={14} className="rtl:rotate-180" />
          </Link>
        </div>

        {/* Live Broadcast Banner Preview */}
        <div className="mb-14 p-6 sm:p-10 rounded-3xl bg-[#000000] text-white flex flex-col md:flex-row items-center justify-between gap-8 border border-neutral-800 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-800)] text-white text-[10px] font-mono font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-soft-vibrate"></span>
              <span>{t('livePortal.nowStreaming')}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-white">
              {liveStream.title[currentLang] || liveStream.title.en}
            </h2>
            <p className="text-xs text-neutral-400 leading-relaxed">
              {liveStream.description[currentLang] || liveStream.description.en}
            </p>
          </div>

          <Link
            to={`/${currentLang}/live/now`}
            className="min-h-[48px] px-6 py-3.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white font-black text-xs uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer active:scale-95"
          >
            <Radio size={16} className="animate-soft-vibrate" />
            <span>{t('publicPortal.watchLiveNow')}</span>
          </Link>
        </div>

        {/* Media Categories Jump Grid (44x44 Touch Target standard) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <Link
            to={`/${currentLang}/live/movies`}
            className="min-h-[64px] p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Film size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.movies')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Feature Films</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/drama`}
            className="min-h-[64px] p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Tv size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.drama')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Series & Sagas</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/documentary`}
            className="min-h-[64px] p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Clapperboard size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.documentary')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Corridor Feats</div>
            </div>
          </Link>

          <Link
            to={`/${currentLang}/live/exchange`}
            className="min-h-[64px] p-5 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] text-[var(--color-brand-800)] flex items-center justify-center shrink-0">
              <Users size={20} />
            </div>
            <div>
              <div className="font-bold text-sm text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors">
                {t('livePortal.exchange')}
              </div>
              <div className="text-[10px] text-[#4B5563]">Youth & Culture</div>
            </div>
          </Link>
        </div>

        {/* SPOTLIGHT SECTION: Podcast Player Component */}
        <div className="mb-14 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider">
            <Mic size={16} />
            <span>Spotlight Audio • Media Hub Podcast Syndicate</span>
          </div>
          <PodcastPlayer episode={SAMPLE_PODCAST} />
        </div>

        {/* SPOTLIGHT SECTION: Interactive Infographic Viewer Component */}
        <div className="mb-14 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider">
            <BarChart3 size={16} />
            <span>Interactive Data Visualizations & Infographics</span>
          </div>
          <InfographicViewer infographic={SAMPLE_INFOGRAPHIC} lang={currentLang} />
        </div>

        {/* SPOTLIGHT SECTION: High-Resolution Photo Gallery */}
        <div className="mb-14 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--color-brand-800)] uppercase tracking-wider">
              <Image size={16} />
              <span>Sino-Iraqi Infrastructure Photo Gallery</span>
            </div>
            <span className="text-xs font-mono text-gray-500">
              Lightbox Enabled · Click Any Photo
            </span>
          </div>
          <PhotoGallery photos={SAMPLE_GALLERY_PHOTOS} lang={currentLang} />
        </div>

        {/* ICA+ EXCLUSIVE Premium Media Hub Subsection */}
        <div className="mb-14">
          <IcaPlusSection />
        </div>

        {/* Synchronized CISE Think Tank Publications & Media Syndicate */}
        <div className="ica-card-interactive mb-14 p-8 rounded-3xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] transition-all shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] text-[var(--color-brand-800)] text-xs font-mono font-bold uppercase tracking-wider">
                <BookOpen size={14} />
                <span>
                  {currentLang === 'ar' ? 'إصدارات معهد CISE الاستراتيجية' : currentLang === 'zh' ? 'CISE 智库战略白皮书与政策研究' : currentLang === 'ckb' ? 'بڵاوکراوە ستراتیژییەکانی پەیمانگای CISE' : 'CISE Strategic Publications of Record'}
                </span>
              </div>
              <h2 className="font-serif text-2xl font-black text-[#000000]">
                {currentLang === 'ar' ? 'أوراق السياسات والمذكرات التحليلية لمعهد CISE' : currentLang === 'zh' ? '智库政策通报、白皮书与大宗商品宏观研究' : currentLang === 'ckb' ? 'بەڵگەنامە و توێژینەوەکانی پەیمانگای CISE' : 'Policy Briefs, White Papers & Intelligence Dispatches'}
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">
                {currentLang === 'ar'
                  ? 'دراسات معمقة محكّمة صادرة عن كبار زملاء المعهد حول مسارات الطاقة، وميناء الفاو، والمقاصة النقدية، وتحديثات التجارة البينية.'
                  : currentLang === 'zh'
                  ? '由 CISE 特聘资深研究员联合撰写的高端政策咨询、法奥港物流调度评估与中伊双边本币清算全景报告。'
                  : currentLang === 'ckb'
                  ? 'توێژینەوەی وردی ئەکادیمی لەسەر وزە، بەندەری فاو، پاکتاوی نەختینەیی و بارودۆخی ئابووری دوولایەنە.'
                  : 'Peer-reviewed strategic publications authored by CISE Senior Fellows covering bilateral trade, energy corridors, currency clearing, and maritime logistics.'}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to={`/${currentLang}/institute/publications`}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-brand-800)] hover:bg-[#b80016] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <span>{currentLang === 'ar' ? 'أرشيف المنشورات' : currentLang === 'zh' ? '查阅智库出版物' : currentLang === 'ckb' ? 'ئەرشیفی بڵاوکراوەکان' : 'Publications Archive'}</span>
                <ArrowRight size={14} className="rtl:rotate-180 cta-arrow" />
              </Link>
              <Link
                to={`/${currentLang}/institute/data-hub`}
                className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] text-xs font-bold text-[#000000] hover:text-[var(--color-brand-800)] transition-colors shadow-2xs"
              >
                <span>{currentLang === 'ar' ? 'مركز البيانات' : currentLang === 'zh' ? '宏观数据中枢' : currentLang === 'ckb' ? 'ناوەندی داتا' : 'Strategic Data Hub'}</span>
                <ArrowRight size={14} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </div>

        {/* Full Media Library Grid (Card Contract: ica-card-interactive, aspect-video, pinned CTA) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item: any) => {
            const titleText = item.title?.[currentLang] || item.title?.en || item.title || item.slug;
            const descText = item.description?.[currentLang] || item.description?.en || item.description || '';
            const poster = item.posterUrl || item.url || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800';

            return (
              <Link
                key={item.id}
                to={`/${currentLang}/live/${item.slug || item.id}`}
                className="ica-card-interactive group flex flex-col justify-between rounded-2xl bg-white border border-[#E5E7EB] hover:border-[var(--color-brand-800)] overflow-hidden shadow-xs hover:shadow-md transition-all"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-neutral-900">
                  <img
                    src={poster}
                    alt={titleText}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 inset-inline-start-3 bg-[var(--color-brand-800)] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded">
                    {(item.category || item.type || 'MEDIA').toUpperCase()}
                  </div>
                  <div className="absolute bottom-3 inset-inline-end-3 bg-black/80 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded tabular-nums">
                    {item.duration || '05:00'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#4B5563]">
                      <span>{item.sourceVertical || 'Media Hub'}</span>
                      {item.publishDate && <span>{item.publishDate}</span>}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#000000] group-hover:text-[var(--color-brand-800)] transition-colors line-clamp-2">
                      {titleText}
                    </h3>
                    {descText && (
                      <p className="text-xs text-[#4B5563] line-clamp-2 leading-relaxed">
                        {descText}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#4B5563]">
                    <span>{item.director || 'Editorial Desk'}</span>
                    <span className="text-[var(--color-brand-800)] font-black cta-arrow transition-transform flex items-center gap-1">
                      <span>Watch</span>
                      <ArrowRight size={14} className="rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default IcaMediaPage;
