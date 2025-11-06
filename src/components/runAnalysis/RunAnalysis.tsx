import type React from "react";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

type RunAnalysisProps = {
  setRunAnalysis: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStock: string;
};

const RunAnalysis: React.FC<RunAnalysisProps> = ({setRunAnalysis, selectedStock,}) => {
  
  useEffect(() => {
    console.log("Selected Stock in RunAnalysis:", selectedStock);
  });


  return (
    <div className="w-full h-screen top-0 right-0 absolute allcenter">
      <div className="w-[80%] h-[80%]  border-white allcenter rounded-lg bg-[#ffffff13]  backdrop-blur-xs ">
        <h1 className="text-5xl text-white">Run Analysis Of {selectedStock}</h1>

        <button
          onClick={() => setRunAnalysis(false)}
          className="mt-2 p-2 text-2xl absolute top-0 cursor-pointer right-2 transition-all duration-300 ease-in-out hover:bg-[#a0a0a06e] rounded-full text-white "
        >
          <IoClose />
        </button>
      </div>
    </div>
  );
};

export default RunAnalysis;
