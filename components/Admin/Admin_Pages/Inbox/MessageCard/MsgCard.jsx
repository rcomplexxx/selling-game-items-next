import styles from "./messagecard.module.css";
import { useState } from "react";

export default function MessageCard({
  id,
  info,
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
      <h1 className={styles.identifier}>{id + 1}</h1>
      <p>{info}</p>
      <button className={styles.msgStatusButton} onClick={changeMsgStatus}>
        {msgStatus === "0"
          ? "Not Answered"
          : msgStatus === "1"
          ? "Answered"
          : "Archived"}
      </button>
    </div>
  );
}
