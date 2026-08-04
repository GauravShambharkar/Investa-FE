export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    id?: string | null;
    name: string;
  };
  author?: string | null;
  content?: string | null;
}

export const CATEGORY_TOPICS = [
  { id: "all", label: "All Markets", query: "stock market OR financial markets OR stocks OR economy" },
  { id: "tech", label: "Tech & AI", query: "Nvidia OR Apple OR Microsoft OR AI stocks OR tech earnings" },
  { id: "crypto", label: "Crypto & Web3", query: "Bitcoin OR Ethereum OR cryptocurrency OR blockchain market" },
  { id: "fed", label: "Fed & Rates", query: "Federal Reserve OR interest rates OR inflation OR CPI data" },
  { id: "earnings", label: "Earnings Reports", query: "stock earnings OR quarterly report OR Wall Street estimates" },
  { id: "energy", label: "Energy & Commodities", query: "crude oil OR gold prices OR commodities market OR renewable energy" }
];

export function formatDate(dateString: string): string {
  if (!dateString) return "Recently";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "Recently";
  
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return "Yesterday";
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
