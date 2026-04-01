import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { LegalSection } from "@/components/nomark/LegalSection";

export default function DmcaPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>DMCA Policy - NoMark | Copyright & Takedown Requests</title>
        <meta name="description" content="NoMark DMCA policy. Submit copyright takedown requests for content downloaded using our TikTok and Instagram video downloader." />
        <link rel="canonical" href="https://nomark.app/dmca" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t('dmca.title')}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t('dmca.lastUpdated')}</p>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">{t('dmca.intro')}</p>
          <LegalSection title={t('dmca.section1Title')} text={t('dmca.section1Text')} />
          <LegalSection title={t('dmca.section2Title')} text={t('dmca.section2Text')}>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>{t('dmca.dmcaList1')}</li>
              <li>{t('dmca.dmcaList2')}</li>
              <li>{t('dmca.dmcaList3')}</li>
              <li>{t('dmca.dmcaList4')}</li>
              <li>{t('dmca.dmcaList5')}</li>
            </ul>
          </LegalSection>
          <LegalSection title={t('dmca.section3Title')} text={t('dmca.section3Text')} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
