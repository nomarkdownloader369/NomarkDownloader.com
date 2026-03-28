import { X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function AdBanner() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="bg-card/95 backdrop-blur-xl border-t border-border/30 px-4 py-2.5 sm:py-3">
        <div className="mx-auto max-w-4xl flex items-center justify-center gap-3 sm:gap-4">
          <span className="text-[8px] sm:text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded bg-muted/50">{t('ad')}</span>
          <div className="flex-1 max-w-2xl h-12 sm:h-14 md:h-16 rounded-lg border border-dashed border-border/50 bg-muted/20 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground/60">{t('adSpace')}</span>
          </div>
          <button onClick={() => setIsVisible(false)} className="p-1 sm:p-1.5 rounded-md text-muted-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors" aria-label="Close advertisement">
            <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
