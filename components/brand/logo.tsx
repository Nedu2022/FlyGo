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

/**
 * Word-only lockup for the dark footer, where the black "BOOKINGS" line in the
 * full mark would disappear against the background.
 */
export function LogoWord({
  className = "",
  height = 42,
}: {
  className?: string;
  height?: number;
}) {
  return (
    <Link href="/" aria-label="FLYGO — home" className={`inline-flex ${className}`}>
      <Image
        src="/images/logo-word.svg"
        alt="FLYGO"
        width={126}
        height={44}
        style={{ height, width: "auto" }}
      />
    </Link>
  );
}
