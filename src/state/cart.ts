import ProductType from "@/types/ProductType";
import { create } from "zustand";

interface Layout {
  step: number;
  setStep: (step: number) => void;
  cart: ProductType[];
}

export const useCartStore = create<Layout>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
  cart: [],
}));
