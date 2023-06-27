import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React from "react";
import { useState } from "react";
import styles from "./checkout.module.css";

const CheckoutPage = () => {
  const [unlockPaypal, setUnlockPaypal] = useState(false);

  return (
    <div className={styles.checkout_container}>
      <CheckoutInfo setUnlockPaypal={setUnlockPaypal}></CheckoutInfo>
      <OrderDetails unlockPaypal={unlockPaypal} />
    </div>
  );
};

export default CheckoutPage;
