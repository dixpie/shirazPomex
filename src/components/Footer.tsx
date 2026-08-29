import Link from "next/link";
import { siteConfig, telHref } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-brand-900 text-brand-50">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-extrabold text-white">
            پومکس شیراز
          </h3>
          <p className="text-sm leading-7 text-brand-100">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-extrabold text-white">دسترسی سریع</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/products" className="hover:text-white">محصولات پومکس</Link></li>
            <li><Link href="/blog" className="hover:text-white">وبلاگ و راهنمای خرید</Link></li>
            <li><Link href="/about" className="hover:text-white">درباره نمایندگی</Link></li>
            <li><Link href="/contact" className="hover:text-white">تماس با ما</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-extrabold text-white">اطلاعات تماس</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={telHref(siteConfig.phone)} className="hover:text-white" dir="ltr">
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={telHref(siteConfig.landline)} className="hover:text-white" dir="ltr">
                {siteConfig.landlineDisplay}
              </a>
            </li>
            <li className="text-brand-100">{siteConfig.address}</li>
            <li className="text-brand-100">{siteConfig.workingHours}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-4 text-center text-xs text-brand-200">
        © {new Date().getFullYear()} تمامی حقوق برای نمایندگی رسمی پومکس در شیراز محفوظ است.
      </div>
    </footer>
  );
}
