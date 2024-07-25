import Image from 'next/image';
import styles from './page.module.scss';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>} />
    </main>
  );
}
