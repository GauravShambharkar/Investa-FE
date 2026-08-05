import { create } from "zustand";
import axios from "axios";
import { type NewsArticle, CATEGORY_TOPICS } from "../data/newsData";
import { API_BASE_URL, VITE_NEWS_KEY } from "../../../config/env.config";

interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  errorMsg: string | null;
  fetchNews: (query: string, sort: string, activeCategory: string) => Promise<void>;
  setArticles: (articles: NewsArticle[]) => void;
}

export const useNewsStore = create<NewsState>((set) => ({
  articles: [],
  loading: true,
  errorMsg: null,
  setArticles: (articles) => set({ articles }),

  fetchNews: async (query: string, sort: string, activeCategory: string) => {
    set({ loading: true, errorMsg: null });

    const targetQuery =
      query.trim() ||
      CATEGORY_TOPICS.find((c) => c.id === activeCategory)?.query ||
      "stock market OR financial markets OR stocks OR economy";

    const activeBackendUrl =
      API_BASE_URL ||
      (typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "http://localhost:4000/investa/v1"
        : "https://investa-be.onrender.com/investa/v1");

    // 1. Primary: Server-Side Backend Proxy Call
    try {
      const proxyEndpoint = `${activeBackendUrl}/news?q=${encodeURIComponent(
        targetQuery
      )}&sortBy=${sort}&pageSize=30`;

      const response = await axios.get(proxyEndpoint);

      if (
        response.data &&
        response.data.ok &&
        Array.isArray(response.data.articles) &&
        response.data.articles.length > 0
      ) {
        set({ articles: response.data.articles, loading: false });
        return;
      }
    } catch (backendErr) {
      console.warn("Primary backend news proxy info, attempting fallback backend...");
    }

    // 2. Secondary: Fallback to Live Render Proxy Backend if Primary fails
    if (activeBackendUrl !== "https://investa-be.onrender.com/investa/v1") {
      try {
        const prodProxyEndpoint = `https://investa-be.onrender.com/investa/v1/news?q=${encodeURIComponent(
          targetQuery
        )}&sortBy=${sort}&pageSize=30`;

        const response = await axios.get(prodProxyEndpoint);

        if (
          response.data &&
          response.data.ok &&
          Array.isArray(response.data.articles) &&
          response.data.articles.length > 0
        ) {
          set({ articles: response.data.articles, loading: false });
          return;
        }
      } catch (prodProxyErr) {
        console.warn("Production backend proxy info, attempting direct call...");
      }
    }

    // 3. Direct NewsAPI call if key is available
    if (VITE_NEWS_KEY) {
      try {
        const directUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          targetQuery
        )}&sortBy=${sort}&language=en&pageSize=30&apiKey=${VITE_NEWS_KEY}`;

        const response = await axios.get(directUrl);

        if (
          response.data &&
          response.data.status === "ok" &&
          Array.isArray(response.data.articles)
        ) {
          const validArticles = response.data.articles.filter(
            (art: NewsArticle) =>
              art.title &&
              art.title !== "[Removed]" &&
              art.description &&
              art.url
          );

          if (validArticles.length > 0) {
            set({ articles: validArticles, loading: false });
            return;
          }
        }

        throw new Error("No live articles returned from News API.");
      } catch (err: any) {
        const apiErrMsg = err?.response?.data?.message || err.message;
        set({
          articles: [],
          loading: false,
          errorMsg: apiErrMsg.includes("browser")
            ? "NewsAPI Developer Plan blocks direct browser requests in production. Content is loaded via Express backend proxy."
            : apiErrMsg || "Failed to load live news from API.",
        });
      }
    } else {
      set({
        articles: [],
        loading: false,
        errorMsg: "NEWS_API_KEY environment variable missing from Render backend or Vercel config.",
      });
    }
  },
}));
