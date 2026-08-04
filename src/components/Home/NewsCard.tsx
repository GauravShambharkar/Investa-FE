import React from "react";
import { Clock, Newspaper, ArrowUpRight } from "lucide-react";
import { type NewsArticle, formatDate } from "./newsData";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const fallbackImg =
    "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-[#27272a] bg-[#18181c]/90 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#3f3f46] hover:bg-[#1f1f24] hover:shadow-xl">
      <div className="space-y-4">
        {/* Thumbnail Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#27272a] border border-[#3f3f46]/30">
          <img
            src={article.urlToImage || fallbackImg}
            alt={article.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImg;
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Source Tag overlay - fully rounded */}
          <div className="absolute bottom-3 left-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium bg-black/70 text-gray-200 backdrop-blur-md border border-white/10">
              <Newspaper className="size-3 text-blue-400" />
              {article.source.name || "Finance"}
            </span>
          </div>
        </div>

        {/* Article Meta Header */}
        <div className="flex items-center justify-between text-[12px] text-gray-400 px-0.5">
          {article.author && (
            <span className="truncate max-w-[140px] text-gray-400">
              By {article.author.split(",")[0]}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="size-3 text-gray-500" />
            {formatDate(article.publishedAt)}
          </span>
        </div>

        {/* Title - medium weight, 16px */}
        <h3 className="text-[16px] font-medium text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-blue-500/50"
          >
            {article.title}
          </a>
        </h3>

        {/* Snippet Description - 12px */}
        <p className="text-[12px] text-gray-400 line-clamp-3 leading-relaxed font-normal">
          {article.description ||
            "Click to read full coverage on market dynamics, analyst perspectives, and macroeconomic developments."}
        </p>
      </div>

      {/* Card Footer Link */}
      <div className="mt-5 pt-3 border-t border-[#27272a] flex items-center justify-between">
        <span className="text-[12px] font-medium text-gray-500">
          Financial News
        </span>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-400 hover:text-blue-300 transition-colors group-hover:translate-x-0.5"
        >
          <span>Read Story</span>
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
