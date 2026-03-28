import { Menu, Smartphone, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { NoMarkLogo } from "./NoMarkLogo";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function Header() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setIsInstallable(false);
      setDeferredPrompt(null);
    } else {
      alert('To install NoMark:\n\n1. Tap the browser menu (3 dots)\n2. Select "Add to Home Screen" or "Install App"\n3. Follow the prompts to install');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <NoMarkLogo className="h-9 w-9 rounded-xl transition-all group-hover:scale-105" />
          <span className="text-xl font-bold tracking-tight text-foreground">
            No<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">Mark</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          <a href="#features" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50">
            {t('nav.features')}
          </a>
          <a href="#how-it-works" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50">
            {t('nav.howItWorks')}
          </a>
          <a href="#faq" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50">
            {t('nav.faq')}
          </a>
          <Link to="/blog" className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50">
            {t('nav.blog')}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="text-xs font-medium">{i18n.language === 'ar' ? 'EN' : 'عربي'}</span>
          </Button>

          {!isInstalled && (
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground hover:opacity-90 transition-opacity rounded-full px-4"
            >
              <NoMarkLogo className="h-4 w-4 rounded-sm" />
              <span className="text-sm font-medium">{t('nav.installApp')}</span>
            </Button>
          )}

          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold text-primary">{t('nav.downloads')}</span>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/30 bg-background/95 backdrop-blur-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col p-4 gap-1">
            {!isInstalled && (
              <Button
                onClick={() => { handleInstallClick(); setIsMobileMenuOpen(false); }}
                className="mb-2 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground hover:opacity-90 transition-opacity rounded-lg py-3"
              >
                <Smartphone className="h-4 w-4" />
                <span className="text-sm font-medium">{t('nav.installApp')}</span>
              </Button>
            )}
            <a href="#features" className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.features')}
            </a>
            <a href="#how-it-works" className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.howItWorks')}
            </a>
            <a href="#faq" className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.faq')}
            </a>
            <Link to="/blog" className="px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground rounded-lg hover:bg-card/50" onClick={() => setIsMobileMenuOpen(false)}>
              {t('nav.blog')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
