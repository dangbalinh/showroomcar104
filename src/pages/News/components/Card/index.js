import React from "react";
import styles from "./Card.module.css";

export default function Card({ title, image, date, description }) {
  return (
    <div className={styles.card}>
      <img src={image} alt="news" className={styles.image} />
      <div className={styles.detail}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
