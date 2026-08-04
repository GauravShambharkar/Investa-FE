import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";

type MarketAnalysisProps = {
  setRunAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
  item: { stock: string; invested: boolean };
};

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({
  setRunAnalysis,
  setSelectedStock,
  item,
}) => {
  return (
    <div className="w-full space-y-3 pt-1">
      <p className="text-[12px] text-gray-300 font-normal leading-relaxed">
        Ask AI advisor what key indicators, financial checklist metrics, and market sentiment suggest about {item.stock}.
      </p>

      <button
        onClick={() => {
          setRunAnalysis(true);
          setSelectedStock(item.stock);
        }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-[12px] font-medium transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
      >
        <Sparkles className="size-3.5 text-yellow-300" />
        <span>Continue Market Analysis</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
};

export default MarketAnalysis;
