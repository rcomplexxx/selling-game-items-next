import React, {useContext} from "react";
import styles from './orderdetails.module.css'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import AppContext from '@/contexts/AppContext';


export default function OrderDetails(){

  
  const { cartProducts, setCartProducts } = useContext(AppContext);

  let s=0; 
  cartProducts.forEach((cp,i) => {s=s+cp.quantity*cp.price});
  s=(Math.round(s * 100) / 100).toFixed();



return <div className={styles.checkout_right}>
     

     <div className={styles.checkout_section}>
       <h2>Order Summary</h2>
       <div className={styles.order_summary}>
         <div className={styles.product}>
           <p>3 Fairy Light Spirit Tree</p>
           <p>$119.97 USD</p>
         </div>
         <div className={styles.coupon_code}>
           <input type="text" placeholder="Coupon code" />
         </div>
         <div className={styles.subtotal}>
           <p>Subtotal</p>
           <p>$119.97 USD</p>
         </div>
         <div className={styles.shipping}>
           <p>Shipping</p>
           <p>Free</p>
         </div>
         <div className={styles.tax}>
           <p>Tax</p>
           <p>$0.00</p>
         </div>
         <div className={styles.total}>
           <p>Total</p>
           <p>$119.97 USD</p>
         </div>
         <div className={styles.savings}>
           <p>You're Saving</p>
           <p>$120.00</p>
         </div>
       </div>

 {/* sacuvaj client id vrednost i ostale bitne informacije u .env fajlu */}
       <PayPalScriptProvider options={{"client-id":"AQB3vOguzerJ-HXgJavEAMlivjs3DTNyWi2W7yKI94arI23zXOAaSJx4Zf4JzTO9RjvJdr5AflrFHWp1"}}>
    <PayPalButtons
       createOrder={(data, actions) => {
        return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                      currency_code: 'USD',
                                      value: s,
                                    },
                                },
                            ],
                        })
      }}


    
    />
        </PayPalScriptProvider>
       <button className={styles.checkout_button}>Checkout</button>
       </div>
 
       <div className={styles.checkout_section}>
       <h2>What Happy Customers Are Saying</h2>
       <div className={styles.customer_review}>
         <div className={styles.review}>
           <p>Selina J., Dallas, TX</p>
           <p>Verified Buyer</p>
           <p>★★★★★ 5/5</p>
           <p>After trying the Fairy Light Spirit Tree, I ordered 3 more! It transformed my entire home.</p>
         </div>
         <div className={styles.review}>
           <p>Sarah H., London, UK</p>
           <p>Verified Buyer</p>
           <p>★★★★★ 5/5</p>
           <p>I don’t miss shopping in stores at all. This is as easy as it comes. Check out online and receive your Lights at your doorstep! Fast delivery and when I made a mistake, I just exchanged it. They’re that good.</p>
         </div>
         <div className={styles.review}>
           <p>Amy P., Salt Lake City, UT</p>
           <p>Verified Buyer</p>
           <p>★★★★★ 5/5</p>
           <p>This was my first time buying from a Facebook advertisement, and customer service came to the rescue. 10/10 service!</p>
         </div>
       </div>
     </div>
 
     </div>;
 


}