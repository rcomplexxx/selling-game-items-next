import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  const email = useRef();
  const isValidEmailRef = useRef(true);

  const handleInputChange = (event) => {
    
  };

  const handleSubscribe = async () => {
    const emailPattern = /^\w+@\w+\.\w+$/;
    if (!emailPattern.test(email.current.value)) {
      isValidEmailRef.current = false;
      return;
    } else {
      isValidEmailRef.current = true;
      email.current.value="";
    }

    // Continue with the subscription process
    // ...
  };
  

  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>
        <h1>Stay connected</h1>
        <p>
          Join our newsletters to get the latest SmokeGamerItems updates and
          surprise discounts!
        </p>
        <input
          id="subscribe"
          className={styles.subscribeInput}
          placeholder="Enter your email address"
          ref={email}
          onChange={handleInputChange}
        />
       {!isValidEmailRef.current && (
      <p style={{ color: "orange" }}>Please enter a valid email address.</p>
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
        <p>© 2023, GameSmokeItems All Rights Reserved.</p>
      </div>
    </footer>
  );
}
