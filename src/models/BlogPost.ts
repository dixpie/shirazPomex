import { Schema, models, model } from "mongoose";

export interface IBlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  author: string;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: { type: String },
    tags: { type: [String], default: [] },
    author: { type: String, default: "پومکس شیراز" },
    published: { type: Boolean, default: true, index: true },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

BlogPostSchema.index({ title: "text", excerpt: "text", content: "text" });

export default models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
