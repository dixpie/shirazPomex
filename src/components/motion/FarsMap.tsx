"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const FARS_PATH =
  "M611.6,905.7c-1.3-0.6-4.4-2.3-6.4-3.6c-1-0.7-2.3-1-4.1-1 " +
  "c-0.8,0-1.6,0.1-2.3,0.1c-0.8,0.1-1.5,0.1-2.3,0.1c-3,0-4.8-1.7-6.5-3.4c-1.1-1.1-2.7-2.1-4.4-3.1c-0.8-0.5-1.6-1-2.3-1.5 " +
  "c-2.4-1.6-12-5.4-15.4-5.4c-2.4,0-4.3-2.7-5.8-4.9c-0.7-1-1.3-1.9-1.9-2.3c-1-0.8-1.6-1.7-2.3-2.8c-0.4-0.7-0.9-1.5-1.6-2.3 " +
  "c-2-2.5-6.2-4.7-7.4-5.3l-0.1-0.1l-0.1-0.1c-0.7-0.7-7.2-6.7-8.6-9.1c-1.5-2.6-2-9.9-2-12.1c0-1.1-2.2-3.6-4-5.6 " +
  "c-1.3-1.4-2.4-2.8-3-3.7c-0.9-1.4-3.6-2.8-6.2-4.1c-1.9-0.9-3.8-1.8-5.2-2.9c-3.6-2.6-7.1-11.6-7.6-14.2c-0.2-1-1.7-6.1-3.2-11.5 " +
  "c-3.1-10.9-4.8-16.6-4.8-17.5l0-0.6c0-2,0.2-6.7-2.9-9.8c-1.9-1.9-5.1-8.5-8.1-14.9c-2.5-5.1-4.8-10-5.9-11.1 " +
  "c-2.6-2.6-5.6-7.2-7-9.5c-1.4-2.4-7.8-6.4-11.8-6.9c-4.1-0.5-6.2-3.6-6.2-5.2c0-1-0.7-5.4-1.5-9.3c-1.2-0.2-8.5-1.6-10.4-3 " +
  "c-0.6-0.4-1.7-0.6-3.5-0.6c-1.5,0-3.5,0.1-5.7,0.3c-2.4,0.2-4.8,0.4-7.1,0.4c-3.1,0-4-0.3-4.5-0.9c-0.4-0.5-0.4-1.1-0.3-1.9 " +
  "c0.1-0.6,0.1-1.2,0-2c-0.2-1.2-0.8-2.3-1.9-3.4l-0.6-0.6l0.5-0.6c0-0.4,0-2,1.1-3.1c0.7-0.7,1.7-1.1,3-1.1c0.2,0,0.5,0,0.8,0 " +
  "c0.6,0.1,1.2,0.1,1.8,0.1c2.6,0,4.9-0.6,6.1-1.7c0.5-0.5,0.8-1.1,0.8-1.7c0-1.9,0.6-6,0.9-8.5l0,0l0.1-0.5c0.2-0.6,1.6-6.2,4.2-6.2 " +
  "c1.9,0,6.6-1.9,8.8-2.9c2.3-3.5,4.4-8.1,3.5-9.7c-1.2-2-3-7.4-4.3-11.2l-0.4-1.2c-0.8-2.3-1.4-4.6-0.6-5.7c0.3-0.4,0.8-0.7,1.5-0.7 " +
  "c2.8,0,4.5,1.3,6.2,4.6c1.5,2.9,5.4,6.4,8.3,6.4c0.7,0,1.5-0.1,2.3-0.1c0.8-0.1,1.7-0.1,2.5-0.1c1.3,0,3,0.2,3.9,1.3 " +
  "c1,1.3,2.7,2.7,4.7,2.7c0.5,0,1-0.1,1.5-0.3c2.4-0.9,4.3-3.4,4.3-5.3v-7.4l-1.2-6.5c0-0.4-0.8-8.7,0.7-11.2c0.7-1.2,1.3-3.6,2-6.2 " +
  "c0.7-2.6,1.3-5.1,2-6.3c1.6-2.7,5.4-12.5,5-15.8c-0.4-2.9-1.6-10.4-2-12.8l0-0.3l0.1-0.3c1-2.2,4.2-9.7,6.5-11.9 " +
  "c1.5-1.5,6.5-4.9,11-4.9c0.1,0,0.3,0,0.4,0c2,0.1,3.7,0.9,5,2.4c4.6,5.6,9,6.4,11.3,6.4c2.4,0,11,0.4,11.9,0.5l0.1,0l0.1,0 " +
  "c0.4,0.1,3.9,1.1,7.6,1.1c0.6,0,1.2,0,1.8-0.1l0.6-0.1l0.3,0.5c0.7,1,3.3,4.6,6.2,7.1c1.6,1.4,2.4,3,2.1,4.7 " +
  "c-0.2,1.4-1.3,2.7-2.7,3.2c-1.9,0.8-5.2,4-6.8,5.8l8.8,10.8c5.6,3.1,21.9,12.1,24.4,13c2.9,1,7.4,7.1,8.1,8c1.5,0.1,16,1,17.9,1 " +
  "c1.6,0,2.8,1.1,4.3,2.5c0.6,0.5,1.2,1,1.8,1.6c2.7,2.2,3.1,5,3.1,7.7c0,2.9,0.5,13.5,0.5,13.9l0,0.1l0,0.1 " +
  "c-0.1,0.7-0.5,6.6-2.1,8.2c-0.7,0.7,0.2,3.7,3,8.2l0.1,0.1c0.6,0.5,5.1,3.9,6.7,5.9c1.7,2.1,3,7.7,3,10.2c0,1.9,2.1,5,3.3,6.5 " +
  "l0,0.1l5.4,9.1c2.1-0.2,10.9-1.3,12.4-1.7c0.5-0.1,1.3-0.2,2.5-0.2c2.5,0,6.1,0.3,7.7,0.6c1.9,0.4,11.1,1.5,12.2,1.6l0.5,0.1 " +
  "l0.2,0.4c0.5,0.9,2.2,3.8,3.6,5.9c0.8,1.2,4.9,6.2,9.3,11.6l0.4,0.5c4.8,5.9,10.2,12.6,11.7,14.7c2.9,4.2,1.3,16.9,0.4,19.5 " +
  "c-0.4,1.1-0.2,3.8,0.6,7.2l0.1,0.5l-0.1,0.1l0.1,0.1l0.1,0.5c0.2,0.8,0.3,1.3,0.4,1.5c2.8,3.6,6.3,7.7,7.4,8.3 " +
  "c1.2,0.6,3.2,2.6,3.5,4.6c0.2,1.1-0.1,2.1-0.9,2.9c-2.8,2.8-2.9,6.5-2.9,7c0,0.6-0.3,6.9-0.6,13.9l-0.1,1.3 " +
  "c-0.3,6.1-0.6,11.9-0.6,12.5c0,1.2,2.1,4,4.1,5.2c1.3,0.8,2.5,3,3.6,5.1c0.7,1.3,1.3,2.6,2,3.4c1.8,2.2-0.4,5.3-2.5,8.3 " +
  "c-2,2.9-13.5,16.9-15.1,18.5c-1.7,1.7-6.3,4.3-8.1,4.3c-1.6,0-9.7-0.4-14.7-0.8l-2-0.2c-6.2-0.5-17.8-1.5-21.9-1.5 " +
  "c-3.1,0-5.9,0.6-8.8,1.2c-1.4,0.3-2.9,0.6-4.6,0.9c-4.5,0.8-13.2,6-14.8,6.9c0.6,0.7,1.9,2.5,3.2,4.4c1.7,2.5,0.2,4.6,0.1,4.8 " +
  "l0,0.1l0,0.1c-0.7,0.7-5.9,6.4-7.1,7.9c-1.2,1.6-6.7,3.9-7.3,4.1l-0.4,0.2L611.6,905.7z";

