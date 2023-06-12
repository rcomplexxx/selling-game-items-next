import React, { useState } from "react";
import styles from './checkoutinfo.module.css';

export default function CheckoutInfo() {

  
  const [errors, setErrors] = useState({});

  const handleBlur = (event) => {
    const { id, value } = event.target;

    if (!value) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: "This field is empty." }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };

  const errorPharagraph=(error)=> <p className={styles.error}>{error}</p>;

  const handleChange=(event)=>{
    const {id,value}=event.target;
    if(!errors[id])return;
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };
  

  return (
    <div className={styles.checkout_left}>
      <div className={styles.checkout_section}>
        <h2>Contact Information</h2>
        <form>
          <div className={styles.form_group}>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.email && errorPharagraph(errors.email)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="firstName">First name *</label>
            <input
              type="text"
              id="firstName"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.firstName && errorPharagraph(errors.firstName)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="lastName">Last name *</label>
            <input
              type="text"
              id="lastName"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.lastName && errorPharagraph(errors.lastName)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="address">Address *</label>
            <input
              type="text"
              id="address"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.address && errorPharagraph(errors.address)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="apt">Apt, suite, etc. (optional)</label>
            <input
              type="text"
              id="apt"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.apt && errorPharagraph(errors.apt)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="country">Country *</label>
            <input
              type="text"
              id="country"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.country && errorPharagraph(errors.country)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="postcode">Postcode *</label>
            <input
              type="text"
              id="postcode"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.postcode && errorPharagraph(errors.postcode)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="state">State *</label>
            <input
              type="text"
              id="state"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.state && errorPharagraph(errors.state)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="suburb">Suburb *</label>
            <input
              type="text"
              id="suburb"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.suburb && errorPharagraph(errors.suburb)}
          </div>
          <div className={styles.form_group}>
            <label htmlFor="phone">Phone *</label>
            <input
              type="text"
              id="phone"
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.phone && errorPharagraph(errors.phone)}
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

    </div>);
}