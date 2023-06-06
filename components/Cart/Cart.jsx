import React, {useContext} from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';

import CartItem from './CartItem/CartItem';
import styles from './cart.module.css'
import AppContext from '@/contexts/AppContext';
import classNames from 'classnames';

const Cart = ({    emptyCartText='true' }) => {


  const { cartProducts, setCartProducts } = useContext(AppContext);



      const handleEmptyCart = async () => {
        setCartProducts([]);
      };


      
    




 

  

  const renderEmptyCart = () => (
    emptyCartText && <Typography variant="subtitle1" className={classNames(styles.emptyCartText)}>You have no items in your shopping cart,
      <Link className={styles.link} href="/">start adding some</Link>!
    </Typography>
  );

  let s=0; 
  cartProducts.forEach((cp,i) => {s=s+cp.quantity*cp.price});
  s=Math.round(s * 100) / 100;

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cartProducts.map((lineItem) => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem}  />
          </Grid>
        ))}
      </Grid>
      <div className={styles.cardDetails}>
        <Typography variant="h4" >Subtotal: ${s.toFixed(2)}</Typography>
        <div>
          <Button className={classNames(styles.emptyButton)} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty cart</Button>
          <Button className={classNames(styles.checkoutButton)} to="/checkout" size="large" type="button" variant="contained" color="primary">Checkout</Button>
        </div>
      </div>
    </>
  );

  return (
    <div className="container">
      <div className={styles.toolbar} />
      {(emptyCartText || cartProducts.length!==0) && <Typography className={classNames(styles.title)} variant="h3" gutterBottom>Your Shopping Cart</Typography>}
      { cartProducts.length==0 ? renderEmptyCart() : renderCart() }
    </div>
  );
};

export default Cart;
