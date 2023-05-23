import React from "react";
import  Link  from "next/link";
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
      <Link href="/" className={styles.footerLink}>Home</Link>
        <Link href="/shop" className={styles.footerLink}>Shop</Link>
        <Link href="/track-order" className={styles.footerLink}>Track order</Link>
        <Link href="/faq" className={styles.footerLink}>FAQ</Link>
        <Link href="/aboutus" className={styles.footerLink}>About Us</Link>
        <Link href="/contactus" className={styles.footerLink}>Contact Us</Link>   
        <Link href="/privacypolicy" className={styles.footerLink}>Privacy Policy</Link>
        <Link href="/shippingpolicy" className={styles.footerLink}>Shipping Policy</Link>
      </div>
    </footer>
  );
}



