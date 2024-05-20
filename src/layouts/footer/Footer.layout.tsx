import React from "react";
import styles from "./Footer.module.scss";
import LegalLinks from "./LegalLinks.component";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <LegalLinks />
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
