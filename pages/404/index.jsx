import Link from 'next/link';
import React from 'react';
import styles from'./404.module.css'

const Custom404 = () => {
  return (
    <div className={styles.mainDiv}>
      <h1>Page Not Found</h1>
      <p className={styles.notification404}>The page you are looking for could not be found.</p>
    
      <Link href='/collections' className={styles.continueShopping}>
        <button className={styles.shopNow}>Continue shopping</button></Link>
   
    </div>
  );
};

export default Custom404;