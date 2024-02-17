import React, {
    useState,
    useMemo,
    useEffect,
    useLayoutEffect,
    useRef,
  } from "react";
  import styles from "./orderdetails.module.css";
  import Image from "next/image";
  import coupons from "@/data/coupons.json";
  
  export default function OrderDetails({ discount, setDiscount,tip, products, isUpperSummery=true }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponValidCode, setCouponValidCode] = useState("");
    const [couponError, setCouponError] = useState(false);
    const [productsOpened, setProductsOpened] = useState(true);
    const summeryDivRef = useRef();
   
  
   

    useEffect(()=>{ if(!isUpperSummery && products.length>1)setProductsOpened(false);
      if(!isUpperSummery) setShowAnswer(true);},[products, isUpperSummery])


      useEffect(()=>{
        const summeryDiv = summeryDivRef.current;
        if(showAnswer)summeryDiv.style.maxHeight = `${summeryDiv.scrollHeight}px`;
        else summeryDiv.style.maxHeight =0;
      },[showAnswer])
  
    function summonAnswer() {
      setShowAnswer(!showAnswer);
    }
  
    const getProductElements = () => {
      return (
        <>
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
                <span>
                  {cp.quantity} {cp.name}s
                </span>
              </div>
              <span>${(cp.quantity * cp.price).toFixed(2)}</span>
            </div>
          ))}
        </>
      );
    };
  
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
    if (couponCode == "") return;
    const newCoupon = coupons.find((c) => {
      return c.code.toUpperCase() == couponCode.toUpperCase();
    });
    if (newCoupon) {
        setCouponValidCode(newCoupon.code.toUpperCase())
      setDiscount({code: newCoupon.code, discount:newCoupon.discountPercentage});
      setCouponError(false);
      setCouponCode("");
    } else if(!couponValidCode) setCouponError(true);
  }



    
  
    return (
      <div className={`${styles.rightWrapper} ${!isUpperSummery && styles.downOrderDetails}`}>
        <div id="checkout_right" className={styles.checkout_right}>
          <div
            id="orderWrapper"
            className={`${styles.orderWrapper}`}
          >
            <div className={styles.orderDiv}>
             {isUpperSummery && <div className={styles.title_div} onClick={summonAnswer}>
                <div className={styles.segmentWrapper}>
                  <div className={styles.titleWrapper}>
                    <h2 className={styles.mobileTitle}>
                      {`Order summery`}
                      <Image
                        src={"/images/greaterLessx.png"}
                        height={8}
                        width={8}
                        alt="arrow"
                        className={`${styles.arrowImg} ${
                          !showAnswer && styles.arrowDown
                        }`}
                      />
                    </h2>
                  </div>
  
                  <div className={styles.mainPriceDiv}>
                  {discount.code!="" && <span className={styles.mainPriceSub}>${prices.subTotal}</span>}
                  <span className={styles.mainPrice}>${prices.total}</span>
                  
                  </div>
                </div>
              </div>
  }
              <div
              ref={summeryDivRef}
                className={`${styles.emerge} ${showAnswer && styles.showEmerge}`}
              >
                <div className={styles.segmentWrapper2}>
                  {!isUpperSummery && (products.length>1? <div onClick={()=>{setProductsOpened(!productsOpened)}} className={styles.showProductsButton}>
                    <h2>Order summery{products.length > 1 && ` (${products.length})`}</h2>
                    <div className={styles.showProducts}>
                    <span>Show</span>
                    <Image src={'/images/greaterLess3.png'}  className={styles.showProductsImage} height={12} width={12}></Image>
                    </div>
                    </div>:<h2>Order summery</h2>)
                    }
                 { getProductElements()}
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
                     
                    </div>
                    <button
                      className={`${styles.apply} ${
                        couponCode != "" && styles.applyEnabled
                      }`}
                      onClick={handleCouponApply}
                    >
                      Apply
                    </button>
                  </div>

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

                 
  
                  <div className={`${styles.order_pair} ${styles.subTotal}`}>
                    <span>Subtotal</span>
                    <span>${prices.subTotal}</span>
                  </div>
                  {discount.discount != 0 && (
                    <>
                    <div className={styles.order_pair}>
                      <span>Order Discount</span>
                      <span></span>
                    </div>

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

                  {tip!==0 && tip!="" && <div className={styles.order_pair}>
                    <span>Tip</span>
                    <span id="tipPrice">${tip}</span>
                  </div>}

                  
  
                  <div className={styles.order_pair}>
                    
                        <span className={styles.totalText}>Total</span>
                        
                        <div>
                    <span className={styles.valute}>USD</span>
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
            </div>
          </div>
  
          {/* sacuvaj client id vrednost i ostale bitne informacije u .env fajlu */}
        </div>
      </div>
    );
  }