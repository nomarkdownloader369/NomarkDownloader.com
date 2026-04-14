import { HelpCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
  const { t } = useTranslation();

  const faqs =[
    {
      question: t('faq.q1') || "How to download TikTok videos without watermark?",
      answer: t('faq.a1') || "Paste your TikTok video link into the input box, click Download, and get your video instantly without watermark in HD quality."
    },
    {
      question: t('faq.q2') || "Is this TikTok downloader free?",
      answer: t('faq.a2') || "Yes, our tool is 100% free. You can download unlimited TikTok videos without any cost or subscription."
    },
    {
      question: t('faq.q3') || "Do I need to install any app?",
      answer: t('faq.a3') || "No, everything works directly in your browser. No app, no registration, no installation needed."
    },
    {
      question: t('faq.q4') || "Can I download Instagram videos?",
      answer: t('faq.a4') || "Currently, Instagram support may be limited. We are working on improving compatibility for Reels and videos."
    },
    {
      question: t('faq.q5') || "Is it safe to use?",
      answer: t('faq.a5') || "Yes, we do not store your videos or personal data. Your downloads are private and secure."
    },
    {
      question: t('faq.q6') || "Why is my video not downloading?",
      answer: t('faq.a6') || "Some videos may be restricted or private. Make sure the video is public and try again."
    },
    {
      question: t('faq.q7') || "Which formats are supported?",
      answer: t('faq.a7') || "You can download videos in MP4 format and audio in MP3 when available."
    },
    {
      question: t('faq.q8') || "Does it work on mobile?",
      answer: t('faq.a8') || "Yes, our downloader works perfectly on all devices including Android, iPhone, tablets, and desktop."
    }
  ];

  return (
    <section id="faq" className="relative px-4 py-16 sm:py-20 md:py-28">
      
      <div className="mx-auto max-w-3xl">
        
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
            {t('faq.badge') || "FAQ"}
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {t('faq.title') || "Frequently Asked Questions"}
          </h2>

          <p className="mt-4 text-base text-muted-foreground">
            {t('faq.subtitle') || "Everything you need to know about downloading videos without watermark"}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-secondary/30 overflow-hidden">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border last:border-b-0 px-6">
                
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 text-base font-medium">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground pb-5 pl-8 leading-relaxed text-sm">
                  {faq.answer}
                </AccordionContent>

              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm">
            <span className="text-foreground font-medium">
              {t('faq.stillQuestions') || "Still have questions?"}
            </span>
            <a href="/contact" className="text-primary hover:underline">
              {t('faq.contactUs') || "Contact us"}
            </a>
          </div>
        </div>

        {/* 🔥 SEO BLOCK (تم إصلاحه وربطه بالترجمة بنجاح!) */}
        <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            {t('faq.seoTitle') || "Free TikTok Downloader Without Watermark"}
          </h3>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {t('faq.seoText') || "NoMark is a fast and free TikTok downloader that lets you save videos without watermark in HD quality. You can also download videos online without installing any app. Just paste the video link and download instantly. Works on all devices including mobile and desktop."}
          </p>
        </div>

      </div>
    </section>
  );
              }
