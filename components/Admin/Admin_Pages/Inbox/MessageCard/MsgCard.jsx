import styles from "./messagecard.module.css";
import { useState } from "react";

export default function MessageCard({
  id,
  name,
  email,
  message,
  msgStatus,
  handleMsgStatusChange,
}) {
  const changeMsgStatus = () => {
    msgStatus === "0"
      ? handleMsgStatusChange(id, "1")
      : msgStatus === "1"
      ? handleMsgStatusChange(id, "2")
      : handleMsgStatusChange(id, "0");
  };

  return (
    <div className={styles.cardMainDiv}>
      <div className={styles.mainInfo}>
      <h1 className={styles.identifier}>{id + 1}</h1>
      <div className={styles.infoPair}>
         <p>Name</p>
         <p>{name}</p>
      </div>
      <div className={styles.infoPair}>
         <p>Email</p>
         <p>{email}</p>
      </div>
      <button className={styles.msgStatusButton} onClick={changeMsgStatus}>
        {msgStatus === "0"
          ? "Not Answered"
          : msgStatus === "1"
          ? "Answered"
          : "Archived"}
      </button>
      </div>

      <div className={`${styles.infoPair} ${styles.messagePair}`}>
         <p>Message</p>
         <p>{message}</p>
      </div>
     
     
    </div>
  );
}
