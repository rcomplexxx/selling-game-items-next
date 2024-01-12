import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React, { useContext, useEffect, useState } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";
import Head from "next/head";

const CheckoutPage = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [checkoutAbsolute, setCheckoutAbsolute] = useState(true);

  useEffect(()=>{
    setCheckoutAbsolute(false)
  },[])

  return (
    <>
      <Head>
        <title>Checkout - Gamesmoke shop</title>
      </Head>

      <div className={`${styles.checkout_container} ${checkoutAbsolute && styles.checkoutAbsolute}`}>
        <OrderDetails products={cartProducts} />

        <CheckoutInfo products={cartProducts} setCartProducts={setCartProducts}>
          {" "}
        </CheckoutInfo>
      </div>
    </>
  );
};

export default CheckoutPage;
