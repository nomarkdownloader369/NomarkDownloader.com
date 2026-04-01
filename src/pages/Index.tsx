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
      const { data, error: fnError } = await supabase.functions.invoke('analyze-video', {
        body: { url },
      });

      if (fnError) {
        setError("Failed to analyze video. Please try again.");
        return;
      }

      if (!data.success) {
        setError(data.error || "Failed to analyze video. Please try again.");
        return;
      }

      setVideoData(data.data);
    } catch {
      setError("Network error. Please check your connection and try again.");
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
        <link rel="canonical" href="https://nomark.app/" />
        <link rel="alternate" hrefLang="en" href="https://nomark.app/" />
        <link rel="alternate" hrefLang="ar" href="https://nomark.app/?lang=ar" />
        <link rel="alternate" hrefLang="fr" href="https://nomark.app/?lang=fr" />
        <link rel="alternate" hrefLang="es" href="https://nomark.app/?lang=es" />
        <link rel="alternate" hrefLang="tr" href="https://nomark.app/?lang=tr" />
        <link rel="alternate" hrefLang="x-default" href="https://nomark.app/" />
        <meta property="og:title" content="NoMark - Free TikTok & Instagram Video Downloader Without Watermark" />
        <meta property="og:description" content="Download TikTok videos without watermark in HD. Save Instagram Reels free. No signup, no app. Fastest free video downloader." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nomark.app/" />
        <meta property="og:image" content="https://nomark.app/og-image.jpg" />
        <meta property="og:site_name" content="NoMark" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoMark - Free TikTok & Instagram Video Downloader" />
        <meta name="twitter:description" content="Download TikTok videos without watermark. Save Instagram Reels HD. Free, fast, no signup." />
        <meta name="twitter:image" content="https://nomark.app/og-image.jpg" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "NoMark Downloader",
          "url": "https://nomark.app",
          "description": "Free TikTok video downloader without watermark. Download Instagram Reels in HD quality. No signup required.",
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
          "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "ratingCount": "15420" }
        })}</script>
      </Helmet>
      <Header />
      <main>
        <HeroSection
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          error={error}
          resultSlot={videoData ? (
            <div className="mt-6">
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
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <AdBanner />
    </div>
  );
}
