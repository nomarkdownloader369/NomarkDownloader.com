import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Helmet>
        <title>404 - Page Not Found | NoMark</title>
        <meta name="description" content="This page doesn't exist. Go back to NoMark to download TikTok videos without watermark and Instagram Reels in HD for free." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center max-w-md">
        <div className="mb-6 text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">
          404
        </div>
        <h1 className="mb-3 text-2xl font-bold text-foreground">Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved. Head back to our free TikTok downloader and save videos without watermark.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild className="bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Download Videos Now
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Read Our Blog
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
