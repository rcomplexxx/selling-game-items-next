import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const email = useRef();
  const [error, setError] = useState(null);
  const [successful, setSuccessful]=useState(false);




 


  const handleSubscribe = async () => {
    
    const emailPattern = /^\w+@\w+\.\w+$/;
    if (!emailPattern.test(email.current.value)) {
     
      setError('Please enter a valid email address.');
      return;
    } else {
     



      fetch('/api/sqlliteapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({table:'subscribers', email:email.current.value}), // Send the form data as JSON
      })
        .then((response) => {
          if (response.ok) {
            setSuccessful(true);
            setError(null);
          } else {
            setError('Server error');
          }
        })
        .catch((error) => {
          setError('Server error');
        })
        .finally(()=>{
          
          email.current.value='';
          
        });


     
    }
  
  };
  

  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>
        <h1 className={styles.subscribeTitle}>Stay connected</h1>
        <p className={styles.subscribePharagraph}>
          Join our newsletters to get the latest Gamebuff updates and
          surprise discounts!
        </p>
        <input
          id="subscribe"
          className={styles.subscribeInput}
          placeholder="Enter your email address"
         
         
          ref={email}
          onChange={()=>{ if(error) setError(null); if(successful)setSuccessful(false)}}
        />
       {error && (
      <p className={styles.subscribeValidationMessage}>{error}</p>
    )}
    {successful &&  !error && (
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
        <p className={styles.reservedRightsPharagraph}>© 2023, Gamebuff All Rights Reserved.</p>
      </div>
    </footer>
  );
}
