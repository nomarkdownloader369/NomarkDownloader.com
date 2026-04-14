import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";

import blog1 from "@/assets/blog/blog-1.jpg";
import blog2 from "@/assets/blog/blog-2.jpg";
import blog3 from "@/assets/blog/blog-3.jpg";
import blog4 from "@/assets/blog/blog-4.jpg";
import blog5 from "@/assets/blog/blog-5.jpg";
import blog6 from "@/assets/blog/blog-6.jpg";
import blog7 from "@/assets/blog/blog-7.jpg";
import blog8 from "@/assets/blog/blog-8.jpg";
import blog9 from "@/assets/blog/blog-9.jpg";
import blog10 from "@/assets/blog/blog-10.jpg";
import blog11 from "@/assets/blog/blog-11.jpg";
import blog12 from "@/assets/blog/blog-12.jpg";
import blog13 from "@/assets/blog/blog-13.jpg";
import blog14 from "@/assets/blog/blog-14.jpg";
import blog15 from "@/assets/blog/blog-15.jpg";
import blog16 from "@/assets/blog/blog-16.jpg";
import blog17 from "@/assets/blog/blog-17.jpg";
import blog18 from "@/assets/blog/blog-18.jpg";
import blog19 from "@/assets/blog/blog-19.jpg";
import blog20 from "@/assets/blog/blog-20.jpg";
import blog21 from "@/assets/blog/blog-21.jpg";

const blogPosts = [
  { slug: "download-tiktok-without-watermark-2026-guide", titleKey: "blog.post4Title", excerptKey: "blog.post4Excerpt", date: "2026-03-28", readTime: "8 min", category: "TikTok", image: blog1 },
  { slug: "best-free-tiktok-downloader-no-signup", titleKey: "blog.post5Title", excerptKey: "blog.post5Excerpt", date: "2026-03-25", readTime: "7 min", category: "Guide", image: blog2 },
  { slug: "download-instagram-reels-without-watermark", titleKey: "blog.post6Title", excerptKey: "blog.post6Excerpt", date: "2026-03-20", readTime: "8 min", category: "Instagram", image: blog3 },
  { slug: "how-to-download-tiktok-videos-without-watermark", titleKey: "blog.post1Title", excerptKey: "blog.post1Excerpt", date: "2026-03-15", readTime: "5 min", category: "TikTok", image: blog4 },
  { slug: "best-instagram-reels-downloader-2026", titleKey: "blog.post2Title", excerptKey: "blog.post2Excerpt", date: "2026-03-10", readTime: "4 min", category: "Instagram", image: blog5 },
  { slug: "save-social-media-videos-hd-quality", titleKey: "blog.post3Title", excerptKey: "blog.post3Excerpt", date: "2026-03-05", readTime: "6 min", category: "Guide", image: blog6 },
  { slug: "how-to-save-tiktok-sounds-as-mp3", titleKey: "blog.post7Title", excerptKey: "blog.post7Excerpt", date: "2026-04-01", readTime: "5 min", category: "TikTok", image: blog7 },
  { slug: "tiktok-video-downloader-for-iphone-and-android", titleKey: "blog.post8Title", excerptKey: "blog.post8Excerpt", date: "2026-04-02", readTime: "6 min", category: "Guide", image: blog8 },
  { slug: "download-instagram-stories-without-login", titleKey: "blog.post9Title", excerptKey: "blog.post9Excerpt", date: "2026-04-03", readTime: "5 min", category: "Instagram", image: blog9 },
  { slug: "why-nomark-is-the-best-video-downloader", titleKey: "blog.post10Title", excerptKey: "blog.post10Excerpt", date: "2026-04-04", readTime: "7 min", category: "Guide", image: blog10 },
  { slug: "download-tiktok-videos-without-app-installation", titleKey: "blog.post11Title", excerptKey: "blog.post11Excerpt", date: "2026-04-05", readTime: "4 min", category: "TikTok", image: blog11 },
  { slug: "save-instagram-videos-to-camera-roll-guide", titleKey: "blog.post12Title", excerptKey: "blog.post12Excerpt", date: "2026-04-06", readTime: "5 min", category: "Instagram", image: blog12 },
  { slug: "how-to-repost-tiktok-videos-without-watermark", titleKey: "blog.post13Title", excerptKey: "blog.post13Excerpt", date: "2026-04-07", readTime: "6 min", category: "TikTok", image: blog13 },
  { slug: "download-tiktok-slideshow-as-video", titleKey: "blog.post14Title", excerptKey: "blog.post14Excerpt", date: "2026-04-08", readTime: "5 min", category: "TikTok", image: blog14 },
  { slug: "best-instagram-video-downloader-for-pc", titleKey: "blog.post15Title", excerptKey: "blog.post15Excerpt", date: "2026-04-09", readTime: "6 min", category: "Instagram", image: blog15 },
  { slug: "download-tiktok-videos-in-4k-quality", titleKey: "blog.post16Title", excerptKey: "blog.post16Excerpt", date: "2026-04-10", readTime: "5 min", category: "TikTok", image: blog16 },
  { slug: "how-to-download-multiple-tiktok-videos-at-once", titleKey: "blog.post17Title", excerptKey: "blog.post17Excerpt", date: "2026-04-11", readTime: "7 min", category: "Guide", image: blog17 },
  { slug: "tiktok-to-mp4-converter-free-online", titleKey: "blog.post18Title", excerptKey: "blog.post18Excerpt", date: "2026-04-12", readTime: "5 min", category: "TikTok", image: blog18 },
  { slug: "download-instagram-reels-on-iphone-2026", titleKey: "blog.post19Title", excerptKey: "blog.post19Excerpt", date: "2026-04-13", readTime: "6 min", category: "Instagram", image: blog19 },
  { slug: "save-tiktok-live-videos-after-stream-ends", titleKey: "blog.post20Title", excerptKey: "blog.post20Excerpt", date: "2026-04-14", readTime: "5 min", category: "TikTok", image: blog20 },
  { slug: "free-social-media-video-downloader-all-platforms", titleKey: "blog.post21Title", excerptKey: "blog.post21Excerpt", date: "2026-04-14", readTime: "8 min", category: "Guide", image: blog21 },
];

export { blogPosts };

export default function BlogPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NoMark Blog - TikTok & Instagram Download Tips & Guides</title>
        <meta name="description" content="Learn how to download TikTok videos without watermark and save Instagram Reels in HD. Free guides, tips, and tutorials." />
        <link rel="canonical" href="https://nomarkdownloader.com/blog" />
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
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={t(post.titleKey)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
                <div className="p-5">
                  <h2 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{t(post.titleKey)}</h2>
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
