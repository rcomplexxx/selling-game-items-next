


import React, { useState } from "react";
import styles from "./floatingbadge.module.css";
import Image from "next/image";

export default function FloatingBadge({imageName, message}) {

    const [showDialog, setShowDialog] = useState(false);

  return (
    <>
    {imageName?<Image className={styles.floatingBadge}
    height={0} width={0} sizes="16px"
    src={`/images/${imageName}`}/>
    :<>
    <div onClick={()=>{setShowDialog(!showDialog)}} onMouseEnter={()=>{setShowDialog(true)}} onMouseLeave={()=>{setShowDialog(false)}} className={`${styles.floatingBadge} ${styles.floatingDiv}`}>?</div> 
    <div className={`${styles.explainWrapper} ${showDialog &&  styles.activateExplain}`}>
     <div className={`${styles.explain}`}>{message}</div>
    <div className={`${styles.explainTriangle}`}/>
    </div>
     </>
}
</>
  
  );
}
