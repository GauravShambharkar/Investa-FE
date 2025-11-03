import React from "react";

type IsNotInvestedStockProps = {
  setpaymentGateway: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedStock: React.Dispatch<React.SetStateAction<string>>;
  item: { stock: string; invested: boolean };
};

const IsNotInvestedStock: React.FC<IsNotInvestedStockProps> = ({
  setpaymentGateway,
  setSelectedStock,
  item,
}) => {
  return (
    <>
      <p className="text-sm text-gray-500 mt-1">
        Connect your payment method to invest in this stock.
      </p>

      <button
        onClick={() => {
          setpaymentGateway(true);
          setSelectedStock(item.stock);
          console.log(item);
        }}
        className="mt-2 text-white cursor-pointer px-4 py-1.5 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out"
      >
        Continue payment setup
      </button>
    </>
  );
};

export default IsNotInvestedStock;
