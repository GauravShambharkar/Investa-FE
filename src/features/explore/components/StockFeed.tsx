import React from "react";
import { useQueryState } from "nuqs";
import { Sparkles, Search, SlidersHorizontal } from "lucide-react";
import FilterQuery from "./FilterQuery";
import Stocks from "./Stocks";
import RunAnalysis from "../../analysis/components/RunAnalysis";
import { useStockStore } from "../store/useStockStore";

const StockFeed: React.FC = () => {
  const [filterParam, setFilterParam] = useQueryState("filter", { defaultValue: "" });

  const stockList = useStockStore((state) => state.stockList);
  const runAnalysis = useStockStore((state) => state.runAnalysis);
  const selectedStock = useStockStore((state) => state.selectedStock);

  const filteredList = stockList.filter((item) =>
    item.stock.toLowerCase().includes(filterParam.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      {/* Header & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-[#27272a] pb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-blue-400" />
          <h3 className="text-[16px] font-medium text-white tracking-tight">
            Stock Feed
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-60">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-3.5 text-gray-400" />
            <input
              type="search"
              value={filterParam}
              onChange={(e) => setFilterParam(e.target.value)}
              className="w-full bg-[#121215] border border-[#27272a] focus:border-blue-500 rounded-full pl-9 pr-4 py-2 text-[12px] text-white placeholder-gray-500 outline-none transition-all font-normal"
              placeholder="Search Stock..."
            />
          </div>

          <button className="flex items-center gap-1 px-3 py-2 rounded-full border border-[#27272a] bg-[#121215] text-blue-400 text-[12px] font-medium hover:bg-[#222228] transition-all cursor-pointer">
            <SlidersHorizontal className="size-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Stock List Feed */}
      <div className="space-y-3">
        {filterParam ? (
          filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <FilterQuery key={item.stock} item={item} index={index} />
            ))
          ) : (
            <div className="allcenter w-full h-64 border border-dashed border-[#27272a] rounded-2xl p-6 text-gray-400 text-[14px] font-medium">
              No matching stocks found for "{filterParam}"
            </div>
          )
        ) : stockList.length > 0 ? (
          stockList.map((item, index) => (
            <Stocks key={item.stock} item={item} index={index} />
          ))
        ) : (
          <div className="allcenter w-full h-64 border border-dashed border-[#27272a] rounded-2xl p-6 text-gray-400 text-[14px] font-medium">
            No stocks available right now
          </div>
        )}
      </div>

      {/* Analysis Modal */}
      {runAnalysis && <RunAnalysis selectedStock={selectedStock} />}
    </div>
  );
};

export default StockFeed;
