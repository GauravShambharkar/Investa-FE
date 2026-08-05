import React from "react";

const NewsSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full rounded-2xl border border-[#27272a] bg-[#18181c] p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 rounded-2xl aspect-[16/9] bg-[#27272a]/60" />
          <div className="lg:col-span-5 space-y-4">
            <div className="h-4 w-32 rounded-full bg-[#27272a]/60" />
            <div className="h-8 w-full rounded-lg bg-[#27272a]/60" />
            <div className="h-8 w-3/4 rounded-lg bg-[#27272a]/60" />
            <div className="space-y-2 pt-2">
              <div className="h-3 w-full rounded bg-[#27272a]/60" />
              <div className="h-3 w-5/6 rounded bg-[#27272a]/60" />
            </div>
            <div className="h-10 w-36 rounded-full bg-[#27272a]/60 pt-4" />
          </div>
        </div>
      </div>

      {/* Grid Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#27272a] bg-[#18181c] p-5 space-y-4"
          >
            <div className="space-y-4">
              <div className="rounded-xl aspect-[16/9] bg-[#27272a]/60" />
              <div className="h-3 w-24 rounded-full bg-[#27272a]/60" />
              <div className="h-5 w-full rounded bg-[#27272a]/60" />
              <div className="h-3 w-4/5 rounded bg-[#27272a]/60" />
            </div>
            <div className="h-4 w-20 rounded bg-[#27272a]/60 pt-4" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSkeleton;
