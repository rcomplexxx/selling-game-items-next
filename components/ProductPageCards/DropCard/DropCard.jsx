import Image from "next/image";
import styles from "./dropCard.module.css";
import { useEffect, useRef, useState } from "react";

export default function DropCard(props) {
  // const [showAnswer, setShowAnswer] = useState(false);

  // function summonAnswer() {
  //   setShowAnswer(!showAnswer);
  // }

  const dropCardAnswerRef= useRef();


    const mounted= useRef(false);
    const emergeTimeoutRef = useRef();
 

    
  // useEffect(()=>{
  //   if(!mounted.current){mounted.current=true; return;}
   
    
  //   let myAnswer=dropCardAnswerRef.current;
  
 
    
  
  // if(showAnswer){


 
  //   myAnswer.style.maxHeight=`${myAnswer.scrollHeight}px`;
  //   emergeTimeoutRef.current= setTimeout(()=>{
  //     myAnswer.style.maxHeight='none'
  //   },500);
    
  // }
  // else{

  //   clearTimeout(emergeTimeoutRef.current);
   

  //   myAnswer.style.maxHeight=`${myAnswer.scrollHeight}px`;
  //   setTimeout(()=>{
  //     myAnswer.style.transition=`max-height 0.5s ease`;
  //     myAnswer.style.maxHeight="0";
  //    }, 1)
  
   
  // }


  // },[showAnswer, mounted.current]);













  return (
    <div className={styles.dropDiv}>
      <button className={styles.title_div} >
        <div className={styles.titleStyleDiv}>
       
        {props.title}
        </div>
       
         
      </button>
      <div
      id={`dropCardAnswer${props.dropCardId}`}
      ref={dropCardAnswerRef}
        className={`${styles.emerge}`}
      >
        {props.children}
      </div>
    </div>
  );
}
