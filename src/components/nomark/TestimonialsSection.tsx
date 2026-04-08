import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

export function TestimonialsSection() {
  const { t } = useTranslation();

  const testimonials = [
    { key: "testimonials.t1", name: "testimonials.n1" },
    { key: "testimonials.t2", name: "testimonials.n2" },
    { key: "testimonials.t3", name: "testimonials.n3" },
  ];

  return (
    <section className="relative px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground neon-text">
            {t('testimonials.title')}
          </h2>
        </div>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.key} className="relative rounded-2xl border border-border bg-secondary/30 p-5 sm:p-6 neon-card">
              <Quote className="h-5 w-5 text-primary/40 mb-3" />
              <p className="text-sm text-foreground/80 leading-relaxed mb-4">"{t(item.key)}"</p>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground font-medium">{t(item.name)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
