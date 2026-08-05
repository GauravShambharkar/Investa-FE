import React, { useRef, useEffect } from "react";
import { Check } from "lucide-react";

interface SortOption {
  id: string;
  label: string;
  shortDesc: string;
}

const SORT_OPTIONS: SortOption[] = [
  { id: "popularity", label: "Popularity", shortDesc: "Highest reader engagement" },
  { id: "publishedAt", label: "Latest", shortDesc: "Most recent stories" },
  { id: "relevance", label: "Relevance", shortDesc: "Best keyword match" },
];

interface SortDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: string;
  onSelectSort: (sortId: string) => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  isOpen,
  onClose,
  selectedSort,
  onSelectSort,
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
      className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-[#27272a] bg-[#18181c] p-1.5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-1 duration-150"
    >
      <div className="px-3 py-1.5 border-b border-[#27272a] mb-1">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          Sort Order
        </p>
      </div>

      <div className="space-y-1">
        {SORT_OPTIONS.map((opt) => {
          const isSelected = selectedSort === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => {
                onSelectSort(opt.id);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[12px] transition-all text-left cursor-pointer ${
                isSelected
                  ? "bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20"
                  : "text-gray-300 hover:bg-[#222228] hover:text-white font-normal"
              }`}
            >
              <div className="space-y-0.5">
                <p className="font-medium">{opt.label}</p>
                <p className="text-[10px] opacity-80 font-normal">{opt.shortDesc}</p>
              </div>
              {isSelected && <Check className="size-3.5 text-white shrink-0 ml-2" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SortDropdown;
