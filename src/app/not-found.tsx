import React from 'react';
import styles from './page.module.scss';

import { Metadata } from 'next';
import { default as NotFoundComponent } from '@/layouts/notFound/NotFound.layout';

// meta tags
export const metadata: Metadata = {
  title: 'Pyre Processing | 404',
  description: 'Page not found.',
  keywords:
    'pyreprocessing, pyre, processing, pyre processing, contact, contact us, contact pyre processing',
  icons: [
    {
      rel: 'icon',
      url: './favicon.ico',
    },
  ],
};
const NotFound = () => {
  return (
      <div className={styles.container}>
        <NotFoundComponent />
      </div>
  );
};

export default NotFound;
