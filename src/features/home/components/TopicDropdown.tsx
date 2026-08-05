import React, { useRef, useEffect } from "react";
import { Check } from "lucide-react";
import { CATEGORY_TOPICS, type NewsCategoryTopic } from "../data/newsData";

interface TopicDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const TopicDropdown: React.FC<TopicDropdownProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-[#27272a] bg-[#18181c] p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="px-3 py-1.5 border-b border-[#27272a] mb-1">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Market Topics
        </p>
      </div>

      <div className="space-y-1 max-h-60 overflow-y-auto no-scrollbar">
        {CATEGORY_TOPICS.map((topic: NewsCategoryTopic) => {
          const isSelected = selectedCategory === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                onSelectCategory(topic.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] transition-all text-left cursor-pointer ${
                isSelected
                  ? "bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20"
                  : "text-gray-300 hover:bg-[#222228] hover:text-white font-normal"
              }`}
            >
              <span>{topic.label}</span>
              {isSelected && <Check className="size-3.5 text-white shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TopicDropdown;
