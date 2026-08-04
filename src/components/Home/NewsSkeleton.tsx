import React from "react";

const NewsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full rounded-2xl border border-[#27272a] bg-[#18181c] p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 aspect-[16/9] w-full rounded-2xl bg-[#27272a]" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-6 w-32 rounded-full bg-[#27272a]" />
            <div className="h-8 w-full rounded-xl bg-[#27272a]" />
            <div className="h-8 w-3/4 rounded-xl bg-[#27272a]" />
            <div className="h-4 w-full rounded-lg bg-[#27272a]" />
            <div className="h-4 w-5/6 rounded-lg bg-[#27272a]" />
            <div className="pt-4 flex justify-between items-center">
              <div className="h-6 w-28 rounded-full bg-[#27272a]" />
              <div className="h-10 w-36 rounded-full bg-[#27272a]" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#27272a] bg-[#18181c] p-5 space-y-4"
          >
            <div className="space-y-4">
              <div className="aspect-[16/9] w-full rounded-xl bg-[#27272a]" />
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded-full bg-[#27272a]" />
                <div className="h-3 w-16 rounded-full bg-[#27272a]" />
              </div>
              <div className="h-5 w-full rounded-lg bg-[#27272a]" />
              <div className="h-5 w-4/5 rounded-lg bg-[#27272a]" />
              <div className="h-3 w-full rounded-lg bg-[#27272a]" />
              <div className="h-3 w-2/3 rounded-lg bg-[#27272a]" />
            </div>
            <div className="pt-3 border-t border-[#27272a] flex justify-between">
              <div className="h-3 w-16 rounded-full bg-[#27272a]" />
              <div className="h-3 w-20 rounded-full bg-[#27272a]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSkeleton;
