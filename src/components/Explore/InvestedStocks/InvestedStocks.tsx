import React from "react";
import { Briefcase, ShieldCheck } from "lucide-react";

const InvestedStocks: React.FC = () => {
  const samplePortfolio = [
    { symbol: "IBM", name: "International Business Machines", shares: "12 shares", gain: "+4.2%" },
    { symbol: "GOOGL", name: "Alphabet Inc.", shares: "8 shares", gain: "-1.5%" },
    { symbol: "AMZN", name: "Amazon.com Inc.", shares: "15 shares", gain: "+5.1%" },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header with single-line whitespace-nowrap preventing text wrapping */}
      <div className="flex flex-col items-start justify-between border-b border-[#27272a] pb-4 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Briefcase className="size-4 text-blue-400 shrink-0" />
          <h3 className="text-[15px] font-medium text-white tracking-tight whitespace-nowrap">
            Invested Holdings
          </h3>
        </div>

      </div>

      {/* Portfolio Items List */}
      <div className="space-y-3">
        {samplePortfolio.map((item) => {
          const isPositive = item.gain.startsWith("+");
          return (
            <div
              key={item.symbol}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121215] border border-[#27272a] hover:border-[#3f3f46] transition-all duration-200"
            >
              <div className="space-y-0.5 min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-medium text-white whitespace-nowrap">
                    {item.symbol}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium border whitespace-nowrap ${
                      isPositive
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-800/40"
                        : "bg-rose-950/60 text-rose-400 border-rose-800/40"
                    }`}
                  >
                    {item.gain}
                  </span>
                </div>
                <p className="text-[12px] text-gray-400 line-clamp-1 font-normal">
                  {item.name}
                </p>
              </div>
              <span className="text-[12px] text-gray-400 font-medium whitespace-nowrap shrink-0">
                {item.shares}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Note */}
      <div className="p-4 rounded-2xl bg-[#121215] border border-[#27272a] flex items-center gap-3">
        <ShieldCheck className="size-5 text-blue-400 shrink-0" />
        <div className="space-y-0.5">
          <p className="text-[12px] font-medium text-gray-200 whitespace-nowrap">
            Portfolio Synced
          </p>
          <p className="text-[11px] text-gray-400 font-normal">
            Positions update in real-time
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestedStocks;
