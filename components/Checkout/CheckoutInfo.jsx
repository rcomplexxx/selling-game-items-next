import React, { useState } from "react";
import styles from "./checkoutinfo.module.css";
import InputField from "./Input/InputField";

export default function CheckoutInfo({ setUnlockPaypal }) {
  const [errors, setErrors] = useState({});
  const [billingAddressType, setBillingAddressType] = useState("sameAddress");

  const handleBlur = (event) => {
    const { id, value } = event.target;
    let errorMessage = null;

    if (!value) {
      errorMessage = `${id.replace(/^\w/, (c) =>
        c.toUpperCase()
      )} is a required field.`;
    } else if (id === "email" && !/\S+@\S+\.\S+/.test(value)) {
      errorMessage = "Please enter a valid email address.";
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: errorMessage,
    }));
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    const errorLength = Object.keys(errors).length;
    const inputNumber = billingAddressType === "sameAddress" ? 9 : 15;

    const setErrorMessage = (message) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [id]: message,
      }));
      setUnlockPaypal(false);
    };

    if (errorLength >= inputNumber - 1) {
      if (!value) {
        
        setErrorMessage(`${id} is a required field.`);
        
      }

      else if (id === "email" && !/\S+@\S+\.\S+/.test(value)) {
        setErrorMessage("Please enter a valid email address.");
        return;
      }

      else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [id]: null,
        }));
        setUnlockPaypal(
          errorLength===inputNumber && Object.entries(errors).every(
            
            ([key, value]) => key === id ||  value === null
          )
        );
       
      }
      
     
      return;
    }

    if (!errors[id]) return;

    if (value) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };

  const handleFocus = (event) => {
    const { id } = event.target;
    if (!errors[id] && !Object.keys(errors).length == inputNumber - 1) {
      setErrors((prevErrors) => ({ ...prevErrors, [id]: null }));
    }
  };

  const handleBillingAddressTypeChange = (event) => {
    const { id } = event.target;
    if (id === billingAddressType) return;
    if (id === "sameAddress") {
      const {
        billingAddress,
        billingCountry,
        billingState,
        billingSuburb,
        billingPostcode,
        billingPhone,
        ...newErrors
      } = errors;
      setErrors(newErrors);
      if (Object.keys(newErrors).length === 9) {
        setUnlockPaypal(
          Object.values(newErrors).every((value) => value === null)
        );
      }
    } else setUnlockPaypal(false);
    setBillingAddressType(id);
  };

  return (
    <div className={styles.checkout_left}>
      <div className={styles.checkout_section}>
        <h2>Contact Information</h2>
        <form>
          <InputField
            id="email"
            placeHolder="Email *"
            type="email"
            handleBlur={handleBlur}
            handleChange={handleChange}
            handleFocus={handleFocus}
            error={errors.email}
          >
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </InputField>

          <h2>Shipping information</h2>
          <p>Fields marked with * are required</p>

          <div className={styles.input_row}>
            <InputField
              id="firstName"
              placeHolder="First name *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.firstName}
            />
            <InputField
              id="lastName"
              placeHolder="Last name *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.lastName}
            />
          </div>
          <div className={styles.input_row}>
            <InputField
              id="address"
              placeHolder="Address *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.address}
            />

            <InputField
              id="apt"
              placeHolder="Apt, suite, etc. (optional)"
              type="text"
            />
          </div>
          <div className={styles.input_row}>
            <InputField
              id="country"
              placeHolder="Country *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.country}
            />
            <InputField
              id="postcode"
              placeHolder="Postcode *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.postcode}
            />
            <InputField
              id="state"
              placeHolder="State *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.state}
            />
          </div>
          <div className={styles.input_row}>
            <InputField
              id="suburb"
              placeHolder="Suburb *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.suburb}
            />
            <InputField
              id="phone"
              placeHolder="Phone *"
              type="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              handleFocus={handleFocus}
              error={errors.phone}
            />
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
            <input
              type="radio"
              id="sameAddress"
              name="billingAddressType"
              checked={billingAddressType === "sameAddress"}
              onChange={handleBillingAddressTypeChange}
            />
            <label htmlFor="sameAddress">Same as shipping address</label>
          </div>
          <div className={styles.billing_option}>
            <input
              type="radio"
              id="differentAddress"
              name="billingAddressType"
              checked={billingAddressType === "differentAddress"}
              onChange={handleBillingAddressTypeChange}
            />
            <label htmlFor="differentAddress">
              Use a different billing address
            </label>
          </div>
        </div>
        {billingAddressType === "differentAddress" && (
          <form>
            <div className={styles.input_row}>
              <InputField
                id="billingAddress"
                placeHolder="Address *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingAddress}
              />

              <InputField
                id="billingApt"
                placeHolder="Apt, suite, etc. (optional)"
                type="text"
              />
            </div>
            <div className={styles.input_row}>
              <InputField
                id="billingCountry"
                placeHolder="Country *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingCountry}
              />
              <InputField
                id="billingPostcode"
                placeHolder="Postcode *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingPostcode}
              />
              <InputField
                id="billingState"
                placeHolder="State *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingState}
              />
            </div>
            <div className={styles.input_row}>
              <InputField
                id="billingSuburb"
                placeHolder="Suburb *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingSuburb}
              />
              <InputField
                id="billingPhone"
                placeHolder="Phone *"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                handleFocus={handleFocus}
                error={errors.billingPhone}
              />
            </div>
          </form>
        )}
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
