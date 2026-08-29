import ProductForm from "@/components/admin/ProductForm";
import { createProductAction } from "@/actions/products";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-900">افزودن محصول جدید</h1>
      <ProductForm action={createProductAction} />
    </div>
  );
}
