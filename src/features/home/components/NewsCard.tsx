import React from "react";
import { ExternalLink, Clock, Newspaper } from "lucide-react";
import { type NewsArticle, formatDate } from "../data/newsData";

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const fallbackImg =
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80";

  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-[#27272a] bg-[#18181c] p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#3f3f46]">
      <div className="space-y-4">
        {/* Card Thumbnail */}
        <div className="relative overflow-hidden rounded-xl aspect-[16/9] bg-[#121215]">
          <img
            src={article.urlToImage || fallbackImg}
            alt={article.title}
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImg;
            }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-[11px] font-medium bg-black/70 text-gray-300 backdrop-blur-md border border-white/10">
            {article.source.name || "Finance"}
          </span>
        </div>

        {/* Card Header & Time */}
        <div className="flex items-center justify-between text-[12px] text-gray-400">
          <span className="flex items-center gap-1 font-normal">
            <Clock className="size-3.5 text-blue-400" />
            {formatDate(article.publishedAt)}
          </span>
          {article.author && (
            <span className="truncate max-w-[120px] text-gray-400 font-normal">
              {article.author}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-medium tracking-tight text-white line-clamp-2 leading-snug group-hover:text-blue-400 transition-colors">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline decoration-blue-500/50 underline-offset-2"
          >
            {article.title}
          </a>
        </h3>

        {/* Description */}
        <p className="text-[13px] text-gray-400 line-clamp-3 leading-relaxed font-normal">
          {article.description || "Stay updated with the latest market developments and equity movements."}
        </p>
      </div>

      {/* Footer / Read Link */}
      <div className="mt-6 pt-4 border-t border-[#27272a] flex items-center justify-between">
        <span className="inline-flex items-center gap-1 text-[12px] text-gray-400 font-medium">
          <Newspaper className="size-3.5 text-blue-400" />
          Read Story
        </span>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[12px] font-medium text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>Full Article</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </article>
  );
};

export default NewsCard;
