import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug, getRelatedProducts } from "@/lib/data";
import { decodeSlug } from "@/lib/slugify";
import { formatToman } from "@/lib/format";
import { getProductImage } from "@/lib/productImage";
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

  const title = product.seo?.title || `${product.fa.name} | قیمت و خرید از پومکس شیراز`;
  const description =
    product.seo?.metaDescription ||
    product.fa.description ||
    `خرید ${product.fa.name} با گارانتی اصالت از نمایندگی رسمی پومکس در شیراز. برای استعلام قیمت تماس بگیرید.`;
  const image = getProductImage(product.code);

  return {
    title,
    description,
    alternates: { canonical: `/products/${product.fa.slug}` },
    openGraph: {
      title,
      description,
      images: image.exists ? [image.src] : undefined,
    },
  };
}

function splitList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(/[؛;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(decodeSlug(slug));
  if (!product) notFound();

  const related = await getRelatedProducts(product.category, product.fa.slug);
  const inStock = product.inStock ?? true;
  const image = getProductImage(product.code);

  const specs: { label: string; value: string }[] = [
    { label: "رنگ", value: product.fa.color ?? "" },
    { label: "وزن / بسته‌بندی", value: product.fa.weight ?? "" },
    { label: "نوع", value: product.fa.type ?? "" },
    { label: "میزان مصرف", value: product.fa.consumption ?? "" },
    { label: "نسبت اختلاط", value: product.fa.mixingRatio ?? "" },
    { label: "چگالی", value: product.fa.density ?? "" },
    { label: "pH", value: product.fa.ph ?? "" },
    { label: "ترکیب", value: product.fa.composition ?? "" },
    { label: "بسته‌بندی", value: product.fa.packaging ?? "" },
    { label: "نگهداری", value: product.fa.storage ?? "" },
    { label: "استانداردها", value: product.fa.standards ?? "" },
  ].filter((s) => s.value);

  const features = splitList(product.fa.features);
  const useFor = splitList(product.fa.useFor);

  return (
    <div className="container-page py-10">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.fa.name,
          image: image.exists ? [image.src] : undefined,
          description: product.fa.description,
          sku: product.code,
          brand: { "@type": "Brand", name: siteConfig.brand },
          offers: {
            "@type": "Offer",
            url: `${siteConfig.url}/products/${product.fa.slug}`,
            priceCurrency: "IRR",
            price: product.price * 10,
            availability: inStock
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
            {
              "@type": "ListItem",
              position: 3,
              name: product.fa.name,
              item: `${siteConfig.url}/products/${product.fa.slug}`,
            },
          ],
        }}
      />

      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> /{" "}
        <Link href="/products" className="hover:text-brand">محصولات</Link> /{" "}
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand">
          {product.category}
        </Link>{" "}
        / <span className="text-slate-700">{product.fa.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-brand-100 bg-brand-50">
          {image.exists ? (
            <Image
              src={image.src}
              alt={product.fa.name}
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
            {product.fa.name}
          </h1>
          <p className="mt-1 text-sm text-slate-400">کد محصول: {product.code}</p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-black text-brand-700">
              {formatToman(product.price)}
            </span>
          </div>

          <p className="mt-2 text-sm">
            {inStock ? (
              <span className="font-bold text-green-600">موجود در انبار</span>
            ) : (
              <span className="font-bold text-red-500">ناموجود</span>
            )}
          </p>

          {product.fa.description && (
            <p className="mt-4 leading-8 text-slate-600">{product.fa.description}</p>
          )}

          <div className="mt-6">
            <CallToOrderButton size="lg" label="برای خرید تماس بگیرید" />
            <p className="mt-3 text-center text-xs text-slate-400 lg:text-right">
              همکاران ما شماره شما را ذخیره نمی‌کنند و صرفا برای مشاوره خرید در دسترس هستند.
            </p>
          </div>

          {features.length > 0 && (
            <div className="mt-8">
              <h2 className="mb-2 font-bold text-brand-800">ویژگی‌ها</h2>
              <ul className="grid gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {useFor.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 font-bold text-brand-800">کاربرد</h2>
              <ul className="grid gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
                {useFor.map((u) => (
                  <li key={u} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-300" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {specs.length > 0 && (
            <div className="mt-8 overflow-hidden rounded-xl border border-brand-100">
              <h2 className="bg-brand-50 px-4 py-2 font-bold text-brand-800">
                مشخصات فنی
              </h2>
              <dl>
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`flex justify-between gap-4 px-4 py-2 text-sm ${
                      i % 2 ? "bg-white" : "bg-brand-50/40"
                    }`}
                  >
                    <dt className="text-slate-500">{spec.label}</dt>
                    <dd className="text-left font-medium text-slate-700">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {product.fa.usage && (
            <div className="mt-6">
              <h2 className="mb-2 font-bold text-brand-800">روش مصرف</h2>
              <p className="text-sm leading-7 text-slate-600">{product.fa.usage}</p>
            </div>
          )}
        </div>
      </div>

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
