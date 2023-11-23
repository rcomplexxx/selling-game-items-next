import React, { useContext } from "react";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import classNames from "classnames";

const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const renderEmptyCart = () => (
    <p className={classNames(styles.emptyCartText)}>
      {"You have no items in your shopping cart, "}
      <Link className={styles.link} href="/products">
        start adding some
      </Link>
      !
    </p>
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

  return (
    <div className={styles.containerStyle}>
      {cartProducts.length !== 0 && (
        <h1 className={classNames(styles.title)}>Your shopping cart</h1>
      )}
      {cartProducts.length === 0 ? renderEmptyCart() : renderCart()}
    </div>
  );
};

export default Cart;
