import React, { useEffect } from "react";
import MarketAnalysis from "../MarketAnalysis";
import { IoIosArrowDown } from "react-icons/io";

type filterQueryProps = {
  item: any;
  index: any;
  openIndex: number | null;
  setRunAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
  toggleDetail: any;
};

const Stocks: React.FC<filterQueryProps> = ({
  item,
  index,
  openIndex,
  toggleDetail,
  setRunAnalysis,
  setSelectedStock,
}) => {
  useEffect(() => {}, []);

  return (
    <>
      <div
        key={index}
        className="border px-3 py-6 transition-all duration-300 ease-in-out rounded-md hover:bg-[#5454541a] flex flex-col gap-2 cursor-pointer"
        onClick={() => toggleDetail(index)}
      >
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-lg">{item.stock}</h5>
            <p className="text-[#b8b8b8] text-sm">
              Description about the {item.stock}
            </p>
          </div>

          <span
            className={`cursor-pointer size-6 border rounded-full allcenter transition-all duration-200 ease-in-out ${
              openIndex === index ? "rotate-180 bg-[#b8b8b84f]" : ""
            }`}
          >
            <IoIosArrowDown />
          </span>
        </div>

        {/* Payment Integration - only visible for selected stock */}
        {openIndex === index && (
          <div className="w-full flex border-t border-dashed flex-col gap-2 mt-2 py-4">
            <div className="ycenter flex-col">
              <span className="w-full "></span>
              <h2 className="text-2xl mt-2 font-semibold">{item.stock}</h2>

              <>
                <MarketAnalysis
                  setRunAnalysis={setRunAnalysis}
                  setSelectedStock={setSelectedStock}
                  item={item}
                />
              </>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Stocks;
