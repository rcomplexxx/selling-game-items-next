import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React, { useContext, useState, } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";
import Head from "next/head";
import CheckoutLogo from "@/components/Checkout/CheckoutLogo/CheckoutLogo";

const CheckoutPage = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [discount, setDiscount] = useState({code:'', discount:0});
  const [tip, setTip]= useState(0);

  

  return (
    <>
      <Head>
        <title>Checkout - Gamesmoke shop</title>
      </Head>
      <div className={styles.checkoutMainContainer}>
      <CheckoutLogo/>
      <div className={`${styles.checkout_container} ${styles.checkoutAbsolute}`}>
        <OrderDetails discount={discount} setDiscount={setDiscount} tip={tip} products={cartProducts} />

        <CheckoutInfo discount={discount} tip={tip} setTip={setTip} products={cartProducts} setCartProducts={setCartProducts}/>
          
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
