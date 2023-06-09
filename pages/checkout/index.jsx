import OrderDetails from '@/components/Checkout/OrderDetails';
import React from 'react';
import styles from './checkout.module.css';

const CheckoutPage = () => {


  const orderDetails = <OrderDetails/>



  return (
    <div className={styles.checkout_container}>
        <div className={styles.checkout_left}>
      <div className={styles.checkout_section}>
        <h2>Contact Information</h2>
        <form>
          <div className={styles.form_group}>
            <label htmlFor="email">Email *</label>
            <input type="email" id="email" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="emailOffers">Email me with news and offers</label>
            <input type="checkbox" id="emailOffers" />
          </div>
        </form>
      </div>

      <div className={styles.checkout_section}>
        <h2>Shipping Address</h2>
        <form>
          <div className={styles.form_group}>
            <label htmlFor="firstName">First name *</label>
            <input type="text" id="firstName" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="lastName">Last name *</label>
            <input type="text" id="lastName" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="address">Address *</label>
            <input type="text" id="address" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="apt">Apt, suite, etc. (optional)</label>
            <input type="text" id="apt" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="country">Country *</label>
            <input type="text" id="country" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="postcode">Postcode *</label>
            <input type="text" id="postcode" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="state">State *</label>
            <input type="text" id="state" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="suburb">Suburb *</label>
            <input type="text" id="suburb" />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="phone">Phone *</label>
            <input type="text" id="phone" />
          </div>
        </form>
      </div>

      <div className={styles.checkout_section}>
        <h2>Billing Address</h2>
        <div className={styles.billing_options}>
          <div className={styles.billing_option}>
            <input type="radio" id="sameAddress" name="billingAddress" />
            <label htmlFor="sameAddress">Same as shipping address</label>
          </div>
          <div className={styles.billing_option}>
            <input type="radio" id="differentAddress" name="billingAddress" />
            <label htmlFor="differentAddress">Use a different billing address</label>
          </div>
        </div>
      </div>

      <div className={styles.checkout_section}>
        <h2>Shipping Method</h2>
        <div className={styles.shipping_method}>
          <input type="radio" id="freeShipping" name="shippingMethod" />
          <label htmlFor="freeShipping">FREE Shipping (Tracked & Insured)</label>
          <p>Free</p>
        </div>
        <div className={styles.shipping_method}>
          <input type="radio" id="expressShipping" name="shippingMethod" />
          <label htmlFor="expressShipping">Express Shipping (2-3 days)</label>
          <p>$9.99</p>
        </div>

       
      </div>

      </div>
     

      {orderDetails}
    </div>
  );
};

export default CheckoutPage;