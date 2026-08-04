import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  Newspaper,
  X,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import NewsHeroBanner from "./NewsHeroBanner";
import NewsCard from "./NewsCard";
import NewsSkeleton from "./NewsSkeleton";
import {
  type NewsArticle,
  CATEGORY_TOPICS,
} from "./newsData";
import { API_BASE_URL, NEWS_API_KEY } from "../../config/env.config";

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popularity");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Fetch news dynamically via API endpoint (smart local/production backend with direct NewsAPI fallback)
  const fetchNews = useCallback(async (query: string, sort: string) => {
    setLoading(true);
    setErrorMsg(null);

    const targetQuery =
      query.trim() ||
      CATEGORY_TOPICS.find((c) => c.id === activeCategory)?.query ||
      "stock market OR financial markets OR stocks OR economy";

    const fallbackProdUrl = "https://investa-be.onrender.com/investa/v1";

    // 1. Try Configured Environment Backend Proxy Endpoint
    try {
      const backendUrl = `${API_BASE_URL}/news?q=${encodeURIComponent(
        targetQuery
      )}&sortBy=${sort}&pageSize=30`;

      const response = await axios.get(backendUrl);

      if (
        response.data &&
        response.data.ok &&
        Array.isArray(response.data.articles) &&
        response.data.articles.length > 0
      ) {
        setArticles(response.data.articles);
        setLoading(false);
        return;
      }
    } catch (primaryErr) {
      console.warn("Primary backend endpoint info, trying fallback backend...");
    }

    // 2. Try Secondary Production Backend if Primary Localhost Server is offline
    if (API_BASE_URL !== fallbackProdUrl) {
      try {
        const prodBackendUrl = `${fallbackProdUrl}/news?q=${encodeURIComponent(
          targetQuery
        )}&sortBy=${sort}&pageSize=30`;

        const response = await axios.get(prodBackendUrl);

        if (
          response.data &&
          response.data.ok &&
          Array.isArray(response.data.articles) &&
          response.data.articles.length > 0
        ) {
          setArticles(response.data.articles);
          setLoading(false);
          return;
        }
      } catch (prodErr) {
        console.warn("Production backend proxy info, trying direct NewsAPI...");
      }
    }

    // 3. Direct NewsAPI call if both backends are unreachable
    try {
      const directUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        targetQuery
      )}&sortBy=${sort}&language=en&pageSize=30&apiKey=${NEWS_API_KEY}`;

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
          setArticles(validArticles);
          setLoading(false);
          return;
        }
      }

      throw new Error("No live articles returned from News API.");
    } catch (err: any) {
      console.error("News API Error:", err?.response?.data || err.message);
      setArticles([]);
      setErrorMsg(
        err?.response?.data?.message ||
          "Failed to load live news from API. Please verify backend server or API key status."
      );
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchNews(searchQuery, sortBy);
    setCurrentPage(1);
  }, [searchQuery, activeCategory, sortBy, fetchNews]);

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSearchQuery("");
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1);
  };

  const heroArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = useMemo(
    () => (articles.length > 1 ? articles.slice(1) : []),
    [articles]
  );

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE));

  const paginatedGridArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [gridArticles, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const gridElem = document.getElementById("articles-grid-heading");
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="w-[70%] max-[850px]:w-[90%] mx-auto pb-16 pt-4 font-sans tracking-tight">
      {/* Search & Filter Controls */}
      <section className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-[#18181c] p-4 rounded-2xl border border-[#27272a]">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks, companies, market trends (e.g. Apple, Nvidia, Fed)..."
              className="w-full bg-[#121215] border border-[#27272a] focus:border-blue-500 rounded-full pl-10 pr-10 py-2.5 text-[14px] text-white placeholder-gray-500 outline-none transition-all duration-200 font-normal"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#121215] border border-[#27272a] rounded-full text-[12px] text-gray-400">
              <SlidersHorizontal className="size-3.5 text-blue-400" />
              <span className="font-medium text-gray-300">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-white text-[12px] font-medium outline-none cursor-pointer pr-1"
              >
                <option value="popularity" className="bg-[#18181c]">Popularity</option>
                <option value="publishedAt" className="bg-[#18181c]">Latest</option>
                <option value="relevance" className="bg-[#18181c]">Relevance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORY_TOPICS.map((cat) => {
            const isActive = activeCategory === cat.id && !searchQuery;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 border border-blue-400/30"
                    : "bg-[#18181c] text-gray-400 hover:text-white hover:bg-[#222228] border border-[#27272a]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content Area */}
      {loading ? (
        <NewsSkeleton />
      ) : errorMsg ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-4 rounded-2xl border border-dashed border-[#27272a] bg-[#18181c] p-6">
          <AlertCircle className="size-12 text-rose-500" />
          <h3 className="text-[16px] font-medium text-white">API Connection Error</h3>
          <p className="text-[12px] text-gray-400 max-w-md font-normal">{errorMsg}</p>
          <button
            onClick={() => fetchNews(searchQuery, sortBy)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 transition-colors shadow-md"
          >
            <RefreshCw className="size-3.5" />
            <span>Retry Live API Fetch</span>
          </button>
        </div>
      ) : articles.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center space-y-4 rounded-2xl border border-dashed border-[#27272a] bg-[#18181c] p-6">
          <Newspaper className="size-12 text-gray-600" />
          <h3 className="text-[16px] font-medium text-white">No market articles returned</h3>
          <p className="text-[12px] text-gray-400 max-w-sm font-normal">
            No live news results match "{searchQuery}". Try searching for popular topics like "Nvidia", "Tech", or "Inflation".
          </p>
          <button
            onClick={handleClearSearch}
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Main Hero Banner for Top Recent Story */}
          {heroArticle && <NewsHeroBanner article={heroArticle} />}

          {/* Other Blogs / Articles Grid */}
          {gridArticles.length > 0 && (
            <div className="space-y-6">
              {/* Heading with Top-Right Exact Pagination Controls (Icon-only Prev/Next) */}
              <div
                id="articles-grid-heading"
                className="flex flex-wrap items-center justify-between border-b border-[#27272a] pb-4 gap-4"
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-blue-500" />
                  <h2 className="text-[20px] font-medium text-white tracking-tight">
                    Latest Market Blogs & Articles
                  </h2>
                </div>

                {/* Top-Right Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous Page"
                      className="size-8 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all"
                    >
                      <ChevronLeft className="size-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`size-8 rounded-full text-[12px] font-medium transition-all flex items-center justify-center ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white border border-blue-400/40"
                              : "bg-[#18181c] text-gray-400 border border-[#27272a] hover:text-white hover:bg-[#222228]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next Page"
                      className="size-8 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedGridArticles.map((article, index) => (
                  <NewsCard
                    key={`${article.url}-${(currentPage - 1) * ITEMS_PER_PAGE + index}`}
                    article={article}
                  />
                ))}
              </div>

              {/* Bottom Pagination Controls */}
              {totalPages > 1 && (
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#27272a]">
                  <div className="text-[12px] text-gray-400 font-medium">
                    Page <span className="text-white">{currentPage}</span> of{" "}
                    <span className="text-white">{totalPages}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none text-[12px] font-medium transition-all"
                    >
                      <ChevronLeft className="size-4" />
                      <span>Previous</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`size-8 rounded-full text-[12px] font-medium transition-all flex items-center justify-center ${
                            currentPage === pageNum
                              ? "bg-blue-600 text-white border border-blue-400/40"
                              : "bg-[#18181c] text-gray-400 border border-[#27272a] hover:text-white hover:bg-[#222228]"
                          }`}
                        >
                          {pageNum}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none text-[12px] font-medium transition-all"
                    >
                      <span>Next</span>
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
