import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import { updateProductAction } from "@/actions/products";
import { getProductByIdAdmin } from "@/lib/data";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductByIdAdmin(id);
  if (!product) notFound();

  const action = updateProductAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-900">ویرایش محصول</h1>
      <ProductForm action={action} product={product} />
    </div>
  );
}
