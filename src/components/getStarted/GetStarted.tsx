import InvestedStocks from "./InvestedStocks";
import Profile from "./Profile";
import StockFeed from "./StockFeed";

const GetStarted = () => {
  return (
    <div className="allcenter w-[90%] mx-auto border max-h-screen ">
      <div className="grid grid-cols-[1fr_3fr_1fr] w-full h-[90vh] gap-3 border border-blue-400 overflow-hidden max-[950px]:grid-cols-[1fr_3fr]   max-[850px]:grid-cols-1">
        {/* Left section - Invested Stocks */}
        <div className="border-r overflow-y-auto  max-[850px]:hidden">
          <InvestedStocks />
        </div>

        {/* Center section - Stock Feed */}
        <div className="border-x overflow-y-auto">
          <StockFeed />
        </div>

        {/* Right section - Profile */}
        <div className="border-l max-[950px]:hidden">
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
