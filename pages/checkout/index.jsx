import CheckoutInfo from '@/components/Checkout/CheckoutInfo';
import OrderDetails from '@/components/Checkout/OrderDetails';
import React from 'react';

const CheckoutPage = () => {


  const orderDetails = <OrderDetails/>



  return (
    <div className={styles.checkout_container}>
       <CheckoutInfo></CheckoutInfo>
     

      {orderDetails}
    </div>
  );
};

export default CheckoutPage;