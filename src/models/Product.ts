import mongoose, { Schema, models, model } from "mongoose";

export interface ISpec {
  key: string;
  value: string;
}

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  category: string;
  model?: string;
  price: number;
  discountPrice?: number;
  images: string[];
  shortDescription?: string;
  description?: string;
  specs: ISpec[];
  inStock: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SpecSchema = new Schema<ISpec>(
  {
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true, trim: true },
    model: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    images: { type: [String], default: [] },
    shortDescription: { type: String, trim: true },
    description: { type: String },
    specs: { type: [SpecSchema], default: [] },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    seoTitle: { type: String, trim: true },
    seoDescription: { type: String, trim: true },
  },
  { timestamps: true }
);

ProductSchema.index({ title: "text", shortDescription: "text", category: "text" });

export default models.Product || model<IProduct>("Product", ProductSchema);
