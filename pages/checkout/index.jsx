import CheckoutInfo from '@/components/Checkout/CheckoutInfo';
import OrderDetails from '@/components/Checkout/OrderDetails';
import React from 'react';
import styles from './checkout.module.css';

const CheckoutPage = () => {


  



  return (
    <div className={styles.checkout_container}>
       <CheckoutInfo></CheckoutInfo>
       <OrderDetails/>
    </div>
  );
};

export default CheckoutPage;