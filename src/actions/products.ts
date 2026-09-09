"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/mongodb";
import Product, { ILocalizedProduct } from "@/models/Product";
import { slugify } from "@/lib/slugify";
import { isAdminAuthed } from "@/lib/auth";

const LOCALIZED_KEYS: (keyof ILocalizedProduct)[] = [
  "name",
  "slug",
  "keyword",
  "description",
  "features",
  "useFor",
  "consumption",
  "color",
  "weight",
  "type",
  "usage",
  "standards",
  "storage",
  "videoUrl",
  "composition",
  "mixingRatio",
  "density",
  "ph",
  "technicalSpecs",
  "packaging",
];

function buildLocalized(formData: FormData, prefix: "fa" | "en"): Partial<ILocalizedProduct> {
  const out: Partial<ILocalizedProduct> = {};
  for (const key of LOCALIZED_KEYS) {
    const raw = formData.get(`${prefix}_${key}`);
    if (raw === null) continue;
    const value = String(raw).trim();
    if (value) out[key] = value;
  }
  return out;
}

function buildProductData(formData: FormData) {
  const code = String(formData.get("code") || "").trim();
  const price = Number(formData.get("price") || 0);

  const fa = buildLocalized(formData, "fa");
  const en = buildLocalized(formData, "en");

  fa.slug = slugify(fa.slug || fa.name || code);
  if (en.name || en.slug) {
    en.slug = slugify(en.slug || en.name || code);
  }

  return {
    code,
    category: String(formData.get("category") || "").trim(),
    price,
    inStock: formData.get("inStock") === "on",
    isFeatured: formData.get("isFeatured") === "on",
    fa,
    en: en.name ? en : undefined,
  };
}

export async function createProductAction(
  _prevState: { error?: string } | undefined,
  formData: FormData
): Promise<{ error?: string }> {
  if (!(await isAdminAuthed())) return { error: "دسترسی غیرمجاز است." };

  const data = buildProductData(formData);
  if (!data.code || !data.category || !data.fa.name) {
    return { error: "کد محصول، دسته‌بندی و نام فارسی الزامی هستند." };
  }

  await dbConnect();
  try {
    await Product.create(data);
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "محصولی با این کد یا نامک قبلا ثبت شده است." };
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
  if (!data.code || !data.category || !data.fa.name) {
    return { error: "کد محصول، دسته‌بندی و نام فارسی الزامی هستند." };
  }

  await dbConnect();
  try {
    await Product.findByIdAndUpdate(id, {
      $set: {
        code: data.code,
        category: data.category,
        price: data.price,
        inStock: data.inStock,
        isFeatured: data.isFeatured,
        fa: data.fa,
        en: data.en,
      },
    });
  } catch (err: any) {
    if (err?.code === 11000) {
      return { error: "محصولی با این کد یا نامک قبلا ثبت شده است." };
    }
    return { error: "خطا در بروزرسانی محصول." };
  }

  revalidatePath("/admin/products");
  revalidatePath("/products");
  revalidatePath(`/products/${data.fa.slug}`);
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
