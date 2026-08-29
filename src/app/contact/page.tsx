import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, telHref } from "@/lib/siteConfig";
import CallToOrderButton from "@/components/CallToOrderButton";

export const metadata: Metadata = {
  title: "تماس با ما",
  description:
    "راه‌های ارتباطی با نمایندگی رسمی پومکس در شیراز؛ شماره تماس، آدرس و ساعات کاری.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container-page py-10">
      <nav className="mb-4 text-sm text-slate-500">
        <Link href="/" className="hover:text-brand">خانه</Link> / تماس با ما
      </nav>

      <h1 className="section-title mb-8">تماس با پومکس شیراز</h1>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          <InfoRow label="تلفن همراه">
            <a href={telHref(siteConfig.phone)} dir="ltr" className="text-xl font-bold text-brand hover:underline">
              {siteConfig.phoneDisplay}
            </a>
          </InfoRow>
          <InfoRow label="تلفن ثابت">
            <a href={telHref(siteConfig.landline)} dir="ltr" className="text-xl font-bold text-brand hover:underline">
              {siteConfig.landlineDisplay}
            </a>
          </InfoRow>
          <InfoRow label="آدرس">
            <p className="text-slate-600">{siteConfig.address}</p>
          </InfoRow>
          <InfoRow label="ساعات کاری">
            <p className="text-slate-600">{siteConfig.workingHours}</p>
          </InfoRow>

          <CallToOrderButton size="lg" className="w-auto" label="تماس فوری" />
        </div>

        <div className="overflow-hidden rounded-2xl border border-brand-100">
          <iframe
            src={siteConfig.mapEmbedUrl}
            width="100%"
            height="360"
            loading="lazy"
            title="نقشه نمایندگی پومکس شیراز"
            className="block"
          />
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-brand-50 pb-4">
      <span className="mb-1 block text-sm font-bold text-brand-500">{label}</span>
      {children}
    </div>
  );
}
