import { z } from "zod";

// Read raw Vite environment variables
const rawEnv = {
  MODE: import.meta.env.MODE || "development",
  DEV: import.meta.env.DEV ?? true,
  PROD: import.meta.env.PROD ?? false,
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  VITE_NEWS_API: import.meta.env.VITE_NEWS_API,
  VITE_LOCAL_API_URL:
    import.meta.env.VITE_LOCAL_API_URL || "http://localhost:4000/investa/v1",
  VITE_PROD_API_URL:
    import.meta.env.VITE_PROD_API_URL ||
    "https://investa-be.onrender.com/investa/v1",
  VITE_LOCAL_WEB_URL:
    import.meta.env.VITE_LOCAL_WEB_URL || "http://localhost:5173",
  VITE_PROD_WEB_URL:
    import.meta.env.VITE_PROD_WEB_URL || "https://investaai.vercel.app",
};

const envSchema = z.object({
  MODE: z.string().default("development"),
  DEV: z.boolean().default(true),
  PROD: z.boolean().default(false),
  VITE_CLERK_PUBLISHABLE_KEY: z
    .string()
    .min(1, "Clerk Publishable Key is required"),
  VITE_NEWS_API: z.string().min(1, "News API Key is required"),
  VITE_LOCAL_API_URL: z.string().default("http://localhost:4000/investa/v1"),
  VITE_PROD_API_URL: z
    .string()
    .default("https://investa-be.onrender.com/investa/v1"),
  VITE_LOCAL_WEB_URL: z.string().default("http://localhost:5173"),
  VITE_PROD_WEB_URL: z.string().default("https://investaai.vercel.app"),
});

export const env = envSchema.parse(rawEnv);

// Detect if app is currently executing in local dev environment
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const IS_DEVELOPMENT = env.DEV || isLocalhost;
export const IS_PRODUCTION = env.PROD && !isLocalhost;

// Conditional logic for API Base URL & Web App URL
export const API_BASE_URL = IS_DEVELOPMENT
  ? env.VITE_LOCAL_API_URL
  : env.VITE_PROD_API_URL;

export const WEB_APP_URL = IS_DEVELOPMENT
  ? env.VITE_LOCAL_WEB_URL
  : env.VITE_PROD_WEB_URL;

export const CLERK_PUBLISHABLE_KEY = env.VITE_CLERK_PUBLISHABLE_KEY;
export const NEWS_API_KEY = env.VITE_NEWS_API;

// Helper Endpoints
export const STOCK_ANALYSIS_ENDPOINT = `${API_BASE_URL}/analyse`;
export const NEWS_ENDPOINT = `${API_BASE_URL}/news`;
export const FETCH_STOCKS_ENDPOINT = `${API_BASE_URL}/stocks/ltp`;
