import Image from "next/image";
import Link from "next/link";

export function Logo({
  className = "",
  href = "/",
  /** Height utilities for the mark. Responsive by default so it never dominates
   *  a narrow bar; pass a fixed one (e.g. "h-[50px]") to override. */
  imgClass = "h-[38px] sm:h-[46px] lg:h-[50px]",
}: {
  className?: string;
  href?: string;
  imgClass?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="FLYGO Bookings — home"
      className={`inline-block ${className}`}
    >
      <Image
        src="/images/logo.svg"
        alt="FLYGO Bookings"
        width={126}
        height={56}
        priority
        className={`w-auto ${imgClass}`}
      />
    </Link>
  );
}

