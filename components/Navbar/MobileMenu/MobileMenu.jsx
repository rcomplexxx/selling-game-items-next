
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./mobilemenu.module.css";
import { useState , useEffect, useRef } from "react";
import collections from '@/data/collections.json'
import Image from "next/image";

export default function MobileMenu({isMenuOpen, setIsMenuOpen, subMenu, setSubMenu}){

 
  

    const router = useRouter();
    const pathname = router.asPath;
    const backLinkSetRef=useRef(false);

   
    useEffect(() => {

   
    

      const handleClickOutside = (event) => {

        if(!document?.getElementById('mobileMenu').contains(event.target) && !document?.getElementById('mobileMenuSpawn').contains(event.target))
       { event.stopPropagation(); event.preventDefault(); setIsMenuOpen(false);}
        document.removeEventListener('click', handleClickOutside, true);
      };

      const handlePopState = (event)=>{
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        backLinkSetRef.current=false;
       
        setIsMenuOpen(false);
         console.log('popstate')
      }


      if(isMenuOpen){
        

        console.log('asPath', router.asPath,'pathname', router.pathname);
        
        window.history.pushState(null, document.title, window.location.href);
        backLinkSetRef.current=true;

        // router.beforePopState((state) => {
        //   backLinkSet=false;
        //   state.options.scroll = false;
        //   setIsMenuOpen(false);
        //   // window.history.pushState(null, "", "");
        //   // router.push(router.asPath, { scroll: false });
        //   return true;
        // });

     
       

        window?.addEventListener("popstate", handlePopState);
        document?.addEventListener('click', handleClickOutside, true);
      }
      else{
        if(backLinkSetRef.current){router.back( { scroll: false, }); 
        backLinkSetRef.current=false;}
        document?.removeEventListener("popstate", handlePopState);
        document?.removeEventListener('click', handleClickOutside, true);
      }
  
      return () => {
        if (isMenuOpen) {
          document?.removeEventListener('click', handleClickOutside);
          window?.removeEventListener("popstate", handlePopState);
        }
      };
    }, [isMenuOpen]);



   

 


  //   return <div
    
  //   className={`${styles.mobileMenu} ${isMenuClosing && styles.menuCoverDissapear}`
    
  //   }
  //   onClick={handleMobileMenuClose} ${!isMenuOpen && styles.menuClosed}
  // >
    return <div
    id='mobileMenu'
      className={`${styles.mainMenuCard} ${!isMenuOpen && styles.menuClosed}` }
      
    >
      <div className={styles.menuItemsDiv}>


   
      <Image height={16} width={16} src='/images/cancelWhite.png' onClick={()=>{setIsMenuOpen(false)}} className={styles.menuItem_x_button}/>                 
                    

     
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
        <p>Info</p>
        <Image height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>
     
      <Link
        href="/contact-us"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/contact-us" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/contact-us" && setIsMenuOpen(false);
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
       <Image height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/><p>Info</p>
     </div>

     <Link
        href="/our-story"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/our-story" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/our-story" && setIsMenuOpen(false);
        }}
      >
        <p>Our story</p>
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
        <p>FAQ</p>
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
}