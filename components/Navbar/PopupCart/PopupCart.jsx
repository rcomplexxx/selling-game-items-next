

import Link from 'next/link'
import styles from './popupcart.module.css'
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';



export default function PopupCart({totalItems,newProduct, setNewProduct}){


const router = useRouter();

const backStopper = useRef(false);








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
      console.log('lol')
      setNewProduct();
    }
  };
     


  window?.addEventListener("popstate", handlePopState);
  document.addEventListener('click', handleClick);
  


  return ()=>{

    if(!backStopper.current){
    history.back();
    }
    
    window?.removeEventListener("popstate", handlePopState);
    document.removeEventListener('click', handleClick);


   

  }
},[])

useEffect(()=>{
  router.beforePopState((state) => {

    state.options.scroll = false;
      
    return false;
 
  });

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
 

  <Link href='/cart'  className={styles.add_to_cart_button}
     >

      View my cart ({totalItems})
    
    </Link>

    <Link href='/checkout' className={styles.buyNowButton} >
    
     Check out
  
    </Link>
    
    <span className={styles.continue_shopping}  onClick={()=>{setNewProduct();}} >Continue shopping</span>
    

 
  </div>
}