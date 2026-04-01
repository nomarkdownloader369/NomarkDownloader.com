import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { LegalSection } from "@/components/nomark/LegalSection";

export default function TermsPage() {
  const { t } = useTranslation();
  const sections = Array.from({ length: 5 }, (_, i) => ({
    title: t(`terms.section${i + 1}Title`),
    text: t(`terms.section${i + 1}Text`),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service - NoMark | Free Video Downloader</title>
        <meta name="description" content="NoMark terms of service. Read our terms for using our free TikTok and Instagram video downloader without watermark." />
        <link rel="canonical" href="https://nomark.app/terms" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t('terms.title')}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t('terms.lastUpdated')}</p>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">{t('terms.intro')}</p>
          {sections.map((s, i) => <LegalSection key={i} title={s.title} text={s.text} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}
