import { useRouter } from "next/router";
import styles from "./mobilemenu.module.css";
import {  useEffect, useRef } from "react";
import collections from '@/data/collections.json'
import Image from "next/image";
import classNames from "classnames";

export default function MobileMenu({isMenuOpen, setIsMenuOpen, subMenu, setSubMenu}){

 
  

    const router = useRouter();
    const pathname = router.asPath;
  

    const nextLink= useRef();
    const backBlocker = useRef(false);




  



   
    useEffect(() => {

      const handleResize = () =>{
        if (window.innerWidth>980)setIsMenuOpen(false);
      }

   
      const closeMenu = ()=>{ 
        
        document.getElementById('mobileMenu').classList.add(styles.menuClosed);
        setTimeout(()=>{
       
        
        setIsMenuOpen(false);
      },500)};

      const handleClickOutside = (event) => {
        

        if(!document?.getElementById('mobileMenu').contains(event.target) && !document?.getElementById('mobileMenuSpawn').contains(event.target))
       { 
        event.stopPropagation(); 
        event.preventDefault(); 
        backBlocker.current=true; 
        
        history.back();
      
        document.removeEventListener('click', handleClickOutside, true);}
        
      };






      const handlePopState = ()=>{
        
       if(backBlocker.current){
        backBlocker.current=false;

        closeMenu();
       
       
        return;
       }


        if( nextLink.current){
          closeMenu();
          window?.removeEventListener("popstate", handlePopState);
          router.push(nextLink.current);
          nextLink.current=undefined;
          return;
        }
       
       if(subMenu!=0 ) {
        
      setSubMenu(0); 

        window.history.pushState(null, null, router.asPath);
        
        history.go(1);
        
      }
      //  subMenuPopstateStabilizer.current=true;
       else {
      



          closeMenu();
        window?.removeEventListener("popstate", handlePopState);
      }
       
         console.log('popstate')
      }








 

      

     
       
        window?.addEventListener("resize", handleResize);
        window?.addEventListener("popstate", handlePopState);
        document?.addEventListener('click', handleClickOutside, true);
  
      return () => {
        
        if (isMenuOpen) {
          window?.removeEventListener("resize", handleResize);
          window?.removeEventListener("popstate", handlePopState);
          document?.removeEventListener('click', handleClickOutside, true);
         
        }
      };
    }, [subMenu]);





 
    
    


    useEffect(()=>{


   window.history.pushState(null, null, router.asPath);
                history.go(1);

      router.beforePopState((state) => {
        
        state.options.scroll = false;
          
        return true;
     
      });
    },[])
   

 



    return <div
    id='mobileMenu'
      className={`${styles.mainMenuCard}` }
      
    >
      <div className={styles.menuItemsDiv}>


   
      <Image id='cancelMobileMenu' loading={'lazy'} alt='Cancel' height={16} width={16} src='/images/cancelWhite.png' 
      onClick={()=>{
         backBlocker.current=true; history.back();
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
        <Image loading={'lazy'} alt='Go' height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>

    
      <div
       
        className={`${styles.subMenuPortal} ${styles.linkStyle} ${styles.menuItemDiv}`}
        onClick={() => {
          setSubMenu(1);
        }}
      >
        <p>Info</p>
        <Image loading={'lazy'} alt='Go' height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
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
       <Image loading={'lazy'} alt='Back' height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/><p>Info</p>
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
       <Image loading={'lazy'} alt='Back' height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/><p>Collections</p>
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