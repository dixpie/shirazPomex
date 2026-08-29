import Link from "next/link";
import { getAllPostsAdmin } from "@/lib/data";
import { toJalaliDate } from "@/lib/format";
import { deletePostAction } from "@/actions/blog";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminBlogPage() {
  const posts = await getAllPostsAdmin();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-brand-900">مقالات ({posts.length})</h1>
        <Link href="/admin/blog/new" className="btn-call w-auto !px-4 !py-2 text-sm">
          + مقاله جدید
        </Link>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-brand-100 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-brand-50 text-brand-800">
            <tr>
              <th className="p-3 text-right">عنوان</th>
              <th className="p-3 text-right">تاریخ</th>
              <th className="p-3 text-right">وضعیت</th>
              <th className="p-3 text-right">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id} className="border-t border-brand-50">
                <td className="p-3 font-medium text-slate-700">{p.title}</td>
                <td className="p-3 text-slate-500">{toJalaliDate(p.createdAt)}</td>
                <td className="p-3">
                  {p.published ? (
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-600">منتشر شده</span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-500">پیش‌نویس</span>
                  )}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/blog/${p._id}/edit`}
                      className="rounded-lg border border-brand-100 px-3 py-1.5 text-xs font-bold text-brand hover:bg-brand-50"
                    >
                      ویرایش
                    </Link>
                    <DeleteButton action={deletePostAction.bind(null, p._id)} />
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-400">
                  هنوز مقاله‌ای ثبت نشده است.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
