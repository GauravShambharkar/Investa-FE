import { z } from "zod";

// Read raw Vite environment variables strictly from environment files (.env / .env.local)
const rawEnv = {
  MODE: import.meta.env.MODE || "development",
  DEV: import.meta.env.DEV ?? true,
  PROD: import.meta.env.PROD ?? false,
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "",
  VITE_NEWS_KEY: import.meta.env.VITE_NEWS_KEY,
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL || "",
  VITE_LOCAL_API_URL: import.meta.env.VITE_LOCAL_API_URL || "",
  VITE_PROD_API_URL: import.meta.env.VITE_PROD_API_URL || "",
  VITE_WEB_APP_URL: import.meta.env.VITE_WEB_APP_URL || "",
};

const envSchema = z.object({
  MODE: z.string().default("development"),
  DEV: z.boolean().default(true),
  PROD: z.boolean().default(false),
  VITE_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  VITE_NEWS_KEY: z.string().optional(),
  VITE_BACKEND_URL: z.string().optional(),
  VITE_LOCAL_API_URL: z.string().optional(),
  VITE_PROD_API_URL: z.string().optional(),
  VITE_WEB_APP_URL: z.string().optional(),
});

export const env = envSchema.parse(rawEnv);

// Detect if app is currently executing in local dev environment
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const IS_DEVELOPMENT = env.DEV || isLocalhost;
export const IS_PRODUCTION = env.PROD && !isLocalhost;

// Conditional logic for API Base URL strictly based on env variables
export const API_BASE_URL =
  env.VITE_BACKEND_URL ||
  (IS_DEVELOPMENT
    ? env.VITE_LOCAL_API_URL || env.VITE_PROD_API_URL || ""
    : env.VITE_PROD_API_URL || env.VITE_LOCAL_API_URL || "");

export const WEB_APP_URL = env.VITE_WEB_APP_URL || "";
export const CLERK_PUBLISHABLE_KEY = env.VITE_CLERK_PUBLISHABLE_KEY || "";
export const VITE_NEWS_KEY = env.VITE_NEWS_KEY || "";
export const NEWS_API_KEY = env.VITE_NEWS_KEY || "";

// Helper Endpoints
export const STOCK_ANALYSIS_ENDPOINT = `${API_BASE_URL}/analyse`;
export const NEWS_ENDPOINT = `${API_BASE_URL}/news`;
export const FETCH_STOCKS_ENDPOINT = `${API_BASE_URL}/stocks/ltp`;
