import { siteConfig, telHref } from "@/lib/siteConfig";

export default function FloatingCallButton() {
  return (
    <>
      {/* دکمه شناور تماس - دسکتاپ و تبلت */}
      <a
        href={telHref(siteConfig.phone)}
        className="fixed bottom-6 left-6 z-50 hidden h-16 w-16 items-center justify-center rounded-full bg-brand text-white shadow-xl animate-pulseRing sm:flex"
        aria-label="تماس با پومکس شیراز"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
        </svg>
      </a>

      {/* نوار تماس چسبیده به پایین - موبایل */}
      <a
        href={telHref(siteConfig.phone)}
        className="btn-call fixed inset-x-0 bottom-0 z-50 !rounded-none py-4 text-base sm:hidden"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
        </svg>
        برای خرید و مشاوره رایگان تماس بگیرید
      </a>
      <div className="h-16 sm:hidden" />
    </>
  );
}
