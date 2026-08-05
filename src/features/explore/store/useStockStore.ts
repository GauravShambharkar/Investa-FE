import { create } from "zustand";

export interface StockItem {
  stock: string;
  invested: boolean;
  tag?: string;
  price?: string;
}

interface StockState {
  stockList: StockItem[];
  openIndex: number | null;
  runAnalysis: boolean;
  selectedStock: string;
  setOpenIndex: (index: number | null) => void;
  toggleDetail: (index: number) => void;
  setRunAnalysis: (open: boolean) => void;
  setSelectedStock: (stock: string) => void;
  openAnalysisModal: (stock: string) => void;
}

export const useStockStore = create<StockState>((set) => ({
  stockList: [
    { stock: "IBM Stock", invested: true, tag: "Tech", price: "$184.20" },
    { stock: "Apple Stock", invested: false, tag: "Tech", price: "$224.50" },
    { stock: "Infosys Stock", invested: false, tag: "IT Services", price: "$21.10" },
    { stock: "Google Stock", invested: true, tag: "Search / AI", price: "$176.80" },
    { stock: "Amazon Stock", invested: true, tag: "Cloud & E-com", price: "$182.40" },
  ],
  openIndex: null,
  runAnalysis: false,
  selectedStock: "",

  setOpenIndex: (index) => set({ openIndex: index }),
  toggleDetail: (index) =>
    set((state) => ({ openIndex: state.openIndex === index ? null : index })),
  setRunAnalysis: (open) => set({ runAnalysis: open }),
  setSelectedStock: (stock) => set({ selectedStock: stock }),
  openAnalysisModal: (stock) => set({ selectedStock: stock, runAnalysis: true }),
}));
