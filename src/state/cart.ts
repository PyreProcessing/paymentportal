import ProductType from "@/types/ProductType";
import { create } from "zustand";

interface Layout {
  step: number;
  cart: [{ product: ProductType; quantity: number }] | [];
  isGoingToPreviousStep: boolean;
  signUpErrorDetected: boolean;
  currentForm: any;
  paymentInformationValues: any;
  setPaymentInformationValues: (values: any) => void;
  setStep: (step: number) => void;
  setCart: (cart: [{ product: ProductType; quantity: number }] | []) => void;
  goBackToPreviousSignUpStep: () => void;
  advanceToNextSignUpStep: () => void;
  removeProductFromCart: (productId: string) => void;
  setCurrentForm: (form: any) => void;
}

export const useCartStore = create<Layout>((set) => ({
  step: 0,
  cart: [],
  isGoingToPreviousStep: false,
  signUpErrorDetected: false,
  currentForm: {},
  paymentInformationValues: {},
  setPaymentInformationValues: (values: any) => set({ paymentInformationValues: values }),
  setStep: (step: number) => set({ step }),
  setCart: (cart: [{ product: ProductType; quantity: number }] | []) => set({ cart }),
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
  setCurrentForm: (form: any) => set({ currentForm: form }),
}));
