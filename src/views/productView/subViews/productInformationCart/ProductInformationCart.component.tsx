"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import mockInventory from "@/data/mock-inventory";
import styles from "./index.module.scss";
import Image from "next/image";
import TitleContainer from "@/components/titleContainer/TitleContainer.UI";
import { Button, Form, Input } from "antd";
import CustomButton from "@/components/customButton/CustomButton.UI";
import { useCartStore } from "@/state/cart";

const ProductInformationCart = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  // TODO: Fetch product from the api
  // for now we are using a mock inventory
  const product = mockInventory.find((p) => p.id === Number(id));
  const { cart, setCart } = useCartStore();
  console.log(`form: `, form.getFieldsValue());
  const addToCart = (values: any) => {
    console.log(values);
    if (!product || !values.quantity) return;
    const productIndex = cart.findIndex((p) => p.product.id === product?.id);
    const newCart = [...cart];
    if (productIndex !== -1) {
      newCart[productIndex].quantity += Number(values.quantity);
    } else {
      newCart.push({ product: product!, quantity: Number(values.quantity) });
    }
    setCart(newCart as any);
  };
  console.log(cart);
  if (!product) return <div>Product not found</div>;

  const inStock = product?.quantity > 0 ? "In stock" : "Out of stock";

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <TitleContainer title={product?.name} subtitle={product?.shortDescription} />
        <div className={styles.imageContainer}>
          <Image src={product?.image[0] ?? ""} alt={product?.name ?? "No image"} width={400} height={400} />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <p>{product?.description}</p>
        <div className={styles.productInformation}>
          <span className={product?.quantity > 0 ? styles.success : styles.danger}>{inStock}</span>
          {
            // if the product has a limit, show the limit
            product?.limit && <span>Limit: {product?.limit}</span>
          }
          <span>${product?.price.toFixed(2)}</span>
        </div>

        <Form
          initialValues={{
            quantity: 1,
          }}
          layout="vertical"
          onFinish={() => addToCart(form.getFieldsValue())}
          form={form}
        >
          <Form.Item label="Quantity" name="quantity">
            <Input
              type="number"
              max={product?.limit ?? product.quantity}
              // dont allow the user to go below 0
              min={0}
              disabled={product?.noLimit ? false : product?.quantity === 0}
            />
          </Form.Item>

          <button type="submit">Add to cart</button>
        </Form>
      </div>
    </div>
  );
};

export default ProductInformationCart;
