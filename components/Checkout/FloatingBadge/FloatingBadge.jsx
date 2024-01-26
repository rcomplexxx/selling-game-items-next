


import React, { useEffect, useRef, useState } from "react";
import styles from "./floatingbadge.module.css";
import Image from "next/image";

export default function FloatingBadge({imageName, message}) {

    const [showDialog, setShowDialog] = useState(false);
    const popupRef = useRef();


    useEffect(() => {
      const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          // Clicked outside the floating div, so close the dialog
          setShowDialog(false);
        }
      };

      if(showDialog){
        document.addEventListener('click', handleClickOutside);
      }
      else{
        document.removeEventListener('click', handleClickOutside);
      }
  
    
  
      return () => {
        if(showDialog) document.removeEventListener('click', handleClickOutside);
      };
    }, [showDialog]);

  

  return (
    <div  className={styles.badgeWrapper}  onClick={()=>{setShowDialog(!showDialog)}} >
    {imageName?<Image className={styles.floatingBadge}
    height={0} width={0} sizes="16px"
    src={`/images/${imageName}`}/>
    :<>
    <div className={`${styles.floatingBadge} ${styles.floatingDiv}`} onMouseEnter={()=>{if(window.matchMedia('(pointer: fine)').matches)setShowDialog(true)}}
     onMouseLeave={()=>{if(window.matchMedia('(pointer: fine)').matches)setShowDialog(false)}}
     onClick={(event)=>{  if(!showDialog)popupRef.current=event.target; setShowDialog(!showDialog);}}
     >?</div> 
        
    <div onClick={(event)=>{event.stopPropagation();setShowDialog(false);}} className={`${styles.explainWrapper} ${showDialog &&  styles.activateExplain}`}>
     <div className={`${styles.explain}`}>{message}</div>
    <div className={`${styles.explainTriangle}`}/>
    </div>
     </>
}
</div>
  
  );
}
