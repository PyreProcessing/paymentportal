"use client";
import React from "react";
import styles from "./ProductView.module.scss";
import inventory from "@/data/mock-inventory";
import { useParams } from "next/navigation";
import { Button } from "antd";
import ProductInformationCart from "./subViews/ProductInformationCart.component";
import PaymentInformation from "./subViews/PaymentInformation.component";
import ShippingInformation from "./subViews/ShippingInformation.component";
import Review from "./subViews/Review.component";
import { useCartStore } from "@/state/cart";
import { AnimatePresence, motion } from "framer-motion";
import MainWrapper from "@/layouts/mainWrapper/MainWrapper.layout";

const ProductView = () => {
  // get the params from the router
  const { id } = useParams();
  // find the product by id
  const product = inventory.find((p) => p.id === Number(id));
  const { step, setStep, advanceToNextSignUpStep, goBackToPreviousSignUpStep, isGoingToPreviousStep } = useCartStore();
  const steps = [
    {
      title: "Cart",
      component: <ProductInformationCart />,
      nextButtonText: "Proceed to Payment",
      hideBackButton: true,
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: () => advanceToNextSignUpStep(),
    },
    {
      title: "Payment",
      component: <PaymentInformation />,
      nextButtonText: "Proceed to Shipping",
      backButtonText: "Back to Cart",
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: () => advanceToNextSignUpStep(),
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
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
  ];
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
            <MainWrapper title={steps[step]?.title} description={`steps[step]?.description`}>
              {steps[step]?.component}
            </MainWrapper>
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
