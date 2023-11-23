import styles from "./ordercard.module.css";
import { useState } from "react";

export default function OrderCard({
  id,
  info,
  items,
  packageStatus,
  handlePackageStatusChange,
}) {
  const changePs = () => {
    packageStatus === "0"
      ? handlePackageStatusChange(id, "1")
      : packageStatus === "1"
      ? handlePackageStatusChange(id, "2")
      : handlePackageStatusChange(id, "0");
  };

  return (
    <div className={styles.cardMainDiv}>
      <h1 className={styles.identifier}>{id + 1}</h1>
      <p>{info}, {items}</p>
     
      <button className={styles.packageStatusButton} onClick={changePs}>
        {packageStatus === "0"
          ? "Not Ordered"
          : packageStatus === "1"
          ? "Ordered"
          : "Completed"}
      </button>
    </div>
  );
}
