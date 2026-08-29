"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function FloatingBlob({
  className,
  duration = 6,
  delay = 0,
  range = 18,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  range?: number;
}) {
  return (
    <motion.div
      aria-hidden
      className={clsx("pointer-events-none absolute rounded-full blur-2xl", className)}
      animate={{ y: [0, -range, 0], x: [0, range / 2, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
