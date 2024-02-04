import Link from "next/link";
import styles from "./checkoutlogo.module.css";

export default function CheckoutLogo() {
  return (
    <div className={styles.logoDiv}>
      
      <Link href='/'>
      <img className={styles.logo} src="/images/commerce.png" />
      </Link>
    </div>
  );
}


{/* <div className={styles.bagImgWrapper}>
      <div className={styles.bagImgWrapper2}>
      <img className={styles.bagBlue} src="/images/bagBlue.png" />
</div>
      </div> */}