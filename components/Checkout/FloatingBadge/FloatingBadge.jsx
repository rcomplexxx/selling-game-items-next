


import React, { useState } from "react";
import styles from "./floatingbadge.module.css";
import Image from "next/image";

export default function FloatingBadge({imageName}) {

    const [showDialog, setShowDialog] = useState(false);

  return (
    <>
    {imageName?<Image className={styles.floatingBadge}
    height={0} width={0} sizes="16px"
    src={`/images/${imageName}`}/>
    :<>
    <div onClick={()=>{setShowDialog(!showDialog)}} onMouseEnter={()=>{setShowDialog(true)}} onMouseLeave={()=>{setShowDialog(false)}} className={`${styles.floatingBadge} ${styles.floatingDiv}`}>?</div> 
    {showDialog && <><div className={styles.explain}>3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.</div>
    <div className={styles.explainTriangle}></div> </>}
     </>
}
</>
  
  );
}
