import React from "react";
import MarketAnalysis from "../MarketAnalysis";
import { ChevronDown, TrendingUp, CheckCircle2 } from "lucide-react";

type FilterQueryProps = {
  item: { stock: string; invested: boolean; tag?: string; price?: string };
  index: number;
  openIndex: number | null;
  setRunAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
  toggleDetail: (index: number) => void;
};

const FilterQuery: React.FC<FilterQueryProps> = ({
  item,
  index,
  openIndex,
  toggleDetail,
  setRunAnalysis,
  setSelectedStock,
}) => {
  const isOpen = openIndex === index;

  return (
    <div
      className={`border border-[#27272a] p-4.5 transition-all duration-300 rounded-2xl bg-[#121215] hover:border-[#3f3f46] flex flex-col gap-3 cursor-pointer ${
        isOpen ? "bg-[#18181c] border-blue-500/40 shadow-lg" : ""
      }`}
      onClick={() => toggleDetail(index)}
    >
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h5 className="text-[16px] font-medium text-white tracking-tight">
              {item.stock}
            </h5>
            {item.invested && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <CheckCircle2 className="size-3 text-blue-400" />
                Invested
              </span>
            )}
          </div>
          <p className="text-[12px] text-gray-400 font-normal">
            Real-time market tracking & AI advisor analysis available
          </p>
        </div>

        <div className="flex items-center gap-3">
          {item.price && (
            <span className="text-[14px] font-medium text-gray-200 hidden sm:inline">
              {item.price}
            </span>
          )}
          <span
            className={`size-7 rounded-full border border-[#27272a] bg-[#18181c] flex items-center justify-center text-gray-400 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-blue-400 border-blue-500/40" : ""
            }`}
          >
            <ChevronDown className="size-4" />
          </span>
        </div>
      </div>

      {/* Expanded Market Analysis Section */}
      {isOpen && (
        <div
          className="w-full border-t border-dashed border-[#27272a] pt-4 mt-1 space-y-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2 text-[12px] font-medium text-blue-400">
              <TrendingUp className="size-3.5" />
              <span>AI Market Evaluation</span>
            </div>
            <MarketAnalysis
              setRunAnalysis={setRunAnalysis}
              setSelectedStock={setSelectedStock}
              item={item}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterQuery;
