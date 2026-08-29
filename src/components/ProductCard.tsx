import Image from "next/image";
import Link from "next/link";
import { PlainProduct } from "@/lib/data";
import { formatToman } from "@/lib/format";
import CallToOrderButton from "./CallToOrderButton";
import MotionCard from "./motion/MotionCard";

export default function ProductCard({ product }: { product: PlainProduct }) {
  const hasDiscount =
    !!product.discountPrice && product.discountPrice < product.price;
  const cover = product.images?.[0];

  return (
    <MotionCard className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:shadow-lg">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square bg-brand-50"
      >
        {cover ? (
          <Image
            src={cover}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-200">
            بدون تصویر
          </div>
        )}
        {!product.inStock && (
          <span className="absolute top-2 right-2 rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-white">
            ناموجود
          </span>
        )}
        {hasDiscount && product.inStock && (
          <span className="absolute top-2 right-2 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
            تخفیف ویژه
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-brand-500">
          {product.category}
        </span>
        <Link
          href={`/products/${product.slug}`}
          className="line-clamp-2 min-h-[2.7em] font-bold text-slate-800 hover:text-brand"
        >
          {product.title}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          {hasDiscount ? (
            <>
              <span className="text-lg font-extrabold text-brand-700">
                {formatToman(product.discountPrice!)}
              </span>
              <span className="text-sm text-slate-400 line-through">
                {formatToman(product.price)}
              </span>
            </>
          ) : (
            <span className="text-lg font-extrabold text-brand-700">
              {formatToman(product.price)}
            </span>
          )}
        </div>

        <CallToOrderButton size="sm" className="mt-2" />
      </div>
    </MotionCard>
  );
}
