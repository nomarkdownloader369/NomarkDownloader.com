import { useState } from "react";
import { Link as LinkIcon, Search, Sparkles, Loader2, AlertCircle, Play, Download, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  error?: string;
}

export function HeroSection({ onAnalyze, isLoading, error }: HeroSectionProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url);
  };

  return (
    <section className="relative px-4 pt-24 pb-4 md:pt-32 md:pb-6 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, rgba(20, 184, 166, 0.2) 50%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute right-0 top-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)', filter: 'blur(50px)' }} />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 sm:px-5 py-2 text-xs sm:text-sm text-primary mb-6 sm:mb-8">
          <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span className="font-medium">{t('hero.badge')}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-tight">
          {t('hero.title1')}
          <br />
          <span className="relative inline-block mt-2">
            {t('hero.title2')}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">
              {t('hero.title3')}
            </span>{" "}
            {t('hero.title4')}
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed px-2">
          {t('hero.subtitle')} <span className="text-foreground font-medium">{t('hero.tiktok')}</span> {t('hero.and')} <span className="text-foreground font-medium">{t('hero.instagram')}</span> {t('hero.subtitleEnd')}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 sm:mt-12 md:mt-14">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-0 rounded-2xl opacity-60" style={{ background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3), rgba(6, 182, 212, 0.3))', filter: 'blur(20px)' }} />
            <div className="relative flex flex-col gap-3 sm:flex-row sm:gap-0 p-2 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/30">
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder={t('hero.placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 sm:h-14 pl-12 pr-4 text-sm sm:text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 text-foreground"
                  aria-label="Video URL input"
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
              >
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{t('hero.analyzing')}</>
                ) : (
                  <><Search className="mr-2 h-5 w-5" />{t('hero.analyze')}</>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </form>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
          <span className="text-sm text-muted-foreground">{t('hero.worksWith')}</span>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-secondary border border-border hover:border-primary/30 transition-colors">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
              <span className="text-xs sm:text-sm font-medium text-foreground">TikTok</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 rounded-full bg-secondary border border-border hover:border-primary/30 transition-colors">
              <svg className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              <span className="text-xs sm:text-sm font-medium text-foreground">Instagram</span>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto">
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-secondary border border-border">
            <Download className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 sm:mb-2" />
            <span className="text-lg sm:text-2xl font-bold text-foreground">{t('hero.totalDownloads')}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">{t('hero.downloadsLabel')}</span>
          </div>
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-secondary border border-border">
            <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 sm:mb-2" />
            <span className="text-lg sm:text-2xl font-bold text-foreground">{t('hero.quality')}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">{t('hero.qualityLabel')}</span>
          </div>
          <div className="flex flex-col items-center p-3 sm:p-4 rounded-xl bg-secondary border border-border">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mb-1.5 sm:mb-2" />
            <span className="text-lg sm:text-2xl font-bold text-foreground">{t('hero.free')}</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground">{t('hero.freeLabel')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
