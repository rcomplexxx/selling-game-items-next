import React, { useContext } from "react";
import {  Typography, Button } from "@mui/material";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import classNames from "classnames";

const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

 

  const renderEmptyCart = () =>
    (
      <Typography
        variant="subtitle1"
        className={classNames(styles.emptyCartText)}
      >
        You have no items in your shopping cart,
        <Link className={styles.link} href="/">
          start adding some
        </Link>
        !
      </Typography>
    );

 

  const subtotal = cartProducts.reduce(
    (sum, cp) => sum + cp.quantity * cp.price,
    0
  ).toFixed(2) ;

  const renderCart = () => (
    <>
      <div
      className={styles.itemsDiv}
        
      >
        {cartProducts.map((lineItem) => <CartItem item={lineItem} key={lineItem.id} />
        )}
      </div>
      <div className={styles.cardDetails}>
        <Typography variant="h4">Subtotal: ${subtotal}</Typography>
       
        
          <Link className={styles.link} href="/checkout">
            <Button
              className={classNames(styles.checkoutButton)}
              to="/checkout"
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </Link>
      </div>
    </>
  );

  return (
  
      <div className={styles.containerStyle}>
        {(cartProducts.length !== 0) && (
        <h1 className={classNames(styles.title)} >Your Shopping Cart</h1>
        )}
        {cartProducts.length === 0 ? renderEmptyCart() : renderCart()}
      </div>
  
  );
};

export default Cart;
