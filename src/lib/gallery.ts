import fs from "fs";
import path from "path";

export type GalleryItem = {
  file: string;
  src: string;
  caption: string;
  exists: boolean;
};

const slots: { file: string; caption: string }[] = [
  { file: "shop-1.jpg", caption: "نمای فروشگاه پومکس شیراز" },
  { file: "shop-2.jpg", caption: "نمایش محصولات در فروشگاه" },
  { file: "warehouse-1.jpg", caption: "انبار مرکزی محصولات پومکس" },
  { file: "warehouse-2.jpg", caption: "چیدمان کیسه‌ها و محصولات در انبار" },
  { file: "delivery.jpg", caption: "آماده‌سازی سفارشات جهت ارسال" },
  { file: "team.jpg", caption: "تیم فنی و مشاوره پومکس شیراز" },
];

export function getGalleryItems(): GalleryItem[] {
  const dir = path.join(process.cwd(), "public", "gallery");

  return slots.map((slot) => {
    const exists = fs.existsSync(path.join(dir, slot.file));
    return {
      file: slot.file,
      src: `/gallery/${slot.file}`,
      caption: slot.caption,
      exists,
    };
  });
}
