import { useEffect, useRef, useState } from "react";
import PayPalButton from "../PayPal/PayPal";
import StripeWrapper from "../Stripe/Stripe";
import styles from "./paymentmethodwrapper.module.css";
import Image from "next/image";

export default function PaymentSection({ checkFields, organizeUserData, setErrors, products,setCartProducts}) {
    const [paymentMethod, setPaymentMethod] = useState("creditcard");
    const [moreCardsPopupOpen, setMoreCardsPopupOpen] = useState(false);
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

  if(selectedPaymentFields){


 
    selectedPaymentFields.style.maxHeight=`${selectedPaymentFields.scrollHeight}px`;

    nonSelectedPaymentFields.style.transition=`max-height 0s ease`;
    nonSelectedPaymentFields.style.maxHeight=`${nonSelectedPaymentFields.scrollHeight}px`;
    setTimeout(()=>{
      nonSelectedPaymentFields.style.transition=`max-height 0.6s ease`;
      nonSelectedPaymentFields.style.maxHeight=`0`;
     }, 1)
   
     maxHeightTimoutAdj.current=setTimeout(()=>{
      selectedPaymentFields.style.maxHeight=`999px`;
     }, 600)
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
           <div className={styles.CCSolutions}>
            <Image src='/images/cardVisa2.svg' className={styles.creditCardLogo} height={28} width={48}/>
            <Image src='/images/cardMasterCard5.svg' className={styles.creditCardLogo} height={28} width={48}/>
            <Image src='/images/cardAmex2.svg' className={styles.creditCardLogo} height={28} width={48}/>
            <div className={styles.moreCards} onMouseEnter={()=>{setMoreCardsPopupOpen(true)}}
            onMouseLeave={()=>{setMoreCardsPopupOpen(false)}}><span>+3</span>
           
           {moreCardsPopupOpen && <div className={styles.moreCardsPopup}>
            <Image src='/images/cardAmex2.svg' className={styles.creditCardLogo} height={28} width={48}/>
            <Image src='/images/cardAmex2.svg' className={styles.creditCardLogo} height={28} width={48}/>
            <Image src='/images/cardAmex2.svg' className={styles.creditCardLogo} height={28} width={48}/>
            </div>}
            </div>
           </div>
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
           <Image src={'/images/paypalTextLogo2.png'} className={styles.paypalLogo} height={24} width={96} />
        </div>

        <div id='paypalFields' className={`${styles.paymentFields} ${paymentMethod=="paypal" && styles.selectedField}`}>
        <div className={styles.paymentFieldsSpaceAdjuster}> 
        <div className={styles.paypalFieldWrapper}>
          <PayPalButton
            checkFields={checkFields}
            organizeUserData={organizeUserData}
            method="paypal"
            setCartProducts={setCartProducts}
            setErrors={setErrors}
          />
          </div>
        </div>  </div>


        <div className={styles.innerBorder}/>

      </div>
    </>
  );
}
