import Image from "next/image";
import styles from "./adminhome.module.css";

export default function AdminHome() {
  return (
    <div className={styles.adminHomeMainDiv}>
      <div className={styles.titleDiv}>
        <h1>Hi Boss!</h1>

        <div className={styles.adminHeroImageDiv}>
          <Image src="/images/hackerLight2Modern2.png" fill />
        </div>
      </div>
    </div>
  );
}
