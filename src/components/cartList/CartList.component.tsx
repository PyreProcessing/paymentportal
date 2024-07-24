import React from 'react';
import styles from './cartList.module.scss';
import { useCartStore } from '@/state/cart';
import ProductType from '@/types/ProductType';
import { Avatar, Button, Table } from 'antd';
import { FaTimes } from 'react-icons/fa';
import InventoryType from '@/types/InventoryType';
import CartTotals from './cartTotals/CartTotals.component';

const CartList = () => {
  const { cart, removeProductFromCart } = useCartStore();
  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        {cart.length && (
          <Table
            size="small"
            columns={[
              {
                title: 'Product',
                dataIndex: 'name',
                key: 'name',
                render: (
                  value: string,
                  record: { product: InventoryType; quantity: number }
                ) => (
                  <div className={styles.product}>
                    <Avatar
                      shape="square"
                      size={70}
                      src={record.product.images?.[0]}
                      alt={record.product.name}
                    />
                    <div className={styles.name}>{record.product.name}</div>
                  </div>
                ),
              },
              {
                title: 'Qty',
                dataIndex: 'quantity',
                key: 'quantity',
              },
              {
                title: 'Subtotal',
                dataIndex: 'subtotal',
                key: 'subtotal',
                render: (
                  value: number,
                  record: { product: InventoryType; quantity: number }
                ) => (
                  <span>
                    ${(record.product.price * record.quantity).toFixed(2)}
                  </span>
                ),
              },
              {
                title: 'Delete',
                dataIndex: 'delete',
                key: 'delete',
                render: (
                  value: string,
                  record: { product: InventoryType; quantity: number }
                ) => (
                  <div className={styles.actionsContainer}>
                    <FaTimes
                      className={`${styles.icon} ${styles.remove}`}
                      onClick={() =>
                        removeProductFromCart(record?.product?._id)
                      }
                    />
                  </div>
                ),
              },
            ]}
            dataSource={cart}
            rowKey={(record) => record.product._id}
            pagination={false}
          />
        )}
      </div>
      <CartTotals />
    </div>
  );
};

export default CartList;
