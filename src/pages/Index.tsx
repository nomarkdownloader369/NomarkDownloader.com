import { useState } from "react";
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
  const[videoData, setVideoData] = useState<VideoInfo | null>(null);
  const [error, setError] = useState<string | undefined>();

  // ✅ النسخة القوية جداً (تم إصلاح مشكلة الفيديو البطيء/الناقص)
  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setError(undefined);
    setVideoData(null);

    const fetchWithTimeout = async (url: string, ms = 15000) => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), ms);

      try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        return res;
      } catch (err) {
        clearTimeout(timeout);
        throw err;
      }
    };

    const ensureHttps = (link: string | undefined) => {
      if (!link) return "";
      return link.replace(/^http:\/\//i, "https://");
    };

    const trySupabase = async () => {
      const { data, error } = await supabase.functions.invoke("analyze-video", {
        body: { url },
      });

      if (error || !data?.success) throw new Error("Supabase failed");
      
      return {
        ...data.data,
        thumbnail: ensureHttps(data.data.thumbnail),
        downloadUrl: ensureHttps(data.data.downloadUrl),
        hdUrl: ensureHttps(data.data.hdUrl),
      };
    };

    const trySaveTik = async () => {
      const res = await fetchWithTimeout(
        `https://api.savetik.co/video-info?url=${encodeURIComponent(url)}`
      );

      const data = await res.json();

      if (!data || !data.video) throw new Error("savetik failed");

      return {
        title: data.video.title || "TikTok Video",
        author: data.video.author || "User",
        thumbnail: ensureHttps(data.video.thumbnail),
        duration: data.video.duration || 0,
        downloadUrl: ensureHttps(data.video.play),
        hdUrl: ensureHttps(data.video.hd || data.video.play),
      };
    };

    const tryTikwm = async () => {
      // ✅ تمت إزالة المعلمة hd=1 التي كانت تجعل السيرفر يفسد سرعة الفيديو ويقطعه
      const res = await fetchWithTimeout(
        `https://tikwm.com/api/?url=${encodeURIComponent(url)}`
      );

      const data = await res.json();

      if (!data || !data.data) throw new Error("tikwm failed");

      return {
        title: data.data.title || "TikTok Video",
        author: data.data.author?.nickname || "User",
        thumbnail: ensureHttps(data.data.cover),
        duration: data.data.duration || 0,
        downloadUrl: ensureHttps(data.data.play),
        // الكود لا يزال يسحب الـ HD الأصلي (إن وجد) دون العبث بسرعة الفيديو
        hdUrl: ensureHttps(data.data.hdplay || data.data.play), 
      };
    };

    const retry = async (fn: () => Promise<any>, times = 3) => {
      for (let i = 0; i < times; i++) {
        try {
          return await fn();
        } catch (err) {
          if (i === times - 1) throw err;
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    };

    try {
      // ✅ تم تغيير الترتيب! الآن SaveTik هو الملاذ الأول لأنه أكثر استقراراً ولا يبطئ الفيديو
      const result =
        await retry(trySupabase).catch(() =>
        retry(trySaveTik).catch(() =>
        retry(tryTikwm)
      ));

      setVideoData(result);
    } catch (err) {
      console.error("All APIs failed:", err);
      setError("All servers are busy. Try again in a moment.");
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
    en: "NoMark - TikTok & Instagram Downloader No Watermark | Free HD",
    ar: "NoMark - تحميل فيديوهات تيك توك وإنستغرام بدون علامة مائية | HD مجاني",
    fr: "NoMark - Télécharger TikTok & Instagram Sans Filigrane",
    es: "NoMark - Descargar TikTok & Instagram Sin Marca de Agua",
    tr: "NoMark - TikTok & Instagram İndirici Filigransız",
  };

  const descriptions: Record<string, string> = {
    en: "Download TikTok and Instagram videos without watermark in HD. Fast, free, no signup.",
    ar: "حمل فيديوهات تيك توك وإنستغرام بدون علامة مائية بجودة HD. سريع ومجاني وبدون تسجيل.",
    fr: "Téléchargez vidéos TikTok et Instagram sans filigrane en HD. Gratuit et rapide.",
    es: "Descarga vídeos de TikTok e Instagram sin marca de agua en HD. Gratis y rápido.",
    tr: "TikTok ve Instagram videolarını filigransız HD kalitede indir. Ücretsiz ve hızlı.",
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <Helmet>
        <title>{titles[lang] || titles.en}</title>
        <meta name="description" content={descriptions[lang] || descriptions.en} />
        <meta
          name="keywords"
          content="tiktok downloader, instagram downloader, no watermark, تحميل تيك توك, تحميل انستغرام بدون علامة مائية"
        />

        <link rel="canonical" href="https://nomarkdownloader.com/" />
        <meta property="og:title" content="NoMark - TikTok & Instagram Downloader No Watermark" />
        <meta property="og:description" content="Download TikTok and Instagram videos without watermark in HD quality." />
        <meta property="og:image" content="https://nomarkdownloader.com/og-image.jpg" />
      </Helmet>

      <Header />

      <main>
        <HeroSection
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          error={error}
          resultSlot={
            videoData ? (
              <div key={videoData.title + videoData.duration} className="mt-6 result-card-enter">
                <ResultSection videoData={videoData} onClose={handleClose} />
              </div>
            ) : undefined
          }
        />

        <div className="px-4 py-6 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
          >
            {t("nav.blog")} →
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
