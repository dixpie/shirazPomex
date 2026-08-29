"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PlainProduct } from "@/lib/data";

type Action = (
  prevState: { error?: string } | undefined,
  formData: FormData
) => Promise<{ error?: string }>;

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-call w-auto disabled:opacity-60">
      {pending ? "در حال ذخیره..." : label}
    </button>
  );
}

export default function ProductForm({
  action,
  product,
}: {
  action: Action;
  product?: PlainProduct;
}) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="عنوان محصول *">
          <input name="title" required defaultValue={product?.title} className="admin-input" />
        </Field>
        <Field label="نامک (Slug) - اختیاری">
          <input name="slug" defaultValue={product?.slug} placeholder="در صورت خالی بودن خودکار ساخته می‌شود" className="admin-input" />
        </Field>
        <Field label="دسته‌بندی *">
          <input name="category" required defaultValue={product?.category} className="admin-input" />
        </Field>
        <Field label="کد محصول / مدل">
          <input name="model" defaultValue={product?.model} className="admin-input" />
        </Field>
        <Field label="قیمت (تومان) *">
          <input name="price" type="number" min={0} required defaultValue={product?.price} className="admin-input" />
        </Field>
        <Field label="قیمت با تخفیف (تومان)">
          <input name="discountPrice" type="number" min={0} defaultValue={product?.discountPrice} className="admin-input" />
        </Field>
      </div>

      <Field label="تصاویر (هر آدرس URL در یک خط)">
        <textarea
          name="images"
          rows={3}
          defaultValue={product?.images?.join("\n")}
          placeholder={"https://example.com/image1.jpg"}
          className="admin-input"
        />
      </Field>

      <Field label="توضیح کوتاه (برای کارت محصول و متا دیسکریپشن)">
        <textarea name="shortDescription" rows={2} defaultValue={product?.shortDescription} className="admin-input" />
      </Field>

      <Field label="توضیحات کامل محصول">
        <textarea name="description" rows={6} defaultValue={product?.description} className="admin-input" />
      </Field>

      <Field label="مشخصات فنی (هر مورد به شکل «کلید: مقدار» در یک خط)">
        <textarea
          name="specs"
          rows={4}
          defaultValue={product?.specs?.map((s) => `${s.key}: ${s.value}`).join("\n")}
          placeholder={"رنگ: سفید\nگارانتی: 18 ماهه"}
          className="admin-input"
        />
      </Field>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <input type="checkbox" name="inStock" defaultChecked={product?.inStock ?? true} />
          موجود در انبار
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
          <input type="checkbox" name="isFeatured" defaultChecked={product?.isFeatured} />
          نمایش در محصولات ویژه صفحه اصلی
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="عنوان سئو (اختیاری)">
          <input name="seoTitle" defaultValue={product?.seoTitle} className="admin-input" />
        </Field>
        <Field label="توضیحات متا سئو (اختیاری)">
          <input name="seoDescription" defaultValue={product?.seoDescription} className="admin-input" />
        </Field>
      </div>

      <SubmitButton label={product ? "ذخیره تغییرات" : "افزودن محصول"} />
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-brand-700">{label}</label>
      {children}
    </div>
  );
}
