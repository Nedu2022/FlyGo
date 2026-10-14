"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  api,
  clearAccessToken,
  getApiErrorMessage,
  loginRequest,
  refreshSessionRequest,
  setAuthFailureHandler,
  signupRequest,
  type User,
} from "@/lib/api";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  signup: (fullName: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<User | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

async function loadCurrentUser() {
  const { data } = await api.get<User>("/users/me");
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function refreshSession() {
    try {
      await refreshSessionRequest();
      const currentUser = await loadCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      clearAccessToken();
      setUser(null);
      return null;
    }
  }

  async function login(email: string, password: string) {
    await loginRequest(email, password);
    const currentUser = await loadCurrentUser();
    setUser(currentUser);
    return currentUser;
  }

  async function signup(fullName: string, email: string, password: string) {
    await signupRequest(fullName, email, password);
    const currentUser = await loadCurrentUser();
    setUser(currentUser);
    return currentUser;
  }

  async function logout() {
    try {
      await api.post("/auth/logout");
    } finally {
      clearAccessToken();
      setUser(null);
    }
  }

  useEffect(() => {
    setAuthFailureHandler(() => {
      clearAccessToken();
      setUser(null);
      router.push("/login");
    });

    let active = true;
    void refreshSessionRequest()
      .then(loadCurrentUser)
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        clearAccessToken();
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
      setAuthFailureHandler(null);
    };
  }, [router]);

  const value = useMemo(
    () => ({ user, isAuthenticated: Boolean(user), isLoading, login, signup, logout, refreshSession }),
    [user, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside an AuthProvider");
  return context;
}

export { getApiErrorMessage };
