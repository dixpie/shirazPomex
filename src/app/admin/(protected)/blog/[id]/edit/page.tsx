import { notFound } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { updatePostAction } from "@/actions/blog";
import { getPostByIdAdmin } from "@/lib/data";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPostByIdAdmin(id);
  if (!post) notFound();

  const action = updatePostAction.bind(null, id);

  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-900">ویرایش مقاله</h1>
      <BlogForm action={action} post={post} />
    </div>
  );
}
