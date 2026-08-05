import React from "react";
import { useUser } from "@clerk/clerk-react";
import { User, Sparkles, PieChart, ShieldCheck } from "lucide-react";

const Profile: React.FC = () => {
  const { user } = useUser();
  const isPremium = false;

  const displayName = user?.fullName || user?.firstName || "Investor Account";
  const displayEmail = user?.primaryEmailAddress?.emailAddress || "investor@investa.ai";
  const avatarUrl = user?.imageUrl;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header Card */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 pt-2">
        {/* Brand Styled Avatar Ring */}
        <div className="relative p-1 rounded-full border-2 border-blue-500/40 bg-[#121215]">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={displayName}
              className="size-20 rounded-full object-cover border border-[#27272a]"
            />
          ) : (
            <div className="size-20 rounded-full bg-[#121215] flex items-center justify-center border border-[#27272a]">
              <User className="size-10 text-gray-400" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="space-y-1">
          <h3 className="text-[16px] font-medium text-white tracking-tight">
            {displayName}
          </h3>
          <p className="text-[11px] text-gray-400 font-normal truncate max-w-[200px]">
            {displayEmail}
          </p>
        </div>

        {/* Brand Tier Badge */}
        {isPremium ? (
          <span className="px-3 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
            <Sparkles className="size-3 text-blue-400" />
            Premium Account
          </span>
        ) : (
          <span className="px-3 py-0.5 rounded-full text-[11px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
            <ShieldCheck className="size-3 text-blue-400" />
            Free Plan Account
          </span>
        )}
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 gap-2.5 pt-1">
        <div className="p-3 rounded-2xl bg-[#121215] border border-[#27272a] space-y-0.5 text-left">
          <div className="flex items-center justify-start gap-1 text-[11px] text-gray-400 font-medium">
            <PieChart className="size-3 text-blue-400" />
            <span>Invested</span>
          </div>
          <p className="text-[18px] font-medium text-white">3</p>
        </div>

        <div className="p-3 rounded-2xl bg-[#121215] border border-[#27272a] space-y-0.5 text-left">
          <div className="flex items-center justify-start gap-1 text-[11px] text-gray-400 font-medium">
            <Sparkles className="size-3 text-blue-400" />
            <span>AI Scans</span>
          </div>
          <p className="text-[18px] font-medium text-white">12</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
