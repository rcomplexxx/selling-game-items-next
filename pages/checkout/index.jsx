import React from 'react';
import styles from './checkout.module.css';

const CheckoutPage = () => {
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
      <div className={styles.checkout_right}>
     

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

      </div>

      
    </div>
  );
};

export default CheckoutPage;