import React, { useState, useRef } from "react";
import styles from "./checkoutinfo.module.css";
import InputField from "./Input/InputField";
import CountryInput from "./Input/CountryInput/CountryInput";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import GooglePay from "./GooglePay/GooglePay";

export default function CheckoutInfo({ products, setCartProducts }) {
  const [errors, setErrors] = useState({});
  const [shippingType, setShippingType] = useState("free");

  const contactScrollRef = useRef();
  const router = useRouter();

  const handleChange = (event) => {
    if (errors.hasOwnProperty(event.target.id)) {
      const newErrors = { ...errors };
      const field = event.target.id;
      delete newErrors[field];
      setErrors(newErrors);
    }
  };



  const checkFields=()=>{
    let newErrors = {};
    // if(document.getElementById('email').value==='') return actions.reject();
    const testId = (id) => {
      if (document.getElementById(id).value === "") {
        newErrors = { ...newErrors, [id]: `${id} is a required field.` };
      }
    };

    if (document.getElementById("email").value === "") {
      newErrors = { ...newErrors, email: "Email is a required field." };
    }
    if (
      !/^\S{3,}@\S{3,}\.\S{2,}$/.test(document.getElementById("email").value)
    ) {
      newErrors = {
        ...newErrors,
        email: "Please enter a valid email address.",
      };
    }

    testId("firstName");
    testId("lastName");
    testId("address");
    testId("country");
    testId("postcode");
    testId("state");
    testId("suburb");

    const phone = document.getElementById("phone").value; //
    if (phone.length < 5)
      newErrors = { ...newErrors, phone: "Invalid phone" };
    else {
      for (let i = 0; i < phone.length; i++) {
        const char = phone[i];
        if (
          !(
            (char >= "0" && char <= "9") ||
            ["+", "-", "(", ")", " ", ".", "/"].includes(char)
          )
        ) {
          newErrors = { ...newErrors, phone: "Invalid phone" };
        }
      }
    }

    setErrors(newErrors);
    return newErrors;
  }


  const handlePaypalButtonClick = async (data, actions) => {
    try {
      const newErrors = checkFields();

      if (Object.keys(newErrors).length !== 0) {
        window.scrollTo({
          top:
            document
              .getElementById(Object.keys(newErrors)[0])
              .getBoundingClientRect().top +
            window.scrollY -
            12,
          behavior: "smooth",
        });

        return actions.reject();
      }

      return actions.resolve();
    } catch (error) {
      return actions.reject();
    }
  };

  const handlePaypalButtonApprove = async (data, actions) => {
    try {
      console.log("mail to be sent:" + document.getElementById("email").value);
      const response = await fetch("/api/approve-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: data.orderID,
        }),
      });
      // Parse the JSON response

      if (response.ok) {
        console.log("Payment was successful");
        // Handle successful payment logic here
        setCartProducts([]);
        router.push("/thank-you");
      } else {
        const data = await response.json();

        if (data.error === "INSTRUMENT_DECLINED") {
          console.log(data.error);
          return actions.restart();
        } else {
          console.log(data.error);

          // Handle other payment errors here
        }
      }
    } catch (error) {
      console.error("Error capturing payment:", error);
      // Handle fetch or other errors here
    }

    // Payment was successful
  };

  const organizeUserData=(paymentMethod, paymentToken)=>{
    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const apt = document.getElementById("apt").value;
    const country = document.getElementById("country").value;
    const postcode = document.getElementById("postcode").value;
    const state = document.getElementById("state").value;
    const suburb = document.getElementById("suburb").value;
    const phone = document.getElementById("phone").value;
    const discountEl = document.getElementById("discountPrice");
    console.log("disc el", discountEl);
    let discount = "0";
    if (discountEl) {
      discount = discountEl.innerText;
      discount = discount.substring(discount.indexOf("$") + 1).trim();
    }

    const requestData = {
      order: {
        email,
        firstName,
        lastName,
        address,
        apt,
        country,
        postcode,
        state,
        suburb,
        phone,
        discount: discount,
        items: products.map((product) => ({
          id: product.id,
          quantity: product.quantity,
          variant: product.variant
        })),
      },
      paymentMethod: paymentMethod,
      paymentToken: paymentToken

      // Include other payment-related data if required
    };
    return requestData
  }

  async function handlePaypalOrder(paymentMethod, paymentToken) {

    try {
      const requestData = organizeUserData(paymentMethod, paymentToken);
     
        const response = await fetch("/api/make-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });
    
        const order = await response.json();
    
        if (order.success) {
          console.log("order id returned", order.orderId);
          return order.orderId;
        } else {
          console.log(order.message);
          return;
        }
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    
  }

  return (
    <>
      <div className={styles.leftWrapper}>
        <div className={styles.checkout_left}>
          <div className={styles.checkout_section}>
            <h2 ref={contactScrollRef}>Contact</h2>
            <form>
              <div className={styles.input_row}>
                <InputField
                  id="email"
                  placeHolder="Email"
                  type="email"
                  handleChange={handleChange}
                  error={errors.email}
                >
                  {errors.email && (
                    <p className={styles.error}>{errors.email}</p>
                  )}
                </InputField>
              </div>

              <h2
                className={
                  Object.keys(errors).length > 0
                    ? styles.deliveryTitle
                    : styles.deliveryTitleNormal
                }
              >
                Delivery
              </h2>
              {Object.keys(errors).length > 0 && (
                <p className={styles.requiredNote}>
                  Fields marked with * are required.
                </p>
              )}

              <div className={styles.input_row}>
                <InputField
                  id="firstName"
                  placeHolder="First name"
                  type="text"
                  handleChange={handleChange}
                  error={errors.firstName}
                />
                <InputField
                  id="lastName"
                  placeHolder="Last name"
                  type="text"
                  handleChange={handleChange}
                  error={errors.lastName}
                />
              </div>
              <div className={styles.input_row}>
                <InputField
                  id="address"
                  placeHolder="Address"
                  type="text"
                  handleChange={handleChange}
                  error={errors.address}
                />

                <InputField
                  id="apt"
                  placeHolder="Apartment, suite, etc. (Optional)"
                  type="text"
                />
              </div>
              <div className={styles.input_row}>
                <CountryInput
                  id="country"
                  setErrors={setErrors}
                  error={errors.country}
                  inputNumber={9}
                />
                <InputField
                  id="postcode"
                  placeHolder="Postcode"
                  type="text"
                  handleChange={handleChange}
                  error={errors.postcode}
                />
                <InputField
                  id="state"
                  placeHolder="State"
                  type="text"
                  handleChange={handleChange}
                  error={errors.state}
                />
              </div>
              <div className={styles.input_row}>
                <InputField
                  id="suburb"
                  placeHolder="Suburb"
                  type="text"
                  handleChange={handleChange}
                  error={errors.suburb}
                />
                <InputField
                  id="phone"
                  placeHolder="Phone"
                  type="tel"
                  handleChange={handleChange}
                  error={errors.phone}
                />
              </div>
            </form>
          </div>

          <div className={styles.checkout_section}>
            <h2>Shipping Method</h2>
            <label className={styles.shipping_method}>
              <input
                type="radio"
                id="freeShipping"
                name="shippingMethod"
                checked={shippingType === "free"}
                className={styles.radioButton}
                onChange={() => {
                  setShippingType("free");
                }}
              />
              <span
                className={`${styles.checkmark} ${
                  shippingType !== "free" && styles.unselectedCheckmark
                }`}
              ></span>
              <span
                className={
                  shippingType === "free"
                    ? styles.checkMarkText
                    : styles.unselectedCheckmarkText
                }
              >
                {" "}
                FREE Shipping (Tracked & Insured){" "}
                <span className={styles.shipping_method_sp}>Free</span>
              </span>
            </label>
            <label className={styles.shipping_method}>
              <input
                type="radio"
                id="expressShipping"
                name="shippingMethod"
                checked={shippingType === "express"}
                className={styles.radioButton}
                onChange={() => {
                  setShippingType("express");
                }}
              />
              <span
                className={`${styles.checkmark}  ${
                  shippingType === "free" && styles.unselectedCheckmark
                }`}
              ></span>
              <span
                className={
                  shippingType !== "free"
                    ? styles.checkMarkText
                    : styles.unselectedCheckmarkText
                }
              >
                Express Shipping (2-3 days){" "}
                <span className={styles.shipping_method_sp}>$9.99</span>
              </span>
            </label>
          </div>
          <h2 className={styles.paymentTitle}>Payment</h2>
          <p className={styles.paymentNotification}>
            All transactions are secure and encrypted.
          </p>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AQB3vOguzerJ-HXgJavEAMlivjs3DTNyWi2W7yKI94arI23zXOAaSJx4Zf4JzTO9RjvJdr5AflrFHWp1",
            }}
          >
            {/* 
          da prikazem spinner*/}
            <PayPalButtons
              fundingSource="paypal"
              onClick={handlePaypalButtonClick}
              onApprove={handlePaypalButtonApprove}
              createOrder={async()=>{return await handlePaypalOrder('PAYPAL')}}
            />

            <PayPalButtons
              fundingSource="card"
              onClick={handlePaypalButtonClick}
              onApprove={handlePaypalButtonApprove}
              createOrder={async()=>{return await handlePaypalOrder('PAYPAL')}}
            />
          </PayPalScriptProvider>
          <GooglePay checkFields={checkFields} organizeUserData={(paymentToken)=>{return organizeUserData('GPAY', paymentToken)}} />
        </div>
      </div>
    </>
  );
}
