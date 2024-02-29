"use client";
import React from "react";
import styles from "./ProductView.module.scss";
import { Button, message } from "antd";
import ProductInformationCart from "./subViews/productInformationCart/ProductInformationCart.component";
import PaymentInformation from "./subViews/paymentInformation/PaymentInformation.component";
import ShippingInformation from "./subViews/ShippingInformation.component";
import Review from "./subViews/Review.component";
import { useCartStore } from "@/state/cart";
import { AnimatePresence, m, motion } from "framer-motion";
import { validateForm } from "@/utils/validateForm";

const ProductView = () => {
  const {
    step,
    cart,
    advanceToNextSignUpStep,
    goBackToPreviousSignUpStep,
    isGoingToPreviousStep,
    setStep,
    currentForm,
    setPaymentInformationValues,
    setBillingInformationValues,
    setShippingInformationValues,
    setUserInformationValues,
  } = useCartStore();
  const steps = [
    {
      title: "Cart",
      component: <ProductInformationCart />,
      nextButtonText: "Proceed to Payment",
      hideBackButton: true,
      hideNextButton: false,
      nextButtonDisabled: cart.length === 0,
      nextButtonAction: () => advanceToNextSignUpStep(),
    },
    {
      title: "Payment",
      component: <PaymentInformation />,
      nextButtonText: "Proceed to Shipping",
      backButtonText: "Back to Cart",
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          setUserInformationValues(currentForm.getFieldsValue().userInfo);
          setPaymentInformationValues(currentForm.getFieldsValue().paymentInformation);
          setBillingInformationValues(currentForm.getFieldsValue().billing);
          // if the shipping information is the same as the billing information, skip the shipping step
          if (currentForm.getFieldsValue().userInfo.sameAsShipping) {
            setShippingInformationValues(currentForm.getFieldsValue().billing);
            advanceToNextSignUpStep(3);
            return;
          }
          advanceToNextSignUpStep();
        } else message.error("Please fill out the form correctly");
      },
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: "Shipping",
      component: <ShippingInformation />,
      nextButtonText: "Review Order",
      backButtonText: "Back to Payment",
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: () => advanceToNextSignUpStep(),
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: "Review",
      component: <Review />,
      nextButtonText: "Place Order",
      backButtonText: "Back to Shipping",
      hideNextButton: false,
      nextButtonDisabled: false,
      hideBackButton: false,
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
  ];

  // check the cart length, if at any point the cart is empty, go back to the first step
  React.useEffect(() => {
    if (cart.length === 0) {
      setStep(0);
    }
  }, [cart]);

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <AnimatePresence initial={true} mode="wait">
          <motion.div
            className={styles.formContainer}
            initial={{
              x: isGoingToPreviousStep ? -80 : 80,
              opacity: 0,
              scale: 0.99,
            }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
            }}
            transition={{
              ease: "easeInOut",
              duration: 0.3,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
            }}
            key={step}
          >
            {steps[step]?.component}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={styles.actionContainer}>
        {!steps[step].hideBackButton && (
          <Button
            type="text"
            className={styles.backButton}
            onClick={steps[step]?.backButtonAction || goBackToPreviousSignUpStep}
          >
            Back
          </Button>
        )}
        {!steps[step].hideNextButton && (
          <Button
            type="primary"
            onClick={() => {
              steps[step]?.nextButtonAction!();
            }}
            disabled={steps[step]?.nextButtonDisabled}
            className={styles.nextButton}
          >
            {steps[step]?.nextButtonText || "Next"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductView;
