import BlogForm from "@/components/admin/BlogForm";
import { createPostAction } from "@/actions/blog";

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-xl font-extrabold text-brand-900">افزودن مقاله جدید</h1>
      <BlogForm action={createPostAction} />
    </div>
  );
}
