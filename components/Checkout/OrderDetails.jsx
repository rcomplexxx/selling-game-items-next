import React, { useState, useMemo} from "react";
import styles from "./orderdetails.module.css";





export function OrderDetailsInfo({products}){


  const [showAnswer, setShowAnswer] = useState(false);
  
  function summonAnswer() {
    setShowAnswer(!showAnswer);
  }

 
  const getProductElements = () => {
    return (
      <>
        {products .map((cp, i) => (
          <div className={styles.order_pair} key={i}>
            <span>
              {cp.quantity} {cp.name}s
            </span>
            <span>
              ${(cp.quantity * cp.price ).toFixed(2)} USD
            </span>
          </div>
        ))}
      </>
    );
  };


  const totalPrice = useMemo(() => {

    let s = 0;
    products.forEach((cp, i) => {
      s = s + cp.quantity * cp.price;
    });
    s = s.toFixed(2);
    return s;
  }, []);






  return <div className={styles.orderWrapper} onClick={summonAnswer}>  
  <div className={styles.orderDiv}><div className={styles.title_div} >
  <h2>Order Summery</h2>
      <span
        className={`${styles.plusStyle} ${
          showAnswer ? styles.plusStyleRotate : ""
        }`}
      >
        ▼
      </span>
    </div>
    <div className={`${styles.emerge} ${showAnswer ? styles.show : ""}`}>
    
      
      {getProductElements()}
      <div className={`${styles.coupon_code} ${styles.order_pair}`}>
        <input id="coupon_code" type="text" placeholder="Coupon code" />
        <button className={styles.apply}>Apply</button>
      </div>
      <div className={styles.order_pair}>
      <span>Subtotal</span>
      <span>${totalPrice} USD</span>
      </div>
      <div className={styles.order_pair}>
        <span>Shipping</span>
        <span>Free</span>
      </div>
     
      <div className={styles.order_pair}>
        <span>Total</span>
        <span>${totalPrice} USD</span>
      </div>
     
    </div>
    </div> 
    </div> 
}



export default function OrderDetails({ children }) {



  




  

 

 

  return (
    <div className={styles.rightWrapper}>
    <div className={styles.checkout_right}>
      <div className={styles.checkout_section}>
  {children}

        
      

        {/* sacuvaj client id vrednost i ostale bitne informacije u .env fajlu */}
     
        
      </div>

      </div>
    </div>
  );
}
