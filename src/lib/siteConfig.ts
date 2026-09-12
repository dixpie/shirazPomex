export const siteConfig = {
  name: "پومکس شیراز",
  fullName: "نمایندگی رسمی پومکس در شیراز",
  tagline: "تولیدکننده چسب کاشی، افزودنی‌های بتن و مواد آب‌بندی",
  description:
    "نمایندگی رسمی پومکس در شیراز، عرضه‌کننده چسب کاشی، افزودنی‌های بتن و مواد آب‌بندی (عایق رطوبتی) پومکس با گارانتی اصالت و ضمانت شرکتی. برای مشاوره فنی رایگان و استعلام قیمت با ما تماس بگیرید.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://pomexshiraz.ir",
  phone: process.env.NEXT_PUBLIC_PHONE || "09179120624",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "0917 912 0624",
  landline: process.env.NEXT_PUBLIC_LANDLINE || "07132001234",
  landlineDisplay: process.env.NEXT_PUBLIC_LANDLINE_DISPLAY || "071-32001234",
  address:
    process.env.NEXT_PUBLIC_ADDRESS ||
    "شیراز، بلوار ستارخان، نمایندگی رسمی پومکس",
  telegram: process.env.NEXT_PUBLIC_TELEGRAM || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM || "",
  mapEmbedUrl:
    process.env.NEXT_PUBLIC_MAP_EMBED_URL ||
    "https://maps.google.com/maps?q=شیراز&output=embed",
  workingHours: "شنبه تا پنجشنبه ۹ صبح تا ۸ شب",
  city: "شیراز",
  region: "فارس",
  brand: "پومکس",
};

export const telHref = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
