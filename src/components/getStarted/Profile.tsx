import { useState } from "react";

const Profile = () => {
  const [premiumUser, setpremiumUser] = useState(false);

  return (
    <>
      <div className="px-7 py-8 w-full h-screen">
        {/* profile */}
        <div className="ycenter w-full h-full flex-col gap-2">
          <span className="size-30 border bg-red-200 allcenter rounded-full overflow-hidden">
            <img
              src="https://cdn-icons-png.flaticon.com/512/17314/17314181.png"
              alt=""
              className="w-20 rounded-full shadow-2xl"
            />
          </span>
          {premiumUser ? (
            <p className="px-3 bg-green-300 rounded-full text-black text-[12px]">
              Premium User
            </p>
          ) : (
            <p className="px-3 bg-red-300 rounded-full text-black text-[12px]">
              Free Tier
            </p>
          )}
          <div className="ycenter w-full flex-col">
            <h3 className="txtdull200 text-2xl">John Doe</h3>
            <h3 className="text-gray-500 text-md">JohnDoe@gmail.com</h3>
            <div className="w-full py-4 flex justify-between">
              <h4 className="flex flex-col">
                Invested Stocks <span className="txtdull" >12</span>
              </h4>
            </div>
          </div>
        </div>
        {/* You can later map invested stocks here */}
      </div>
    </>
  );
};

export default Profile;
