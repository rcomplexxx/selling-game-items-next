import { useEffect, useRef, useState } from "react";
import PayPalButton from "../PayPal/PayPal";
import StripeWrapper from "../Stripe/Stripe";
import styles from "./paymentmethodwrapper.module.css";

export default function PaymentSection({ checkFields, organizeUserData, setErrors, products,setCartProducts}) {
    const [paymentMethod, setPaymentMethod] = useState("creditcard");
    const [fieldScrollHeight, setFieldScrollHeight]= useState(0);
    const maxHeightTimoutAdj = useRef();
    
  useEffect(()=>{

    clearTimeout(maxHeightTimoutAdj.current);


    let selectedPaymentFields;
    let nonSelectedPaymentFields;
    if(paymentMethod=='creditcard'){
    selectedPaymentFields = document.getElementById('creditCardFields');
    nonSelectedPaymentFields=  document.getElementById('paypalFields');
    }
  else if(paymentMethod=='paypal'){
  selectedPaymentFields = document.getElementById('paypalFields');
  nonSelectedPaymentFields = document.getElementById('creditCardFields');
  }

  if(selectedPaymentFields){console.log('payment fields detected')


  const containerHeight = selectedPaymentFields.scrollHeight;
    // Set the max-height to a precise number (e.g., 300 pixels)
    console.log(containerHeight);
    setFieldScrollHeight(containerHeight);
    selectedPaymentFields.style.maxHeight=`${containerHeight}px`;

    nonSelectedPaymentFields.style.transition=`max-height 0s ease`;
    nonSelectedPaymentFields.style.maxHeight=`${nonSelectedPaymentFields.scrollHeight}px`;
    setTimeout(()=>{
      nonSelectedPaymentFields.style.transition=`max-height 0.795s ease`;
      nonSelectedPaymentFields.style.maxHeight=`0`;
     }, 5)
   
     maxHeightTimoutAdj.current=setTimeout(()=>{
      selectedPaymentFields.style.maxHeight=`999px`;
     }, 800)
  }


  },[paymentMethod]);
  


  return (
    <>
      <h2 className={styles.paymentTitle}>Payment</h2>
      <p className={styles.paymentNotification}>
        All transactions are secure and encrypted.
      </p>

      <div className={styles.mainWrapper}>
       
      
        <div className={`${styles.paymentOptionDiv} ${paymentMethod=="creditcard" && styles.selectedOption}`} onClick={()=>{setPaymentMethod("creditcard")}}>
           <div className={styles.pickOption}>
            <div className={`${styles.pickCheck} ${paymentMethod=="creditcard" && styles.pickCheckSelected}`}>
                <div className={paymentMethod=="creditcard" && styles.ringEffectDiv}></div>
            </div>
            <span>Credit Card</span>
           </div>
           <div className={styles.ccSolutions}></div>
        </div>

        <div id='creditCardFields'  className={`${styles.paymentFields} ${paymentMethod=="creditcard" && styles.selectedField}`}>
            <div className={styles.paymentFieldsSpaceAdjuster}> 
          <StripeWrapper
            setCartProducts={setCartProducts}
            products={products}
            organizeUserData={organizeUserData}
            checkFields={checkFields}
          />
          </div>
        </div>






        <div className={`${styles.paymentOptionDiv} ${paymentMethod=="paypal" && styles.selectedOption}`} onClick={()=>{setPaymentMethod("paypal")}} >
           <div className={styles.pickOption}>
            <div className={`${styles.pickCheck} ${paymentMethod=="paypal" && styles.pickCheckSelected}`}>
                <div className={paymentMethod=="paypal" && styles.ringEffectDiv}></div>
            </div>
            <span>Paypal</span>
           </div>
           <div className={styles.ccSolutions}></div>
        </div>

        <div id='paypalFields' className={`${styles.paymentFields} ${paymentMethod=="paypal" && styles.selectedField}`}>
        <div className={styles.paymentFieldsSpaceAdjuster}> 
          <PayPalButton
            checkFields={checkFields}
            organizeUserData={organizeUserData}
            method="paypal"
            setCartProducts={setCartProducts}
            setErrors={setErrors}
          />
        </div>  </div>


        <div className={styles.innerBorder}/>

      </div>
    </>
  );
}
