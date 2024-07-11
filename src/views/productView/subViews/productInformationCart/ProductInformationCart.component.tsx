'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import styles from './ProductInformationCart.module.scss';
import TitleContainer from '@/components/titleContainer/TitleContainer.UI';
import { Button, Form, Image, Input, Modal } from 'antd';
import { useCartStore } from '@/state/cart';
import CartList from '@/components/cartList/CartList.component';
import useFetchData from '@/state/actions/useFetchData';
import Error from '@/components/error/Error.component';
import InventoryType from '@/types/InventoryType';
import { useMerchantStore } from '@/state/merchant';
import Carousel from '@/components/Carousel/Carousel.component';

const ProductInformationCart = () => {
  const { id } = useParams();
  const [form] = Form.useForm();

  const { data, isFetching, isLoading, isError, error } = useFetchData({
    url: `/inventory/${id}`,
    key: `inventory-${id}`,
  });

  const { cart, setCart } = useCartStore();
  const { setMerchant } = useMerchantStore();

  const addToCart = (values: any) => {
    // if (product?.merchant?.status !== 'active') return;
    if (!data?.payload?.inventory || !values.quantity) return;
    if (Number(values.quantity) === 0) return;
    const productIndex = cart.findIndex(
      (p) => p.product._id === data?.payload?.inventory?._id
    );
    const newCart = [...cart];
    if (productIndex !== -1) {
      // check if addinng the quantity will exceed the limit
      if (
        data?.payload?.inventory.limit &&
        newCart[productIndex].quantity + Number(values.quantity) >
          data?.payload?.inventory.limit
      ) {
        Modal.info({
          title: 'Exceeds limit',
          content: (
            <div>
              <p>
                You are trying to add more than the limit of{' '}
                {data?.payload?.inventory.limit}.
              </p>
              <p>
                Try adding a smaller quantity or remove the product from the
                cart.
              </p>
            </div>
          ),
        });
        // if the cart for some reason has a quantity higher than the limit, set it to the limit
        if (newCart[productIndex].quantity > data?.payload?.inventory.limit) {
          newCart[productIndex].quantity = data?.payload?.inventory.limit;
        }
        // escape the function
        return;
      }
      newCart[productIndex].quantity += Number(values.quantity);
    } else {
      newCart.push({
        product: data?.payload?.inventory!,
        quantity: Number(values.quantity),
      });
    }
    setCart(newCart as any);
  };

  React.useEffect(() => {
    // set the merchant from the product
    if (data?.payload?.inventory?.merchant) {
      setMerchant(data?.payload?.inventory.merchant);
    }
  }, [data?.payload?.inventory]);

  if (!data?.payload?.inventory)
    return (
      <TitleContainer
        title="Product not found"
        subtitle="The product you are looking for does not exist"
        styles={styles.titleContainer}
      />
    );

  if (isError) return <Error error={error} />;
  const inStock =
    data?.payload?.inventory?.quantity > 0 ? 'In stock' : 'Out of stock';

  const product = data.payload.inventory as InventoryType;
  return (
    <div className={styles.container}>
      {product?.merchant?.status !== 'active' && (
        <div className={styles.inactiveContainer}>
          <TitleContainer
            title="Processing in Progress"
            subtitle="We're still working on processing this merchant. Please check back later!"
            styles={styles.titleContainer}
          />
        </div>
      )}
      <div className={styles.contentItem}>
        <div className={styles.itemTitle}>
          <TitleContainer title={product?.name} styles={{}} />
        </div>
        <div className={styles.itemPicture}>
          <Carousel items={product?.images ?? []} showArrows={true}></Carousel>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <p>{product?.description}</p>
        <div className={styles.productInformation}>
          <span className={inStock ? styles.success : styles.danger}>
            {inStock}
          </span>
          {
            // if the product has a limit, show the limit
            product?.limit && <span>Limit: {product?.limit}</span>
          }
          <span>${product?.price.toFixed(2)}</span>
        </div>
        
        {cart.length > 0 && <CartList />}

        <Form
          initialValues={{
            quantity: 1,
          }}
          layout="vertical"
          onFinish={() => addToCart(form.getFieldsValue())}
          form={form}
          disabled={product?.merchant?.status !== 'active'}
        >
          <Form.Item label="Quantity" name="quantity">
            <Input
              type="number"
              max={product?.limit ?? product.quantity}
              // dont allow the user to go below 0
              min={0}
              disabled={
                product?.noLimit
                  ? false
                  : product?.quantity === 0 || product?.outOfStock
              }
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={product?.merchant?.status !== 'active'}
            className={styles.addToCartButton}
          >
            Add to cart
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ProductInformationCart;
