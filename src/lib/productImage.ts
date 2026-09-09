import fs from "fs";
import path from "path";

export function getProductImage(code: string): { src: string; exists: boolean } {
  const file = `${code}.webp`;
  const exists = fs.existsSync(path.join(process.cwd(), "public", "gallery", "products", file));
  return { src: `/gallery/products/${file}`, exists };
}
