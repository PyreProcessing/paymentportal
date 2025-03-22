'use client';
import React from 'react';
import styles from './Footer.module.scss';
import { useMerchantStore } from '@/state/merchant';

const LegalLinks = () => {
  // pull out the merchant from the request
  const { merchant } = useMerchantStore(); 
  return (
    <div className={styles.linksContainer}>
      {merchant?.businessInfo && merchant?.businessInfo?.refundPolicy && (
        <a
          href={merchant.businessInfo.refundPolicy}
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          Refund Policy
        </a>
      )}
      {merchant?.businessInfo && merchant?.businessInfo?.privacyPolicy && (
        <a
          href={merchant.businessInfo.privacyPolicy}
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          Privacy Policy
        </a>
      )}
      {merchant?.businessInfo && merchant?.businessInfo?.termsOfService && (
        <a
          href={merchant.businessInfo.termsOfService}
          className={styles.link}
          target="_blank"
          rel="noreferrer noopener"
        >
          Terms of Service
        </a>
      )}
    </div>
  );
};

export default LegalLinks;
