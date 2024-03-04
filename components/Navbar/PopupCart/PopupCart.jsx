

import Link from 'next/link'
import styles from './popupcart.module.css'
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter } from 'next/router';



export default function PopupCart({totalItems,newProduct, setNewProduct}){


const router = useRouter();



useEffect(()=>{
 router.beforePopState((state) => {

   state.options.scroll = false;
     
   return false;

 });
},[router])




useEffect(()=>{


  window.history.pushState(null, null, router.asPath);
  history.go(1);




  const handlePopState = (event)=>{
   
  
     
    setNewProduct();
 
  
  }

     


  window?.addEventListener("popstate", handlePopState);




  return ()=>{
    //Doraditi za uslov ako je kliknuto back?
    // history.back();
    window?.removeEventListener("popstate", handlePopState);
  
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
 

  <Link href='/cart'  className={styles.add_to_cart_button}
      onMouseDown={(event)=>{event.preventDefault()}}>

      View my cart ({totalItems})
    
    </Link>

    <Link href='/checkout' className={styles.buyNowButton}  onMouseDown={(event)=>{event.preventDefault()}} >
    
     Check out
  
    </Link>
    
    <span className={styles.continue_shopping}  onClick={()=>{setNewProduct();}} onMouseDown={(event)=>{event.preventDefault()}} >Continue shopping</span>
    

 
  </div>
}