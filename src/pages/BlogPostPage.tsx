import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
          <Link to="/blog" className="text-primary mt-4 inline-block hover:underline">← Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const contentKey = `blog.${post.slug.replace(/-/g, '_')}_content`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <article className="mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> {t('blog.backToBlog')}
          </Link>

          <div className="mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
              {t(post.titleKey)}
            </h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
            </div>
          </div>

          <div className="aspect-video rounded-2xl bg-gradient-to-br from-primary/20 to-[hsl(var(--chart-2))]/20 mb-8 flex items-center justify-center">
            <span className="text-sm font-bold uppercase tracking-wider text-primary/60">{post.category}</span>
          </div>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none
            prose-headings:text-foreground prose-headings:font-bold
            prose-p:text-muted-foreground prose-p:leading-relaxed
            prose-strong:text-foreground
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-li:text-muted-foreground
          ">
            <div dangerouslySetInnerHTML={{ __html: t(contentKey) }} />
          </div>

          <div className="mt-12 pt-8 border-t border-border">
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
