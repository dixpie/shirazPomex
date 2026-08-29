import Link from "next/link";
import { logoutAction } from "@/actions/auth";

const links = [
  { href: "/admin", label: "داشبورد" },
  { href: "/admin/products", label: "محصولات" },
  { href: "/admin/blog", label: "وبلاگ" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 font-vazir">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 flex-col border-l border-brand-100 bg-white p-5 md:flex">
          <Link href="/admin" className="mb-8 text-lg font-extrabold text-brand-800">
            پنل مدیریت پومکس
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="mb-3 text-xs text-slate-400 hover:text-brand" target="_blank">
            مشاهده سایت ↗
          </Link>
          <form action={logoutAction}>
            <button className="w-full rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-500 hover:bg-red-50">
              خروج از حساب
            </button>
          </form>
        </aside>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
