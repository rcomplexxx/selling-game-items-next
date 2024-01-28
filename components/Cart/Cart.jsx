import React, { useContext } from "react";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import BestSellers from "@/components/BestSellers/BestSellers";
import FreeShippingSlider from "./FreeShippingSlider/FreeShippingSlider";



const Cart = () => {
  const { cartProducts } = useContext(AppContext);

  const renderEmptyCart = () => (
    <div className={styles.emptyCartDiv}>
    <p className={styles.emptyCartText}>
    Add your favorite items to your cart.
    </p>
    <Link className={styles.shopNowLink} href="/products">
          <button className={styles.shopNow}>Shop Now</button>
        </Link>
    </div>
  );

  const subtotal = cartProducts
    .reduce((sum, cp) => sum + cp.quantity * cp.price, 0)
    .toFixed(2);

  const renderCart = () => (
    <>
      <div className={styles.itemsDiv}>
        {cartProducts.map((lineItem) => (
          <CartItem item={lineItem} key={lineItem.id} />
        ))}
      </div>
      <div className={styles.cardDetails}>
        <h4 className={styles.subtotalNew}>Subtotal: ${subtotal}</h4>
        <Link className={styles.link} href="/checkout">
          <button className={styles.checkoutButtonNew}>Checkout</button>
        </Link>
      </div>
    </>
  );

  if(cartProducts.length === 0) return  <div className={styles.mainWrapper}>
  <div className={`${styles.containerStyle} ${styles.emptyCartMainDiv}`}>
  <h1 className={`${styles.title}  ${styles.emptyTitle}`}>Your cart is empty!</h1>
 
  {renderEmptyCart()}
  </div>
  <BestSellers/>
  </div>

  return (
    <div className={styles.mainWrapper}>
    <div className={`${styles.containerStyle}`}>
      
        <h1 className={styles.title}>Your shopping cart</h1>
        <FreeShippingSlider subtotal={subtotal}/>
      {renderCart()}
      
    </div>
    <BestSellers/>
    </div>
  );
};

export default Cart;
