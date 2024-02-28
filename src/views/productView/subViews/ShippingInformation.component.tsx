import { useCartStore } from "@/state/cart";
import React from "react";

const ShippingInformation = () => {
  const { paymentInformationValues } = useCartStore();
  console.log(paymentInformationValues);
  return <div>ShippingInformation</div>;
};

export default ShippingInformation;
