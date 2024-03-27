import React, {
    useState,
    useMemo,
    useEffect,
    useRef,
  } from "react";
  import styles from "./orderdetails.module.css";
  import Image from "next/image";
  import coupons from "@/data/coupons.json";
  
  export default function OrderDetails({ discount, setDiscount,tip, products }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponValidCode, setCouponValidCode] = useState("");
    const [couponError, setCouponError] = useState(false);
    const summeryDivRef = useRef();
    const expendHeightTimeout = useRef();
    const mountedRef=useRef();
  
   

   


      useEffect(()=>{

        if(!mountedRef.current){mountedRef.current=true; return;}

        clearTimeout(expendHeightTimeout.current);


        const summeryDiv = summeryDivRef.current;
        if(showAnswer){

          summeryDiv.style.maxHeight = `${summeryDiv.scrollHeight}px`;
          expendHeightTimeout.current=setTimeout(()=>{
       
            summeryDiv.style.maxHeight=`none`;
           }, 300)

      }

        else {



          summeryDiv.style.transition=`max-height 0s ease`;
          summeryDiv.style.maxHeight=`${summeryDiv.scrollHeight}px`;
          setTimeout(()=>{
            summeryDiv.style.transition=`max-height 0.3s ease`;
            summeryDiv.style.maxHeight =0;
           }, 1)



        }



      },[showAnswer])

  

   
  
    const prices = useMemo(() => {
      console.log('tip', tip)
      let s = 0;
      products.forEach((cp, i) => {
        s = s + cp.quantity * cp.price;
      });
      s = s.toFixed(2);
      let discountPrice = 0;
      if (discount.discount != 0) discountPrice = ((s * discount.discount) / 100).toFixed(2);
     
      const total = (s  - discountPrice + parseFloat(tip)).toFixed(2);
      return { subTotal: s, discount: discountPrice, total: total };
    }, [products, tip, discount]);




const handleCouponApply = () => {
    if (couponCode === "") return;
    const newCoupon = coupons.find((c) => {
      return c.code.toUpperCase() === couponCode.toUpperCase();
    });
    if (newCoupon) {
        setCouponValidCode(newCoupon.code.toUpperCase())
      setDiscount({code: newCoupon.code, discount:newCoupon.discountPercentage});
      setCouponError(false);
      setCouponCode("");
    } else if(!couponValidCode) setCouponError(true);
  }



    
  
    return (
      <div className={styles.rightWrapper}>
        <div id="checkout_right" className={styles.checkout_right}>
        
           
              <div className={styles.title_div} onClick={()=>{ setShowAnswer(!showAnswer);}}>
               
                  <div className={styles.titleWrapper}>
                    <div className={styles.mobileTitle}>
                      Order summery
                      <Image
                        src={"/images/greaterLessx.png"}
                        height={8}
                        width={8}
                        alt="arrow"
                        className={`${styles.arrowImg} ${
                          !showAnswer && styles.arrowDown
                        }`}
                      />
                    </div>
                  </div>
  
                  <div className={styles.mainPriceDiv}>
                  {discount.code!="" && <span className={styles.mainPriceSub}>${prices.subTotal}</span>}
                  <span className={styles.mainPrice}>${prices.total}</span>
                  
                  </div>
             
              </div>
  
              <div
              ref={summeryDivRef}
                className={styles.emerge}
              >
                <div className={styles.orderDiv}>
                 
                 {products.map((cp, i) => (
            <div className={styles.order_pair} key={i}>
              <div className={styles.productImageDiv}>
                <Image
                  className={styles.productImage}
                  src={`/images/${cp.image}`}
                  alt={`${cp.name}`}
                  height={0}
                  width={0}
                  sizes="25vw"
                />
                <div className={styles.productTitleDiv}>
                <span>
                  {cp.quantity} {cp.name}s
                </span>
                <span className={styles.variant}>
                  {cp.variant}
                </span>
                </div>
              </div>
              <span>${(cp.quantity * cp.price).toFixed(2)}</span>
            </div>
          ))}
                  <div className={styles.coupon_code}>
                    <div className={styles.form_group}>
                      <input
                        id="coupon_code"
                        type="text"
                        value={couponCode}
                        onChange={(event) => {
                          setCouponCode(event.target.value);
                        }}
                        onKeyUp={(e) => e.key === 'Enter' && handleCouponApply()}
                        className={`${styles.coupon_code_input} ${
                          couponError && styles.coupon_code_input_error
                        }`}
                        placeholder={" "}
                      />
                      <label htmlFor={"coupon_code"} className={styles.myLabel}>
                        Coupon code
                      </label>
                      {couponError && (
                    <p className={styles.couponError}>
                      Enter a valid discount code or gift card
                    </p>
                  )}

                {couponValidCode &&
                  <div className={styles.mainCouponCode}> 
                      <Image src='/images/discount7.png' className={styles.mainDiscountImg} height={16} width={16}/>
                      <span>{couponValidCode}</span>
                      <Image src='/images/cancelWhite.png' onClick={(()=>{setCouponValidCode(undefined);setDiscount({code: '', discount: 0});})}
                       className={styles.discountCancelImage} height={16} width={16}/>
                      </div>
                   }


                    </div>


                    <button
                      className={`${styles.apply} ${
                        couponCode !== "" && styles.applyEnabled
                      }`}
                      onClick={handleCouponApply}
                    >
                      Apply
                    </button>
                  </div>

                 
        

                 
  
                  <div className={styles.order_pair}>
                    <span>Subtotal</span>
                    <span>${prices.subTotal}</span>
                  </div>
                  {couponValidCode && (
                    <>
                    
                      <span className={styles.discountPairTitle}>Order Discount</span>
                     

                    <div className={`${styles.order_pair} ${styles.discountPair}`}>
                    <div className={styles.discountCodeDiv}>
                        <Image src='/images/discount7.png' className={styles.discountImg} height={12} width={12}/>
                        <span id="discountCode">{couponValidCode}</span>
                        </div>
                    <span id="discountPrice">- ${prices.discount}</span>
                    </div>
                 </>

                  )}
                  <div className={styles.order_pair}>
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  {tip!==0 && tip!=="" && <div className={styles.order_pair}>
                    <span>Tip</span>
                    <span id="tipPrice">${tip}</span>
                  </div>}

                  
  
                  <div className={styles.order_pair}>
                    
                        <span className={styles.totalText}>Total</span>
                        
                        <div>
                    <span className={styles.currency}>USD</span>
                    <span id='totalPrice' className={styles.total}>${prices.total}</span>
                    </div>
                  </div>

                  {couponValidCode &&
                  <div className={styles.totalDiscount}> 
                      <Image src='/images/totalDiscount2.png' className={styles.totalDiscountImg} height={16} width={16}/>
                      <span className={styles.totalDiscountSpan}>Total savings</span><span className={styles.totalDiscountSpan}>${prices.discount}</span>
                      
                      </div>
  }
                </div>
              </div>
            
  
          {/* sacuvaj client id vrednost i ostale bitne informacije u .env fajlu */}
        </div>
      </div>
    );
  }