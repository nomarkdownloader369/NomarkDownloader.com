import { ClipboardCopy, Search, Download, ArrowDown, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

export function HowItWorks() {
  const { t } = useTranslation();

  const steps = [
    { icon: ClipboardCopy, titleKey: "howItWorks.step1", descKey: "howItWorks.step1Desc", step: "1", color: "from-blue-500 to-cyan-500" },
    { icon: Search, titleKey: "howItWorks.step2", descKey: "howItWorks.step2Desc", step: "2", color: "from-emerald-500 to-teal-500" },
    { icon: Download, titleKey: "howItWorks.step3", descKey: "howItWorks.step3Desc", step: "3", color: "from-pink-500 to-rose-500" },
  ];

  return (
    <section id="how-it-works" className="relative px-4 py-16 sm:py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-card/50 to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-10 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">{t('howItWorks.badge')}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">{t('howItWorks.title')}</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">{t('howItWorks.subtitle')}</p>
        </div>
        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-[calc(16.67%+40px)] right-[calc(16.67%+40px)] h-0.5 -translate-y-1/2">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-pink-500 opacity-30" />
          </div>
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="relative flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-secondary/30 border border-border hover:border-primary/30 transition-all duration-300 group">
                  <div className={`absolute -top-5 left-1/2 -translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-primary-foreground font-bold text-lg shadow-lg`}>{step.step}</div>
                  <div className={`mt-4 mb-4 sm:mb-6 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-105 transition-transform duration-300`}>
                    <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-background">
                      <step.icon className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">{t(step.titleKey)}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t(step.descKey)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex justify-center my-3 sm:my-4 lg:hidden">
                    <ArrowDown className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 sm:mt-16 relative">
          <div className="relative p-6 sm:p-8 rounded-2xl bg-card backdrop-blur-xl border border-border">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <Sparkles className="h-5 w-5 text-primary" />
              <h3 className="text-lg sm:text-xl font-semibold text-foreground">{t('howItWorks.seoTitle')}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">{t('howItWorks.seoText1').split('.')[0]}.</strong> {t('howItWorks.seoText1').split('.').slice(1).join('.')}</p>
              <p><strong className="text-foreground">{t('howItWorks.seoText2').split('.')[0]}.</strong> {t('howItWorks.seoText2').split('.').slice(1).join('.')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
