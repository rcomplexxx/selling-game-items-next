
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./mobilemenu.module.css";
import { useState } from "react";
import collections from '@/data/collections.json'
import Image from "next/image";

export default function MobileMenu({setIsMenuOpen, subMenu, setSubMenu}){

    const [isMenuClosing, setIsMenuClosing] = useState(false);


  

    const router = useRouter();
    const pathname = router.asPath;


    
    const handleMobileMenuClose = () => {
        
        setIsMenuClosing(true);
    
        setTimeout(() => {
          setIsMenuOpen(false);
          setIsMenuClosing(false);
          if(pathname!=='/faq' && pathname!=='/terms-of-service' && pathname!=='/privacy-policy'
        && pathname!=='/shipping-policy' && pathname!=='/refund-policy') setSubMenu(0);
        }, 500);
      };


    return <div
    
    className={
      styles.mobileMenu +
      " " +
      (isMenuClosing ? styles.menuCoverDissapear : "")
    }
    onClick={handleMobileMenuClose}
  >
    <div
    id='mobileMenu'
      className={
        styles.mainMenuCard +
        " " +
        (isMenuClosing ? styles.menuClose : "")
      }
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.menuItemsDiv}>
        <button
          className={styles.menuItem_x_button}
          onClick={handleMobileMenuClose}
        >
          x
        </button>
      </div>
     
            {subMenu===0 &&
      <><Link
        href="/"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/" && setIsMenuOpen(false);
        }}
      >
        <p>Home</p>
      </Link>

      <Link
        href="/products"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/products" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/products" && setIsMenuOpen(false);
        }}
      >
        <p>Products</p>
      </Link>

      <Link
        href="/collection/sale/page/1"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/collection/sale/page/1" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/collection/sale/page/1" && setIsMenuOpen(false);
        }}
      >
        <p>Sale</p>
      </Link>


      <div
       
        className={`${styles.subMenuPortal} ${styles.linkStyle} ${styles.menuItemDiv}`}
        onClick={() => {
          setSubMenu(2);
        }}
      >
        <p>Collections</p>
        <Image height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>

    
      <div
       
        className={`${styles.subMenuPortal} ${styles.linkStyle} ${styles.menuItemDiv}`}
        onClick={() => {
          setSubMenu(1);
        }}
      >
        <p>FAQ</p>
        <Image height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>
     
      <Link
        href="/contact"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/contact" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/contact" && setIsMenuOpen(false);
        }}
      >
        <p>Contact us</p>
      </Link></>
        
      }

      {subMenu===1 && 
      <>
 <div
       
       className={`${styles.linkStyle} ${styles.menuItemDiv}  ${styles.subMenuBack}`}
       onClick={() => {
         setSubMenu(0);
       }}
     >
       <Image height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/><p>FAQ</p>
     </div>

     <Link
        href="/aboutus"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/aboutus" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/aboutus" && setIsMenuOpen(false);
        }}
      >
        <p>About us</p>
      </Link>


      <Link
        href="/faq"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/faq" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/faq" && setIsMenuOpen(false);
        }}
      >
        <p>General questions</p>
      </Link>
      <Link
        href="/terms-of-service"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/terms-of-service" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/terms-of-service" && setIsMenuOpen(false);
        }}
      >
        <p>Terms of service</p>
      </Link>
      <Link
        href="/privacy-policy"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/privacy-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/privacy-policy" && setIsMenuOpen(false);
        }}
      >
        <p>Privacy policy</p>
      </Link>
      <Link
        href="/shipping-policy"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/shipping-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/shipping-policy" && setIsMenuOpen(false);
        }}
      >
        <p>Shipping policy</p>
      </Link>
      <Link
        href="/refund-policy"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/refund-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/refund-policy" && setIsMenuOpen(false);
        }}
      >
        <p>Refund policy</p>
      </Link>
      </>
      }

       {subMenu===2 && <>

        <div
       
       className={`${styles.linkStyle} ${styles.menuItemDiv}  ${styles.subMenuBack}`}
       onClick={() => {
         setSubMenu(0);
       }}
     >
       <Image height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/><p>Collections</p>
     </div>

{collections.map(c => {return <Link
  href={`/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`}
  className={`${styles.linkStyle} ${styles.menuItemDiv} ${
    pathname === `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` ? styles.currentLinkMobile : ""
  }`}
  onMouseDown={(event)=>{event.preventDefault()}}
  onClick={() => {
    pathname !== `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` && setIsMenuOpen(false);
    
  }}
  >
  <p>{c.name}</p>
  </Link>
})}
</>

       }









      
      </div>
    
  </div>
}