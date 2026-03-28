import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, [location.hash]);

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
    en: 'NoMark - Download TikTok & Instagram Videos Without Watermark | Free HD',
    ar: 'NoMark - تحميل فيديوهات تيك توك وإنستغرام بدون علامة مائية',
    fr: 'NoMark - Télécharger des vidéos TikTok et Instagram sans filigrane | HD Gratuit',
    es: 'NoMark - Descargar vídeos de TikTok e Instagram sin marca de agua | HD Gratis',
    tr: 'NoMark - TikTok ve Instagram Videolarını Filiransız İndir | Ücretsiz HD',
  };

  const descriptions: Record<string, string> = {
    en: 'Free TikTok video downloader without watermark. Download Instagram Reels HD, save TikTok MP4. No watermark, no signup. Best video downloader 2026.',
    ar: 'أفضل أداة مجانية لتحميل فيديوهات تيك توك وإنستغرام بدون علامة مائية بجودة HD. بدون تسجيل أو تطبيقات.',
    fr: 'Téléchargeur gratuit de vidéos TikTok sans filigrane. Téléchargez Instagram Reels HD. Meilleur téléchargeur 2026.',
    es: 'Descargador gratuito de vídeos TikTok sin marca de agua. Descarga Instagram Reels HD. Mejor descargador 2026.',
    tr: 'Ücretsiz TikTok video indirici filiransız. Instagram Reels HD indir. 2026 en iyi video indirici.',
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{titles[lang] || titles.en}</title>
        <meta name="description" content={descriptions[lang] || descriptions.en} />
        <meta name="keywords" content="TikTok video downloader without watermark, Instagram Reels downloader HD, download TikTok video no watermark, save Instagram Reels, TikTok to MP4, free video downloader, تحميل فيديو تيك توك بدون علامة مائية, تحميل ريلز انستغرام, télécharger TikTok sans filigrane, descargar TikTok sin marca de agua, TikTok video indirici filiransız" />
        <link rel="alternate" hrefLang="en" href="https://nomark.app/" />
        <link rel="alternate" hrefLang="ar" href="https://nomark.app/?lang=ar" />
        <link rel="alternate" hrefLang="fr" href="https://nomark.app/?lang=fr" />
        <link rel="alternate" hrefLang="es" href="https://nomark.app/?lang=es" />
        <link rel="alternate" hrefLang="tr" href="https://nomark.app/?lang=tr" />
        <link rel="alternate" hrefLang="x-default" href="https://nomark.app/" />
        <meta property="og:title" content="NoMark - Download TikTok & Instagram Videos Without Watermark" />
        <meta property="og:description" content="Free HD video downloader. Save TikTok videos without watermark, download Instagram Reels in highest quality." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nomark.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoMark - Free TikTok & Instagram Video Downloader" />
        <meta name="twitter:description" content="Download TikTok videos without watermark in HD. Save Instagram Reels free." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "NoMark",
          "url": "https://nomark.app",
          "description": "Free TikTok video downloader without watermark. Download Instagram Reels in HD quality.",
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "All",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
        })}</script>
      </Helmet>
      <Header />
      <main>
        <HeroSection onAnalyze={handleAnalyze} isLoading={isLoading} error={error} />
        {videoData && (
          <div className="-mt-4">
            <ResultSection videoData={videoData} onClose={handleClose} />
          </div>
        )}
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
