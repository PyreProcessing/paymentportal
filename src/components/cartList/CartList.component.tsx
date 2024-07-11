import React from "react";
import styles from "./CartList.module.scss";
import { useCartStore } from "@/state/cart";
import ProductType from "@/types/ProductType";
import { Avatar, Button, Table } from "antd";
import { FaTimes } from "react-icons/fa";
import InventoryType from "@/types/InventoryType";

const CartList = () => {
  const { cart, removeProductFromCart } = useCartStore();
  function tax(price: any, taxRate: any) { return Number(price) * (Number(taxRate) / 100);}

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <Table
          size="small"
          columns={[
            {
              title: "",
              dataIndex: "image",
              key: "image",
              render: (value: string, record: { product: InventoryType; quantity: number }) => (
                <Avatar shape="square" size={48} src={record.product.images?.[0]} alt={record.product.name} />
              ),
            },
            {
              title: "Product",
              dataIndex: "name",
              key: "name",
              render: (value: string, record: { product: InventoryType; quantity: number }) => (
                <div className={styles.product}>
                  <h4>{record.product.name}</h4>
                </div>
              ),
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              key: "quantity",
            },
            {
              title: "Subtotal",
              dataIndex: "subtotal",
              key: "subtotal",
              render: (value: number, record: { product: InventoryType; quantity: number }) => (
                <span>${(record.product.price * record.quantity).toFixed(2)}</span>
              ),
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              render: (value: string, record: { product: InventoryType; quantity: number }) => (
                <div className={styles.actionsContainer}>
                  <FaTimes
                    className={`${styles.icon} ${styles.remove}`}
                    onClick={() => removeProductFromCart(record?.product?._id)}
                  />
                </div>
              ),
            },
          ]}
          dataSource={cart}
          rowKey={(record) => record.product._id}
          pagination={false}
        />
      </div>
      {/* Tax container */}
      <div className={styles.taxContainer}>
        <h4>Tax</h4>
        <span>{cart[0]?.product.tax}%</span>
        <span>${tax(cart[0]?.product.price, cart[0]?.product.tax)}</span>
      </div>

      {/* shipping price container */}
      <div className={styles.shippingPriceContainer}>
        <h4>Shipping</h4>
        <span>$0.00</span>
      </div>

      {/* total price container */}
      <div className={styles.totalPriceContainer}>
        <h4>Total</h4>
        <span>${cart.reduce((acc, curr) => acc + (curr.product.price + tax(curr.product.price, curr.product.tax)) * curr.quantity, 0).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartList;
