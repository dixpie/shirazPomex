import Image from "next/image";
import Link from "next/link";
import { PlainProduct } from "@/lib/data";
import { formatToman } from "@/lib/format";
import { getProductImage } from "@/lib/productImage";
import CallToOrderButton from "./CallToOrderButton";
import MotionCard from "./motion/MotionCard";

export default function ProductCard({ product }: { product: PlainProduct }) {
  const image = getProductImage(product.code);
  const inStock = product.inStock ?? true;

  return (
    <MotionCard className="group flex flex-col overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:shadow-lg">
      <Link
        href={`/products/${product.fa.slug}`}
        className="relative block aspect-square bg-brand-50"
      >
        {image.exists ? (
          <Image
            src={image.src}
            alt={product.fa.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-4 transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-200">
            بدون تصویر
          </div>
        )}
        {!inStock && (
          <span className="absolute top-2 right-2 rounded-full bg-slate-700 px-3 py-1 text-xs font-bold text-white">
            ناموجود
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-brand-500">
          {product.category}
        </span>
        <Link
          href={`/products/${product.fa.slug}`}
          className="line-clamp-2 min-h-[2.7em] font-bold text-slate-800 hover:text-brand"
        >
          {product.fa.name}
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-lg font-extrabold text-brand-700">
            {formatToman(product.price)}
          </span>
        </div>

        <CallToOrderButton size="sm" className="mt-2" />
      </div>
    </MotionCard>
  );
}
