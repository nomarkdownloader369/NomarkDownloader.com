import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useTranslation();

  const faqs = Array.from({ length: 8 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <section id="faq" className="relative px-4 py-16 sm:py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, hsl(160 84% 39% / 0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      </div>
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">{t('faq.badge')}</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance">{t('faq.title')}</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-muted-foreground">{t('faq.subtitle')}</p>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0 px-4 sm:px-6">
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4 sm:py-5 text-sm sm:text-base font-medium">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 sm:pb-5 pl-6 sm:pl-8 leading-relaxed text-xs sm:text-sm">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-8 sm:mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm">
            <span className="text-foreground font-medium">{t('faq.stillQuestions')}</span>
            <a href="/contact" className="text-primary hover:underline">{t('faq.contactUs')}</a>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3">{t('faq.seoTitle')}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t('faq.seoText')}</p>
        </div>
      </div>
    </section>
  );
}
