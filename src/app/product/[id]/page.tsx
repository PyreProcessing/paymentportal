import styles from './page.module.scss';
import ProductView from '@/views/productView/ProductView.view';

export default function ItemPage() { 
  return (
    <main className={styles.main}>
      <ProductView />
    </main>
  );
}
