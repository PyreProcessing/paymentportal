import React from "react";
import styles from "./index.module.scss";
import { useCartStore } from "@/state/cart";
import formatPhoneNumber from "@/utils/formatPhoneNumber";
import { Divider, Modal } from "antd";
import CartList from "@/components/cartList/CartList.component";
import capitalizeWords from "@/utils/capitalizeWords";
import usePostData from "@/state/actions/usePostData";

const Review = () => {
  const { userInformationValues, paymentInformationValues, billingInformationValues, shippingInformationValues } =
    useCartStore();

  return (
    <div>
      <Divider orientation="center">Review Order</Divider>
      <div className={styles.container}>
        <div className={styles.cartInformation}>
          <CartList />
        </div>
        <div className={styles.informationContainer}>
          <div className={styles.customerInformation}>
            <Divider orientation="center">Customer Information</Divider>
            <div className={styles.infoContainer}>
              <p>
                <strong>Email:</strong> {userInformationValues.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {userInformationValues.phoneNumber}
              </p>
            </div>
          </div>
          {
            // if not the same as billing information, show this container
            !userInformationValues.sameAsShipping ?? (
              <div className={styles.shippingInformation}>
                <Divider orientation="center">Shipping Information</Divider>{" "}
                <div className={styles.infoContainer}>
                  {Object?.values(shippingInformationValues).map((value: any, index) => {
                    return (
                      <p key={index}>
                        <strong>{capitalizeWords(Object.keys(shippingInformationValues)[index])}:</strong> {value}
                      </p>
                    );
                  })}
                </div>
              </div>
            )
          }
          <div className={styles.shippingInformation}>
            <Divider orientation="center">Billing Information</Divider>
            <div className={styles.infoContainer}>
              {Object?.values(billingInformationValues).map((value: any, index) => {
                return (
                  <p key={index}>
                    <strong>{capitalizeWords(Object.keys(billingInformationValues)[index])}:</strong> {value}
                  </p>
                );
              })}
            </div>
          </div>
          <div className={styles.paymentInformation}>
            <Divider orientation="center">Payment Information</Divider>
            <div className={styles.infoContainer}>
              {Object?.values(paymentInformationValues).map((value: any, index) => {
                return (
                  <p key={index}>
                    <strong>{capitalizeWords(Object.keys(paymentInformationValues)[index])}:</strong> {value}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
