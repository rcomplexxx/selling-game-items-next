import styles from './dropCard.module.css'
import { useState } from 'react';


export default function DropCard(props) {
    const [showAnswer, setShowAnswer] = useState(false);
  
    function summonAnswer() {
      setShowAnswer(!showAnswer);
    }
  
    return (
      <div className={styles.dropDiv}>
        <button className={styles.title_div} onClick={summonAnswer}>
           {props.title} 
          <span
            className={`${styles.plusStyle} ${
              showAnswer ? styles.plusStyleRotate : ""
            }`}
          >
            ▼
          </span>
        </button>
        <div className={`${styles.emerge} ${showAnswer ? styles.show : ""}`}>
          {props.children}
        </div>
      </div>
    );
  }