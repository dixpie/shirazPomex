"use client";

import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Slide = { src: string; alt: string };

export default function HeroSlider({
  slides,
  interval = 5000,
}: {
  slides: Slide[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  const active = slides[index];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={active.src}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1.16 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 1.2, ease: "easeInOut" },
            scale: { duration: interval / 1000 + 1.2, ease: "linear" },
          }}
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              aria-label={`اسلاید ${i + 1}`}
              onClick={() => setIndex(i)}
              className={clsx(
                "h-2 rounded-full bg-white transition-all",
                i === index ? "w-6 opacity-100" : "w-2 opacity-50 hover:opacity-75"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
