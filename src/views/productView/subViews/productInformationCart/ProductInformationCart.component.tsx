"use client";
import React from "react";
import { useParams } from "next/navigation";
import mockInventory from "@/data/mock-inventory";
import styles from "./index.module.scss";
import Image from "next/image";
import TitleContainer from "@/components/titleContainer/TitleContainer.UI";

const ProductInformationCart = () => {
  const { id } = useParams();

  // TODO: Fetch product from the api
  // for now we are using a mock inventory
  const product = mockInventory.find((p) => p.id === Number(id));

  return (
    <div className={styles.container}>
      <TitleContainer title={product?.name} subtitle={product?.shortDescription} />
      <div className={styles.imageContainer}>
        <Image src={product?.image[0] ?? ""} alt={product?.name ?? "No image"} width={400} height={400} />
      </div>
      <div className={styles.contentContainer}>
        <p>{product?.description}</p>
        <h2>${product?.price}</h2>
      </div>
    </div>
  );
};

export default ProductInformationCart;
