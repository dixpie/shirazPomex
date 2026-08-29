"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Product from "@/models/Product";
import { slugify } from "@/lib/slugify";
import { isAdminAuthed } from "@/lib/auth";

function parseLines(value: FormDataEntryValue | null): string[] {
  return String(value || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseSpecs(value: FormDataEntryValue | null) {
  return parseLines(value)
    .map((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return null;
      return {
        key: line.slice(0, idx).trim(),
        value: line.slice(idx + 1).trim(),
      };
    })
    .filter((s): s is { key: string; value: string } => !!s && !!s.key && !!s.value);
}

function buildProductData(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const customSlug = String(formData.get("slug") || "").trim();
  const price = Number(formData.get("price") || 0);
  const discountRaw = String(formData.get("discountPrice") || "").trim();

  return {
    title,
    slug: slugify(customSlug || title),
    category: String(formData.get("category") || "").trim(),
    model: String(formData.get("model") || "").trim(),
    price,
    discountPrice: discountRaw ? Number(discountRaw) : undefined,
    images: parseLines(formData.get("images")),
    shortDescription: String(formData.get("shortDescription") || "").trim(),
    description: String(formData.get("description") || "").trim(),
    specs: parseSpecs(formData.get("specs")),
    inStock: formData.get("inStock") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    seoTitle: String(formData.get("seoTitle") || "").trim() || undefined,
    seoDescription: String(formData.get("seoDescription") || "").trim() || undefined,
  };
}

export async function createProductAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAdminAuthed())) return { error: "دسترسی غیرمجاز است." };

  const data = buildProductData(formData);
  if (!data.title || !data.category || !data.price) {
    return { error: "عنوان، دسته‌بندی و قیمت الزامی هستند." };
  }

  await dbConnect();
  try {
    await Product.create(data);
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "محصولی با این نامک (slug) قبلا ثبت شده است." };
    }
    return { error: "خطا در ذخیره‌سازی محصول." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
  redirect("/admin/products");
}

export async function updateProductAction(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAdminAuthed())) return { error: "دسترسی غیرمجاز است." };

  const data = buildProductData(formData);
  if (!data.title || !data.category || !data.price) {
    return { error: "عنوان، دسته‌بندی و قیمت الزامی هستند." };
  }

  await dbConnect();
  try {
    await Product.findByIdAndUpdate(id, data);
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "محصولی با این نامک (slug) قبلا ثبت شده است." };
    }
    return { error: "خطا در بروزرسانی محصول." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.slug}`);
  revalidatePath("/");
  redirect("/admin/products");
}

export async function deleteProductAction(id: string) {
  if (!(await isAdminAuthed())) return;
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath("/");
}
