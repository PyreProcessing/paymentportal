import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import styles from './page.module.scss';
import Cart from '@/layouts/cart/Cart.layout';
import Footer from '@/layouts/footer/Footer.layout';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pyre Processing',
  description:
    'Next Generation Payment Processing software for the modern world.',
  keywords: 'pyreprocessing, pyre, processing, pyre processing',
  icons: [
    {
      rel: 'icon',
      url: './favicon.ico',
    },
  ],
  // set default image for meta tags
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#00ccff"
          initialPosition={0.08}
          crawlSpeed={200}
          height={7}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow={false}
        />
        <ReactQueryProvider>
          <div className={styles.container}>
            <Cart>{children}</Cart>
            <Footer />
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
