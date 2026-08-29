import Image from "next/image";
import Link from "next/link";
import { PlainPost } from "@/lib/data";
import { toJalaliDate } from "@/lib/format";
import MotionCard from "./motion/MotionCard";

export default function BlogCard({ post }: { post: PlainPost }) {
  return (
    <MotionCard className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-card transition hover:shadow-lg">
    <Link
      href={`/blog/${post.slug}`}
      className="flex h-full flex-col"
    >
      <div className="relative aspect-[16/9] bg-brand-50">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-200">
            پومکس شیراز
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="text-xs font-medium text-brand-500">
          {toJalaliDate(post.createdAt)}
        </span>
        <h3 className="line-clamp-2 font-bold text-slate-800 group-hover:text-brand">
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-slate-500">{post.excerpt}</p>
      </div>
    </Link>
    </MotionCard>
  );
}
