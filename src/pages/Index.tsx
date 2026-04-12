import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { HeroSection } from "@/components/nomark/HeroSection";
import { ResultSection } from "@/components/nomark/ResultSection";
import { FeaturesSection } from "@/components/nomark/FeaturesSection";
import { HowItWorks } from "@/components/nomark/HowItWorks";
import { FAQ } from "@/components/nomark/FAQ";
import { Footer } from "@/components/nomark/Footer";
import { AdBanner } from "@/components/nomark/AdBanner";
import { TestimonialsSection } from "@/components/nomark/TestimonialsSection";
import { SecondCTA } from "@/components/nomark/SecondCTA";
import type { VideoInfo } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

export default function Index() {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | undefined>();

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(undefined);
    setVideoData(null);

    try {
      // 1. فحص هل الرابط انستجرام أم تيك توك
      if (url.toLowerCase().includes('instagram.com')) {
        
        // --- كود API الانستجرام ---
        const response = await fetch('https://api.cobalt.tools/api/json', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url,
            aFormat: "mp3", // لجلب الصوت إذا لزم الأمر
            isNoTTWatermark: true
          })
        });

        if (!response.ok) throw new Error("فشل الاتصال بخادم الانستجرام");

        const data = await response.json();

        if (data.status === 'error') {
          setError(String(data.text || "فشل تحميل فيديو الانستجرام، تأكد من صحة الرابط."));
          return;
        }

        // تحويل نتيجة الانستجرام لتناسب شكل موقعك
        setVideoData({
          title: "Instagram Reel / Video",
          author: "Instagram User",
          // وضعنا صورة افتراضية للانستجرام لأن الـ API أحياناً لا يرسل صورة الغلاف
          thumbnail: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=500&q=80",
          duration: "IG",
          views: "HD",
          platform: "instagram",
          downloadUrls: {
            standard: data.url,
            hd: data.url, // الانستجرام يأتي بجودة واحدة عالية غالباً
          }
        });

      } else {
        
        // --- كود التيك توك القديم الخاص بك (لم نكسر فيه شيئاً) ---
        const { data, error: fnError } = await supabase.functions.invoke('analyze-video', {
          body: { url },
        });

        if (fnError) {
          // استخدام String() هنا يمنع مشكلة الشاشة السوداء في حالة الخطأ
          setError(String(fnError.message || "Failed to analyze video. Please try again."));
          return;
        }

        if (!data.success) {
          // منع الشاشة السوداء بتحويل الـ error إلى نص إجباري
          setError(typeof data.error === 'string' ? data.error : "Failed to analyze video. Please try again.");
          return;
        }

        setVideoData(data.data);
      }

    } catch (err: any) {
      // هذه المنطقة كانت تسبب شاشة سوداء لو كان الخطأ (Object)، الآن تم إصلاحها
      console.error("Analysis error:", err);
      const errorMessage = err?.message ? String(err.message) : "Network error. Please check your connection and try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setVideoData(null);
    setError(undefined);
  };

  const lang = i18n.language;

  const titles: Record<string, string> = {
    en: 'NoMark - TikTok Downloader No Watermark | Free Instagram Video Downloader HD',
    ar: 'NoMark - تحميل فيديوهات تيك توك بدون علامة مائية | تحميل فيديو انستغرام مجاناً',
    fr: 'NoMark - Télécharger TikTok Sans Filigrane | Téléchargeur Vidéo Instagram Gratuit HD',
    es: 'NoMark - Descargar TikTok Sin Marca de Agua | Descargar Vídeos Instagram Gratis HD',
    tr: 'NoMark - TikTok İndirici Filiransız | Instagram Video İndirici Ücretsiz HD',
  };

  const descriptions: Record<string, string> = {
    en: 'Download TikTok videos without watermark for free. Save Instagram Reels in HD quality. No signup, no app needed. The fastest free video downloader online 2026.',
    ar: 'حمل فيديوهات تيك توك بدون علامة مائية مجاناً. احفظ ريلز انستغرام بجودة HD. بدون تسجيل أو تطبيقات. أسرع أداة تحميل فيديو مجانية.',
    fr: 'Téléchargez des vidéos TikTok sans filigrane gratuitement. Sauvegardez les Reels Instagram en HD. Sans inscription, sans appli. Le meilleur téléchargeur gratuit 2026.',
    es: 'Descarga vídeos de TikTok sin marca de agua gratis. Guarda Reels de Instagram en HD. Sin registro, sin app. El mejor descargador de vídeos gratuito 2026.',
    tr: 'TikTok videolarını filiransız ücretsiz indirin. Instagram Reels HD kalitede kaydedin. Kayıt yok, uygulama yok. En hızlı ücretsiz video indirici 2026.',
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{titles[lang] || titles.en}</title>
        <meta name="description" content={descriptions[lang] || descriptions.en} />
        <meta name="keywords" content="tiktok downloader no watermark, download tiktok video hd, instagram video downloader, save reels without watermark, free video downloader online, tiktok to mp4, download instagram reels hd, تحميل فيديو تيك توك بدون علامة مائية, تحميل ريلز انستغرام" />
        <link rel="canonical" href="https://nomarkdownloader.com/" />
        <link rel="alternate" hrefLang="en" href="https://nomarkdownloader.com/" />
        <link rel="alternate" hrefLang="ar" href="https://nomarkdownloader.com/?lang=ar" />
        <link rel="alternate" hrefLang="fr" href="https://nomarkdownloader.com/?lang=fr" />
        <link rel="alternate" hrefLang="es" href="https://nomarkdownloader.com/?lang=es" />
        <link rel="alternate" hrefLang="tr" href="https://nomarkdownloader.com/?lang=tr" />
        <link rel="alternate" hrefLang="x-default" href="https://nomarkdownloader.com/" />
        <meta property="og:title" content="NoMark - Free TikTok & Instagram Video Downloader Without Watermark" />
        <meta property="og:description" content="Download TikTok videos without watermark in HD. Save Instagram Reels free. No signup, no app. Fastest free video downloader." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nomarkdownloader.com/" />
        <meta property="og:image" content="https://nomarkdownloader.com/og-image.jpg" />
        <meta property="og:site_name" content="NoMark" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoMark - Free TikTok & Instagram Video Downloader" />
        <meta name="twitter:description" content="Download TikTok videos without watermark. Save Instagram Reels HD. Free, fast, no signup." />
        <meta name="twitter:image" content="https://nomarkdownloader.com/og-image.jpg" />
      </Helmet>
      <Header />
      <main>
        <HeroSection
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          error={error}
          resultSlot={videoData ? (
            <div key={videoData.title + videoData.duration} className="mt-6 result-card-enter">
              <ResultSection videoData={videoData} onClose={handleClose} />
            </div>
          ) : undefined}
        />
        <div className="px-4 py-6 text-center">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
            {t('nav.blog')} →
          </Link>
        </div>
        <FeaturesSection />
        <SecondCTA />
        <TestimonialsSection />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <AdBanner />
    </div>
  );
      }
