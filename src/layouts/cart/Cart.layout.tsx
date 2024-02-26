"use client";
import React from "react";
import styles from "./Cart.module.scss";
import { Divider, Steps } from "antd";
import { useCartStore } from "@/state/cart";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { MdOutlineCreditCard, MdOutlineLocalShipping } from "react-icons/md";
import { FaClipboardCheck } from "react-icons/fa";

interface CartProps {
  children: React.ReactNode;
}
const Cart = ({ children }: CartProps) => {
  const { step, setStep } = useCartStore();

  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        <Steps
          current={step}
          size="small"
          items={[
            { title: "Cart", icon: <ShoppingCartOutlined /> },
            { title: "Payment", icon: <MdOutlineCreditCard /> },
            { title: "Shipping", icon: <MdOutlineLocalShipping /> },
            { title: "Review", icon: <FaClipboardCheck /> },
          ]}
        />
      </div>
      <Divider />
      {children}
    </div>
  );
};

export default Cart;
