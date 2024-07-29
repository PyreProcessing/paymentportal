'use client';
import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import { Divider, Empty, Steps } from 'antd';
import { useCartStore } from '@/state/cart';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader.component';
import useFetchData from '@/state/actions/useFetchData';

interface CartProps {
  children: React.ReactNode;
}
const Cart = ({ children }: CartProps) => {
  const searchParams = useSearchParams();
  const cartId = searchParams.get('cartId');
  const router = useRouter();
  const { data, isLoading, isError } = useFetchData({
    url: `/inventory/cart/${cartId}`,
    key: 'cart',
    enabled: !!cartId,
  });

  const [emptyCart, setEmptyCart] = useState<boolean>(false);
  const { step, cartSteps, setCart, setStep, cart, initializeCart, setCartId } =
    useCartStore();

  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(() => {
    if (isError) {
      setEmptyCart(true);
    }

    if (data?.payload) {
      setCart(data.payload.cart.cart);
      setCartId(cartId as string);
      // set the current step to step 2, and navigate to the product page
      setStep(1);
      router.push('/product/ecomm');
    }
  }, [data?.payload, isError]);
  React.useEffect(() => {
    initializeCart();
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
      {isLoading && !cart.length ? (
        <Loader />
      ) : emptyCart ? (
        <Empty
          description="Cart was not found in the system, please try again.. or contact the merchant"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default Cart;
