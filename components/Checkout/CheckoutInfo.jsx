import React, { useState } from "react";
import styles from "./checkoutinfo.module.css";

export default function CheckoutInfo() {
  const [errors, setErrors] = useState({});
  const [billingAddress, setBillingAddress] = useState("sameAddress");



  

  const handleBlur = (event) => {
    const { id, value } = event.target;

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: id.replace(/^\w/, (c) => c.toUpperCase()) + " is required field.",
      }));
    } else {
      if (id === "email" && !/\S+@\S+\.\S+/.test(value))
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: "Please enter a valid email address.",
        }));
      else setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };

  const errorPharagraph = (error) => <p className={styles.error}>{error}</p>;

  const handleChange = (event) => {
    const { id, value } = event.target;
    if (!errors[id]) return;
    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };


  const handleBillingAddressChange = (event) => {
    const { id } = event.target;
    setBillingAddress(id);
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
              className={
                styles.input_field +
                " " +
                (errors.email ? styles.input_error : null)
              }
            />
            {errors.email && errorPharagraph(errors.email)}
          </div>
          <h2>Shipping information</h2>
          <p>Fields marked with * are required</p>

          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="firstName">First name *</label>
              <input
                type="text"
                id="firstName"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.firstName ? styles.input_error : null)
                }
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
                className={
                  styles.input_field +
                  " " +
                  (errors.lastName ? styles.input_error : null)
                }
              />
              {errors.lastName && errorPharagraph(errors.lastName)}
            </div>
          </div>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="address">Address *</label>
              <input
                type="text"
                id="address"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.address ? styles.input_error : null)
                }
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
                className={
                  styles.input_field +
                  " " +
                  (errors.apt ? styles.input_error : null)
                }
              />
              {errors.apt && errorPharagraph(errors.apt)}
            </div>
          </div>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.country ? styles.input_error : null)
                }
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
                className={
                  styles.input_field +
                  " " +
                  (errors.postcode ? styles.input_error : null)
                }
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
                className={
                  styles.input_field +
                  " " +
                  (errors.state ? styles.input_error : null)
                }
              />
              {errors.state && errorPharagraph(errors.state)}
            </div>
          </div>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="suburb">Suburb *</label>
              <input
                type="text"
                id="suburb"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.suburb ? styles.input_error : null)
                }
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
                className={
                  styles.input_field +
                  " " +
                  (errors.phone ? styles.input_error : null)
                }
              />
              {errors.phone && errorPharagraph(errors.phone)}
            </div>
          </div>
        </form>
      </div>

      <div
        className={
          styles.checkout_section + " " + styles.billing_information_div
        }
      >
        <h2>Billing Address</h2>
        <div className={styles.billing_options}>
          <div className={styles.billing_option}>
            <input type="radio" id="sameAddress" name="billingAddress" 
             checked={billingAddress === "sameAddress"}
             onChange={handleBillingAddressChange}/>
            <label htmlFor="sameAddress">Same as shipping address</label>
          </div>
          <div className={styles.billing_option}>
            <input type="radio" id="differentAddress" name="billingAddress" 
            
             checked={billingAddress === "differentAddress"}
             onChange={handleBillingAddressChange}
             
             />
            <label htmlFor="differentAddress">
              Use a different billing address
            </label>
          </div>
        </div>
        {billingAddress === "differentAddress" && <form>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="billingAddress">Address *</label>
              <input
                type="text"
                id="billingAddress"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingAddress ? styles.input_error : null)
                }
              />
              {errors.billingAddress && errorPharagraph(errors.billingAddress)}
            </div>
            <div className={styles.form_group}>
              <label htmlFor="billingApt">Apt, suite, etc. (optional)</label>
              <input
                type="text"
                id="billingApt"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingApt ? styles.input_error : null)
                }
              />
            </div>
          </div>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="billingCountry">Country *</label>
              <input
                type="text"
                id="billingCountry"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingCountry ? styles.input_error : null)
                }
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="billingPostcode">Postcode *</label>
              <input
                type="text"
                id="billingPostcode"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingPostcode ? styles.input_error : null)
                }
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="billingState">State *</label>
              <input
                type="text"
                id="billingState"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingState ? styles.input_error : null)
                }
              />
            </div>
          </div>
          <div className={styles.input_row}>
            <div className={styles.form_group}>
              <label htmlFor="billingSuburb">Suburb *</label>
              <input
                type="text"
                id="billingSuburb"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingSuburb ? styles.input_error : null)
                }
              />
            </div>
            <div className={styles.form_group}>
              <label htmlFor="billingPhone">Phone *</label>
              <input
                type="text"
                id="billingPhone"
                onBlur={handleBlur}
                onChange={handleChange}
                className={
                  styles.input_field +
                  " " +
                  (errors.billingPhone ? styles.input_error : null)
                }
              />
            </div>
          </div>
        </form>}
      </div>

      <div className={styles.checkout_section}>
        <h2>Shipping Method</h2>
        <div className={styles.shipping_method}>
          <input type="radio" id="freeShipping" name="shippingMethod" />
          <label htmlFor="freeShipping">
            FREE Shipping (Tracked & Insured)
          </label>
          <p>Free</p>
        </div>
        <div className={styles.shipping_method}>
          <input type="radio" id="expressShipping" name="shippingMethod" />
          <label htmlFor="expressShipping">Express Shipping (2-3 days)</label>
          <p>$9.99</p>
        </div>
      </div>
    </div>
  );
}
