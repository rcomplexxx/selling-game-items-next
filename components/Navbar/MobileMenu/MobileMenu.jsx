import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./mobilemenu.module.css";
import { useState , useEffect, useRef } from "react";
import collections from '@/data/collections.json'
import Image from "next/image";

export default function MobileMenu({isMenuOpen, setIsMenuOpen, subMenu, setSubMenu}){

 
  

    const router = useRouter();
    const pathname = router.asPath;
    const subMenuPopstateStabilizer=useRef(false);
    const historyPushMountedRef=useRef(false);
    const subMenuEnteredRef=useRef(false);
    const nextLink= useRef();
    const clickStabilizerRef=useRef(false);

   
    useEffect(() => {

   
    

      const handleClickOutside = (event) => {
        // if(subMenuPopstateStabilizer.current){subMenuPopstateStabilizer.current=false;return;}
        

        if(!document?.getElementById('mobileMenu').contains(event.target) && !document?.getElementById('mobileMenuSpawn').contains(event.target))
       { event.stopPropagation(); event.preventDefault(); 
        clickStabilizerRef.current=true; history.back();
        // setIsMenuOpen(false);
        document.removeEventListener('click', handleClickOutside, true);}
        
      };






      const handlePopState = (event)=>{
        
       if(clickStabilizerRef.current){
        clickStabilizerRef.current=false;
        setIsMenuOpen(false);
       
        return;
       }

        // if(nextLinkSecondLevelStopper.current){
        //   nextLinkSecondLevelStopper.current=false;
        //   history.back();
        //   return;
        // }

        if( nextLink.current){
          setIsMenuOpen(false); 
          window?.removeEventListener("popstate", handlePopState);
          router.push(nextLink.current);
          nextLink.current=undefined;
          return;
        }
       
       if(subMenu!=0 ) {if(isMenuOpen){setSubMenu(0); subMenuEnteredRef.current=true; }}
      //  subMenuPopstateStabilizer.current=true;
       else {
        if(subMenuEnteredRef.current){ window.history.pushState(null, null, router.asPath);
          history.go(1); subMenuEnteredRef.current=false; }
        setIsMenuOpen(false); 
        window?.removeEventListener("popstate", handlePopState);
      }
       
         console.log('popstate')
      }








      if(isMenuOpen){

      if(subMenu==0 && !historyPushMountedRef.current){
window.history.pushState(null, null, router.asPath);
        history.go(1);
        historyPushMountedRef.current=true;
      }
     

     
       

        window?.addEventListener("popstate", handlePopState);
        document?.addEventListener('click', handleClickOutside, true);
      }
      else{
        historyPushMountedRef.current=false;
        window?.removeEventListener("popstate", handlePopState);
        document?.removeEventListener('click', handleClickOutside, true);
      }
  
      return () => {
        
        if (isMenuOpen) {
          window?.removeEventListener("popstate", handlePopState);
          document?.removeEventListener('click', handleClickOutside, true);
         
        }
      };
    }, [isMenuOpen, subMenu]);

    useEffect(()=>{
      router.beforePopState((state) => {
        if(isMenuOpen){
        state.options.scroll = false;
          
        return false;
      }
    return true;
      });
    },[isMenuOpen,router])
  
   

 


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


   
      <Image id='cancelMobileMenu' height={16} width={16} src='/images/cancelWhite.png' 
      onClick={()=>{
         clickStabilizerRef.current=true; history.back();
        // setIsMenuOpen(false); 
        }} className={styles.menuItem_x_button}/>                 
                    

     
      </div>
     
            {subMenu===0 &&
      <><span
       
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          if(pathname !== "/") { 
            nextLink.current='/';
           history.back();

          }
        }}
      >
        <p>Home</p>
      </span>

      <span
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/products" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          if(pathname !== "/products") { 
            nextLink.current='/products';
           history.back();

          }
        }}
      >
        <p>Products</p>
      </span>

      <span
       
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/collection/sale/page/1" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          if(pathname !== "/collection/sale/page/1") { 
            nextLink.current='/collection/sale/page/1';
           history.back();

          }
        }}
      >
        <p>Sale</p>
      </span>


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
     
      <span
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/contact-us" ?  styles.currentLinkMobile : ""
        }`}
       
        onClick={() => {
          if(pathname !== "/contact-us") { 
            nextLink.current='/contact-us';
           history.back();

          }
        }
      }
      >
        <p>Contact us</p>
      </span></>
        
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

     <span
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/our-story" ?  styles.currentLinkMobile : ""
        }`}
  
        onClick={() => {
          if(pathname !== "/our-story") { 
            nextLink.current='/our-story';
           history.back();

          }
        }}
      >
        <p>Our story</p>
      </span>


      <span
      
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/faq" ? styles.currentLinkMobile : ""
        }`}
       
        onClick={() => {
          if(pathname !== "/faq") { 
            nextLink.current="/faq";
           history.back();

          }
        }}
      >
        <p>FAQ</p>
      </span>
      <span
       
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/terms-of-service" ? styles.currentLinkMobile : ""
        }`}
    
        onClick={() => {
          if(pathname !== "/terms-of-service") { 
            nextLink.current="/terms-of-service";
           history.back();
          }
        }}
      >
        <p>Terms of service</p>
      </span>
      <span
      
      
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/privacy-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          if(pathname !== "/privacy-policy") { 
        
            nextLink.current="/privacy-policy";
           history.back();
          }
        }}
      >
        <p>Privacy policy</p>
      </span>
      <span
     
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/shipping-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          if(pathname !== "/shipping-policy") { 
       
            nextLink.current="/shipping-policy";
           history.back();
          }
        }}
      >
        <p>Shipping policy</p>
      </span>
      <span
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/refund-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
        
          if(pathname !== "/refund-policy") { 
         
            nextLink.current="/refund-policy";
           history.back();
          }
        }}
      >
        <p>Refund policy</p>
      </span>
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

{collections.map((c, index) => {return <span key={index}
  className={`${styles.linkStyle} ${styles.menuItemDiv} ${
    pathname === `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` ? styles.currentLinkMobile : ""
  }`}
  onClick={() => {
    if(pathname !== `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`) { 

      nextLink.current=`/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`;
     history.back();
    }
    
  }}
  >
  <p>{c.name}</p>
  </span>
})}
</>

       }









      
    
  </div>
}