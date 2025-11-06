import { useEffect, useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import FilterQuery from "./Filter/FilterQuery";
import Stocks from "./Stocks/Stocks";
import RunAnalysis from "../runAnalysis/RunAnalysis";

const StockFeed = () => {
  // Store the index of the currently opened stock
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [runAnalysis, setRunAnalysis] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string>("");

  const stockList = [
    { stock: "IBM stock", invested: true },
    { stock: "Apple stock", invested: false },
    { stock: "Infosys stock", invested: false },
    { stock: "Google stock", invested: true },
    { stock: "Amazon stock", invested: true },
  ];

  // Toggle the payment integration for a specific stock
  function toggleDetail(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  const [filterQeury, setFilterQeury] = useState("");

  function stockSearchQuery(e: any) {
    const query = e.target.value;
    setFilterQeury(query);
    return console.log(query);
  }

  async function analyseStock() {
    try {
      const res = await axios
        .post(`${import.meta.env.VITE_STOCK_ANALYSIS_ENDPOINT}`)
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {}
  }

  useEffect(() => {}, []);

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="w-full rounded-lg p-2 flex justify-between items-center transition-all duration-200 ease-in-out">
        <div className="flex gap-2 ">
          <h3 className="text-lg text-blue-300">Stock Feed</h3>
          <IoSparklesOutline className="text-yellow-300" />
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="search"
            onChange={stockSearchQuery}
            className="border px-4 py-2 w-70 rounded-lg focus:outline-blue-300"
            placeholder="Search Stock"
          />
          <button className="text-sm text-blue-500 hover:underline">
            Filter
          </button>
        </div>
      </div>

      {/* Stock List */}
      {filterQeury ? (
        stockList.filter((item) =>
          item.stock.toLowerCase().includes(filterQeury.toLowerCase())
        ).length > 0 ? (
          stockList
            .filter((item) =>
              item.stock.toLowerCase().includes(filterQeury.toLowerCase())
            )
            .map((item: any, index: any) => (
              <FilterQuery
                item={item}
                index={index}
                openIndex={openIndex}
                toggleDetail={toggleDetail}
                setRunAnalysis={setRunAnalysis}
                setSelectedStock={setSelectedStock}
              />
            ))
        ) : (
          <div className="allcenter w-full h-80  border p-4 rounded-md text-gray-400">
            No matching stocks found
          </div>
        )
      ) : stockList.length > 0 ? (
        stockList.map((item, index) => (
          <Stocks
            item={item}
            index={index}
            openIndex={openIndex}
            toggleDetail={toggleDetail}
            setRunAnalysis={setRunAnalysis}
            setSelectedStock={setSelectedStock}
          />
        ))
      ) : (
        <div className="allcenter w-full h-100 border">
          <p>No Stockes available right now</p>
        </div>
      )}

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
