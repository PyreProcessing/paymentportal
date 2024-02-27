import React from "react";
import styles from "./index.module.scss";
import { useCartStore } from "@/state/cart";
import ProductType from "@/types/ProductType";
import { Avatar, Button, Table } from "antd";
import { FaTimes } from "react-icons/fa";

const CartList = () => {
  const { cart, removeProductFromCart } = useCartStore();
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
              render: (value: string, record: { product: ProductType; quantity: number }) => (
                <Avatar shape="square" size={48} src={record.product.image[0]} alt={record.product.name} />
              ),
            },
            {
              title: "Product",
              dataIndex: "name",
              key: "name",
              render: (value: string, record: { product: ProductType; quantity: number }) => (
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
              render: (value: number, record: { product: ProductType; quantity: number }) => (
                <span>${(record.product.price * record.quantity).toFixed(2)}</span>
              ),
            },
            {
              title: "Actions",
              dataIndex: "actions",
              key: "actions",
              render: (value: string, record: { product: ProductType; quantity: number }) => (
                <div className={styles.actionsContainer}>
                  <FaTimes className={`${styles.icon} ${styles.remove}`} onClick={() => removeProductFromCart(record?.product?._id)} />
                </div>
              ),
            },
          ]}
          dataSource={cart}
          rowKey="product._id"
          pagination={false}
        />
      </div>
    </div>
  );
};

export default CartList;
