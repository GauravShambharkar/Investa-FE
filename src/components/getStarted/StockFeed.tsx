import { useState } from "react";
import { IoSparklesOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import PaymentGateway from "../paymentGateway/PaymentGateway";
import IsInvestedStock from "./IsNotInvestedStock";
import IsNotInvestedStock from "./IsNotInvestedStock";
import InvestedStocks from "./InvestedStocks";

const StockFeed = () => {
  // Store the index of the currently opened stock
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [paymentGateway, setpaymentGateway] = useState<boolean>(false);
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
        stockList
          .filter((item) =>
            item.stock.toLowerCase().includes(filterQeury.toLowerCase())
          )
          .map((item: any) => (
            <div className="text-white border">{item.stock}</div>
          ))
      ) : stockList.length > 0 ? (
        stockList.map((item, index) => (
          <div
            key={index}
            className="border p-3 transition-all duration-300 ease-in-out rounded-md hover:bg-[#5454541a] flex flex-col gap-2 cursor-pointer"
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
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="ycenter flex-col">
                  <span className="w-full border-t border-dashed"></span>
                  <h2 className="text-2xl mt-2 font-semibold">{item.stock}</h2>

                  {!item.invested ? (
                    <>
                      <IsNotInvestedStock
                        setpaymentGateway={setpaymentGateway}
                        setSelectedStock={setSelectedStock}
                        item={item}
                      />
                    </>
                  ) : (
                    <div className="p-3 w-full text-center">
                      <h3 className="text-lg text-green-300 font-semibold mb-2">
                        Invested Stocks
                      </h3>
                      {/* Future stock list here */}
                      <p className="text-sm text-gray-500">
                        This is your invested stock details.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="allcenter w-full h-100 border">
          <p>No Stockes available right now</p>
        </div>
      )}

      {paymentGateway && (
        <PaymentGateway
          setpaymentGateway={setpaymentGateway}
          selectedStock={selectedStock}
        />
      )}
    </div>
  );
};

export default StockFeed;
