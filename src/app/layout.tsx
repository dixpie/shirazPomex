import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import AnnouncementBar from "@/components/AnnouncementBar";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/siteConfig";

const vazir = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazir",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.fullName} | چسب کاشی، افزودنی بتن، مواد آب‌بندی`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "پومکس شیراز",
    "چسب کاشی پومکس",
    "قیمت چسب کاشی",
    "افزودنی بتن پومکس",
    "افزودنی های بتن",
    "مواد آب بندی پومکس",
    "عایق رطوبتی شیراز",
    "آب بندی پشت بام شیراز",
    "نماینده رسمی پومکس در شیراز",
    "خرید چسب کاشی شیراز",
    "پومکس",
  ],
  authors: [{ name: siteConfig.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.fullName,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.fullName,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className="font-vazir bg-white text-slate-800 antialiased">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "@id": `${siteConfig.url}/#business`,
            name: siteConfig.fullName,
            image: `${siteConfig.url}/opengraph-image`,
            url: siteConfig.url,
            telephone: siteConfig.phone,
            priceRange: "$$",
            address: {
              "@type": "PostalAddress",
              streetAddress: siteConfig.address,
              addressLocality: siteConfig.city,
              addressRegion: siteConfig.region,
              addressCountry: "IR",
            },
            areaServed: "Shiraz",
            knowsAbout: ["چسب کاشی", "افزودنی های بتن", "مواد آب بندی و عایق رطوبتی"],
          }}
        />
        <AnnouncementBar />
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
