import type React from "react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

type PaymentGatewayProps = {
  setpaymentGateway: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStock: string;
};

const PaymentGateway: React.FC<PaymentGatewayProps> = ({
  setpaymentGateway,
  selectedStock,
}) => {
  useEffect(() => {
    console.log("Selected Stock in PaymentGateway:", selectedStock);
  });
  return (
    <div className="w-full h-screen z-50 top-0 right-0  absolute allcenter">
      <div className="w-[80%] h-[80%]  allcenter rounded-lg bg-[#ffffff13]  backdrop-blur-xs ">
        <button
          onClick={() => setpaymentGateway(false)}
          className="mt-2 p-2 text-2xl absolute top-0 cursor-pointer right-2 transition-all duration-300 ease-in-out hover:bg-[#a0a0a06e] rounded-full text-white "
        >
          <IoClose />
        </button>
        <h1 className="text-5xl text-white">PaymentGateway</h1>
      </div>
    </div>
  );
};

export default PaymentGateway;
