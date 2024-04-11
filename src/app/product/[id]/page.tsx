import styles from './page.module.scss';
import ProductView from '@/views/productView/ProductView.view';

export default function ItemPage() {
  console.log(`testing env token = ${process.env.NEXT_PUBLIC_TOKEN}`);
  return (
    <main className={styles.main}>
      <ProductView />
    </main>
  );
}
