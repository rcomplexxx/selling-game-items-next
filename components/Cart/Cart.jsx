import React, { useContext } from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import classNames from "classnames";

const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const handleEmptyCart = async () => {
    setCartProducts([]);
  };

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
      <Grid
        container
        spacing={3}
        xs={{ width: "100vw", minWidth: "max-content" }}
      >
        {cartProducts.map((lineItem) => (
          <Grid item xs={12} sm={6} md={4} lg={4} key={lineItem.id}>
            <CartItem item={lineItem} />
          </Grid>
        ))}
      </Grid>
      <div className={styles.cardDetails}>
        <Typography variant="h4">Subtotal: ${subtotal}</Typography>
        <div>
          <Button
            className={classNames(styles.emptyButton)}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty cart
          </Button>
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
      </div>
    </>
  );

  return (
    <div className={styles.container}>
        {(cartProducts.length !== 0) && (
        <h1 className={classNames(styles.title)} >Your Shopping Cart</h1>
        )}
        {cartProducts.length === 0 ? renderEmptyCart() : renderCart()}
    </div>
  );
};

export default Cart;
