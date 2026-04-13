import { useState, ReactNode } from "react";
import { Link as LinkIcon, Sparkles, Loader2, AlertCircle, Play, Download, CheckCircle, Shield, Smartphone, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeroSectionProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
  error?: string;
  resultSlot?: ReactNode;
}

export function HeroSection({ onAnalyze, isLoading, error, resultSlot }: HeroSectionProps) {
  const { t } = useTranslation();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) onAnalyze(url);
  };

  return (
    <section className="relative px-4 pt-24 pb-4 md:pt-32 md:pb-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,255,166,0.15) 0%, rgba(0,229,255,0.08) 50%, transparent 70%)', filter: 'blur(80px)' }} />
        <div className="absolute right-0 top-0 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,255,166,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,166,0.04) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs text-primary mb-6">
          <Sparkles className="h-4 w-4" />
          <span className="font-medium">{t('hero.badge')}</span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight neon-text">
          {t('hero.title1')}
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">
            {t('hero.title2')}
          </span>
        </h1>

        <p className="mt-6 text-base md:text-lg text-muted-foreground font-medium">
          {t('hero.subheadline')}
        </p>

        <form onSubmit={handleSubmit} className="mt-10">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-0 p-2 rounded-2xl border border-border/30 bg-black/60 backdrop-blur-xl">
              
              <div className="relative flex-1">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="url"
                  placeholder={t('hero.placeholder')}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-14 pl-12 pr-4 bg-transparent border-0 focus-visible:ring-0 text-foreground"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !url.trim()}
                className="h-14 px-8 font-semibold rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t('hero.processing') || "Processing video..."}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    {t('hero.cta') || "Download Now – No Watermark"}
                  </>
                )}
              </Button>

            </div>
          </div>

          {error && (
            <div className="mt-4 flex items-center justify-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* 🔥 NEW TRUST TEXT */}
        <p className="mt-3 text-sm text-muted-foreground">
          Fast, free, no watermark — we do not store your videos
        </p>

        {resultSlot}

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <Download className="h-4 w-4 text-primary" />
            <span>Unlimited Downloads</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Safe & Private</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Fast Processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-primary" />
            <span>All Devices</span>
          </div>
        </div>

      </div>
    </section>
  );
            }
