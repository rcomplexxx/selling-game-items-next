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

export default function OrderDetails({ products }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const [mobileInterface, setMobileInterface] = useState(false);
  const [fixedMedia, setFixedMedia] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState(false);

  useEffect(() => {
    //129

    const productPicsElement = document.getElementById("orderWrapper");
    const handleScroll = () => {
      //Vrednost 129 se dobija  console.log(document.getElementById('productPics').getBoundingClientRect().top),
      //a od pocetka do dna elementa dodamo samo njegovu visinu, tj. + document.getElementById('productPics').clientHeight
      //console.log(document.getElementById('productPics').getBoundingClientRect().top+ document.getElementById('productPics').clientHeight)
      const height = productPicsElement.clientHeight;

      setFixedMedia(window.scrollY >= 0 ? true : false);
    };

    // Add event listener for window resize

    window.addEventListener("scroll", handleScroll);
    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      setMobileInterface(window.innerWidth <= 980);
    };

    // Initial check and event listener setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
    let s = 0;
    products.forEach((cp, i) => {
      s = s + cp.quantity * cp.price;
    });
    s = s.toFixed(2);
    let discountPrice = 0;
    if (discount != 0) discountPrice = ((s * discount) / 100).toFixed(2);
    const total = (s - discountPrice).toFixed(2);
    return { subTotal: s, discount: discountPrice, total: total };
  }, [products, discount]);

  return (
    <div className={styles.rightWrapper}>
      <div id="checkout_right" className={styles.checkout_right}>
        <div
          id="orderWrapper"
          className={`${styles.orderWrapper} ${
            !mobileInterface && fixedMedia && styles.orderWrapperFixed
          }`}
        >
          <div className={styles.orderDiv}>
            <div className={styles.title_div} onClick={summonAnswer}>
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

                <h2 className={styles.pcTitle}>Order Summery</h2>

                <span className={styles.mainPrice}>${prices.total}</span>
              </div>
            </div>
            <div
              className={`${styles.emerge} ${showAnswer ? styles.show : ""}`}
            >
              <div className={styles.segmentWrapper2}>
                {getProductElements()}
                <div className={styles.coupon_code}>
                  <div className={styles.form_group}>
                    <input
                      id="coupon_code"
                      type="text"
                      value={couponCode}
                      onChange={(event) => {
                        setCouponCode(event.target.value);
                      }}
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
                    onClick={() => {
                      if (couponCode == "") return;
                      const newCoupon = coupons.find((c) => {
                        return c.code.toUpperCase() == couponCode.toUpperCase();
                      });
                      if (newCoupon) {
                        setDiscount(newCoupon.discountPercentage);
                        setCouponError(false);
                        setCouponCode("");
                      } else setCouponError(true);
                    }}
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className={styles.couponError}>
                    Enter a valid discount code or gift card
                  </p>
                )}

                <div className={`${styles.order_pair} ${styles.subTotal}`}>
                  <span>Subtotal</span>
                  <span>${prices.subTotal}</span>
                </div>
                {discount != 0 && (
                  <div className={styles.order_pair}>
                    <span>Order Discount</span>
                    <span id="discountPrice">- ${prices.discount}</span>
                  </div>
                )}
                <div className={styles.order_pair}>
                  <span>Shipping</span>
                  <span>Free</span>
                </div>

                <div className={styles.order_pair}>
                  <span>Total</span>
                  <span>${prices.total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* sacuvaj client id vrednost i ostale bitne informacije u .env fajlu */}
      </div>
    </div>
  );
}
