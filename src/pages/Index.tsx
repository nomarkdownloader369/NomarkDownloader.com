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
  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{isAr ? 'NoMark - تحميل فيديوهات تيك توك وإنستغرام بدون علامة مائية' : 'NoMark - Download TikTok & Instagram Videos Without Watermark | Free HD'}</title>
        <meta name="description" content={isAr ? 'أفضل أداة مجانية لتحميل فيديوهات تيك توك وإنستغرام بدون علامة مائية بجودة HD. بدون تسجيل أو تطبيقات.' : 'Free TikTok video downloader without watermark. Download Instagram Reels HD, save TikTok MP4. No watermark, no signup. Best video downloader 2026.'} />
        <meta name="keywords" content="TikTok video downloader without watermark, Instagram Reels downloader HD, download TikTok video no watermark, save Instagram Reels, TikTok to MP4, free video downloader, تحميل فيديو تيك توك بدون علامة مائية, تحميل ريلز انستغرام" />
        <link rel="alternate" hrefLang="en" href="https://nomark.app/" />
        <link rel="alternate" hrefLang="ar" href="https://nomark.app/?lang=ar" />
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
