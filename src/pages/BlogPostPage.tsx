import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/nomark/Header";
import { Footer } from "@/components/nomark/Footer";
import { blogPosts } from "./BlogPage";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16 px-4 text-center">
          <h1 className="text-2xl font-bold text-foreground">Post not found</h1>
          <Link to="/blog" className="text-primary mt-4 inline-block hover:underline">
            ← Back to Blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const contentKey = `blog.${post.slug.replace(/-/g, '_')}_content`;
  const postUrl = `https://nomarkdownloader.com/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t(post.titleKey)} | NoMark Downloader</title>
        <meta name="description" content={t(post.excerptKey)} />
        <meta name="keywords" content="tiktok downloader, no watermark, download video hd, instagram downloader, free video downloader" />
        <link rel="canonical" href={postUrl} />
        <meta property="og:title" content={t(post.titleKey)} />
        <meta property="og:description" content={t(post.excerptKey)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content="https://nomarkdownloader.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t(post.titleKey)} />
        <meta name="twitter:description" content={t(post.excerptKey)} />
        <meta name="twitter:image" content="https://nomarkdownloader.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: t(post.titleKey),
            description: t(post.excerptKey),
            author: { "@type": "Organization", name: "NoMark" },
            publisher: { "@type": "Organization", name: "NoMark", logo: { "@type": "ImageObject", url: "https://nomarkdownloader.com/favicon.png" } },
            datePublished: post.date,
            mainEntityOfPage: postUrl
          })}
        </script>
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 px-4">
        <article className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t('blog.backToBlog')}
          </Link>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">{t(post.titleKey)}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
            </div>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img src={post.image} alt={t(post.titleKey)} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-foreground prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground">
            <div dangerouslySetInnerHTML={{ __html: t(contentKey) }} />
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
            <h3 className="text-xl font-semibold text-foreground mb-2">{t('blog.ctaTitle')}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t('blog.ctaDesc')}</p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all">
              {t('blog.ctaButton')}
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">{t('blog.relatedArticles')}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPosts.filter((p) => p.slug !== slug).slice(0, 4).map((relatedPost) => (
                <Link key={relatedPost.slug} to={`/blog/${relatedPost.slug}`} className="group p-4 rounded-xl border border-border hover:border-primary/30 transition-colors">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-primary/60">{relatedPost.category}</span>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-1 line-clamp-2">{t(relatedPost.titleKey)}</h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium">
              <ArrowLeft className="h-4 w-4" /> {t('blog.backToBlog')}
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
              }
