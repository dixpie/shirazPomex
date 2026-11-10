import { siteConfig, telHref } from "@/lib/siteConfig";

export default function FloatingCallButton() {
  return (
    <>
      {/* دکمه شناور تماس - دسکتاپ و تبلت */}
      <a
        href={telHref(siteConfig.phone)}
        className="floating-contact fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-xl animate-pulseRing "
        aria-label="تماس با پومکس شیراز"
      >
        <span className="floating-contact-label">مشاوره و استعلام قیمت</span><svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
        </svg>
      </a>

      <div className="h-24" />
    </>
  );
}
