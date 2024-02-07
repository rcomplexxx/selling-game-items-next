import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
import LinkCard from "./LinkCard/LinkCard";

export default function Footer() {
  const email = useRef();
  const [error, setError] = useState(null);
  const [successful, setSuccessful] = useState(false);

  const handleSubscribe = async () => {
    const emailPattern = /^\w+@\w+\.\w+$/;
    if (!emailPattern.test(email.current.value)) {
      setError("Please enter a valid email address.");
      return;
    } else {
      fetch("/api/sqlliteapi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "subscribers",
          email: email.current.value,
        }), // Send the form data as JSON
      })
        .then((response) => {
          if (response.ok) {
            setSuccessful(true);
            setError(null);
          } else {
            setError("Server error");
          }
        })
        .catch((error) => {
          setError("Server error");
        })
        .finally(() => {
          email.current.value = "";
        });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>
        
      
        <div className={styles.linkCards}>




        <LinkCard title={"Policies"}>
     <div className={styles.footerLinks}>

     <Link href="/faq" className={styles.footerLink}>
           Our story
         </Link>
         
     <Link href="/privacy-policy" className={styles.footerLink}>
           Privacy Policy
         </Link>
         <Link href="/shipping-policy" className={styles.footerLink}>
           Shipping Policy
         </Link>
         <Link href="/shipping-policy" className={styles.footerLink}>
           Refund Policy
         </Link>
         <Link href="/shipping-policy" className={styles.footerLink}>
           Terms of service
         </Link>
       
          </div>

      </LinkCard>
       
    

      <LinkCard title={"Explore"}>

        </LinkCard>



   

      <LinkCard title={"Stay connected"}>
          <div className={styles.connectWrapper}>
        <p className={styles.subscribePharagraph}>
          Join for special updates & discounts 
        </p>
        <div className={styles.subscribeWrapper}>
        <input
          id="subscribe"
          className={styles.subscribeInput}
          placeholder="Enter your email address"
          ref={email}
          onChange={() => {
            if (error) setError(null);
            if (successful) setSuccessful(false);
          }}
        />
 <button className={styles.subscribeButton} onClick={handleSubscribe}>
          Subscribe
        </button>
        </div>
        {error && <p className={styles.subscribeValidationMessage}>{error}</p>}
        {successful && !error && (
          <p
            className={`${styles.subscribeValidationMessage} ${styles.subscribeSuccess}`}
          >
            Successfuly subscribed.
          </p>
        )}
       
        </div>
          </LinkCard>

          <LinkCard title={"Get in touch"}>
     <span className={styles.getInTouch}>
         
     To get in touch with our helpful Customer Service team, please click here . They will respond to all your questions and enquiries ASAP.
       </span>
      </LinkCard>


     </div>
        
        <div  className={styles.paymentsDivWrapper}>
        <div  className={styles.paymentsDiv}>
      
           <Image src='/images/cardVisa2.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardMasterCard5.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
           <Image src='/images/cardAmex2.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
           
          <Image src='/images/cardDiscover3.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardJcb2.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardUnionPay4.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardPaypalWhite3.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardGpay2.svg' className={styles.payments} height={0} width={0} sizes="72px"/>
        </div>
        </div>
        <p className={styles.reservedRightsPharagraph}>
          © 2023, Gamebuff All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
