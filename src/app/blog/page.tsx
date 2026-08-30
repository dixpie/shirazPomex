import type { Metadata } from "next";
import Link from "next/link";
import { getPosts, safe } from "@/lib/data";
import BlogCard from "@/components/BlogCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "وبلاگ پومکس شیراز - راهنمای خرید و اخبار محصولات",
  description:
    "مقالات آموزشی، راهنمای خرید و اخبار محصولات پومکس از نمایندگی رسمی شیراز.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const posts = await safe(getPosts({ q }), []);

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> / وبلاگ
      </nav>

      <h1 className="section-title mb-2">وبلاگ پومکس شیراز</h1>
      <p className="mb-8 max-w-2xl text-slate-500">
        راهنمای خرید، معرفی محصولات و نکات نگهداری از محصولات پومکس.
      </p>

      <form className="mb-8 flex max-w-md gap-3" action="/blog">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="جستجو در مقالات..."
          className="flex-1 rounded-xl border border-brand-100 px-4 py-2 focus:border-brand focus:outline-none"
        />
        <button type="submit" className="btn-outline !px-6 !py-2">
          جستجو
        </button>
      </form>

      {posts.length ? (
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-10 text-center text-brand-700">
          هنوز مقاله‌ای منتشر نشده است.
        </div>
      )}
    </div>
  );
}
