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
    en: 'NoMark - TikTok Downloader No Watermark | Free HD Video Download',
    ar: 'NoMark - تحميل فيديوهات تيك توك بدون علامة مائية | تحميل مجاني بجودة HD',
    fr: 'NoMark - Télécharger TikTok Sans Filigrane | Téléchargement HD Gratuit',
    es: 'NoMark - Descargar TikTok Sin Marca de Agua | Descarga Gratis HD',
    tr: 'NoMark - Filigransız TikTok İndirici | Ücretsiz HD Video İndir',
  };

  const descriptions: Record<string, string> = {
    en: 'Download TikTok videos without watermark for free. Fast, HD quality, no signup needed. The best free TikTok downloader online.',
    ar: 'حمل فيديوهات تيك توك بدون علامة مائية مجاناً. بسرعة وجودة HD وبدون تسجيل. أفضل أداة تحميل فيديوهات تيك توك.',
    fr: 'Téléchargez des vidéos TikTok sans filigrane gratuitement. Rapide, HD, sans inscription.',
    es: 'Descarga vídeos de TikTok sin marca de agua gratis. Rápido, HD, sin registro.',
    tr: 'TikTok videolarını filigransız ücretsiz indir. Hızlı, HD kalite, kayıt yok.',
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{titles[lang] || titles.en}</title>
        <meta name="description" content={descriptions[lang] || descriptions.en} />
        <meta name="keywords" content="tiktok downloader no watermark, download tiktok video hd, free tiktok downloader, tiktok to mp4, save tiktok videos without watermark, تحميل فيديو تيك توك بدون علامة مائية, تنزيل فيديو تيك توك HD" />
        
        <link rel="canonical" href="https://nomarkdownloader.com/" />
        <link rel="alternate" hrefLang="en" href="https://nomarkdownloader.com/" />
        <link rel="alternate" hrefLang="ar" href="https://nomarkdownloader.com/?lang=ar" />
        <link rel="alternate" hrefLang="fr" href="https://nomarkdownloader.com/?lang=fr" />
        <link rel="alternate" hrefLang="es" href="https://nomarkdownloader.com/?lang=es" />
        <link rel="alternate" hrefLang="tr" href="https://nomarkdownloader.com/?lang=tr" />
        <link rel="alternate" hrefLang="x-default" href="https://nomarkdownloader.com/" />

        <meta property="og:title" content="NoMark - Free TikTok Video Downloader Without Watermark" />
        <meta property="og:description" content="Download TikTok videos without watermark in HD. Free, fast, no signup required." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nomarkdownloader.com/" />
        <meta property="og:image" content="https://nomarkdownloader.com/og-image.jpg" />
        <meta property="og:site_name" content="NoMark" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NoMark - TikTok Video Downloader No Watermark" />
        <meta name="twitter:description" content="Download TikTok videos without watermark. Free, fast, HD quality." />
        <meta name="twitter:image" content="https://nomarkdownloader.com/og-image.jpg" />

        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "NoMark Downloader",
          "url": "https://nomarkdownloader.com",
          "description": "Free TikTok video downloader without watermark. Download videos in HD quality. No signup required.",
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
