import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center justify-center py-24 text-center">
      <span className="text-6xl font-black text-brand-200">۴۰۴</span>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-900">
        صفحه مورد نظر پیدا نشد
      </h1>
      <p className="mt-2 text-slate-500">
        ممکن است این صفحه حذف شده یا آدرس آن اشتباه باشد.
      </p>
      <Link href="/" className="btn-call mt-6 w-auto">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
}
