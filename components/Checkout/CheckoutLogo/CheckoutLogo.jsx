import styles from "./checkoutlogo.module.css";

export default function CheckoutLogo() {
  return (
    <div className={styles.logoDiv}>
      <img className={styles.logo} src="/images/commerce.png" />
    </div>
  );
}
