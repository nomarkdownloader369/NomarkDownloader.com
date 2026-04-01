import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - NoMark | TikTok & Instagram Video Downloader Support</title>
        <meta name="description" content="Contact NoMark support team. Get help with downloading TikTok videos without watermark or Instagram Reels in HD." />
        <link rel="canonical" href="https://nomark.app/contact" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{t('contact.title')}</h1>
          <p className="text-muted-foreground mb-10 text-sm sm:text-base">{t('contact.subtitle')}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <Mail className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
              <a href="mailto:NoMarkDownloader@gmail.com" className="text-sm text-primary hover:underline">NoMarkDownloader@gmail.com</a>
            </div>
            <div className="p-6 rounded-2xl bg-card border border-border">
              <Clock className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">{t('contact.response')}</h3>
              <p className="text-sm text-muted-foreground">{t('contact.responseValue')}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
