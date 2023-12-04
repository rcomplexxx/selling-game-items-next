

import Link from 'next/link'
import styles from './popupcart.module.css'
import Image from 'next/image';



export default function PopupCart({totalItems,newProduct, setNewProduct}){


    return <div className={`${styles.cartPopup} ${newProduct && styles.materialize}`}>
    {newProduct && <><div className={styles.contentWrapper}>
  <div className={styles.cartPopupTitle}> <Image height={12} width={12} src='/images/smallCorrect.png' className={styles.smallCorrect}></Image> <h3>Item added to your cart</h3> </div>
 <div className={styles.cartPopupTitle}> <Image height={54} width={96} src={`/images/${newProduct.image}`} className={styles.productImage}/> <h2 className={styles.productTitle}>{newProduct.name}</h2></div>
 </div>
 
 <div className={styles.popupButtons}>
  <Link href='/cart'>
 <button
      className={styles.add_to_cart_button}
     onClick={()=>{setNewProduct();}}
    >
      View my cart ({totalItems})
    </button>
    </Link>

    <Link href='/checkout'>
    <button className={styles.but_now_button} onClick={()=>{setNewProduct();}}>
     Check out
    </button>
    </Link>
    <div className={styles.cartPopupTitle} onClick={()=>{setNewProduct();}}> <span className={styles.continue_shopping}>Continue shopping</span></div>

  </div></>}
  </div>
}