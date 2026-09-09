import mongoose, { Schema, models, model } from "mongoose";

export interface ILocalizedProduct {
  name: string;
  slug: string;
  keyword?: string;
  description?: string;
  features?: string;
  useFor?: string;
  consumption?: string;
  color?: string;
  weight?: string;
  type?: string;
  usage?: string;
  standards?: string;
  storage?: string;
  videoUrl?: string;
  composition?: string;
  mixingRatio?: string;
  density?: string;
  ph?: string;
  technicalSpecs?: string;
  packaging?: string;
}

export interface IProductSeo {
  primaryKeyword?: string;
  secondaryKeywords?: string;
  title?: string;
  metaDescription?: string;
  titleLength?: number;
  metaLength?: number;
  searchIntent?: string;
  imageAlt?: string;
}

export interface IProductSource {
  file?: string;
  pdfPage?: number;
  catalogPage?: number;
  officialUrl?: string;
  researchBasis?: string;
  confidence?: string;
  lastChecked?: string;
}

export interface IProduct {
  _id: string;
  code: string;
  category: string;
  price: number;
  inStock: boolean;
  isFeatured: boolean;
  fa: ILocalizedProduct;
  en?: ILocalizedProduct;
  catalog?: { title?: string };
  seo?: IProductSeo;
  source?: IProductSource;
  chatbot?: {
    synonyms?: string;
    shortAnswer?: string;
    faqQuestion?: string;
    faqAnswer?: string;
  };
  data?: { status?: string; missingFields?: string; notes?: string };
  media?: { videoStatus?: string };
  createdAt?: number;
  updatedAt?: Date;
}

const LocalizedSchema = new Schema<ILocalizedProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true },
    keyword: String,
    description: String,
    features: String,
    useFor: String,
    consumption: String,
    color: String,
    weight: String,
    type: String,
    usage: String,
    standards: String,
    storage: String,
    videoUrl: String,
    composition: String,
    mixingRatio: String,
    density: String,
    ph: String,
    technicalSpecs: String,
    packaging: String,
  },
  { _id: false }
);

const ProductSchema = new Schema<IProduct>(
  {
    code: { type: String, required: true, unique: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    price: { type: Number, required: true, min: 0, default: 0 },
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    fa: { type: LocalizedSchema, required: true },
    en: { type: LocalizedSchema },
    catalog: { title: String },
    seo: {
      primaryKeyword: String,
      secondaryKeywords: String,
      title: String,
      metaDescription: String,
      titleLength: Number,
      metaLength: Number,
      searchIntent: String,
      imageAlt: String,
    },
    source: {
      file: String,
      pdfPage: Number,
      catalogPage: Number,
      officialUrl: String,
      researchBasis: String,
      confidence: String,
      lastChecked: String,
    },
    chatbot: {
      synonyms: String,
      shortAnswer: String,
      faqQuestion: String,
      faqAnswer: String,
    },
    data: {
      status: String,
      missingFields: String,
      notes: String,
    },
    media: {
      videoStatus: String,
    },
    createdAt: Schema.Types.Mixed,
  },
  { timestamps: { createdAt: false, updatedAt: true }, collection: "product" }
);

ProductSchema.index({ "fa.slug": 1 }, { unique: true });
ProductSchema.index({ "fa.name": "text", "fa.description": "text", category: "text" });

export default models.Product || model<IProduct>("Product", ProductSchema);
