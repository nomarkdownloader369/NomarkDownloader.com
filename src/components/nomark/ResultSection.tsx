import { useState } from "react";
import { Download, Play, Crown, X, Clock, Eye, CheckCircle, Loader2, Sparkles, Music } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { VideoInfo } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

interface ResultSectionProps {
  videoData: VideoInfo;
  onClose: () => void;
}

export function ResultSection({ videoData, onClose }: ResultSectionProps) {
  const { t } = useTranslation();
  const [isDownloadingStandard, setIsDownloadingStandard] = useState(false);
  const [isDownloadingPremium, setIsDownloadingPremium] = useState(false);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adProgress, setAdProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState<"standard" | "premium" | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const forceDownload = async (url: string, filename: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('download-video', {
        body: { url },
      });
      
      if (error || !data) {
        window.open(url, '_blank');
        return true;
      }

      // If we get a proxied URL back, use it
      if (data.downloadUrl) {
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 100);
        return true;
      }

      window.open(url, '_blank');
      return true;
    } catch {
      window.open(url, '_blank');
      return true;
    }
  };

  const handleDownloadStandard = async () => {
    setIsDownloadingStandard(true);
    setDownloadError(null);
    try {
      const filename = `nomark_${videoData.platform}_${Date.now()}.mp4`;
      await forceDownload(videoData.downloadUrls.standard, filename);
      setDownloadComplete("standard");
      setTimeout(() => setDownloadComplete(null), 3000);
    } catch {
      setDownloadError("Download failed. Please try again.");
    } finally {
      setIsDownloadingStandard(false);
    }
  };

  const handleDownloadPremium = () => {
    setShowAdModal(true);
    setAdProgress(0);
    setDownloadError(null);
    const interval = setInterval(() => {
      setAdProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 10;
      });
    }, 500);
    setTimeout(async () => {
      setShowAdModal(false);
      setIsDownloadingPremium(true);
      try {
        const filename = `nomark_hd_${videoData.platform}_${Date.now()}.mp4`;
        await forceDownload(videoData.downloadUrls.hd, filename);
        setDownloadComplete("premium");
        setTimeout(() => setDownloadComplete(null), 3000);
      } catch {
        setDownloadError("HD Download failed. Please try again.");
      } finally {
        setIsDownloadingPremium(false);
      }
    }, 5000);
  };

  return (
    <>
      <section className="px-4 pt-2 pb-10">
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-[hsl(var(--chart-2))]/20 to-primary/20 rounded-2xl blur-xl" />
            <div className="relative overflow-hidden rounded-2xl glass-effect border border-border/50">
              <div className="flex items-center justify-between border-b border-border/50 px-4 sm:px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--chart-2))]">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base">{t('result.videoReady')}</h3>
                    <p className="text-xs text-muted-foreground">{t('result.chooseOption')}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-muted-foreground hover:text-foreground rounded-full">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex gap-4 sm:gap-5">
                  <div className="relative aspect-[9/16] w-24 sm:w-32 shrink-0 overflow-hidden rounded-xl bg-secondary">
                    <img src={videoData.thumbnail} alt={videoData.title} className="h-full w-full object-cover" crossOrigin="anonymous" />
                    <div className="absolute inset-0 flex items-center justify-center bg-background/30">
                      <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-primary/90 backdrop-blur-sm glow-effect">
                        <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 rounded-md bg-background/80 backdrop-blur-sm px-1.5 py-0.5 text-[10px] sm:text-xs font-medium text-foreground">{videoData.duration}</div>
                    <div className="absolute top-2 left-2 rounded-md bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] px-1.5 py-0.5 text-[10px] sm:text-xs font-bold text-primary-foreground capitalize">{videoData.platform}</div>
                  </div>
                  <div className="flex flex-1 flex-col justify-center min-w-0">
                    <h4 className="font-semibold text-foreground line-clamp-2 text-sm sm:text-base leading-snug">{videoData.title}</h4>
                    <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-primary font-medium">@{videoData.author}</p>
                    <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 bg-card/50 px-2 py-1 rounded-full"><Eye className="h-3 w-3" />{videoData.views} {t('result.views')}</span>
                      <span className="flex items-center gap-1 bg-card/50 px-2 py-1 rounded-full"><Clock className="h-3 w-3" />{videoData.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-border/50 p-4 sm:p-5">
                <div className="flex flex-col gap-3">
                  {downloadError && <div className="text-center text-sm text-destructive mb-2">{downloadError}</div>}
                  <Button variant="secondary" onClick={handleDownloadStandard} disabled={isDownloadingStandard || downloadComplete === "standard"} className="h-12 sm:h-13 w-full justify-center gap-2.5 text-xs sm:text-sm font-medium rounded-xl">
                    {downloadComplete === "standard" ? (<><CheckCircle className="h-4 w-4 text-primary" />{t('result.downloadStarted')}</>) : isDownloadingStandard ? (<><Loader2 className="h-4 w-4 animate-spin" />{t('result.downloading')}</>) : (<><Download className="h-4 w-4" />{t('result.downloadStandard')}</>)}
                  </Button>
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-[hsl(var(--chart-2))] to-primary rounded-xl blur-md opacity-60 animate-pulse-glow" />
                    <Button onClick={handleDownloadPremium} disabled={isDownloadingPremium || downloadComplete === "premium" || showAdModal} className="relative h-12 sm:h-14 w-full justify-center gap-2 sm:gap-2.5 overflow-hidden rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-primary via-[hsl(var(--chart-2))] to-primary hover:opacity-90 text-primary-foreground">
                      {downloadComplete === "premium" ? (<><CheckCircle className="h-5 w-5" /><span>{t('result.hdStarted')}</span></>) : isDownloadingPremium ? (<><Loader2 className="h-5 w-5 animate-spin" /><span>{t('result.downloadingHD')}</span></>) : (<><Crown className="h-4 w-4 sm:h-5 sm:w-5" /><span>{t('result.downloadHD')}</span><div className="flex items-center gap-1 rounded-full bg-primary-foreground/20 px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold"><Play className="h-2.5 w-2.5 sm:h-3 sm:w-3 fill-current" /><span>{t('result.watchAd')}</span></div></>)}
                    </Button>
                  </div>
                  {videoData.audioUrl && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = videoData.audioUrl!;
                        link.download = `nomark_audio_${Date.now()}.mp3`;
                        link.target = '_blank';
                        link.rel = 'noopener noreferrer';
                        document.body.appendChild(link);
                        link.click();
                        setTimeout(() => document.body.removeChild(link), 100);
                      }}
                      className="h-12 sm:h-13 w-full justify-center gap-2.5 text-xs sm:text-sm font-medium rounded-xl border-primary/30 hover:bg-primary/10"
                    >
                      <Music className="h-4 w-4" />
                      {t('result.downloadAudio', 'Download Audio (MP3)')}
                    </Button>
                  )}
                  <p className="text-center text-[10px] sm:text-xs text-muted-foreground mt-1">
                    <Sparkles className="inline h-3 w-3 mr-1" />{t('result.watchAdInfo')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative mx-4 max-w-sm w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-[hsl(var(--chart-2))]/30 to-primary/30 rounded-2xl blur-xl" />
            <div className="relative p-6 sm:p-8 text-center glass-effect rounded-2xl border border-border/50">
              <div className="mb-6">
                <div className="mx-auto mb-5 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-[hsl(var(--chart-2))] glow-effect-strong">
                  <Play className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground fill-current" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground">{t('result.playingAd')}</h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground">{t('result.adWait')}</p>
              </div>
              <div className="relative h-3 w-full overflow-hidden rounded-full bg-secondary">
                <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] transition-all duration-300 rounded-full" style={{ width: `${adProgress}%` }} />
              </div>
              <p className="mt-3 text-sm font-medium text-foreground">
                {adProgress < 100 ? `${Math.ceil((100 - adProgress) / 20)}${t('result.remaining')}` : t('result.almostReady')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
