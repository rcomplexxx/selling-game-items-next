import Image from "next/image";
import styles from "./adminhome.module.css";
import dynamic from "next/dynamic";
const AdminStatistics = dynamic(()=>{import("./AdminStatistics/AdminStatistics")});

export default function AdminHome() {
  return (
    <div className={styles.adminHomeMainDiv}>
      <div className={styles.titleDiv}>
        <h1>Hi Boss!</h1>

        <div className={styles.adminHeroImageDiv}>
          <Image src="/images/hackerLight2Modern2.png" alt='Hi Boss!' fill />
        </div>
      </div>
      <div className={styles.borderLine}></div>
      <AdminStatistics/>
    </div>
  );
}
