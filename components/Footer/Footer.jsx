import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const email = useRef();
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [successful, setSuccessful]=useState(false);


  const handleSubscribe = async () => {
    
    const emailPattern = /^\w+@\w+\.\w+$/;
    if (!emailPattern.test(email.current.value)) {
      setIsValidEmail(false);
      return;
    } else {
      setIsValidEmail(false);
      email.current.value='';
      setSuccessful(true);
    }
    

    // Continue with the subscription process
    // ...
  };
  

  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>
        <h1 className={styles.subscribeTitle}>Stay connected</h1>
        <p className={styles.subscribePharagraph}>
          Join our newsletters to get the latest Gamesmoke shop updates and
          surprise discounts!
        </p>
        <input
          id="subscribe"
          className={styles.subscribeInput}
          placeholder="Enter your email address"
         
         
          ref={email}
          onChange={()=>{ if(!isValidEmail) setIsValidEmail(true);}}
        />
       {!successful && !isValidEmail && (
      <p className={styles.subscribeValidationMessage}>Please enter a valid email address.</p>
    )}
    {successful &&  !isValidEmail && (
      <p className={`${styles.subscribeValidationMessage} ${styles.subscribeSuccess}`}>Successfuly subscribed.</p>
    )}
        <button className={styles.subscribeButton} onClick={handleSubscribe}>
          Subscribe
        </button>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.footerLink}>
            Home
          </Link>
          <Link href="/products" className={styles.footerLink}>
            Shop
          </Link>
          <Link href="/faq" className={styles.footerLink}>
            FAQ
          </Link>
          <Link href="/aboutus" className={styles.footerLink}>
            About Us
          </Link>
          <Link href="/contactus" className={styles.footerLink}>
            Contact Us
          </Link>
          <Link href="/privacypolicy" className={styles.footerLink}>
            Privacy Policy
          </Link>
          <Link href="/shippingpolicy" className={styles.footerLink}>
            Shipping Policy
          </Link>
        </div>
        <img
          className={styles.payments}
          src="/images/paymentsNoBg.png"
          alt="pay"
        />
        <p className={styles.reservedRightsPharagraph}>© 2023, GameSmoke Shop All Rights Reserved.</p>
      </div>
    </footer>
  );
}
