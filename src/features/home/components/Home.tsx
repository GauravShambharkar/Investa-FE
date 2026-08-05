import React, { useEffect, useMemo, useState } from "react";
import { useQueryState, parseAsInteger } from "nuqs";
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
  Layers,
  ChevronDown,
} from "lucide-react";
import NewsHeroBanner from "./NewsHeroBanner";
import NewsCard from "./NewsCard";
import NewsSkeleton from "./NewsSkeleton";
import TopicDropdown from "./TopicDropdown";
import SortDropdown from "./SortDropdown";
import { CATEGORY_TOPICS } from "../data/newsData";
import { useNewsStore } from "../store/useNewsStore";

const ITEMS_PER_PAGE = 6;

const Home: React.FC = () => {
  // nuqs URL Search Parameters State Synchronization
  const [queryParam, setQueryParam] = useQueryState("q", { defaultValue: "" });
  const [categoryParam, setCategoryParam] = useQueryState("cat", { defaultValue: "all" });
  const [sortParam, setSortParam] = useQueryState("sort", { defaultValue: "popularity" });
  const [pageParam, setPageParam] = useQueryState("page", parseAsInteger.withDefault(1));

  // Relative Dropdown open states
  const [isTopicOpen, setIsTopicOpen] = useState<boolean>(false);
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const { articles, loading, errorMsg, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews(queryParam, sortParam, categoryParam);
  }, [queryParam, categoryParam, sortParam, fetchNews]);

  const handleCategorySelect = (categoryId: string) => {
    setCategoryParam(categoryId);
    setQueryParam("");
    setPageParam(1);
  };

  const handleSortSelect = (sortId: string) => {
    setSortParam(sortId);
    setPageParam(1);
  };

  const handleClearSearch = () => {
    setQueryParam("");
    setPageParam(1);
  };

  // Initial 3 category capsules
  const initialCategoryCapsules = useMemo(
    () => CATEGORY_TOPICS.slice(0, 3),
    []
  );

  const currentSortLabel = useMemo(() => {
    if (sortParam === "publishedAt") return "Latest";
    if (sortParam === "relevance") return "Relevance";
    return "Popularity";
  }, [sortParam]);

  const heroArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = useMemo(
    () => (articles.length > 1 ? articles.slice(1) : []),
    [articles]
  );

  const totalPages = Math.max(1, Math.ceil(gridArticles.length / ITEMS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, pageParam), totalPages);

  const paginatedGridArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return gridArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [gridArticles, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPageParam(newPage);
      const gridElem = document.getElementById("articles-grid-heading");
      if (gridElem) {
        gridElem.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="w-[70%] max-[850px]:w-[90%] mx-auto pb-16 pt-4 font-sans tracking-tight">
      {/* Single Flex Line Filter Bar */}
      <section className="mb-8 relative z-30">
        <div className="flex items-center justify-between gap-3 overflow-visible bg-[#18181c] p-3.5 rounded-2xl border border-[#27272a] flex-nowrap">
          
          {/* Left Side: Initial Category Capsules + Relative Topic Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            {initialCategoryCapsules.map((cat) => {
              const isActive = categoryParam === cat.id && !queryParam;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/20 border border-blue-400/30"
                      : "bg-[#121215] text-gray-300 hover:text-white hover:bg-[#222228] border border-[#27272a]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}

            {/* Relative Topic Dropdown Container */}
            <div className="relative shrink-0">
              <button
                onClick={() => {
                  setIsTopicOpen(!isTopicOpen);
                  setIsSortOpen(false);
                }}
                className="whitespace-nowrap px-4 py-2 rounded-full text-[12px] font-medium bg-[#121215] text-blue-400 hover:text-blue-300 hover:bg-[#222228] border border-[#27272a] transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Layers className="size-3.5 text-blue-400" />
                <span>+ All Topics</span>
                <ChevronDown className={`size-3 transition-transform duration-200 ${isTopicOpen ? "rotate-180" : ""}`} />
              </button>

              <TopicDropdown
                isOpen={isTopicOpen}
                onClose={() => setIsTopicOpen(false)}
                selectedCategory={categoryParam}
                onSelectCategory={handleCategorySelect}
              />
            </div>
          </div>

          {/* Middle: Relative Sort Dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                setIsTopicOpen(false);
              }}
              className="whitespace-nowrap px-4 py-2 bg-[#121215] border border-[#27272a] hover:border-[#3f3f46] hover:bg-[#222228] rounded-full text-[12px] text-gray-300 font-medium transition-all cursor-pointer flex items-center gap-1.5"
            >
              <SlidersHorizontal className="size-3.5 text-blue-400" />
              <span>Sort: <strong className="text-white font-medium">{currentSortLabel}</strong></span>
              <ChevronDown className={`size-3 transition-transform duration-200 ${isSortOpen ? "rotate-180" : ""}`} />
            </button>

            <SortDropdown
              isOpen={isSortOpen}
              onClose={() => setIsSortOpen(false)}
              selectedSort={sortParam}
              onSelectSort={handleSortSelect}
            />
          </div>

          {/* Right Side: Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[260px] shrink-0 ml-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <input
              type="text"
              value={queryParam}
              onChange={(e) => {
                setQueryParam(e.target.value);
                setPageParam(1);
              }}
              placeholder="Search news..."
              className="w-full bg-[#121215] border border-[#27272a] focus:border-blue-500 rounded-full pl-9 pr-9 py-2 text-[12px] text-white placeholder-gray-500 outline-none transition-all font-normal"
            />
            {queryParam && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

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
            onClick={() => fetchNews(queryParam, sortParam, categoryParam)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 transition-colors shadow-md cursor-pointer"
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
            No live news results match "{queryParam}". Try searching for popular topics like "Nvidia", "Tech", or "Inflation".
          </p>
          <button
            onClick={handleClearSearch}
            className="px-5 py-2 rounded-full bg-blue-600 text-white text-[12px] font-medium hover:bg-blue-500 transition-colors cursor-pointer"
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
              {/* Heading with Top-Right Exact Pagination Controls */}
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
                      className="size-8 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1.5 px-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`size-8 rounded-full text-[12px] font-medium transition-all flex items-center justify-center cursor-pointer ${
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
                      className="size-8 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-all cursor-pointer"
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
                      className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none text-[12px] font-medium transition-all cursor-pointer"
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
                          className={`size-8 rounded-full text-[12px] font-medium transition-all flex items-center justify-center cursor-pointer ${
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
                      className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#27272a] bg-[#18181c] text-gray-300 hover:text-white hover:bg-[#222228] disabled:opacity-40 disabled:pointer-events-none text-[12px] font-medium transition-all cursor-pointer"
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
