import { siteConfig, telHref } from "@/lib/siteConfig";
import clsx from "clsx";

export default function CallToOrderButton({
  label = "تماس برای خرید",
  className,
  size = "md",
}: {
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <a
      href={telHref(siteConfig.phone)}
      className={clsx(
        "btn-call w-full",
        size === "sm" && "!px-4 !py-2 text-sm",
        size === "lg" && "!px-8 !py-4 text-lg",
        className
      )}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1.1L6.6 10.8z" />
      </svg>
      {label}
    </a>
  );
}
