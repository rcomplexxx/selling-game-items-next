import { useState } from "react";
import PayPalButton from "../PayPal/PayPal";
import StripeWrapper from "../Stripe/Stripe";
import styles from "./paymentmethodwrapper.module.css";

export default function PaymentSection({ checkFields, organizeUserData, setErrors, products,setCartProducts}) {
    const [paymentMethod, setPaymentMethod] = useState("paypal");
    



  return (
    <>
      <h2 className={styles.paymentTitle}>Payment</h2>
      <p className={styles.paymentNotification}>
        All transactions are secure and encrypted.
      </p>

      <div className={styles.mainWrapper}>
      <div className={`${styles.paymentOptionDiv} ${paymentMethod=="paypal" && styles.selectedOption}`} onClick={()=>{setPaymentMethod("paypal")}} >
           <div className={styles.pickOption}>
            <div className={styles.pickCheck}>
                <div className={styles.ringEffectDiv}></div>
            </div>
            <span>Paypal</span>
           </div>
           <div className={styles.ccSolutions}></div>
        </div>

        <div className={`${styles.paymentFields} ${paymentMethod=="paypal" && styles.selectedField}`}>
        <div className={styles.paymentFieldsSpaceAdjuster}> 
          <PayPalButton
            checkFields={checkFields}
            organizeUserData={organizeUserData}
            method="paypal"
            setCartProducts={setCartProducts}
            setErrors={setErrors}
          />
        </div>  </div>

        <div className={`${styles.paymentOptionDiv} ${paymentMethod=="creditcard" && styles.selectedOption}`} onClick={()=>{setPaymentMethod("creditcard")}}>
           <div className={styles.pickOption}>
            <div className={styles.pickCheck}>
                <div className={styles.ringEffectDiv}></div>
            </div>
            <span>Credit Card</span>
           </div>
           <div className={styles.ccSolutions}></div>
        </div>

        <div  className={`${styles.paymentFields} ${paymentMethod=="creditcard" && styles.selectedField}`}>
            <div className={styles.paymentFieldsSpaceAdjuster}> 
          <StripeWrapper
            setCartProducts={setCartProducts}
            products={products}
            organizeUserData={organizeUserData}
            checkFields={checkFields}
          />
          </div>
        </div>
      </div>
    </>
  );
}
