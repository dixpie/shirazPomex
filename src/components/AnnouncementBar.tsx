import { siteConfig, telHref } from "@/lib/siteConfig";

const items = [
  "نماینده رسمی پومکس در شیراز",
  "چسب کاشی، افزودنی بتن و مواد آب‌بندی با گارانتی اصالت",
  "مشاوره فنی رایگان قبل از خرید",
  "ارسال به سراسر شیراز و استان فارس",
];

export default function AnnouncementBar() {
  const line = items.join("   •   ");
  return (
    <a
      href={telHref(siteConfig.phone)}
      className="block overflow-hidden whitespace-nowrap bg-brand-900 py-2 text-xs font-medium text-brand-100"
      aria-label="اطلاعیه‌های پومکس شیراز"
    >
      <div className="marquee-track inline-flex gap-8 pr-8">
        <span>{line}</span>
        <span aria-hidden>{line}</span>
      </div>
    </a>
  );
}
