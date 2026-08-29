import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { decodeSlug } from "@/lib/slugify";
import { formatToman } from "@/lib/format";
import CallToOrderButton from "@/components/CallToOrderButton";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(decodeSlug(slug));
  if (!product) return {};

  const title = product.seoTitle || `${product.title} | قیمت و خرید از پومکس شیراز`;
  const description =
    product.seoDescription ||
    product.shortDescription ||
    `خرید ${product.title} با گارانتی اصالت از نمایندگی رسمی پومکس در شیراز. برای استعلام قیمت تماس بگیرید.`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title,
      description,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(decodeSlug(slug));
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.slug);
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;
  const finalPrice = hasDiscount ? product.discountPrice! : product.price;

  return (
    <div className="container-page py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          image: product.images,
          description: product.shortDescription || product.description,
          sku: product.model || product._id,
          brand: { "@type": "Brand", name: siteConfig.brand },
          offers: {
            "@type": "Offer",
            url: `${siteConfig.url}/products/${product.slug}`,
            priceCurrency: "IRR",
            price: finalPrice * 10,
            availability: product.inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "خانه", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "محصولات", item: `${siteConfig.url}/products` },
            { "@type": "ListItem", position: 3, name: product.title, item: `${siteConfig.url}/products/${product.slug}` },
          ],
        }}
      />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> /{" "}
        <Link href="/products" className="hover:text-brand">محصولات</Link> /{" "}
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand">
          {product.category}
        </Link>{" "}
        / <span className="text-slate-700">{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-100 bg-brand-50">
          {product.images?.[0] ? (
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-6"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-200">
              بدون تصویر
            </div>
          )}
        </div>

        <div>
          <span className="text-sm font-bold text-brand-500">{product.category}</span>
          <h1 className="mt-1 text-2xl font-extrabold text-brand-900 sm:text-3xl">
            {product.title}
          </h1>
          {product.model && (
            <p className="mt-1 text-sm text-slate-400">کد محصول: {product.model}</p>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            {hasDiscount ? (
              <>
                <span className="text-3xl font-black text-brand-700">
                  {formatToman(product.discountPrice!)}
                </span>
                <span className="text-lg text-slate-400 line-through">
                  {formatToman(product.price)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-black text-brand-700">
                {formatToman(product.price)}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.inStock ? (
              <span className="font-bold text-green-600">موجود در انبار</span>
            ) : (
              <span className="font-bold text-red-500">ناموجود</span>
            )}
          </p>

          {product.shortDescription && (
            <p className="mt-4 leading-8 text-slate-600">{product.shortDescription}</p>
          )}

          <div className="mt-6">
            <CallToOrderButton size="lg" label="برای خرید تماس بگیرید" />
            <p className="mt-3 text-center text-xs text-slate-400 lg:text-right">
              همکاران ما شماره شما را ذخیره نمی‌کنند و صرفا برای مشاوره خرید در دسترس هستند.
            </p>
          </div>

          {product.specs?.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-brand-100">
              <h2 className="bg-brand-50 px-4 py-2 font-bold text-brand-800">
                مشخصات فنی
              </h2>
              <dl>
                {product.specs.map((spec, i) => (
                  <div
                    key={spec.key}
                    className={`flex justify-between px-4 py-2 text-sm ${
                      i % 2 ? "bg-white" : "bg-brand-50/40"
                    }`}
                  >
                    <dt className="text-slate-500">{spec.key}</dt>
                    <dd className="font-medium text-slate-700">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </div>

      {product.description && (
        <div className="prose prose-fa mt-12 max-w-none rounded-2xl border border-brand-100 p-6">
          <h2>معرفی کامل {product.title}</h2>
          <p className="whitespace-pre-line leading-8">{product.description}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-14">
          <h2 className="section-title mb-6">محصولات مرتبط</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
