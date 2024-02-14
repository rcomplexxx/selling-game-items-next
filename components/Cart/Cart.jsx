import React, { useContext, useEffect, useLayoutEffect, useState, useRef } from "react";
import Link from "next/link";

import CartItem from "./CartItem/CartItem";
import styles from "./cart.module.css";
import AppContext from "@/contexts/AppContext";
import BestSellers from "@/components/BestSellers/BestSellers";
import FreeShippingSlider from "./FreeShippingSlider/FreeShippingSlider";



const Cart = () => {
  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [cartMinHeight, setCartMinHeight] = useState();
  const [addressBarDown, setAddressBarDown] = useState(false);
  const firstHeight = useRef();


  useLayoutEffect(()=>{
   
    

   
    const div = document.createElement('div');
    div.id = 'invisibleDiv';
    div.className = styles.invisibleDiv;
    document.body.appendChild(div);

    const div2 = document.createElement('div');
    div2.id = 'invisibleDiv2';
    div2.className = styles.invisibleDiv2;
    document.body.appendChild(div2);


    let divHeight = div.getBoundingClientRect().height;
    firstHeight.current= divHeight; 
    let divHeight2 = div2.getBoundingClientRect().height;
    console.log(divHeight, divHeight2)
if (window.innerWidth<980){
  if(divHeight < divHeight2)setAddressBarDown(false);
  else setAddressBarDown(true);
}




      const updateSize=()=>{
        if (window.innerWidth<980){

         divHeight = div.getBoundingClientRect().height;

        if(divHeight < firstHeight.current){
          setAddressBarDown(false);
          document.body.removeChild(div);
          window.removeEventListener('resize', updateSize);
        }
       
      }
      }
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);


  },[]);



 



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

  return (
    <div id='cartMainWrapper' className={styles.mainWrapper} style={{minHeight:`${addressBarDown?"calc(100svh - 64px)":"calc(100vh - 64px)"}`}}>
    <div className={`${styles.containerStyle}`} style={{minHeight:`${addressBarDown?"calc(100svh - 64px)":"calc(100vh - 64px)"}`}}>
      
        <h1 className={styles.title}>Your shopping cart</h1>
        <FreeShippingSlider subtotal={subtotal}/>
      {renderCart()}
      
    </div>
    <BestSellers/>
    </div>
  );
};

export default Cart;
