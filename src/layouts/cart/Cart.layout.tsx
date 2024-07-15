"use client";
import React, { useState, useEffect } from "react";
import styles from "./Cart.module.scss";
import { Divider, Steps } from "antd";
import { useCartStore } from "@/state/cart";

interface CartProps {
  children: React.ReactNode;
}
const Cart = ({ children }: CartProps) => {
  const { step, cartSteps } = useCartStore();

const [width, setWidth] = useState<number>(0);
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  };
}, []);

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        <Steps
          responsive={false}
          current={step}
          size="small"
          items={
            cartSteps.map((step) => {
              // Don't know why not working:
              // return { title: "", icon: step.icon } ? (width < 768) : { title: step.title, icon: step.icon };
              if (width < 540) {
                return { title: "", icon: step.icon };
              }
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
