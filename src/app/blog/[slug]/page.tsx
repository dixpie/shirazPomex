import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/data";
import { decodeSlug } from "@/lib/slugify";
import { toJalaliDate } from "@/lib/format";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(decodeSlug(slug));
  if (!post) return {};

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(decodeSlug(slug));
  if (!post) notFound();

  const related = await getRelatedPosts(post.slug);

  return (
    <article className="container-page py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage ? [post.coverImage] : undefined,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: siteConfig.name },
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        }}
      />

      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> /{" "}
        <Link href="/blog" className="hover:text-brand">وبلاگ</Link> /{" "}
        <span className="text-slate-700">{post.title}</span>
      </nav>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-brand-900 sm:text-3xl">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-slate-400">
          <span>{post.author}</span>
          <span>·</span>
          <span>{toJalaliDate(post.createdAt)}</span>
        </div>

        {post.coverImage && (
          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-50">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-fa mt-8 max-w-none leading-8">
          {post.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? <p key={i}>{paragraph}</p> : null
          )}
        </div>

        {post.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-14 max-w-5xl">
          <h2 className="section-title mb-6">مطالب مرتبط</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <BlogCard key={p._id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
