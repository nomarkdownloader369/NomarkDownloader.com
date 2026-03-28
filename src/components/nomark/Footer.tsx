import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { NoMarkLogo } from "./NoMarkLogo";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative border-t border-border/30 px-4 py-12 sm:py-16 pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[400px] sm:w-[600px] h-[200px] sm:h-[300px] opacity-10 blur-[100px] bg-primary rounded-full" />
      </div>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:gap-10 grid-cols-2 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
              <NoMarkLogo className="h-10 w-10 rounded-xl" />
              <span className="text-xl font-bold tracking-tight text-foreground">
                No<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">Mark</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{t('footer.description')}</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.platforms')}</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 sm:space-y-3">
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.tiktokDownloader')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.instagramReels')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.instagramVideo')}</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">{t('footer.tiktokMp4')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.quickLinks')}</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 sm:space-y-3">
              <li><Link to="/#features" className="hover:text-primary transition-colors">{t('nav.features')}</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-primary transition-colors">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/#faq" className="hover:text-primary transition-colors">{t('nav.faq')}</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">{t('nav.blog')}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t('footer.contactUs')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">{t('footer.legal')}</h3>
            <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 sm:space-y-3">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">{t('footer.privacyPolicy')}</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">{t('footer.termsOfService')}</Link></li>
              <li><Link to="/dmca" className="hover:text-primary transition-colors">{t('footer.dmca')}</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[10px] sm:text-sm text-muted-foreground text-center md:text-start">{t('footer.disclaimer')}</p>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span>{t('footer.madeWith')}</span>
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-destructive fill-current" />
              <span>{t('footer.forCreators')}</span>
            </div>
          </div>
          <p className="mt-3 sm:mt-4 text-center text-[10px] sm:text-xs text-muted-foreground">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
