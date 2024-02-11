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
    const popStateSubmenuNeutralizer= useRef(false);

   
    useEffect(() => {

   
    

      const handleClickOutside = (event) => {
     

        if(!document?.getElementById('mobileMenu').contains(event.target) && !document?.getElementById('mobileMenuSpawn').contains(event.target))
       { event.stopPropagation(); event.preventDefault(); 

        setIsMenuOpen(false);document.removeEventListener('click', handleClickOutside, true);}
        
      };

      const handlePopState = (event)=>{
        
        console.log(subMenu);
       console.log('pop is triggered');
       if(subMenu!=0 ) {
        
        
        
        if(isMenuOpen){setSubMenu(0); subMenuEnteredRef.current=true; }
      
      }
      //  subMenuPopstateStabilizer.current=true;
       else {
        if(subMenuEnteredRef.current){ 
          if(isMenuOpen){ 
            if(popStateSubmenuNeutralizer.current){popStateSubmenuNeutralizer.current=false; return;}
            window.history.pushState(null, null, router.asPath);
          history.go(1);  
          subMenuEnteredRef.current=false;
        }
        }
        
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


   
      <Image height={16} width={16} src='/images/cancelWhite.png' onClick={()=>{setIsMenuOpen(false); }} className={styles.menuItem_x_button}/>                 
                    

     
      </div>
     
            {subMenu===0 &&
      <><span
     
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          // subMenuPopstateStabilizer.current=true;
          // router.back();
          // router.push('/');
          setIsMenuOpen(false);
          router.back();
          router.push('/');
        }}
      >
        <p>Home</p>
      </span>

      <span
        href="/products"  className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/products" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          setIsMenuOpen(false);
          router.back();
          router.push('/products');
        }}
      >
        <p>Products</p>
      </span>

      <Link
        href="/collection/sale/page/1"
        className={`${styles.linkStyle} ${styles.menuItemDiv} ${
          pathname === "/collection/sale/page/1" ?  styles.currentLinkMobile : ""
        }`}
        onClick={() => {
      
          history.back();
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
      
          history.back();
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
        
      setIsMenuOpen(false);
      history.back();
      history.back();
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
        
          setIsMenuOpen(false);
          history.back();
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
        
          setIsMenuOpen(false);
          history.back();
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
        
          setIsMenuOpen(false);
          history.back();
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
        
          setIsMenuOpen(false);
          history.back();
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
        
          setIsMenuOpen(false);
          history.back();
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

{collections.map((c, index) => {return <Link key={index}
  href={`/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`}
  className={`${styles.linkStyle} ${styles.menuItemDiv} ${
    pathname === `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` ? styles.currentLinkMobile : ""
  }`}
  onClick={() => {
        
    setIsMenuOpen(false);
    history.back();
    
      }}
  >
  <p>{c.name}</p>
  </Link>
})}
</>

       }









      
    
  </div>
}