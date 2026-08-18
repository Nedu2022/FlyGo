import Image from "next/image";
import { StoreBadge } from "@/components/site/sections";

/**
 * "Get Our Mobile App" band. The handset runs off the bottom of the section —
 * the footer that follows crops it, exactly as the design does.
 */
export function MobileApp() {
  return (
    <section className="reveal relative mx-auto w-full max-w-[1100px] overflow-hidden px-5 pt-16 text-center sm:px-8">
      <p className="text-[19px] text-label sm:text-[22px]">Your Travel Companion on the Go</p>
      <h2 className="mt-1 text-[30px] font-bold tracking-tight text-ink sm:text-[38px]">
        Get Our Mobile App!
      </h2>
      <p className="mx-auto mt-5 max-w-[700px] text-[15px] leading-relaxed text-body">
        Get access to exclusive deals, AI-powered travel suggestions, and seamless
        booking—all from the palm of your hand.
      </p>

      {/* Fixed-height stage: the phone overflows it and the footer crops the rest. */}
      <div className="relative mt-10 h-[300px] sm:h-[380px]">
        <Image
          src="/images/app/phone.svg"
          alt="The Flygo app on a phone"
          width={359}
          height={396}
          sizes="(max-width: 640px) 60vw, 330px"
          className="absolute left-1/2 top-0 w-[230px] max-w-none -translate-x-1/2 sm:w-[330px]"
        />

        <div className="absolute bottom-6 left-1/2 flex translate-x-[10px] flex-wrap justify-center gap-3 sm:bottom-10 sm:translate-x-[150px] sm:justify-start">
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>
      </div>
    </section>
  );
}
