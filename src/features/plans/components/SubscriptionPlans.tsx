import React from "react";
import { Check, Sparkles, Zap } from "lucide-react";

const SubscriptionPlans: React.FC = () => {
  const plans = [
    {
      name: "Starter Investor",
      price: "Free",
      period: "forever",
      description: "Essential stock tracking & basic market insights.",
      features: [
        "Real-time Stock Tracking",
        "Market News Feed",
        "5 AI Stock Evaluations / month",
        "Basic Portfolio View",
      ],
      popular: false,
      buttonText: "Current Plan",
    },
    {
      name: "Investa Pro",
      price: "$19",
      period: "per month",
      description:
        "Advanced AI financial evaluations, real-time metrics, & unlimited scans.",
      features: [
        "Unlimited Gemini 2.5 AI Scans",
        "Real-time TwelveData Market LTP",
        "Comprehensive Balance Sheet Analysis",
        "Priority Market News Proxy",
        "Advanced Risk & Fundamentals Breakdown",
      ],
      popular: true,
      buttonText: "Upgrade to Pro",
    },
    {
      name: "Enterprise Capital",
      price: "$49",
      period: "per month",
      description:
        "For fund managers, equity analysts, and high-frequency traders.",
      features: [
        "Everything in Pro Plan",
        "Custom API Integrations",
        "Dedicated Portfolio Manager",
        "24/7 Priority Support",
      ],
      popular: false,
      buttonText: "Contact Sales",
    },
  ];

  return (
    <div className="w-[70%] max-[850px]:w-[90%] mx-auto pb-16 pt-6 font-sans tracking-tight space-y-8">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="px-4 py-1.5 rounded-full text-[12px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-flex items-center gap-1.5">
          <Zap className="size-3.5" />
          FLEXIBLE SUBSCRIPTION PLANS
        </span>
        <h1 className="text-[32px] font-medium text-white tracking-tight">
          Supercharge Your Investment Decisions
        </h1>
        <p className="text-[14px] text-gray-400">
          Choose the right plan to access real-time market data, advanced
          valuation metrics, and AI intelligence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative flex flex-col justify-between rounded-2xl border p-6 bg-[#18181c] transition-all duration-300 ${
              plan.popular
                ? "border-blue-500 shadow-xl shadow-blue-500/10 scale-105"
                : "border-[#27272a] hover:border-[#3f3f46]"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-medium bg-blue-500 text-white shadow-md flex items-center gap-1">
                <Sparkles className="size-3" /> MOST POPULAR
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-[18px] font-medium text-white">
                  {plan.name}
                </h3>
                <p className="text-[12px] text-gray-400 mt-1 font-normal">
                  {plan.description}
                </p>
              </div>

              <div className="flex items-baseline gap-1 pt-2">
                <span className="text-[32px] font-medium text-white">
                  {plan.price}
                </span>
                <span className="text-[12px] text-gray-400">{plan.period}</span>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#27272a]">
                {plan.features.map((feat) => (
                  <div
                    key={feat}
                    className="flex items-center gap-2 text-[12px] text-gray-300"
                  >
                    <Check className="size-4 text-blue-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full mt-8 py-2.5 rounded-full text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                plan.popular
                  ? "bg-blue-500 hover:bg-blue-600 text-white shadow-md active:scale-95"
                  : "bg-[#121215] hover:bg-[#222228] text-white border border-[#27272a]"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
