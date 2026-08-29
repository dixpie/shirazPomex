import type { Metadata } from "next";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import { siteConfig } from "@/lib/siteConfig";
import clsx from "clsx";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "محصولات پومکس - قیمت و مشخصات",
  description:
    "لیست کامل محصولات پومکس موجود در نمایندگی رسمی شیراز به همراه قیمت روز. برای خرید و استعلام قیمت تماس بگیرید.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;

  const [products, categories] = await Promise.all([
    getProducts({ category, q }),
    getCategories(),
  ]);

  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> / محصولات
      </nav>

      <h1 className="section-title mb-2">محصولات پومکس</h1>
      <p className="mb-8 max-w-2xl text-slate-500">
        تمامی محصولات با گارانتی اصالت {siteConfig.brand} عرضه می‌شوند. برای
        استعلام قیمت نهایی و موجودی با ما تماس بگیرید.
      </p>

      <form className="mb-8 flex flex-wrap gap-3" action="/products">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="جستجوی محصول..."
          className="min-w-[200px] flex-1 rounded-xl border border-brand-100 px-4 py-2 focus:border-brand focus:outline-none"
        />
        {category && <input type="hidden" name="category" value={category} />}
        <button type="submit" className="btn-outline !px-6 !py-2">
          جستجو
        </button>
      </form>

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={clsx(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition",
              !category
                ? "border-brand bg-brand text-white"
                : "border-brand-100 text-slate-600 hover:border-brand"
            )}
          >
            همه
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              href={`/products?category=${encodeURIComponent(c)}`}
              className={clsx(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition",
                category === c
                  ? "border-brand bg-brand text-white"
                  : "border-brand-100 text-slate-600 hover:border-brand"
              )}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {products.length ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-10 text-center text-brand-700">
          محصولی با این مشخصات پیدا نشد.
        </div>
      )}
    </div>
  );
}
