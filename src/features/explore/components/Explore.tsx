import React from "react";
import InvestedStocks from "./InvestedStocks";
import StockFeed from "./StockFeed";
import Profile from "./Profile";

const Explore: React.FC = () => {
  return (
    <div className="w-[90%] max-w-[1400px] mx-auto pb-16 pt-4 font-sans tracking-tight">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Invested Holdings */}
        <div className="lg:col-span-3 rounded-2xl border border-[#27272a] bg-[#18181c]/80 backdrop-blur-md shadow-xl no-scrollbar overflow-y-auto max-h-[82vh]">
          <InvestedStocks />
        </div>

        {/* Center Column: Main Stock Feed */}
        <div className="lg:col-span-6 rounded-2xl border border-[#27272a] bg-[#18181c]/80 backdrop-blur-md shadow-xl no-scrollbar overflow-y-auto max-h-[82vh]">
          <StockFeed />
        </div>

        {/* Right Column: User Profile Stats */}
        <div className="lg:col-span-3 rounded-2xl border border-[#27272a] bg-[#18181c]/80 backdrop-blur-md shadow-xl no-scrollbar overflow-y-auto max-h-[82vh]">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Explore;
