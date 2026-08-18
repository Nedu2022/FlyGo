import Image from "next/image";
import Link from "next/link";

export function Logo({
  className = "",
  href = "/",
  /** Rendered height in pixels; the lockup keeps its own 126:56 ratio. */
  height = 56,
}: {
  className?: string;
  href?: string;
  height?: number;
}) {
  return (
    <Link
      href={href}
      aria-label="FLYGO Bookings — home"
      className={`inline-block transition-transform duration-300 hover:scale-[1.04] ${className}`}
    >
      <Image
        src="/images/logo.svg"
        alt="FLYGO Bookings"
        width={126}
        height={56}
        priority
        style={{ height, width: "auto" }}
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
