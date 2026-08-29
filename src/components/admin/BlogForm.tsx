"use client";

import { useFormState, useFormStatus } from "react-dom";
import { PlainPost } from "@/lib/data";

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

export default function BlogForm({
  action,
  post,
}: {
  action: Action;
  post?: PlainPost;
}) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className="max-w-3xl space-y-5">
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{state.error}</p>
      )}

      <Field label="عنوان مقاله *">
        <input name="title" required defaultValue={post?.title} className="admin-input" />
      </Field>

      <Field label="نامک (Slug) - اختیاری">
        <input name="slug" defaultValue={post?.slug} placeholder="در صورت خالی بودن خودکار ساخته می‌شود" className="admin-input" />
      </Field>

      <Field label="خلاصه مقاله (برای کارت و متا دیسکریپشن) *">
        <textarea name="excerpt" rows={2} required defaultValue={post?.excerpt} className="admin-input" />
      </Field>

      <Field label="متن کامل مقاله *">
        <textarea name="content" rows={10} required defaultValue={post?.content} className="admin-input" />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="آدرس تصویر کاور">
          <input name="coverImage" defaultValue={post?.coverImage} className="admin-input" />
        </Field>
        <Field label="نویسنده">
          <input name="author" defaultValue={post?.author || "پومکس شیراز"} className="admin-input" />
        </Field>
      </div>

      <Field label="برچسب‌ها (با کاما جدا شود)">
        <input name="tags" defaultValue={post?.tags?.join(", ")} className="admin-input" />
      </Field>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
        <input type="checkbox" name="published" defaultChecked={post?.published ?? true} />
        انتشار عمومی مقاله
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="عنوان سئو (اختیاری)">
          <input name="seoTitle" defaultValue={post?.seoTitle} className="admin-input" />
        </Field>
        <Field label="توضیحات متا سئو (اختیاری)">
          <input name="seoDescription" defaultValue={post?.seoDescription} className="admin-input" />
        </Field>
      </div>

      <SubmitButton label={post ? "ذخیره تغییرات" : "انتشار مقاله"} />
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
