import { useState } from "react";
import styles from "./quantityButton.module.css";

const QuantityButton = ({ quantity, setQuantity }) => {
  // Initial quantity is 1, using React's useState hook

  const incrementQuantity = () => {
    setQuantity(quantity + 1); // Increment quantity by 1
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrement quantity by 1, but ensure it doesn't go below 1
    }
  };

  return (
    <div className={styles.quantityMainDiv}>
      <span className={styles.quantityTitle}>Quantity</span>
      <div className={styles.quantityInfo}>

        <input className={styles.quantityInput} value={quantity} readOnly />

      
        <button className={`${styles.quantityButton} ${styles.decrementButton}`} onClick={decrementQuantity}>
          -
        </button>


        <button className={styles.quantityButton} onClick={incrementQuantity}>
          +
        </button>


        
      </div>
    </div>
  );
};

export default QuantityButton;
