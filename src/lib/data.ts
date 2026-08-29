import { dbConnect } from "@/lib/mongodb";
import Product, { IProduct } from "@/models/Product";
import BlogPost, { IBlogPost } from "@/models/BlogPost";

export type PlainProduct = Omit<IProduct, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

export type PlainPost = Omit<IBlogPost, "_id" | "createdAt" | "updatedAt"> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

function serialize<T>(doc: any): T {
  return JSON.parse(JSON.stringify(doc));
}

export async function getProducts(opts?: {
  category?: string;
  q?: string;
  featuredOnly?: boolean;
  limit?: number;
}): Promise<PlainProduct[]> {
  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (opts?.category) filter.category = opts.category;
  if (opts?.featuredOnly) filter.isFeatured = true;
  if (opts?.q) filter.$text = { $search: opts.q };

  let query = Product.find(filter).sort({ createdAt: -1 });
  if (opts?.limit) query = query.limit(opts.limit);

  const docs = await query.lean();
  return serialize(docs);
}

export async function getProductBySlug(slug: string): Promise<PlainProduct | null> {
  await dbConnect();
  const doc = await Product.findOne({ slug }).lean();
  return doc ? serialize(doc) : null;
}

export async function getCategories(): Promise<string[]> {
  await dbConnect();
  const categories = await Product.distinct("category");
  return categories.sort();
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 4
): Promise<PlainProduct[]> {
  await dbConnect();
  const docs = await Product.find({ category, slug: { $ne: excludeSlug } })
    .limit(limit)
    .lean();
  return serialize(docs);
}

export async function getPosts(opts?: {
  q?: string;
  limit?: number;
}): Promise<PlainPost[]> {
  await dbConnect();
  const filter: Record<string, unknown> = { published: true };
  if (opts?.q) filter.$text = { $search: opts.q };

  let query = BlogPost.find(filter).sort({ createdAt: -1 });
  if (opts?.limit) query = query.limit(opts.limit);

  const docs = await query.lean();
  return serialize(docs);
}

export async function getAllPostsAdmin(): Promise<PlainPost[]> {
  await dbConnect();
  const docs = await BlogPost.find({}).sort({ createdAt: -1 }).lean();
  return serialize(docs);
}

export async function getPostByIdAdmin(id: string): Promise<PlainPost | null> {
  await dbConnect();
  const doc = await BlogPost.findById(id).lean();
  return doc ? serialize(doc) : null;
}

export async function getProductByIdAdmin(id: string): Promise<PlainProduct | null> {
  await dbConnect();
  const doc = await Product.findById(id).lean();
  return doc ? serialize(doc) : null;
}

export async function getPostBySlug(slug: string): Promise<PlainPost | null> {
  await dbConnect();
  const doc = await BlogPost.findOne({ slug, published: true }).lean();
  return doc ? serialize(doc) : null;
}

export async function getSiteStats(): Promise<{
  productCount: number;
  categoryCount: number;
  postCount: number;
}> {
  await dbConnect();
  const [productCount, categories, postCount] = await Promise.all([
    Product.countDocuments(),
    Product.distinct("category"),
    BlogPost.countDocuments({ published: true }),
  ]);
  return { productCount, categoryCount: categories.length, postCount };
}

export async function getRelatedPosts(
  excludeSlug: string,
  limit = 3
): Promise<PlainPost[]> {
  await dbConnect();
  const docs = await BlogPost.find({ slug: { $ne: excludeSlug }, published: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return serialize(docs);
}
