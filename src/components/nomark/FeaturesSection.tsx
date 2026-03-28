import { Zap, Shield, Smartphone, Cloud, Infinity, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = [
    { icon: Zap, titleKey: "features.fast", descKey: "features.fastDesc", gradient: "from-yellow-400 to-orange-500" },
    { icon: Shield, titleKey: "features.safe", descKey: "features.safeDesc", gradient: "from-green-400 to-emerald-500" },
    { icon: Smartphone, titleKey: "features.everywhere", descKey: "features.everywhereDesc", gradient: "from-blue-400 to-cyan-500" },
    { icon: Cloud, titleKey: "features.noInstall", descKey: "features.noInstallDesc", gradient: "from-purple-400 to-pink-500" },
    { icon: Infinity, titleKey: "features.unlimited", descKey: "features.unlimitedDesc", gradient: "from-emerald-400 to-teal-500" },
    { icon: Globe, titleKey: "features.global", descKey: "features.globalDesc", gradient: "from-teal-400 to-cyan-500" },
  ];

  return (
    <section id="features" className="relative px-4 py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] opacity-10 blur-[120px] bg-primary rounded-full" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">{t('features.badge')}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">{t('features.title')}</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">{t('features.subtitle')}</p>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.titleKey} className="group relative rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50">
              <div className={`mb-4 sm:mb-5 inline-flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5`}>
                <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-background">
                  <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </div>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{t(feature.titleKey)}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t(feature.descKey)}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 sm:mt-16 text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{t('features.trustedBy')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 opacity-60">
            <span className="text-base sm:text-lg font-semibold text-foreground">TikTok</span>
            <span className="text-base sm:text-lg font-semibold text-foreground">Instagram</span>
            <span className="text-base sm:text-lg font-semibold text-foreground">Reels</span>
            <span className="text-base sm:text-lg font-semibold text-foreground">IGTV</span>
          </div>
        </div>
      </div>
    </section>
  );
}
