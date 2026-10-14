import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://flygo-1.onrender.com/api/v1";

export type AuthStatus = "DOCUMENTS_REQUIRED" | "PENDING_REVIEW" | string;

export type AuthResponse = {
  id: string;
  accessToken: string;
  refreshToken: string;
  status: AuthStatus;
};

export type User = {
  id: string;
  fullName: string;
  email: string;
  role: string;
  status: AuthStatus;
};

export type DocumentType =
  | "PASSPORT"
  | "NATIONAL_ID"
  | "INTERNATIONAL_PASSPORT"
  | "DRIVERS_LICENSE";

export type UserDocument = {
  id: string;
  documentType: DocumentType;
  cloudinaryUrl: string;
  documentStatus: "PENDING_REVIEW" | string;
};

type RetryableRequestConfig = AxiosRequestConfig & { _retry?: boolean };

let accessToken: string | null = null;
let refreshPromise: Promise<AuthResponse> | null = null;
let authFailureHandler: (() => void) | null = null;

/** Fail before a hung Render origin can leave the UI spinning forever. */
const REQUEST_TIMEOUT_MS = 25_000;

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
  headers: { "Content-Type": "application/json" },
});

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export function clearAccessToken() {
  accessToken = null;
}

export function setAuthFailureHandler(handler: (() => void) | null) {
  authFailureHandler = handler;
}

async function refreshTokens(): Promise<AuthResponse> {
  if (!refreshPromise) {
    refreshPromise = axios
      .post<AuthResponse>(`${API_BASE_URL}/auth/refresh`, undefined, {
        withCredentials: true,
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        return data;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status !== 401 || !request || request._retry) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      await refreshTokens();
      return api(request);
    } catch (refreshError) {
      clearAccessToken();
      authFailureHandler?.();
      return Promise.reject(refreshError);
    }
  },
);

export async function loginRequest(email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/auth/login", { email, password });
  setAccessToken(data.accessToken);
  return data;
}

export async function signupRequest(fullName: string, email: string, password: string) {
  const { data } = await api.post<AuthResponse>("/auth/signup", {
    fullName,
    email,
    password,
  });
  setAccessToken(data.accessToken);
  return data;
}

export async function refreshSessionRequest() {
  return refreshTokens();
}

export function getApiErrorMessage(error: unknown, fallback = "Something went wrong. Please try again.") {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message;
    if (typeof message === "string") return message;

    if (error.code === "ECONNABORTED" || error.message.toLowerCase().includes("timeout")) {
      return "The FlyGo API took too long to respond. It may be asleep or offline on Render.";
    }

    if (!error.response) {
      return "Cannot reach the FlyGo API. Check that the Render service is running.";
    }
  }
  return fallback;
}
