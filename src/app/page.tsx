import ProjectGuide from "@/components/ProjectGuide";
import Link from "next/link";
import type { Metadata } from "next";
import { getProducts, getPosts, safe } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import BlogCard from "@/components/BlogCard";
import Gallery from "@/components/Gallery";
import CallToOrderButton from "@/components/CallToOrderButton";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/motion/Reveal";
import MotionCard from "@/components/motion/MotionCard";
import FloatingBlob from "@/components/motion/FloatingBlob";
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
  const [featuredProducts, latestProducts, posts] = await Promise.all([
    safe(getProducts({ featuredOnly: true, limit: 8 }), []),
    safe(getProducts({ limit: 8 }), []),
    safe(getPosts({ limit: 3 }), []),
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

      <section className="studio-hero">
        <div className="container-page hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">POMEX / SHIRAZ · پومکس شیراز</span>
            <h1>پایهٔ یک ساخت‌وساز خوب،<br/><em>انتخاب درست است.</em></h1>
            <p>خرید چسب کاشی، افزودنی بتن و مواد آب‌بندی در شیراز؛ از انتخاب محصول متناسب با سطح و شرایط پروژه تا استعلام موجودی و هماهنگی سفارش، کنار شما هستیم.</p>
            <div className="hero-actions"><CallToOrderButton label="مشاوره و استعلام قیمت" size="lg" className="w-auto"/><Link href="/products" className="btn-outline">کشف محصولات ↙</Link></div>
            <div className="hero-notes"><span>مشاوره پیش از خرید</span><span>هماهنگی ارسال در فارس</span><span>انتخاب بر اساس پروژه</span></div>
          </div>
          <div className="hero-art"><img src="/gallery/header.png" alt="محصولات ساختمانی پومکس برای پروژه‌های شیراز" width="800" height="700" fetchPriority="high"/><div className="project-label"><span>از زیرسازی تا آخرین اتصال</span><strong>برای جزئیاتی که ماندگارند.</strong></div><span className="art-index">01 / MATERIALS</span></div>
        </div>
      </section>
      <section className="container-page project-picker"><div><span className="eyebrow">از نیاز پروژه شروع کنید</span><h2>برای کدام بخش ساختمان؟</h2></div><Link href="/products?category=چسب%20کاشی">نصب کاشی و پرسلان ↙</Link><Link href="/products?category=آب%20بندی">رفع نم و آب‌بندی ↙</Link><Link href="/products?category=افزودنی%20بتن">اجرای بتن ↙</Link></section>

      <div className="material-ribbon" aria-label="حوزه‌های محصولات"><div>{[0,1].map(i=><span key={i} aria-hidden={i===1}>POMEX ✦ چسب کاشی و پرسلان ✦ آب‌بندی استخر و تراس ✦ افزودنی‌های بتن ✦ مشاوره انتخاب محصول ✦ شیراز و استان فارس ✦ </span>)}</div></div>
      <section className="container-page py-14"><Reveal className="section-heading"><div><span className="eyebrow">راهکار، برای هر مرحلهٔ ساخت</span><h2 className="section-title mt-3">از یک اتصال دقیق، تا یک سازهٔ ماندگار</h2></div><Link href="/products">همهٔ محصولات ↙</Link></Reveal><div className="application-grid">{[
        {title:'نصب دقیق. نمای یکدست.',label:'چسب کاشی و سرامیک',image:'/gallery/header.png',category:'چسب کاشی',text:'برای انتخاب چسب متناسب با پرسلان، کاشی و نوع زیرکار.'},
        {title:'رطوبت را جدی بگیرید.',label:'سیستم‌های آب‌بندی',image:'/gallery/warehouse-1.jpg',category:'آب بندی',text:'بررسی راهکار مناسب استخر، تراس و محیط‌های مرطوب.'},
        {title:'کیفیت، از زیرسازی شروع می‌شود.',label:'افزودنی‌های بتن',image:'/gallery/warehouse-2.jpg',category:'افزودنی بتن',text:'انتخاب افزودنی با توجه به نیاز فنی و شرایط اجرا.'}
      ].map((item,i)=><MotionCard key={item.category} delay={i*.1} className="application-card"><img src={item.image} alt={item.label+' پومکس شیراز'} width="650" height="500" loading="lazy"/><div><span>0{i+1} / {item.label}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={`/products?category=${encodeURIComponent(item.category)}`}>انتخاب محصول ↙</Link></div></MotionCard>)}</div></section>
      <ProjectGuide/>
      <section className="showroom-band"><div className="container-page showroom-grid"><Reveal><span className="eyebrow">پشت این سایت، یک مسیر ارتباط واقعی است</span><h2>محصول را ببینید.<br/>سؤال بپرسید.<br/><em>با آگاهی سفارش بدهید.</em></h2><p>تصاویر فروشگاه و انبار را بررسی کنید و پیش از مراجعه، برای تأیید آدرس، موجودی و شرایط تحویل تماس بگیرید.</p><a className="btn-call" href={telHref(siteConfig.phone)}>ارتباط مستقیم · {siteConfig.phoneDisplay}</a></Reveal><div className="showroom-mosaic"><img src="/gallery/shop-1.jpg" alt="تصویر فروشگاه پومکس شیراز" width="700" height="600" loading="lazy"/><img src="/gallery/delivery.jpg" alt="آماده‌سازی سفارش محصولات" width="450" height="350" loading="lazy"/><div><span>مشاوره تا سفارش</span><strong>یک تماس، شروع انتخاب بهتر.</strong><Link href="/contact">راه‌های ارتباطی ↙</Link></div></div></div></section>
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
              09179120624
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
      برای بررسی موجودی محصولات با کارشناسان ما تماس بگیرید. {" "}
      <Link href="/contact" className="font-bold underline">
        ارتباط با ما
      </Link>{" "}
      مشاوره انتخاب محصول و ثبت سفارش.
    </div>
  );
}
