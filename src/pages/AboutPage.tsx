import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { Shield, Zap, Globe, Heart, Download, Users } from "lucide-react";

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t('about.metaTitle')}</title>
        <meta name="description" content={t('about.metaDesc')} />
        <link rel="canonical" href="https://nomark.app/about" />
      </Helmet>
      <Header />
      <main className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-4xl">
          {/* Hero */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs sm:text-sm text-primary mb-6">
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span className="font-medium">{t('about.badge')}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              {t('about.heroTitle1')}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">
                {t('about.heroTitle2')}
              </span>
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('about.heroDesc')}
            </p>
          </div>

          {/* Mission */}
          <div className="relative mb-12 sm:mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-[hsl(var(--chart-2))]/10 to-primary/10 rounded-2xl blur-xl" />
            <div className="relative p-6 sm:p-8 rounded-2xl glass-effect border border-border/50">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">{t('about.missionTitle')}</h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {t('about.missionDesc')}
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {[
              { icon: Zap, title: t('about.feat1Title'), desc: t('about.feat1Desc') },
              { icon: Shield, title: t('about.feat2Title'), desc: t('about.feat2Desc') },
              { icon: Download, title: t('about.feat3Title'), desc: t('about.feat3Desc') },
              { icon: Globe, title: t('about.feat4Title'), desc: t('about.feat4Desc') },
              { icon: Users, title: t('about.feat5Title'), desc: t('about.feat5Desc') },
              { icon: Heart, title: t('about.feat6Title'), desc: t('about.feat6Desc') },
            ].map((item, i) => (
              <div key={i} className="p-5 sm:p-6 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-[hsl(var(--chart-2))] mb-4">
                  <item.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-12 sm:mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground text-center mb-8">{t('about.howTitle')}</h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {[
                { step: "1", title: t('about.step1Title'), desc: t('about.step1Desc') },
                { step: "2", title: t('about.step2Title'), desc: t('about.step2Desc') },
                { step: "3", title: t('about.step3Title'), desc: t('about.step3Desc') },
              ].map((item, i) => (
                <div key={i} className="flex-1 text-center p-5 sm:p-6 rounded-xl bg-secondary border border-border/50">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--chart-2))] text-primary-foreground font-bold text-lg mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-[hsl(var(--chart-2))]/10 to-primary/10 border border-primary/20">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2">{t('about.ctaTitle')}</h2>
            <p className="text-sm text-muted-foreground mb-4">{t('about.ctaDesc')}</p>
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity">
              {t('about.ctaButton')}
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
