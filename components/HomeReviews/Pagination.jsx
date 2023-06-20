
import React from "react";
import styles from "./pagination.module.css";

export default function Pagination({ count, index, onChangeIndex }) {
  const renderDots = () => {
    const dots = [];
    for (let i = 0; i < count; i++) {
      dots.push(
        <span
          key={i}
          className={i === index ? styles.activeDot : styles.dot}
          onClick={() => onChangeIndex(i)}
        ></span>
      );
    }
    return dots;
  };

  return <div className={styles.pagination}>{renderDots()}</div>;
}
