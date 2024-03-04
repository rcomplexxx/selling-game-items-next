

import Link from 'next/link'
import styles from './popupcart.module.css'
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';



export default function PopupCart({totalItems,newProduct, setNewProduct}){


const router = useRouter();

const backStopper = useRef(false);





useEffect(()=>{
  router.beforePopState((state) => {

    state.options.scroll = false;
      
    return true;
 
  });
},[router])



useEffect(()=>{







  window.history.pushState(null, null, router.asPath);
  history.go(1);


  const handlePopState = (event)=>{
   
    backStopper.current = true; 
    setNewProduct();
  
  }

  const navBar = document.getElementById('navBar')
  const handleClick = (event) => {
   
    if (!navBar.contains(event.target)) {
      setNewProduct();
    }
  };
     


  window?.addEventListener("popstate", handlePopState);
  document.addEventListener('click', handleClick);
  


  return ()=>{
    //Doraditi za uslov ako je kliknuto back?
    // history.back();
    if(!backStopper.current){
    history.back();
    
  }
    
    window?.removeEventListener("popstate", handlePopState);
    document.removeEventListener('click', handleClick);


   

  }
},[])


// useEffect(()=>{ popupCart.focus();},[])

    return <div className={`${styles.cartPopup}`} >
   <div  className={styles.contentWrapper}>
  <div className={styles.cartPopupTitle}>
     <Image height={12} width={12} src='/images/smallCorrect.png' className={styles.smallCorrect}/>
     <h3>Item added to your cart</h3>
      </div>
 <div className={styles.cartPopupTitle}> 
 <Image height={54} width={96} src={`/images/${newProduct.image}`} className={styles.productImage}/> 
 <h2 className={styles.productTitle}>{newProduct.name}</h2>
 </div>
 </div>
 

  <span  className={styles.add_to_cart_button}
  onClick={()=>{backStopper.current=true; history.back();  router.push('/cart') }}
     >

      View my cart ({totalItems})
    
    </span>

    <span  className={styles.buyNowButton}   onClick={()=>{backStopper.current=true;history.back();  router.push('/checkout') }}>
    
     Check out
  
    </span>
    
    <span className={styles.continue_shopping}  onClick={()=>{setNewProduct();}} onMouseDown={(event)=>{event.preventDefault()}} >Continue shopping</span>
    

 
  </div>
}