import InventoryType from "@/types/InventoryType";
import ProductType from "@/types/ProductType";
import { Fragment } from "react";
import { create } from "zustand";

interface Layout {
  step: number;
  cart: [{ product: InventoryType; quantity: number }] | [];
  cartSteps: [{ title: string; icon: any }];
  isGoingToPreviousStep: boolean;
  signUpErrorDetected: boolean;
  currentForm: any;
  paymentInformationValues: any;
  billingInformationValues: any;
  shippingInformationValues: any;
  userInformationValues: any;
  setUserInformationValues: (values: any) => void;
  setPaymentInformationValues: (values: any) => void;
  setBillingInformationValues: (values: any) => void;
  setShippingInformationValues: (values: any) => void;
  setStep: (step: number) => void;
  setCart: (cart: [{ product: InventoryType; quantity: number }] | []) => void;
  goBackToPreviousSignUpStep: () => void;
  advanceToNextSignUpStep: (index?: number) => void;
  removeProductFromCart: (productId: string) => void;
  setCurrentForm: (form: any) => void;
  // setCartSteps is a function that takes an array of objects that have a tile and icon property
  setCartSteps: (steps: [{ title: string; icon: any }]) => void;
}

export const useCartStore = create<Layout>((set) => ({
  step: 0,
  cart: [],
  cartSteps: [] as any,
  isGoingToPreviousStep: false,
  signUpErrorDetected: false,
  currentForm: {},
  paymentInformationValues: {},
  billingInformationValues: {},
  shippingInformationValues: {},
  userInformationValues: {},
  // setCartSteps is a function that takes an array of objects that have a tile and icon property
  setCartSteps: (steps: [{ title: string; icon: any }]) => set({ cartSteps: steps }),
  setUserInformationValues: (values: any) => set({ userInformationValues: values }),
  setPaymentInformationValues: (values: any) => set({ paymentInformationValues: values }),
  setStep: (step: number) => set({ step }),
  setCart: (cart: [{ product: InventoryType; quantity: number }] | []) => set({ cart }),
  goBackToPreviousSignUpStep: () => {
    set((state: any) => {
      return {
        signUpErrorDetected: false,
        step: state.step - 1,
        isGoingToPreviousStep: true,
      };
    });
  },
  advanceToNextSignUpStep: (index?: number) => {
    set((state: any) => {
      return {
        signUpErrorDetected: true,
        step: index ? index : state.step + 1,
        isGoingToPreviousStep: false,
      };
    });
  },
  removeProductFromCart: (productId: string) => {
    set((state: any) => {
      return {
        cart: state.cart.filter((item: { product: InventoryType; quantity: number }) => item.product._id !== productId),
      };
    });
  },
  setCurrentForm: (form: any) => set({ currentForm: form }),
  setBillingInformationValues: (values: any) => set({ billingInformationValues: values }),
  setShippingInformationValues: (values: any) => set({ shippingInformationValues: values }),
}));
