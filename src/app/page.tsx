import Link from "next/link";
import type { Metadata } from "next";
import { getProducts, getPosts, getSiteStats, safe } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import Gallery from "@/components/Gallery";
import CallToOrderButton from "@/components/CallToOrderButton";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import MotionCard from "@/components/motion/MotionCard";
import Counter from "@/components/motion/Counter";
import FloatingBlob from "@/components/motion/FloatingBlob";
import HeroSlider from "@/components/motion/HeroSlider";
import FarsMap from "@/components/motion/FarsMap";
import ParallaxBackground from "@/components/motion/ParallaxBackground";
import { siteConfig, telHref } from "@/lib/siteConfig";
import { productLines } from "@/lib/categories";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${siteConfig.fullName} | چسب کاشی، افزودنی بتن، مواد آب‌بندی`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const features = [
  { title: "ضمانت اصالت کالا", desc: "تمامی محصولات ما مستقیم از نمایندگی رسمی پومکس تامین می‌شوند." },
  { title: "مشاوره فنی رایگان", desc: "پیش از خرید با کارشناسان ما تماس بگیرید تا محصول مناسب پروژه شما را انتخاب کنید." },
  { title: "گارانتی و پشتیبانی", desc: "پشتیبانی فنی و خدمات پس از فروش در سراسر شیراز و استان فارس." },
  { title: "قیمت مصوب و رقابتی", desc: "قیمت‌گذاری شفاف و مطابق با تعرفه رسمی شرکت پومکس." },
];

const steps = [
  { title: "تماس بگیرید", desc: "با شماره نمایندگی تماس بگیرید و نیاز پروژه خود را شرح دهید." },
  { title: "مشاوره فنی رایگان", desc: "کارشناسان ما محصول و مقدار مصرف مناسب را به شما پیشنهاد می‌دهند." },
  { title: "استعلام قیمت و موجودی", desc: "قیمت نهایی و موجودی به‌روز محصول مورد نظر را اعلام می‌کنیم." },
  { title: "تحویل یا ارسال", desc: "دریافت حضوری از نمایندگی یا هماهنگی ارسال به محل پروژه." },
];

const faqs = [
  {
    q: "چسب کاشی پومکس برای چه نوع کاشی و سرامیکی مناسب است؟",
    a: "چسب‌های کاشی پومکس برای نصب انواع کاشی، سرامیک، پرسلان و سنگ در سطوح داخلی، خارجی و مرطوب مانند حمام و استخر طراحی شده‌اند. کارشناسان ما می‌توانند مدل مناسب پروژه شما را پیشنهاد دهند.",
  },
  {
    q: "افزودنی‌های بتن پومکس چه تاثیری در کیفیت بتن دارند؟",
    a: "افزودنی‌های بتن پومکس مانند روان‌کننده‌ها و ضدیخ‌ها باعث افزایش کارایی، مقاومت فشاری و دوام بتن در شرایط مختلف آب و هوایی می‌شوند.",
  },
  {
    q: "آیا مواد آب‌بندی پومکس برای استخر و پشت‌بام هم مناسب است؟",
    a: "بله، عایق‌های رطوبتی پومکس برای آب‌بندی پشت‌بام، استخر، سازه‌های بتنی و سطوح زیرزمین کاربرد دارند و در برابر نم و نشتی مقاوم هستند.",
  },
  {
    q: "چطور می‌توانم قیمت دقیق و میزان مصرف محصول را بپرسم؟",
    a: `کافیست با شماره ${siteConfig.phoneDisplay} تماس بگیرید تا کارشناسان ما آخرین قیمت، موجودی و میزان مصرف بر مترمربع را به شما اعلام کنند.`,
  },
  {
    q: "آیا امکان ارسال به شهرستان‌ها و کارگاه‌های ساختمانی وجود دارد؟",
    a: "بله، امکان ارسال محصولات به سراسر استان فارس و سایر شهرستان‌ها فراهم است. برای هماهنگی نحوه ارسال با ما تماس بگیرید.",
  },
  {
    q: "برای خرید باید حتما حضوری مراجعه کنم؟",
    a: "خیر، شما می‌توانید تلفنی سفارش خود را ثبت کنید و کالا به کارگاه یا پروژه شما ارسال شود، یا برای دریافت حضوری از فروشگاه هماهنگ کنید.",
  },
];

export default async function HomePage() {
  const [featuredProducts, latestProducts, posts, stats] = await Promise.all([
    safe(getProducts({ featuredOnly: true, limit: 8 }), []),
    safe(getProducts({ limit: 8 }), []),
    safe(getPosts({ limit: 3 }), []),
    safe(getSiteStats(), { productCount: 0, categoryCount: 0, postCount: 0 }),
  ]);

  const products = featuredProducts.length ? featuredProducts : latestProducts;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900">
        <HeroSlider
          slides={[
            { src: "/gallery/shop-1.jpg", alt: "فروشگاه نمایندگی پومکس شیراز" },
            { src: "/gallery/warehouse-1.jpg", alt: "انبار محصولات پومکس" },
            { src: "/gallery/delivery.jpg", alt: "آماده‌سازی و ارسال سفارشات پومکس" },
            { src: "/gallery/team.jpg", alt: "تیم فنی و مشاوره پومکس شیراز" },
          ]}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-brand-900/95 via-brand-900/75 to-brand-900/25" />
        <FloatingBlob className="-right-16 -top-16 h-72 w-72 bg-brand-300/20" duration={7} />
        <FloatingBlob className="-left-10 top-40 h-56 w-56 bg-brand-200/15" duration={9} delay={1.5} />
        <div className="container-page relative z-10 grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <span className="mb-4 inline-block rounded-full bg-white/15 px-4 py-1 text-sm font-bold text-white backdrop-blur">
              نمایندگی رسمی پومکس در شیراز
            </span>
            <h1 className="text-3xl font-extrabold leading-[1.4] text-white sm:text-4xl lg:text-5xl">
              چسب کاشی، افزودنی بتن و مواد آب‌بندی
              <br />
              پومکس با گارانتی اصالت
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-brand-100">
              {siteConfig.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <CallToOrderButton
                label={`تماس با ${siteConfig.phoneDisplay}`}
                size="lg"
                className="w-auto"
              />
              <Link
                href="/products"
                className="btn-outline !border-white !text-white hover:!bg-white hover:!text-brand-900"
              >
                مشاهده محصولات
              </Link>
            </div>
          </Reveal>
          <FarsMap className="mx-auto mt-4 max-w-xs sm:max-w-sm md:mt-0 md:max-w-none" />
        </div>
      </section>

      {/* Product lines */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="section-title mb-2">خط تولید محصولات پومکس</h2>
          <p className="mb-8 max-w-2xl text-slate-500">
            سه دسته اصلی محصولات ساختمانی پومکس که در نمایندگی شیراز موجود است.
          </p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {productLines.map((line, i) => (
            <MotionCard
              key={line.slug}
              delay={i * 0.1}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <CategoryIcon name={line.icon} />
              </div>
              <h3 className="mb-2 text-lg font-extrabold text-brand-900">{line.name}</h3>
              <p className="mb-4 text-sm leading-7 text-slate-500">{line.description}</p>
              <Link
                href={`/products?category=${encodeURIComponent(line.slug)}`}
                className="text-sm font-bold text-brand hover:underline"
              >
                مشاهده محصولات ←
              </Link>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden py-20">
        <ParallaxBackground src="/gallery/warehouse-2.jpg" alt="انبار پومکس شیراز" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-900/75 to-brand-900/85" />
        <div className="container-page relative z-10 grid grid-cols-2 gap-y-10 text-center sm:grid-cols-4 sm:divide-x sm:divide-white/15">
          <Reveal className="flex flex-col items-center">
            <StatIcon name="box" />
            <div className="text-3xl font-black text-white sm:text-4xl">
              <Counter value={stats.productCount} suffix="+" />
            </div>
            <div className="mt-2 text-sm font-medium text-brand-100">محصول موجود</div>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col items-center">
            <StatIcon name="layers" />
            <div className="text-3xl font-black text-white sm:text-4xl">
              <Counter value={stats.categoryCount} />
            </div>
            <div className="mt-2 text-sm font-medium text-brand-100">دسته‌بندی محصول</div>
          </Reveal>
          <Reveal delay={0.2} className="flex flex-col items-center">
            <StatIcon name="doc" />
            <div className="text-3xl font-black text-white sm:text-4xl">
              <Counter value={stats.postCount} />
            </div>
            <div className="mt-2 text-sm font-medium text-brand-100">مقاله آموزشی</div>
          </Reveal>
          <Reveal delay={0.3} className="flex flex-col items-center">
            <StatIcon name="shield" />
            <div className="text-3xl font-black text-white sm:text-4xl">۱۰۰٪</div>
            <div className="mt-2 text-sm font-medium text-brand-100">اصالت کالا</div>
          </Reveal>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <MotionCard
              key={f.title}
              delay={i * 0.08}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-card"
            >
              <h3 className="mb-2 font-bold text-brand-800">{f.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{f.desc}</p>
            </MotionCard>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container-page py-10">
        <Reveal className="mb-8 flex items-end justify-between">
          <h2 className="section-title">محصولات پومکس</h2>
          <Link href="/products" className="text-sm font-bold text-brand hover:underline">
            مشاهده همه محصولات ←
          </Link>
        </Reveal>

        {products.length ? (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyProductsHint />
        )}
      </section>

      {/* Order steps */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="section-title mb-8">مراحل خرید از پومکس شیراز</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1} className="relative rounded-2xl border border-brand-100 bg-white p-6 shadow-card">
              <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-sm font-black text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 font-bold text-brand-800">{step.title}</h3>
              <p className="text-sm leading-6 text-slate-500">{step.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="section-title mb-2">فروشگاه و انبار پومکس شیراز</h2>
          <p className="mb-8 max-w-2xl text-slate-500">
            نمایی از فروشگاه، انبار و فرآیند آماده‌سازی سفارشات نمایندگی رسمی پومکس در شیراز.
          </p>
        </Reveal>
        <Gallery />
      </section>

      {/* Why call us */}
      <section className="relative overflow-hidden bg-brand-900 py-16 text-white">
        <FloatingBlob className="left-1/3 -top-10 h-56 w-56 bg-brand-700/40" duration={8} />
        <div className="container-page relative grid items-center gap-8 md:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              همین حالا با کارشناسان ما تماس بگیرید
            </h2>
            <p className="mt-4 leading-8 text-brand-100">
              برای استعلام قیمت لحظه‌ای، مشاوره فنی رایگان و اطلاع از موجودی
              چسب کاشی، افزودنی بتن و مواد آب‌بندی پومکس در شیراز، کافیست یک تماس بگیرید.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col items-start gap-3 md:items-end">
            <a href={telHref(siteConfig.phone)} dir="ltr" className="text-3xl font-black text-white hover:underline">
              {siteConfig.phoneDisplay}
            </a>
            <a href={telHref(siteConfig.landline)} dir="ltr" className="text-lg font-bold text-brand-100 hover:underline">
              {siteConfig.landlineDisplay}
            </a>
          </Reveal>
        </div>
      </section>

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className="container-page py-14">
          <Reveal className="mb-8 flex items-end justify-between">
            <h2 className="section-title">جدیدترین مطالب وبلاگ</h2>
            <Link href="/blog" className="text-sm font-bold text-brand hover:underline">
              مشاهده همه مطالب ←
            </Link>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="container-page py-14">
        <Reveal>
          <h2 className="section-title mb-8">سوالات متداول</h2>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={(i % 2) * 0.08}>
              <details className="group rounded-xl border border-brand-100 bg-white p-5">
                <summary className="cursor-pointer list-none font-bold text-brand-800">
                  {f.q}
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-500">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

function StatIcon({ name }: { name: "box" | "layers" | "doc" | "shield" }) {
  const paths: Record<string, string> = {
    box: "M12 2 3 6.5v11L12 22l9-4.5v-11L12 2zm0 2.2 6.2 3.1L12 10.4 5.8 7.3 12 4.2zM5 9l6 3v7.6l-6-3V9zm14 0v7.6l-6 3V12l6-3z",
    layers: "M12 2 2 7l10 5 10-5-10-5zm0 8.2L4.4 7 12 3.8 19.6 7 12 10.2zM2 12l10 5 10-5-2-1-8 4-8-4-2 1zm0 5 10 5 10-5-2-1-8 4-8-4-2 1z",
    doc: "M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.6H8V12zm0 3.4h8V17H8v-1.6zm0-6.8h4v1.6H8V8.6z",
    shield: "M12 2 4 5v6c0 5 3.4 8.9 8 10 4.6-1.1 8-5 8-10V5l-8-3zm0 2.2 6 2.3v4.7c0 3.9-2.6 6.9-6 7.9-3.4-1-6-4-6-7.9V6.5l6-2.3zM10.9 14l-2.2-2.2 1.4-1.4 0.8 0.8 3.4-3.4 1.4 1.4L10.9 14z",
  };
  return (
    <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-inset ring-white/20">
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
        <path d={paths[name]} />
      </svg>
    </span>
  );
}

function CategoryIcon({ name }: { name: string }) {
  if (name === "tile") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z" />
      </svg>
    );
  }
  if (name === "concrete") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
        <path d="M4 20V6l8-3 8 3v14h-2v-6h-4v6h-2v-6H8v6H4zm4-8h2V9H8v3zm6 0h2V9h-2v3z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M12 2s7 7.5 7 12.5A7 7 0 0 1 5 14.5C5 9.5 12 2 12 2zm0 17a4.5 4.5 0 0 0 4.5-4.5c0-.3-.02-.6-.06-.9a6.9 6.9 0 0 1-6.87 5.34c.77.35 1.6.56 2.43.56z" />
    </svg>
  );
}

function EmptyProductsHint() {
  return (
    <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50 p-10 text-center text-brand-700">
      هنوز محصولی ثبت نشده است. از{" "}
      <Link href="/admin" className="font-bold underline">
        پنل مدیریت
      </Link>{" "}
      می‌توانید اولین محصول را اضافه کنید.
    </div>
  );
}
