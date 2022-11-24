import React from "react";
import styles from "./SmallerCard.module.css";

export default function SmallerCard({ image, title }) {
  return (
    <div className={styles.smallerCard}>
      <img src={image} alt="news" />
      <p>{title}</p>
    </div>
  );
}
