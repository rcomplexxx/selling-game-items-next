import React, { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import BestSellers from "@/components/BestSellers/BestSellers";
import FreeShippingSlider from "./FreeShippingSlider/FreeShippingSlider";



const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [addressBarUp, setAddressBarUp] = useState(false);
  const [invDivsPresent, setInvDivsPresent] = useState(true);
  const firstHeightRef = useRef();
  const invisibleDiv = useRef();
  const invisibleDiv2 = useRef();
//

  useEffect(()=>{
   
    if(!invisibleDiv.current || !invisibleDiv2.current){return}
    console.log('exists inv div');

  let divHeight = invisibleDiv.current.getBoundingClientRect().height;
  let div2Height = invisibleDiv2.current.getBoundingClientRect().height;
  firstHeightRef.current= divHeight;
if (window.innerWidth<980){

  if(divHeight < div2Height)setAddressBarUp(true);

  else setAddressBarUp(false);
}




      const updateSize=()=>{
        if (window.innerWidth<980){
          let divHeight = invisibleDiv.current.getBoundingClientRect().height;
          let div2Height = document.getElementById('invisibleDiv2').getBoundingClientRect().height;
        if(divHeight < div2Height){
          setAddressBarUp(true);
          window.removeEventListener('resize', updateSize);
        }
      }
      }
      if(divHeight == div2Height)
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);


  },[invisibleDiv.current,invisibleDiv2.current]);



 



  const renderEmptyCart = () => (
    <div className={styles.emptyCartDiv}>
    <p className={styles.emptyCartText}>
    Add your favorite items to your cart.
    </p>
    <Link className={styles.shopNowLink} href="/products">
          <button className={styles.shopNow}>Shop Now</button>
        </Link>
    </div>
  );

  const subtotal = cartProducts
    .reduce((sum, cp) => sum + cp.quantity * cp.price, 0)
    .toFixed(2);

  const renderCart = () => (
    <>
      <div className={styles.itemsDiv}>
        {cartProducts.map((lineItem) => (
          <CartItem item={lineItem} key={lineItem.id} />
        ))}
      </div>
      <div className={styles.cardDetails}>
        <h4 className={styles.subtotalNew}>Subtotal: ${subtotal}</h4>
        <Link className={styles.link} href="/checkout">
          <button className={styles.checkoutButtonNew}>Checkout</button>
        </Link>
      </div>
    </>
  );

  if(cartProducts.length === 0) return  <div className={styles.mainWrapper}>
  <div className={`${styles.containerStyle} ${styles.emptyCartMainDiv}`}>
  <h1 className={`${styles.title}  ${styles.emptyTitle}`}>Your cart is empty!</h1>
 
  {renderEmptyCart()}
  </div>
  <BestSellers/>
  </div>

  return (<>
  {invDivsPresent && <><div ref={invisibleDiv2} className={styles.invisibleDiv2}/><div ref={invisibleDiv} id='invisibleDiv' className={styles.invisibleDiv}/></>}
    <div className={styles.mainWrapper} style={{minHeight:`${addressBarUp?"calc(100svh - 64px)":"calc(100vh - 64px)"}`}}>
    <div className={`${styles.containerStyle}`} style={{minHeight:`${addressBarUp?"calc(100svh - 64px)":"calc(100vh - 64px)"}`}}>
      
        <h1 className={styles.title}>Your shopping cart</h1>
        <FreeShippingSlider subtotal={subtotal}/>
      {renderCart()}
      
    </div>
    <BestSellers/>
    </div>
    </>
  );
};

export default Cart;
