"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PlainProduct } from "@/lib/data";
import { ILocalizedProduct } from "@/models/Product";

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

type FieldDef = {
  name: keyof ILocalizedProduct;
  label: string;
  required?: boolean;
  multiline?: boolean;
};

const FA_FIELDS: FieldDef[] = [
  { name: "name", label: "نام محصول *", required: true },
  { name: "slug", label: "نامک (Slug) - اختیاری، در صورت خالی بودن خودکار ساخته می‌شود" },
  { name: "description", label: "توضیح کوتاه", multiline: true },
  { name: "features", label: "ویژگی‌ها (با ؛ از هم جدا شوند)", multiline: true },
  { name: "useFor", label: "کاربرد (با ؛ از هم جدا شوند)", multiline: true },
  { name: "usage", label: "روش مصرف", multiline: true },
  { name: "consumption", label: "میزان مصرف" },
  { name: "color", label: "رنگ" },
  { name: "weight", label: "وزن" },
  { name: "type", label: "نوع" },
  { name: "packaging", label: "بسته‌بندی" },
  { name: "mixingRatio", label: "نسبت اختلاط" },
  { name: "density", label: "چگالی" },
  { name: "ph", label: "pH" },
  { name: "composition", label: "ترکیب", multiline: true },
  { name: "technicalSpecs", label: "مشخصات فنی کامل", multiline: true },
  { name: "standards", label: "استانداردها", multiline: true },
  { name: "storage", label: "شرایط نگهداری" },
  { name: "videoUrl", label: "لینک ویدیو" },
  { name: "keyword", label: "کلمات کلیدی سئو", multiline: true },
];

const EN_FIELDS: FieldDef[] = [
  { name: "name", label: "Name" },
  { name: "slug", label: "Slug" },
  { name: "description", label: "Description", multiline: true },
  { name: "features", label: "Features", multiline: true },
  { name: "useFor", label: "Use for", multiline: true },
  { name: "usage", label: "Usage", multiline: true },
  { name: "consumption", label: "Consumption" },
  { name: "color", label: "Color" },
  { name: "weight", label: "Weight" },
  { name: "type", label: "Type" },
  { name: "standards", label: "Standards", multiline: true },
  { name: "storage", label: "Storage" },
  { name: "videoUrl", label: "Video URL" },
  { name: "keyword", label: "SEO keywords", multiline: true },
];

export default function ProductForm({
  action,
  product,
}: {
  action: Action;
  product?: PlainProduct;
}) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className="max-w-3xl space-y-8">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <section className="space-y-5">
        <h2 className="font-bold text-brand-900">اطلاعات پایه</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="کد محصول *">
            <input name="code" required defaultValue={product?.code} className="admin-input" />
          </Field>
          <Field label="دسته‌بندی *">
            <input name="category" required defaultValue={product?.category} className="admin-input" />
          </Field>
          <Field label="قیمت (تومان) *">
            <input name="price" type="number" min={0} required defaultValue={product?.price} className="admin-input" />
          </Field>
        </div>
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
        <p className="text-xs text-slate-400">
          تصویر محصول را با نام «{product?.code || "کد-محصول"}.webp» در فولدر public/gallery/products قرار دهید.
        </p>
      </section>

      <section className="space-y-5">
        <h2 className="font-bold text-brand-900">محتوای فارسی</h2>
        <LocalizedFields prefix="fa" fields={FA_FIELDS} values={product?.fa} />
      </section>

      <section className="space-y-5">
        <h2 className="font-bold text-brand-900">محتوای انگلیسی (اختیاری)</h2>
        <LocalizedFields prefix="en" fields={EN_FIELDS} values={product?.en} />
      </section>

      <SubmitButton label={product ? "ذخیره تغییرات" : "افزودن محصول"} />
    </form>
  );
}

function LocalizedFields({
  prefix,
  fields,
  values,
}: {
  prefix: "fa" | "en";
  fields: FieldDef[];
  values?: Partial<ILocalizedProduct>;
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <Field key={f.name} label={f.label} full={f.multiline}>
          {f.multiline ? (
            <textarea
              name={`${prefix}_${f.name}`}
              rows={3}
              required={f.required}
              defaultValue={values?.[f.name]}
              className="admin-input"
            />
          ) : (
            <input
              name={`${prefix}_${f.name}`}
              required={f.required}
              defaultValue={values?.[f.name]}
              className="admin-input"
            />
          )}
        </Field>
      ))}
    </div>
  );
}

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label className="mb-1.5 block text-sm font-bold text-brand-700">{label}</label>
      {children}
    </div>
  );
}
