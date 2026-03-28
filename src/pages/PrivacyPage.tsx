import { useTranslation } from "react-i18next";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { LegalSection } from "@/components/nomark/LegalSection";

export default function PrivacyPage() {
  const { t } = useTranslation();
  const sections = Array.from({ length: 5 }, (_, i) => ({
    title: t(`privacy.section${i + 1}Title`),
    text: t(`privacy.section${i + 1}Text`),
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t('privacy.title')}</h1>
          <p className="text-sm text-muted-foreground mb-6">{t('privacy.lastUpdated')}</p>
          <p className="text-muted-foreground mb-8 text-sm sm:text-base">{t('privacy.intro')}</p>
          {sections.map((s, i) => <LegalSection key={i} title={s.title} text={s.text} />)}
        </div>
      </main>
      <Footer />
    </div>
  );
}
