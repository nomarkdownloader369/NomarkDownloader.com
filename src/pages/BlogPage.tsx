import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    slug: "download-tiktok-without-watermark-2026-guide",
    titleKey: "blog.post4Title",
    excerptKey: "blog.post4Excerpt",
    date: "2026-03-28",
    readTime: "8 min",
    category: "TikTok",
  },
  {
    slug: "best-free-tiktok-downloader-no-signup",
    titleKey: "blog.post5Title",
    excerptKey: "blog.post5Excerpt",
    date: "2026-03-25",
    readTime: "7 min",
    category: "Guide",
  },
  {
    slug: "download-instagram-reels-without-watermark",
    titleKey: "blog.post6Title",
    excerptKey: "blog.post6Excerpt",
    date: "2026-03-20",
    readTime: "8 min",
    category: "Instagram",
  },
  {
    slug: "how-to-download-tiktok-videos-without-watermark",
    titleKey: "blog.post1Title",
    excerptKey: "blog.post1Excerpt",
    date: "2026-03-15",
    readTime: "5 min",
    category: "TikTok",
  },
  {
    slug: "best-instagram-reels-downloader-2026",
    titleKey: "blog.post2Title",
    excerptKey: "blog.post2Excerpt",
    date: "2026-03-10",
    readTime: "4 min",
    category: "Instagram",
  },
  {
    slug: "save-social-media-videos-hd-quality",
    titleKey: "blog.post3Title",
    excerptKey: "blog.post3Excerpt",
    date: "2026-03-05",
    readTime: "6 min",
    category: "Guide",
  },
  {
    slug: "how-to-save-tiktok-sounds-as-mp3",
    titleKey: "blog.post7Title",
    excerptKey: "blog.post7Excerpt",
    date: "2026-04-01",
    readTime: "5 min",
    category: "TikTok",
  },
  {
    slug: "tiktok-video-downloader-for-iphone-and-android",
    titleKey: "blog.post8Title",
    excerptKey: "blog.post8Excerpt",
    date: "2026-04-02",
    readTime: "6 min",
    category: "Guide",
  },
  {
    slug: "download-instagram-stories-without-login",
    titleKey: "blog.post9Title",
    excerptKey: "blog.post9Excerpt",
    date: "2026-04-03",
    readTime: "5 min",
    category: "Instagram",
  },
  {
    slug: "why-nomark-is-the-best-video-downloader",
    titleKey: "blog.post10Title",
    excerptKey: "blog.post10Excerpt",
    date: "2026-04-04",
    readTime: "7 min",
    category: "Guide",
  },
  {
    slug: "download-tiktok-videos-without-app-installation",
    titleKey: "blog.post11Title",
    excerptKey: "blog.post11Excerpt",
    date: "2026-04-05",
    readTime: "4 min",
    category: "TikTok",
  },
  {
    slug: "save-instagram-videos-to-camera-roll-guide",
    titleKey: "blog.post12Title",
    excerptKey: "blog.post12Excerpt",
    date: "2026-04-06",
    readTime: "5 min",
    category: "Instagram",
  },
  {
    slug: "how-to-repost-tiktok-videos-without-watermark",
    titleKey: "blog.post13Title",
    excerptKey: "blog.post13Excerpt",
    date: "2026-04-07",
    readTime: "6 min",
    category: "TikTok",
  },
];

export { blogPosts };

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NoMark Blog - TikTok & Instagram Download Tips & Guides</title>
        <meta name="description" content="Learn how to download TikTok videos without watermark and save Instagram Reels in HD. Free guides, tips, and tutorials." />
        <link rel="canonical" href="https://nomark.app/blog" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
              {t('blog.badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{t('blog.title')}</h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">{t('blog.subtitle')}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group relative rounded-2xl border border-border bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-[hsl(var(--chart-2))]/20 flex items-center justify-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary/60 bg-primary/10 px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {t(post.titleKey)}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 mb-4">{t(post.excerptKey)}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                    <span className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                      {t('blog.readMore')} <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
