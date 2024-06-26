import Link from "next/link";
import styles from "./checkoutlogo.module.css";
import Image from "next/image";

export default function CheckoutLogo() {
  return (
    <div className={styles.logoWrapper}>
    <div className={styles.logoDiv}>
      <Link href='/cart' className={styles.cartLink}>
      <Image
                  height={0}
                  width={0}
                  sizes="48px"
                  src="/images/bagBlue.png"
                  className={styles.bagImg}
                  alt="cart"
                />

      </Link>
      <Link href='/'>
      <Image className={styles.logo} src="/images/commerce.png" height={0} width={0} sizes={'80px'}/>
      </Link>

    
    </div>
    </div>
  );
}


{/* <div className={styles.bagImgWrapper}>
      <div className={styles.bagImgWrapper2}>
      <img className={styles.bagBlue} src="/images/bagBlue.png" />
</div>
      </div> */}