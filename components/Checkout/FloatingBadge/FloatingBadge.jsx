


import React from "react";
import styles from "./floatingbadge.module.css";
import Image from "next/image";

export default function FloatingBadge({imageName}) {
  return (
    <>
    {imageName?<Image className={styles.floatingBadge}
    height={0} width={0} sizes="16px"
    src={`/images/${imageName}`}/>
    :<div className={`${styles.floatingBadge} ${styles.floatingDiv}`}>?</div>}
     </>
  
  );
}
