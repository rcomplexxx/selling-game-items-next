import React, { useState } from 'react';
import styles from './fresshippingslider.module.css'





export default function FreeShippingSlider({subtotal}){



    return <div className={styles.shippingSliderWrapper}>
        {subtotal<40 ? <span>
            Add just <span className={styles.boldedSliderText}>${(40-subtotal).toFixed(2)}</span> more to get <span className={styles.boldedSliderText}>FREE SHIPPING</span> 💫
            </span>:
            <span>
            You've unlocked free shipping! 🎉
            </span>
}
        <div className={styles.sliderWrapper}>
     <div className={styles.sliderShell}>
        <div className={styles.sliderCore} style={{width:`${subtotal>40?100:Math.round(subtotal/40 * 100)}%`}}>
    <div className={styles.sliderCircle}/>
        </div>

     </div>
            </div>
    </div>
}