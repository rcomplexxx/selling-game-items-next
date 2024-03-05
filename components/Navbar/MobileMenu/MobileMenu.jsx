import { useRouter } from "next/router";
import styles from "./mobilemenu.module.css";
import {  useEffect, useRef } from "react";
import collections from '@/data/collections.json'
import Image from "next/image";

export default function MobileMenu({ setIsMenuOpen, subMenu, setSubMenu}){

 
  

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
      },500)
    
    };

      const handleClickOutside = (event) => {

       
        

         if(!document?.getElementById('mobileMenu').contains(event.target) && !document?.getElementById('mobileMenuSpawn').contains(event.target))
       { 
        
        event.stopPropagation(); 
        event.preventDefault(); 
        
        if(subMenu!=0){
          closeMenu();
          window?.removeEventListener("popstate", handlePopState);
          history.back();
        }
        history.back();
      
        // document.removeEventListener('click', handleClickOutside, true);
      
      
      }
        
      };






      const handlePopState = ()=>{
        
        console.log('popon')
       

       if(backBlocker.current){
        backBlocker.current=false;

        // closeMenu();
       
       
        return;
       }


        if( nextLink.current){
          
          window?.removeEventListener("popstate", handlePopState);
          router.push(nextLink.current);
          closeMenu();
          return;
        }
       
       if(subMenu!=0 ) {
        
       
      setSubMenu(0); 

      // backBlocker.current=true;

      //   // window.history.pushState(null, null, router.asPath);
        
      //   history.go(1);
        
      }
    
       else {
      



          closeMenu();
   
      }
       
         console.log('popstate')
      }








 

        if(subMenu!=0){
            window.history.pushState(null, null, router.asPath);
        
        history.go(1);
        }
      

     
       
        window?.addEventListener("resize", handleResize);
        window?.addEventListener("popstate", handlePopState);
        document?.addEventListener('click', handleClickOutside, true);
  
      return () => {
        
       
          window?.removeEventListener("resize", handleResize);
          window?.removeEventListener("popstate", handlePopState);
          document?.removeEventListener('click', handleClickOutside, true);
         
        
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
    
   
      <Image loading={'lazy'} alt='Cancel' height={16} width={16} src='/images/cancelWhite.png' 
      onClick={()=>{
         backBlocker.current=true; history.back();
         closeMenu();
        // setIsMenuOpen(false); 
        }} className={styles.menuItem_x_button}/>                 
                    

     
      
     
            {subMenu===0 &&
      <><span
       
        className={`${styles.linkStyle} ${pathname === "/" && styles.currentLinkMobile}`}
        onClick={() => {
          if(pathname !== "/") { 
            nextLink.current='/';
           history.back();

          }
        }}
      >
       Home
      </span>

      <span
        className={`${styles.linkStyle} ${pathname === "/products" && styles.currentLinkMobile}`}
        onClick={() => {
          if(pathname !== "/products") { 
            nextLink.current='/products';
           history.back();

          }
        }}
      >
        Products
      </span>

      <span
       
        className={`${styles.linkStyle} ${
          pathname === "/collection/sale/page/1" &&  styles.currentLinkMobile
        }`}
        onClick={() => {
          if(pathname !== "/collection/sale/page/1") { 
            nextLink.current='/collection/sale/page/1';
           history.back();

          }
        }}
      >
        Sale
      </span>


      <div
       
        className={`${styles.subMenuPortal} ${styles.linkStyle}`}
        onClick={() => {
          setSubMenu(2);
       
        }}
      >
        Collections
        <Image loading={'lazy'} alt='Go' height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>

    
      <div
       
        className={`${styles.subMenuPortal} ${styles.linkStyle}`}
        onClick={() => {
          setSubMenu(1);
          
        }}
      >
      Info
        <Image loading={'lazy'} alt='Go' height={12} width={12} src="/images/greaterLessx.png" className={styles.subMenuArrow}/>
      </div>
     
      <span
        className={`${styles.linkStyle} ${
          pathname === "/contact-us" && styles.currentLinkMobile
        }`}
       
        onClick={() => {
          if(pathname !== "/contact-us") { 
            nextLink.current='/contact-us';
           history.back();

          }
        }
      }
      >
        Contact us
      </span></>
        
      }

      {subMenu===1 && 
      <>
 <div
       
       className={`${styles.linkStyle}`}
       onClick={() => {
         setSubMenu(0);
       }}
     >
       <Image loading={'lazy'} alt='Back' height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/>
       <span className={styles.subMenuTitle}>Info</span>
     </div>

     <span
        className={`${styles.linkStyle} ${
          pathname === "/our-story" &&  styles.currentLinkMobile
        }`}
  
        onClick={() => {
          if(pathname !== "/our-story") { 
            nextLink.current='/our-story';
           history.back();

          }
        }}
      >
        Our story
      </span>


      <span
      
        className={`${styles.linkStyle} ${
          pathname === "/faq" && styles.currentLinkMobile
        }`}
       
        onClick={() => {
          if(pathname !== "/faq") { 
            nextLink.current="/faq";
           history.back();

          }
        }}
      >
        FAQ
      </span>
      <span
       
        className={`${styles.linkStyle} ${
          pathname === "/terms-of-service" && styles.currentLinkMobile
        }`}
    
        onClick={() => {
          if(pathname !== "/terms-of-service") { 
            nextLink.current="/terms-of-service";
           history.back();
          }
        }}
      >
        Terms of service
      </span>
      <span
      
      
        className={`${styles.linkStyle} ${
          pathname === "/privacy-policy" && styles.currentLinkMobile
        }`}
        onClick={() => {
          if(pathname !== "/privacy-policy") { 
        
            nextLink.current="/privacy-policy";
           history.back();
          }
        }}
      >
       Privacy policy
      </span>
      <span
     
        className={`${styles.linkStyle} ${
          pathname === "/shipping-policy" && styles.currentLinkMobile
        }`}
        onClick={() => {
          if(pathname !== "/shipping-policy") { 
       
            nextLink.current="/shipping-policy";
           history.back();
          }
        }}
      >
        Shipping policy
      </span>
      <span
        className={`${styles.linkStyle} ${
          pathname === "/refund-policy" && styles.currentLinkMobile
        }`}
        onClick={() => {
        
          if(pathname !== "/refund-policy") { 
         
            nextLink.current="/refund-policy";
           history.back();
          }
        }}
      >
        Refund policy
      </span>
      </>
      }

       {subMenu===2 && <>

        <div
       
       className={`${styles.linkStyle} ${styles.subMenuTitle}`}
       onClick={() => {
         setSubMenu(0);
       }}
     >
       <Image loading={'lazy'} alt='Back' height={12} width={12} src="/images/greaterLessx.png" className={`${styles.subMenuArrow} ${styles.subMenuBackArrow}`}/>
       <span className={styles.subMenuTitle}>Collections</span>
     </div>

{collections.map((c, index) => {return <span key={index}
  className={`${styles.linkStyle} ${
    pathname === `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` && styles.currentLinkMobile
  }`}
  onClick={() => {
    if(pathname !== `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`) { 

      nextLink.current=`/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`;
     history.back();
    }
    
  }}
  >
 {c.name}
  </span>
})}
</>

       }









      
    
  </div>
}