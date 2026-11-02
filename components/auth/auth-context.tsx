"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * Passwordless auth, kept entirely in the browser until a backend is wired:
 * sign in with an email code, Apple or Google. The signed-in user and the
 * list of emails that already have an account live in localStorage, so a
 * refresh keeps you signed in and returning users skip account set-up.
 */

export type User = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  provider: "email" | "apple" | "google";
  verification?: Verification;
};

export type CheckStatus = "pending" | "verified";

/**
 * KYC checks, filled in from the account's Verification page. Only file
 * names are kept in the browser; the documents go to the KYC provider.
 */
export type Verification = {
  phone?: { number: string; status: CheckStatus };
  identity?: { type: string; number: string; files: string[]; status: CheckStatus };
  selfie?: { file: string; status: CheckStatus };
  address?: { line: string; city: string; state: string; proof: string; status: CheckStatus };
  payout?: { bank: string; accountNumber: string; accountName: string; status: CheckStatus };
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  /** True when this email has signed in on this device before. */
  isKnownEmail: (email: string) => boolean;
  signIn: (email: string, provider?: User["provider"]) => void;
  /** Details are optional at sign-up and added later from the account pages. */
  updateProfile: (changes: Partial<Omit<User, "id" | "email" | "provider">>) => void;
  logout: () => void;
};

const USER_KEY = "flygo:user";
const KNOWN_KEY = "flygo:known-emails";
/** Profiles by email, so signing out and back in keeps details and checks. */
const PROFILES_KEY = "flygo:profiles";

function saveProfile(user: User) {
  write(PROFILES_KEY, { ...read<Record<string, User>>(PROFILES_KEY, {}), [user.email]: user });
}

const AuthContext = createContext<AuthContextValue | null>(null);

function read<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or blocked storage: the session simply won't persist.
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore the session after mount; localStorage isn't available on the server.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of an external store
    setUser(read<User | null>(USER_KEY, null));
    setIsLoading(false);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      isKnownEmail: (email) => read<string[]>(KNOWN_KEY, []).includes(email.toLowerCase()),
      signIn: (email, provider = "email") => {
        const address = email.toLowerCase();
        const next: User = read<Record<string, User>>(PROFILES_KEY, {})[address] ?? {
          id: crypto.randomUUID(),
          fullName: address.split("@")[0],
          email: address,
          provider,
        };
        saveProfile(next);
        const known = read<string[]>(KNOWN_KEY, []);
        if (!known.includes(address)) write(KNOWN_KEY, [...known, address]);
        write(USER_KEY, next);
        setUser(next);
      },
      updateProfile: (changes) => {
        if (!user) return;
        const next = { ...user, ...changes };
        write(USER_KEY, next);
        saveProfile(next);
        setUser(next);
      },
      logout: () => {
        write(USER_KEY, null);
        setUser(null);
      },
    }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}
