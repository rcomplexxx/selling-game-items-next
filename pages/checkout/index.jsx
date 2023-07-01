import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React,{ useState,useContext } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";


const CheckoutPage = () => {
  const [unlockPaypal, setUnlockPaypal] = useState(false);
  const { cartProducts, setCartProducts } = useContext(AppContext);

  if(cartProducts.length===0)return <p>No items in the bag.</p>;
  return (

    <div className={styles.checkout_container}>
      <CheckoutInfo setUnlockPaypal={setUnlockPaypal}></CheckoutInfo>
      <OrderDetails unlockPaypal={unlockPaypal} products={cartProducts} />
    </div>
  );
};
CheckoutPage.title='Checkout';

export default CheckoutPage;
