"use client";
import React from "react";
import styles from "./Cart.module.scss";
import { Divider, Steps } from "antd";
import { useCartStore } from "@/state/cart";

interface CartProps {
  children: React.ReactNode;
}
const Cart = ({ children }: CartProps) => {
  const { step, cartSteps } = useCartStore();

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        <Steps
          current={step}
          size="small"
          items={
            cartSteps.map((step) => {
              return { title: step.title, icon: step.icon };
            }) as any
          }
        />
      </div>
      <Divider />
      {children}
    </div>
  );
};

export default Cart;
