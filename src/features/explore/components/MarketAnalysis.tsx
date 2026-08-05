import React from "react";
import { Sparkles } from "lucide-react";
import { useStockStore, type StockItem } from "../store/useStockStore";

type MarketAnalysisProps = {
  item: StockItem;
};

const MarketAnalysis: React.FC<MarketAnalysisProps> = ({ item }) => {
  const openAnalysisModal = useStockStore((state) => state.openAnalysisModal);

  function handleRunAnalysis(e: React.MouseEvent) {
    e.stopPropagation();
    openAnalysisModal(item.stock);
  }

  return (
    <div className="w-full flex items-center justify-between pt-1">
      <p className="text-[12px] text-gray-400 font-normal">
        Synthesize fundamentals, balance sheet, & market trends with Gemini AI.
      </p>
      <button
        onClick={handleRunAnalysis}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white text-[12px] font-medium transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
      >
        <Sparkles className="size-3.5" />
        <span>Evaluate Stock</span>
      </button>
    </div>
  );
};

export default MarketAnalysis;
