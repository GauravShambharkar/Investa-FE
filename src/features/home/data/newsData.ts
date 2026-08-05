export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  content: string | null;
}

export interface NewsCategoryTopic {
  id: string;
  label: string;
  query: string;
}

export const CATEGORY_TOPICS: NewsCategoryTopic[] = [
  { id: "all", label: "All News", query: "stock market OR financial markets OR stocks OR economy" },
  { id: "stocks", label: "Equities & Stocks", query: "stocks OR equity market OR Wall Street OR S&P 500 OR Nasdaq" },
  { id: "tech", label: "Tech & AI", query: "Nvidia OR Apple OR Microsoft OR AI stocks OR Big Tech" },
  { id: "earnings", label: "Earnings & Revenue", query: "quarterly earnings OR revenue results OR profit margin" },
  { id: "economy", label: "Global Economy", query: "Federal Reserve OR interest rates OR inflation OR GDP OR central bank" },
  { id: "crypto", label: "Crypto & Web3", query: "Bitcoin OR Ethereum OR crypto market OR digital assets" },
];

export function formatDate(dateString: string): string {
  if (!dateString) return "Recently";
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}
