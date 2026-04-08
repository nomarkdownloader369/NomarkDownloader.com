import { Download } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export function SecondCTA() {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="px-4 py-10 sm:py-14 text-center">
      <Button onClick={scrollToTop} className="h-14 px-10 text-base font-semibold rounded-xl neon-btn">
        <Download className="mr-2 h-5 w-5" />
        {t('secondCta.button')}
      </Button>
    </section>
  );
}
