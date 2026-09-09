import Link from "next/link";
import Image from "next/image";
import { siteConfig, telHref } from "@/lib/siteConfig";

const navLinks = [
  { href: "/", label: "خانه" },
  { href: "/products", label: "محصولات" },
  { href: "/blog", label: "وبلاگ" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/gallery/logo.png" className="w-10" alt="پومکس شیراز"  width={60} height={60} />
          <span className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold text-brand-900">
              پومکس شیراز
            </span>
            <span className="text-[11px] text-brand-600"> نمایندگی انحصاری استان فارس</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-slate-700 transition hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={telHref(siteConfig.phone)}
          className="btn-call hidden !px-4 !py-2 text-sm sm:inline-flex"
        >
          <PhoneIcon />
          تماس فوری
        </a>

        <MobileMenu />
      </div>
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
    </svg>
  );
}

function MobileMenu() {
  return (
    <details className="relative md:hidden">
      <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-brand-100 text-brand-700 [&::-webkit-details-marker]:hidden">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
          <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
        </svg>
      </summary>
      <div className="absolute left-0 top-12 w-56 rounded-xl border border-brand-100 bg-white p-3 shadow-card">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={telHref(siteConfig.phone)}
            className="btn-call mt-1 !px-4 !py-2 text-sm"
          >
            تماس فوری با نمایندگی
          </a>
        </nav>
      </div>
    </details>
  );
}
