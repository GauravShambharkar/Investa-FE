import React from "react";
import { ExternalLink, Clock, TrendingUp, Sparkles, User } from "lucide-react";
import { type NewsArticle, formatDate } from "../data/newsData";

interface NewsHeroBannerProps {
  article: NewsArticle;
}

const NewsHeroBanner: React.FC<NewsHeroBannerProps> = ({ article }) => {
  const fallbackImg =
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="w-full mb-8">
      <div className="relative overflow-hidden rounded-2xl border border-[#27272a] bg-[#18181c] p-6 lg:p-8 shadow-xl transition-all duration-300 hover:border-[#3f3f46]">
        {/* Subtle Brand Accent Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left / Image Container */}
          <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl border border-[#27272a] aspect-[16/9] bg-[#121215]">
            <img
              src={article.urlToImage || fallbackImg}
              alt={article.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImg;
              }}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Top Brand Badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-medium bg-blue-500 text-white backdrop-blur-md shadow-md">
                <Sparkles className="size-3.5" />
                FEATURED STORY
              </span>
            </div>

            {/* Source overlay for mobile */}
            <div className="absolute bottom-4 left-4 lg:hidden">
              <span className="px-3 py-1 rounded-full text-[12px] font-medium bg-black/70 text-gray-300 backdrop-blur-md border border-white/10">
                {article.source.name}
              </span>
            </div>
          </div>

          {/* Right / Content Container */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Time Meta */}
              <div className="flex flex-wrap items-center gap-3 text-[12px] text-gray-400">
                <span className="px-3 py-1 rounded-full font-medium bg-[#121215] text-blue-400 border border-[#27272a]">
                  {article.source.name || "Stock Market"}
                </span>
                <span className="flex items-center gap-1 text-gray-400">
                  <Clock className="size-3.5" />
                  {formatDate(article.latest)}
                </span>
                {article.author && (
                  <span className="hidden sm:flex items-center gap-1 truncate max-w-[140px] text-gray-400">
                    <User className="size-3.5" />
                    {article.author}
                  </span>
                )}
              </div>

              {/* Main Title */}
              <h2 className="text-[24px] font-medium tracking-tight text-white leading-snug group-hover:text-blue-400 transition-colors">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline decoration-blue-500/50 underline-offset-4"
                >
                  {article.title}
                </a>
              </h2>

              {/* Description */}
              <p className="text-[14px] text-gray-300 leading-relaxed line-clamp-3 font-normal">
                {article.description ||
                  "Detailed market analysis and latest financial updates regarding recent equity shifts, market movements, and economic indicators."}
              </p>
            </div>

            {/* Actions & Read Link */}
            <div className="pt-4 flex items-center justify-between border-t border-[#27272a] gap-4">
              <div className="flex items-center gap-2 text-[12px] font-medium text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                <TrendingUp className="size-3.5" />
                <span>Market Analysis</span>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-medium text-[14px] transition-all duration-200 shadow-md active:scale-95"
              >
                <span>Read Full Article</span>
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHeroBanner;
