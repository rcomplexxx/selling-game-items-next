import React, { useState } from 'react';
import styles from './fresshippingslider.module.css'





export default function FreeShippingSlider({subtotal}){



    return <div className={styles.shippingSliderWrapper}>
        <span>{subtotal<40?`Want free shipping? Spend $${40-subtotal} more! 💫`:`You've unlocked free shipping! 🎉`}</span>
        <div className={styles.sliderWrapper}>
     <div className={styles.sliderShell}>
        <div className={styles.sliderCore} style={{width:`${subtotal>40?100:Math.round(subtotal/40 * 100)}%`}}>
    <div className={styles.sliderCircle}/>
        </div>

     </div>
            </div>
    </div>
}