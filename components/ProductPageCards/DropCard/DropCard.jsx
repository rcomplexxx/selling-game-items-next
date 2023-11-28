import styles from "./dropCard.module.css";
import { useState } from "react";

export default function DropCard(props) {
  const [showAnswer, setShowAnswer] = useState(false);

  function summonAnswer() {
    setShowAnswer(!showAnswer);
  }

  return (
    <div className={styles.dropDiv}>
      <button className={styles.title_div} onClick={summonAnswer}>
        <div className={styles.titleStyleDiv}>
        <img src={`/images/${props.title=='Description'?'description_icon6':
      props.title=='Key features'?'keyIcon7':props.title=='Shipping & Returns'?'shippingReturnIcon2'
      :props.title=='Ask a question'?'chatIcon2':'description'
      }.png`} className={styles.cardIcon}/>
        {props.title}
        </div>
        <span
          className={`${styles.plusStyle} ${
            showAnswer ? styles.plusStyleRotate : ""
          }`}
        >
          ▼
        </span>
      </button>
      <div
        className={`${styles.emerge} ${showAnswer ? styles.show : ""} ${
          showAnswer && props.contactCard && styles.borderRad
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}
