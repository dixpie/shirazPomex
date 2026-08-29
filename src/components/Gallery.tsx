import Image from "next/image";
import { getGalleryItems } from "@/lib/gallery";
import MotionCard from "./motion/MotionCard";

export default function Gallery() {
  const items = getGalleryItems();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {items.map((item, i) => (
        <MotionCard
          key={item.file}
          delay={i * 0.05}
          className="group relative aspect-square overflow-hidden rounded-2xl border border-brand-100 bg-brand-50"
        >
          {item.exists ? (
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-dot-pattern p-4 text-center">
              <GalleryIcon />
              <span className="text-xs font-medium text-brand-500">{item.caption}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
            <span className="text-xs font-medium text-white">{item.caption}</span>
          </div>
        </MotionCard>
      ))}
    </div>
  );
}

function GalleryIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-brand-300">
      <path d="M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2v10h14V7H5zm3 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-2 8 4-4 2.5 2.5L15 11l4 6H6z" />
    </svg>
  );
}
