"use client";

import { useFormState, useFormStatus } from "react-dom";
import { loginAction } from "@/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-call w-full disabled:opacity-60"
    >
      {pending ? "در حال ورود..." : "ورود به پنل مدیریت"}
    </button>
  );
}

export default function AdminLoginPage() {
  const [state, formAction] = useFormState(loginAction, undefined);

  return (
    <div dir="rtl" className="flex min-h-screen items-center justify-center bg-brand-50 p-4 font-vazir">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-brand-100 bg-white p-8 shadow-card"
      >
        <h1 className="mb-1 text-center text-xl font-extrabold text-brand-900">
          ورود به پنل مدیریت
        </h1>
        <p className="mb-6 text-center text-sm text-slate-400">پومکس شیراز</p>

        {state?.error && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
            {state.error}
          </p>
        )}

        <label className="mb-1 block text-sm font-bold text-brand-700">نام کاربری</label>
        <input
          name="username"
          required
          className="mb-4 w-full rounded-xl border border-brand-100 px-4 py-2 focus:border-brand focus:outline-none"
        />

        <label className="mb-1 block text-sm font-bold text-brand-700">رمز عبور</label>
        <input
          name="password"
          type="password"
          required
          className="mb-6 w-full rounded-xl border border-brand-100 px-4 py-2 focus:border-brand focus:outline-none"
        />

        <SubmitButton />
      </form>
    </div>
  );
}
