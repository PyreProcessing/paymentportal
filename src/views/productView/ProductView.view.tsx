'use client';
import React from 'react';
import styles from './ProductView.module.scss';
import { Button, Modal, message } from 'antd';
import ProductInformationCart from './subViews/productInformationCart/ProductInformationCart.component';
import PaymentInformation from './subViews/paymentInformation/PaymentInformation.component';
import ShippingInformation from './subViews/ShippingInformation.component';
import Review from './subViews/review/Review.component';
import { useCartStore } from '@/state/cart';
import { AnimatePresence, m, motion } from 'framer-motion';
import { validateForm } from '@/utils/validateForm';
import TitleContainer from '@/components/titleContainer/TitleContainer.UI';
import usePostData from '@/state/actions/usePostData';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { MdOutlineCreditCard, MdOutlineLocalShipping } from 'react-icons/md';
import { FaClipboardCheck } from 'react-icons/fa';
import errorHandler from '@/utils/errorHandler';
import { encryptData } from '@/utils/encryptData';
import { useParams } from 'next/navigation';

const ProductView = () => {
  // we need to get the payment processor key from the query params
  const { paymentProcessor: paymentProcessorKey } = useParams();
  const { mutate: placeOrder } = usePostData({
    url: `/transaction/${paymentProcessorKey}/product`,
    key: 'placeOrder',
  });

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
    paymentInformationValues,
    billingInformationValues,
    shippingInformationValues,
    userInformationValues,
    setCartSteps,
  } = useCartStore();
  const steps = [
    {
      title: 'Cart',
      component: <ProductInformationCart />,
      nextButtonText: 'Proceed to Payment',
      hideBackButton: true,
      hideNextButton: false,
      nextButtonDisabled: cart.length === 0,
      nextButtonAction: () => advanceToNextSignUpStep(),
    },
    {
      title: 'Payment',
      component: <PaymentInformation />,
      nextButtonText: 'Proceed to Shipping',
      backButtonText: 'Back to Cart',
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          setUserInformationValues(currentForm.getFieldsValue().userInfo);
          setPaymentInformationValues(currentForm.getFieldsValue().paymentInfo);
          setBillingInformationValues(currentForm.getFieldsValue().billing);
          // if the shipping information is the same as the billing information, skip the shipping step
          if (currentForm.getFieldsValue().userInfo.sameAsShipping) {
            setShippingInformationValues(currentForm.getFieldsValue().billing);
            advanceToNextSignUpStep(3);
            return;
          }
          advanceToNextSignUpStep();
        } else message.error('Please fill out the form correctly');
      },
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: 'Shipping',
      component: <ShippingInformation />,
      nextButtonText: 'Review Order',
      backButtonText: 'Back to Payment',
      hideNextButton: false,
      nextButtonDisabled: false,
      nextButtonAction: async () => {
        if (await validateForm(currentForm)) {
          setShippingInformationValues(currentForm.getFieldsValue());
          advanceToNextSignUpStep();
          return;
        } else message.error('Please fill out the form correctly');
      },
      backButtonAction: () => goBackToPreviousSignUpStep(),
    },
    {
      title: 'Review',
      component: <Review />,
      nextButtonText: 'Place Order',
      backButtonText: 'Back to Shipping',
      hideNextButton: false,
      nextButtonDisabled: false,
      hideBackButton: false,
      backButtonAction: () => goBackToPreviousSignUpStep(),
      nextButtonAction: async () => {
        Modal.confirm({
          title: 'Are you sure you want to place this order?',
          content:
            "By clicking 'OK', you authorize Pyre Mountain Processing to" +
            ' securely collect and process the personal information provided, ' +
            'including but not limited to credit card details, billing/shipping ' +
            'information, name, email, and phone number, for the purpose of ' +
            'completing the transaction. You understand and agree that Pyre ' +
            'Mountain Processing will transmit the provided data securely to a ' +
            'third-party payment processor for payment processing purposes. You ' +
            'acknowledge that Pyre Mountain Processing will retain only the ' +
            'necessary information for record-keeping purposes, including ' +
            'billing/shipping details and the last 4 digits of the credit card ' +
            "used. You further consent to Pyre Mountain Processing's adherence " +
            'to applicable data protection laws and regulations, including but not ' +
            'limited to the General Data Protection Regulation (GDPR) and the ' +
            'Payment Card Industry Data Security Standard (PCI DSS). For more ' +
            'information on how Pyre Mountain Processing handles your personal ' +
            'data, please refer to our Privacy Policy.',
          onOk() {
            try {
              placeOrder({
                data: encryptData(
                  JSON.stringify({
                    cart: cart,
                    user: userInformationValues,
                    payment: paymentInformationValues,
                    billing: billingInformationValues,
                    shipping: shippingInformationValues,
                  })
                ),
              });
              advanceToNextSignUpStep();
            } catch (error) {
              errorHandler(error);
              return;
            }
          },
          onCancel() {
            console.log('Order canceled');
            return;
          },
        });
      },
    },
    {
      title: 'Order Placed',
      component: (
        <TitleContainer
          title="Order Placed"
          subtitle="Your order has been placed, keep an eye out in your email for your order details!"
        />
      ),
      hideNextButton: true,
      hideBackButton: true,
    },
  ];

  // check the cart length, if at any point the cart is empty, go back to the first step
  React.useEffect(() => {
    if (cart.length === 0) {
      setStep(0);
    }
    // set the steps for the cart
    setCartSteps([
      { title: 'Cart', icon: <ShoppingCartOutlined /> },
      { title: 'Payment', icon: <MdOutlineCreditCard /> },
      { title: 'Shipping', icon: <MdOutlineLocalShipping /> },
      { title: 'Review', icon: <FaClipboardCheck /> },
    ] as any);
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
              ease: 'easeInOut',
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
            onClick={
              steps[step]?.backButtonAction || goBackToPreviousSignUpStep
            }
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
            {steps[step]?.nextButtonText || 'Next'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductView;
