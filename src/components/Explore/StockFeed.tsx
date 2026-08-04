import { useState } from "react";
import { Sparkles, Search, SlidersHorizontal } from "lucide-react";
import FilterQuery from "./Filter/FilterQuery";
import Stocks from "./Stocks/Stocks";
import RunAnalysis from "../runAnalysis/RunAnalysis";

const StockFeed = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [runAnalysis, setRunAnalysis] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState("");

  const stockList = [
    { stock: "IBM Stock", invested: true, tag: "Tech", price: "$184.20" },
    { stock: "Apple Stock", invested: false, tag: "Tech", price: "$224.50" },
    { stock: "Infosys Stock", invested: false, tag: "IT Services", price: "$21.10" },
    { stock: "Google Stock", invested: true, tag: "Search / AI", price: "$176.80" },
    { stock: "Amazon Stock", invested: true, tag: "Cloud & E-com", price: "$182.40" },
  ];

  function toggleDetail(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  function stockSearchQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setFilterQuery(e.target.value);
  }

  const filteredList = stockList.filter((item) =>
    item.stock.toLowerCase().includes(filterQuery.toLowerCase())
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
              value={filterQuery}
              onChange={stockSearchQuery}
              className="w-full bg-[#121215] border border-[#27272a] focus:border-blue-500 rounded-full pl-9 pr-4 py-2 text-[12px] text-white placeholder-gray-500 outline-none transition-all font-normal"
              placeholder="Search Stock..."
            />
          </div>

          <button className="flex items-center gap-1 px-3 py-2 rounded-full border border-[#27272a] bg-[#121215] text-blue-400 text-[12px] font-medium hover:bg-[#222228] transition-all">
            <SlidersHorizontal className="size-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      </div>

      {/* Stock List Feed */}
      <div className="space-y-3">
        {filterQuery ? (
          filteredList.length > 0 ? (
            filteredList.map((item, index) => (
              <FilterQuery
                key={item.stock}
                item={item}
                index={index}
                openIndex={openIndex}
                toggleDetail={toggleDetail}
                setRunAnalysis={setRunAnalysis}
                setSelectedStock={setSelectedStock}
              />
            ))
          ) : (
            <div className="allcenter w-full h-64 border border-dashed border-[#27272a] rounded-2xl p-6 text-gray-400 text-[14px] font-medium">
              No matching stocks found for "{filterQuery}"
            </div>
          )
        ) : stockList.length > 0 ? (
          stockList.map((item, index) => (
            <Stocks
              key={item.stock}
              item={item}
              index={index}
              openIndex={openIndex}
              toggleDetail={toggleDetail}
              setRunAnalysis={setRunAnalysis}
              setSelectedStock={setSelectedStock}
            />
          ))
        ) : (
          <div className="allcenter w-full h-64 border border-dashed border-[#27272a] rounded-2xl p-6 text-gray-400 text-[14px] font-medium">
            No stocks available right now
          </div>
        )}
      </div>

      {/* Analysis Modal Trigger */}
      {runAnalysis && (
        <RunAnalysis
          setRunAnalysis={setRunAnalysis}
          selectedStock={selectedStock}
        />
      )}
    </div>
  );
};

export default StockFeed;
