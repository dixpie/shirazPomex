import type { Metadata } from "next";
import Link from "next/link";
import CallToOrderButton from "@/components/CallToOrderButton";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/motion/Reveal";
import MotionCard from "@/components/motion/MotionCard";
import { siteConfig } from "@/lib/siteConfig";
import { productLines } from "@/lib/categories";

export const metadata: Metadata = {
  title: "درباره نمایندگی رسمی پومکس در شیراز",
  description:
    "آشنایی با نمایندگی رسمی پومکس در شیراز، تولیدکننده چسب کاشی، افزودنی‌های بتن و مواد آب‌بندی، با گارانتی شرکتی و خدمات پس از فروش.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> / درباره ما
      </nav>

      <Reveal>
        <h1 className="section-title mb-6">درباره نمایندگی رسمی پومکس شیراز</h1>
      </Reveal>

      <Reveal delay={0.05} className="prose prose-fa max-w-3xl leading-8 text-slate-600">
        <p>
          پومکس تولیدکننده چسب کاشی، افزودنی‌های بتن و مواد آب‌بندی
          (عایق رطوبتی) است. نمایندگی رسمی پومکس در شیراز با هدف عرضه مستقیم
          و مطمئن این محصولات به پیمانکاران، فروشگاه‌های مصالح ساختمانی و
          مصرف‌کنندگان استان فارس فعالیت می‌کند. تمامی محصولات موجود در این
          فروشگاه دارای گارانتی اصالت کالا و ضمانت شرکتی هستند.
        </p>
        <p>
          هدف ما ارائه بهترین تجربه خرید به مشتریان شیرازی است؛ از مشاوره
          فنی پیش از خرید درباره نوع چسب کاشی، افزودنی بتن یا عایق رطوبتی
          مناسب پروژه، تا پشتیبانی و خدمات پس از فروش. تیم ما همواره آماده
          پاسخگویی تلفنی به سوالات شما درباره محصولات، میزان مصرف، قیمت‌ها
          و نحوه خرید است.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {productLines.map((line, i) => (
          <MotionCard
            key={line.slug}
            delay={i * 0.1}
            className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
          >
            <h3 className="mb-2 font-bold text-brand-800">{line.name}</h3>
            <p className="text-sm leading-7 text-slate-500">{line.description}</p>
          </MotionCard>
        ))}
      </div>

      <Reveal delay={0.1} className="prose prose-fa mt-10 max-w-3xl leading-8 text-slate-600">
        <h2>چرا پومکس شیراز؟</h2>
        <ul>
          <li>ضمانت اصالت کالا و گارانتی رسمی شرکت پومکس</li>
          <li>مشاوره فنی و رایگان پیش از خرید</li>
          <li>قیمت‌گذاری شفاف و مطابق تعرفه رسمی</li>
          <li>امکان ارسال به سراسر شیراز و استان فارس</li>
          <li>خدمات پس از فروش و پشتیبانی مستمر</li>
        </ul>
      </Reveal>

      <div className="mt-14">
        <Reveal>
          <h2 className="section-title mb-2">فروشگاه و انبار ما</h2>
          <p className="mb-8 max-w-2xl text-slate-500">
            نمایی از فروشگاه و انبار نمایندگی رسمی پومکس در شیراز.
          </p>
        </Reveal>
        <Gallery />
      </div>

      <div className="mt-10">
        <CallToOrderButton
          label={`مشاوره فنی رایگان: ${siteConfig.phoneDisplay}`}
          size="lg"
          className="w-auto"
        />
      </div>
    </div>
  );
}
