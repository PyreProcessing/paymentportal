'use client';
import React from 'react';
import styles from './CartTotals.module.scss';
import { useCartStore } from '@/state/cart';
import currencyFormatter from '@/utils/currencyFormatter';
import tax from '@/utils/tax';

const CartTotals = () => {
  const { cart } = useCartStore();
  const taxes = cart.reduce((acc, curr) => {
    // if the product has a tax, calculate the tax for the product
    if (curr.product.tax) {
      return (
        acc + Number(tax(curr.product.price, curr.product.tax)) * curr.quantity
      );
    }
    return acc;
  }, 0);
  const shippingFees = cart.reduce((acc, curr) => {
    // if the product has a shipping fee, calculate the shipping fee for the product
    if (curr.product.shippingFee) {
      return acc + Number(curr.product.shippingFee) * curr.quantity;
    }
    return acc;
  }, 0);
  const fees = cart.reduce((acc, curr) => {
    // if the product has a fee, calculate the fee for the product
    if (curr.product.fee) {
      return acc + Number(curr.product.fee) * curr.quantity;
    }
    return acc;
  }, 0);
  const subTotal = cart.reduce(
    (acc, curr) => acc + curr.product.price * curr.quantity,
    0
  );
  const total = subTotal + taxes + shippingFees + fees;
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <h4>Tax</h4>
        <span>{currencyFormatter(taxes)}</span>
      </div>
      <div className={styles.infoContainer}>
        <h4>Shipping</h4>
        <span>{currencyFormatter(shippingFees)}</span>
      </div>
      <div className={styles.infoContainer}>
        <h4>Fee(s)</h4>
        <span>{currencyFormatter(fees)}</span>
      </div>
      <div className={styles.infoContainer}>
        <h4>SubTotal</h4>
        <span>{currencyFormatter(subTotal)}</span>
      </div>
      <div className={styles.infoContainer}>
        <h4>Total</h4>
        <span>{currencyFormatter(total)}</span>
      </div>
    </div>
  );
};

export default CartTotals;
