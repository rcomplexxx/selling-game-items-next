import React from "react";
import  Link  from "next/link";
import styles from './footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.mainDiv}>

    <h1>Stay connected</h1>
    <p>Join our newsletters to get the latest SmokeGamerItems updates and surprise discounts!</p>
    <input className={styles.subscribeInput} placeholder="Enter your email address"></input>
    <button className={styles.subscribeButton}>Subscribe</button>
      <div className={styles.footerLinks}>
      <Link href="/" className={styles.footerLink}>Home</Link>
        <Link href="/products" className={styles.footerLink}>Shop</Link>
        <Link href="/trackorder" className={styles.footerLink}>Track order</Link>
        <Link href="/faq" className={styles.footerLink}>FAQ</Link>
        <Link href="/aboutus" className={styles.footerLink}>About Us</Link>
        <Link href="/contactus" className={styles.footerLink}>Contact Us</Link>   
        <Link href="/privacypolicy" className={styles.footerLink}>Privacy Policy</Link>
        <Link href="/shippingpolicy" className={styles.footerLink}>Shipping Policy</Link>
      </div>

         
     <img className={styles.payments} src='/images/american-express.png' alt='pay'/>
    
     
      <p>© 2023, GameSmokeItems All Rights Reserved.</p>
      </div>
    </footer>
  );
}



