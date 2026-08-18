"use client";

import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";

type OtpInputProps = {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  invalid?: boolean;
};

export function OtpInput({
  length = 6,
  value,
  onChange,
  onComplete,
  invalid = false,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function commit(next: string) {
    const trimmed = next.slice(0, length);
    onChange(trimmed);
    if (trimmed.length === length) onComplete?.(trimmed);
  }

  function setDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    commit(next.join(""));
  }

  function handleInput(index: number, raw: string) {
    const typed = raw.replace(/\D/g, "");
    if (!typed) {
      setDigit(index, "");
      return;
    }
    // Typing or autofilling several digits at once spreads across the boxes.
    if (typed.length > 1) {
      const next = digits.slice();
      for (let i = 0; i < typed.length && index + i < length; i++) {
        next[index + i] = typed[i];
      }
      commit(next.join(""));
      inputs.current[Math.min(index + typed.length, length - 1)]?.focus();
      return;
    }
    setDigit(index, typed);
    inputs.current[Math.min(index + 1, length - 1)]?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      event.preventDefault();
      setDigit(index - 1, "");
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      inputs.current[index - 1]?.focus();
    }
    if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      inputs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;
    event.preventDefault();
    commit(pasted);
    inputs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div
      className={`flex w-full justify-center gap-2 sm:gap-3 ${invalid ? "animate-shake" : ""}`}
      role="group"
      aria-label="One-time passcode"
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          value={digit}
          onChange={(event) => handleInput(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={handlePaste}
          onFocus={(event) => event.target.select()}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={length}
          aria-label={`Digit ${index + 1}`}
          className={`h-[54px] w-full min-w-0 max-w-[58px] flex-1 rounded-[10px] border bg-white text-center text-h3 text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-sky focus:shadow-[0_0_0_4px_var(--color-sky-soft)] sm:h-[62px] ${ invalid ? "border-red-400" : digit ? "animate-pop border-sky" : "border-line" }`}
        />
      ))}
    </div>
  );
}
