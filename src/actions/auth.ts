"use server";

import { redirect } from "next/navigation";
import { createAdminSession, clearAdminSession } from "@/lib/auth";

export async function loginAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  const validUser = process.env.ADMIN_USERNAME;
  const validPass = process.env.ADMIN_PASSWORD;

  if (!validUser || !validPass) {
    return { error: "تنظیمات ورود پنل مدیریت انجام نشده است." };
  }

  if (username !== validUser || password !== validPass) {
    return { error: "نام کاربری یا رمز عبور اشتباه است." };
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
