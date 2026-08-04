import InvestedStocks from "./InvestedStocks/InvestedStocks";
import Profile from "./Profile/Profile";
import StockFeed from "./StockFeed";

const Explore = () => {
  return (
    <div className="allcenter w-[90%] mx-auto max-h-screen tracking-tight font-sans">
      <div className="grid grid-cols-[1fr_3fr_1fr] w-full h-[88vh] gap-4 overflow-hidden max-[950px]:grid-cols-[1fr_3fr] max-[850px]:grid-cols-1">
        {/* Left section - Invested Stocks */}
        <div className="border border-[#27272a] rounded-2xl overflow-y-auto no-scrollbar bg-[#18181c]/80 backdrop-blur-md max-[850px]:hidden">
          <InvestedStocks />
        </div>

        {/* Center section - Stock Feed */}
        <div className="border border-[#27272a] rounded-2xl overflow-y-auto no-scrollbar bg-[#18181c]/80 backdrop-blur-md">
          <StockFeed />
        </div>

        {/* Right section - Profile */}
        <div className="border border-[#27272a] rounded-2xl overflow-y-auto no-scrollbar bg-[#18181c]/80 backdrop-blur-md max-[950px]:hidden">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Explore;
