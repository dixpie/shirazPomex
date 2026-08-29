"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { slugify } from "@/lib/slugify";
import { isAdminAuthed } from "@/lib/auth";

function buildPostData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const customSlug = String(formData.get("slug") || "").trim();

  return {
    title,
    slug: slugify(customSlug || title),
    excerpt: String(formData.get("excerpt") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    coverImage: String(formData.get("coverImage") || "").trim() || undefined,
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    author: String(formData.get("author") || "پومکس شیراز").trim(),
    published: formData.get("published") === "on",
    seoTitle: String(formData.get("seoTitle") || "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") || "").trim() || undefined,
  };
}

export async function createPostAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAdminAuthed())) return { error: "دسترسی غیرمجاز است." };

  const data = buildPostData(formData);
  if (!data.title || !data.excerpt || !data.content) {
    return { error: "عنوان، خلاصه و متن مقاله الزامی هستند." };
  }

  await dbConnect();
  try {
    await BlogPost.create(data);
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "مقاله‌ای با این نامک (slug) قبلا ثبت شده است." };
    }
    return { error: "خطا در ذخیره‌سازی مقاله." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}

export async function updatePostAction(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAdminAuthed())) return { error: "دسترسی غیرمجاز است." };

  const data = buildPostData(formData);
  if (!data.title || !data.excerpt || !data.content) {
    return { error: "عنوان، خلاصه و متن مقاله الزامی هستند." };
  }

  await dbConnect();
  try {
    await BlogPost.findByIdAndUpdate(id, data);
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "مقاله‌ای با این نامک (slug) قبلا ثبت شده است." };
    }
    return { error: "خطا در بروزرسانی مقاله." };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  redirect("/admin/blog");
}

export async function deletePostAction(id: string) {
  if (!(await isAdminAuthed())) return;
  await dbConnect();
  await BlogPost.findByIdAndDelete(id);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
}
