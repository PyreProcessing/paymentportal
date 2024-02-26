import React from "react";
import styles from "./Footer.module.scss";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <div className={styles.linksContainer}>
          <a href="/refund-policy" className={styles.link}>
            Refund Policy
          </a>
          <a href="/privacy-policy" className={styles.link}>
            Privacy Policy
          </a>
          <a href="/terms-of-service" className={styles.link}>
            Terms of Service
          </a>
        </div>
      </section>
      <section className={styles.section}>
        {/* copyright */}
        <div className={styles.linksContainer}>
          <p className={styles.link}>© {year} PyreProcessing. All Rights Reserved.</p>
        </div>
      </section>
    </div>
  );
};

export default Footer;
