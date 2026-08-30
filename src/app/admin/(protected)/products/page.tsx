import Link from "next/link";
import { getProducts } from "@/lib/data";
import { formatToman } from "@/lib/format";
import { deleteProductAction } from "@/actions/products";
import DeleteButton from "@/components/admin/DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-brand-900">محصولات ({products.length})</h1>
        <Link href="/admin/products/new" className="btn-call w-auto !px-4 !py-2 text-sm">
          + محصول جدید
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-brand-50 text-brand-800">
            <tr>
              <th className="p-3 text-right">عنوان</th>
              <th className="p-3 text-right">دسته‌بندی</th>
              <th className="p-3 text-right">قیمت</th>
              <th className="p-3 text-right">وضعیت</th>
              <th className="p-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-t border-brand-50">
                <td className="p-3 font-medium text-slate-700">{p.title}</td>
                <td className="p-3 text-slate-500">{p.category}</td>
                <td className="p-3 text-slate-500">{formatToman(p.price)}</td>
                <td className="p-3">
                  {p.inStock ? (
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">موجود</span>
                  ) : (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-bold text-red-500">ناموجود</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/products/${p._id}/edit`}
                      className="rounded-lg border border-brand-100 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand-50"
                    >
                      ویرایش
                    </Link>
                    <DeleteButton action={deleteProductAction.bind(null, p._id)} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  هنوز محصولی ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