// Approximate positions within the province silhouette (stylized, not surveyed).
const CITIES: { name: string; x: number; y: number; capital?: boolean; labelDy?: number }[] = [
  { name: "شیراز", x: 518.6, y: 721.8, capital: true, labelDy: 18 },
  { name: "مرودشت", x: 538.7, y: 703.4, labelDy: -10 },
  { name: "کازرون", x: 452.8, y: 721.1, labelDy: 16 },
  { name: "آباده", x: 527.5, y: 612.4, labelDy: -10 },
  { name: "نی‌ریز", x: 652.9, y: 751.5, labelDy: 16 },
  { name: "جهرم", x: 595.5, y: 800.2, labelDy: 16 },
  { name: "لار", x: 653.7, y: 858.1, labelDy: 16 },
  { name: "فیروزآباد", x: 521.5, y: 775.5, labelDy: 16 },
];

export default function FarsMap({ className }: { className?: string }) {
  return (
    <motion.div
      className={clsx("relative", className)}
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
    >
      {/* glow backdrop so the map reads clearly against any photo behind it */}
      <div className="absolute inset-0 -z-10 rounded-full bg-brand-400/30 blur-3xl" />

      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative mx-auto w-full max-w-lg"
        style={{
          filter:
            "drop-shadow(0 25px 45px rgba(0,20,35,0.55)) drop-shadow(0 0 40px rgba(63,161,223,0.55))",
        }}
      >
        <svg viewBox="413 568 320 353" className="h-auto w-full overflow-visible">
          <defs>
            <clipPath id="farsClip">
              <path d={FARS_PATH} />
            </clipPath>
            <pattern id="farsGrid" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M0,0 H22 M0,0 V22" fill="none" stroke="#0073bc" strokeOpacity={0.16} strokeWidth={1} />
            </pattern>
          </defs>

          {/* white base */}
          <path d={FARS_PATH} fill="#ffffff" />

          {/* ruled grid, clipped to the province outline */}
          <g clipPath="url(#farsClip)">
            <rect x={413} y={568} width={320} height={353} fill="url(#farsGrid)" />
          </g>

          {/* crisp blue border on top */}
          <path d={FARS_PATH} fill="none" stroke="#0073bc" strokeWidth={4} strokeLinejoin="round" />

          {/* cities */}
          {CITIES.map((city) => (
            <g key={city.name}>
              {city.capital && (
                <motion.circle
                  cx={city.x}
                  cy={city.y}
                  r={4}
                  fill="none"
                  stroke="#0073bc"
                  strokeWidth={1.5}
                  animate={{ r: [4, 12, 4], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <circle
                cx={city.x}
                cy={city.y}
                r={city.capital ? 5.5 : 3.5}
                fill="#0073bc"
                stroke="#ffffff"
                strokeWidth={1.5}
              />
              <text
                x={city.x}
                y={city.y + (city.labelDy ?? 16)}
                textAnchor="middle"
                fontSize={city.capital ? 15 : 11.5}
                fontWeight={city.capital ? 800 : 700}
                fill="#003a5f"
                stroke="#ffffff"
                strokeWidth={3}
                paintOrder="stroke"
              >
                {city.name}
              </text>
            </g>
          ))}
        </svg>
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1.5 text-sm font-bold text-white shadow-card">
          استان فارس
        </span>
      </motion.div>
    </motion.div>
  );
}
