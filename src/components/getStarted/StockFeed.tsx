import { useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PaymentGateway from "../paymentGateway/PaymentGateway";

const StockFeed = () => {
  // Store the index of the currently opened stock
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paymentGateway, setpaymentGateway] = useState<boolean>(false);
  const [selectedStock, setSelectedStock] = useState<string>("");

  const stockList = [
    "IBM stock",
    "Apple stock",
    "Infosys stock",
    "Google stock",
    "Amazon stock",
  ];

  // Toggle the payment integration for a specific stock
  function toggleDetail(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="w-full border p-2 flex justify-between items-center transition-all duration-200 ease-in-out">
        <div className="flex gap-1 items-center">
          <h3 className="text-lg font-semibold">Stock Feed</h3>
          <IoSparklesOutline />
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="search"
            className="border p-2 rounded-2xl focus:outline-blue-300"
            placeholder="Search Stock"
          />
          <button className="text-sm text-blue-500 hover:underline">
            Filter
          </button>
        </div>
      </div>

      {/* Stock List */}
      {stockList.map((item, index) => (
        <div
          key={index}
          className="border p-3 transition-all duration-300 ease-in-out rounded-md hover:bg-[#5454541a] flex flex-col gap-2 cursor-pointer"
          onClick={() => toggleDetail(index)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h5 className="text-lg">{item}</h5>
              <p className="text-[#b8b8b8] text-sm">
                Description about the {item}
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
            <div className="w-full flex flex-col gap-2 mt-2">
              <div className="ycenter flex-col">
                <span className="w-full border-t border-dashed"></span>
                <h2 className="text-2xl mt-2 font-semibold">{item}</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Connect your payment method to invest in this stock.
                </p>
                <button
                  onClick={() => {
                    setpaymentGateway(!paymentGateway), setSelectedStock(item);
                    console.log(item);
                    
                  }}
                  className="mt-2 text-white cursor-pointer px-4 py-1.5 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out"
                >
                  Continue payment setup
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
      {paymentGateway && (
        <PaymentGateway setpaymentGateway={setpaymentGateway} selectedStock={selectedStock}/>
      )}
    </div>
  );
};

export default StockFeed;
