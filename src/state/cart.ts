import ProductType from "@/types/ProductType";
import { create } from "zustand";

interface Layout {
  step: number;
  setStep: (step: number) => void;
  cart: [{ product: ProductType; quantity: number }] | [];
  setCart: (cart: [{ product: ProductType; quantity: number }] | []) => void;
  isGoingToPreviousStep: boolean;
  goBackToPreviousSignUpStep: () => void;
  signUpErrorDetected: boolean;
  advanceToNextSignUpStep: () => void;
  removeProductFromCart: (productId: string) => void;
}

export const useCartStore = create<Layout>((set) => ({
  step: 0,
  setStep: (step: number) => set({ step }),
  cart: [],
  setCart: (cart: [{ product: ProductType; quantity: number }] | []) => set({ cart }),
  isGoingToPreviousStep: false,
  signUpErrorDetected: false,
  goBackToPreviousSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: false,
        step: state.step - 1,
        isGoingToPreviousStep: true,
      };
    });
  },
  advanceToNextSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: true,
        step: state.step + 1,
        isGoingToPreviousStep: false,
      };
    });
  },
  removeProductFromCart: (productId: string) => {
    set((state: any) => {
      return {
        cart: state.cart.filter((item: { product: ProductType; quantity: number }) => item.product._id !== productId),
      };
    });
  },
}));
