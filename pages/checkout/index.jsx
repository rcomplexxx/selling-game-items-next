import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails from "@/components/Checkout/OrderDetails";
import React, { useContext, useEffect, useState, } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";
import Head from "next/head";
import CheckoutLogo from "@/components/Checkout/CheckoutLogo/CheckoutLogo";
import { useRouter } from "next/router";
import Link from "next/link";

const CheckoutPage = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [discount, setDiscount] = useState({code:'', discount:0});
  const [tip, setTip]= useState(0);
 
  

   const renderEmptyCartCheckout = ()=> { return <div className={styles.mainWrapper}>
    <div className={`${styles.containerStyle} ${styles.emptyCartMainDiv}`}>
    <h1 className={`${styles.title}  ${styles.emptyTitle}`}>Your cart is empty</h1>
    <div className={styles.emptyCartDiv}>
      <p className={styles.emptyCartText}>
      Add your favorite items to your cart.
      </p>
      <Link className={styles.shopNowLink} href="/products">
            <button className={styles.shopNow}>Shop Now</button>
          </Link>
      </div>
    </div>
    </div>;}

 
  
  console.log('cp', cartProducts.length);

  return (
   
      <div className={styles.checkoutMainContainer}>
      {cartProducts.length==0 ?renderEmptyCartCheckout():
      <>
      <CheckoutLogo/>
      <div className={`${styles.checkout_container} ${styles.checkoutAbsolute}`}>
        <OrderDetails discount={discount} setDiscount={setDiscount} tip={tip} products={cartProducts} />

        <CheckoutInfo discount={discount} tip={tip} setTip={setTip} products={cartProducts} setCartProducts={setCartProducts}/>
          
       
      </div>
      </>
} 

</div>
    
  );
};

export default CheckoutPage;
