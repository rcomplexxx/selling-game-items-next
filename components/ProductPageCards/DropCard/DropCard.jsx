import Image from "next/image";
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
        <Image height={16} width={16} sizes="16px" loading="lazy" src={`/images/${props.title=='Description'?'description_icon6':
      props.title=='Key features'?'keyIcon7':props.title=='Shipping & Returns'?'shippingReturnIcon2'
      :props.title=='Ask a question'?'chatIcon6':'description'
      }.png`} className={styles.cardIcon}/>
        {props.title}
        </div>
        <Image
        src={'/images/greaterLess3.png'}
        height={16}
        width={16}
          className={`${styles.plusStyle} ${
            showAnswer ? styles.plusStyleRotate : ""
          }`}
        />
         
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
