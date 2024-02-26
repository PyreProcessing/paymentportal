import React from "react";
import styles from "./TitleContainer.module.scss";

interface TitleContainerProps {
  title?: string;
  subtitle?: string;
}

const TitleContainer = (props: TitleContainerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <h1 className={styles.title}>{props?.title}</h1>
      </div>
      <div className={styles.subtitleContainer}>
        <h2 className={styles.subtitle}>{props?.subtitle}</h2>
      </div>
    </div>
  );
};

export default TitleContainer;
