import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React, { useContext, useState, } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";
import Head from "next/head";

const CheckoutPage = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [discount, setDiscount] = useState({code:'', discount:0});
  const [tip, setTip]= useState(0);

  

  return (
    <>
      <Head>
        <title>Checkout - Gamesmoke shop</title>
      </Head>

      <div className={`${styles.checkout_container} ${styles.checkoutAbsolute}`}>
        <OrderDetails discount={discount} setDiscount={setDiscount} tip={tip} products={cartProducts} />

        <CheckoutInfo discount={discount} tip={tip} setTip={setTip} products={cartProducts} setCartProducts={setCartProducts}>
          
        </CheckoutInfo>
      </div>
    </>
  );
};

export default CheckoutPage;
