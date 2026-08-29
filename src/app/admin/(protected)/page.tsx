import Link from "next/link";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import BlogPost from "@/models/BlogPost";

export default async function AdminDashboard() {
  await dbConnect();
  const [productCount, postCount, outOfStock] = await Promise.all([
    Product.countDocuments(),
    BlogPost.countDocuments(),
    Product.countDocuments({ inStock: false }),
  ]);

  const cards = [
    { label: "تعداد محصولات", value: productCount, href: "/admin/products" },
    { label: "تعداد مقالات", value: postCount, href: "/admin/blog" },
    { label: "محصولات ناموجود", value: outOfStock, href: "/admin/products" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-900">داشبورد</h1>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card transition hover:-translate-y-0.5"
          >
            <span className="block text-3xl font-black text-brand">{c.value}</span>
            <span className="mt-1 block text-sm text-slate-500">{c.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-8 flex gap-3">
        <Link href="/admin/products/new" className="btn-call w-auto">
          + محصول جدید
        </Link>
        <Link href="/admin/blog/new" className="btn-outline w-auto">
          + مقاله جدید
        </Link>
      </div>
    </div>
  );
}
