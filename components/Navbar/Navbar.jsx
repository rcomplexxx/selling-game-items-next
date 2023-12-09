import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Autosuggest from 'react-autosuggest';
import styles from "./navbar.module.css";
import Image from "next/image";
import PopupCart from "./PopupCart/PopupCart";
import collections from '@/data/collections.json'
import Search from "./Search/Search";
import MobileMenu from "./MobileMenu/MobileMenu";

const NavBar = ({ totalItems, newProduct, setNewProduct }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenu, setSubMenu]=useState(0);
  const [searchOpen, setSearchOpen]= useState(false);
  

  const router = useRouter();
  const pathname = router.asPath;

  const handleMobileMenuOpen = (event) => {
    setSubMenu(0);
    setIsMenuOpen(true);
  };
 

  useEffect(()=>{if(newProduct) {
    const popupCart = document.getElementById('popupCart');
    if (popupCart) {
      popupCart.focus();
    }
  }},[newProduct])


  return (
    <>
    {(newProduct || searchOpen || isMenuOpen) && <div className={styles.substituteDiv}/>}
  
      <nav className={`${styles.appBar} ${(newProduct || searchOpen || isMenuOpen) && styles.appBarFixed} ${newProduct && styles.appBarMaterialize}`}
      onMouseDown={(event)=>{ if(newProduct) event.preventDefault()}} id='popupCart' tabindex="0" onBlur={()=>{
      setNewProduct();
    }}
      >
        <div className={styles.toolbarDiv}>
          
            <div className={styles.growAlt}>
              <div
                className={styles.menuIconDiv}
                onClick={handleMobileMenuOpen}
              >
                <Image
                height={0}
                width={0}
                sizes="24px"
                  src="/images/menuIcon2.png"
                  className={styles.smallMenuImage}
                  alt="Mobile menu"
                />
              </div>
              <Link href="/" className="text_decoration_none">
                <h1 className={styles.title}>
                <Image
                    height={32}
                    width={32}
                    src="/images/commerce.png"
                    alt="Gamebuff icon"
                    className={styles.image}
                  />
                  Gamebuff
                </h1>
              </Link>
            </div>
        
            
            
              <div className={styles.grow}>
                <Link
                  href="/"
                  className={`${styles.linkStyle} ${
                    pathname === "/" ? styles.currentLink : ""
                  }`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`${styles.linkStyle} ${
                    pathname === "/products" ? styles.currentLink : ""
                  }`}
                >
                  Products
                </Link>


                <Link
                  href="/collection/sale/page/1"
                  className={`${styles.linkStyle} ${
                    pathname === "/collection/sale/page/1" ? styles.currentLink : ""
                  }`}
                >
                  Sale
                </Link>



                <div className={styles.subMenuPortal}>

<div
tabindex="0"
onBlur={()=>{setSubMenu(0)}}
className={`${styles.subMenuTitle} ${styles.linkStyle}`}
onClick={() => {
setSubMenu(subMenu==2?0:2);
}}
>
<span>Collections</span><Image height={8} width={8} src='/images/greaterLessx.png' className={`${styles.subMenuArrow} ${subMenu==2 && styles.subMenuArrowOpen}`}/>
</div>
{subMenu==2 && <div className={`${styles.subMenu}`}>

   {collections.map(c => {return <Link
  href={`/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1`}
  className={`${styles.menuItemDiv} ${
  pathname === `/collection/${c.name.toLowerCase().replace(/ /g, '-')}/page/1` ? styles.currentLinkMobile : ""
  }`}
  onMouseDown={(event)=>{event.preventDefault()}}
  onClick={() => {
  setSubMenu(0);
  }}
  >
  <p>{c.name}</p>
  </Link>
})
}

</div>

}
</div>






               
                <div className={styles.subMenuPortal}>

                <div
       tabindex="0"
       onBlur={()=>{setSubMenu(0)}}
       className={`${styles.subMenuTitle} ${styles.linkStyle}`}
       onClick={() => {
         setSubMenu(subMenu==1?0:1);
       }}
     >
       <span>FAQ</span><Image height={8} width={8} src='/images/greaterLessx.png' className={`${styles.subMenuArrow} ${subMenu==1 && styles.subMenuArrowOpen}`}/>
       </div>
       {subMenu==1 && <div className={`${styles.subMenu} ${styles.subMenuFaq}`}>


       <Link
                  href="/aboutus"
                  className={`${styles.menuItemDiv} ${
                    pathname === "/aboutus" ? styles.currentLinkMobile : ""
                  }`}
                  onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
                >
                 <p>About us</p> 
                </Link>

      <Link
        href="/faq"
        className={`${styles.menuItemDiv} ${
          pathname === "/faq" ? styles.currentLinkMobile : ""
        }`}
        onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
      >
        <p>General questions</p>
      </Link>

      <Link
        href="/terms-of-service"
        className={`${styles.menuItemDiv} ${
          pathname === "/terms-of-service" ? styles.currentLinkMobile : ""
        }`}
        onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
      >
        <p>Terms of service</p>
      </Link>
      <Link
        href="/privacy-policy"
        className={`${styles.menuItemDiv} ${
          pathname === "/privacy-policy" ? styles.currentLinkMobile : ""
        }`}
        onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
      >
        <p>Privacy policy</p>
      </Link>
      <Link
        href="/shipping-policy"
        className={`${styles.menuItemDiv} ${
          pathname === "/shipping-policy" ? styles.currentLinkMobile : ""
        }`}
        onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
      >
        <p>Shipping policy</p>
      </Link>
      <Link
        href="/refund-policy"
        className={`${styles.menuItemDiv} ${
          pathname === "/refund-policy" ? styles.currentLinkMobile : ""
        }`}
        onMouseDown={(event)=>{event.preventDefault()}}
        onClick={() => {
          setSubMenu(0);
        }}
      >
        <p>Refund policy</p>
      </Link>

       
     </div>
}
     </div>





                
                <Link
                  href="/contact"
                  className={`${styles.linkStyle} ${
                    pathname === "/contact" ? styles.currentLink : ""
                  }`}
                >
                  Contact us
                </Link>
              </div>
            
        
          <div className={styles.rightOptions}>

                  <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen}/>
                  <Link href="/cart">
                <div className={styles.cartStyle}>
                  <Image height={32} width={32}
                    src="/images/bagBlue.png"
                    className={styles.bagImg}
                    alt="cart"
                  />
                  {totalItems > 0 && (
                    <div className={styles.badgeDiv}>{totalItems}</div>
                  )}
                </div>
              </Link>
                  </div>
        </div>
        {!isMenuOpen && <PopupCart totalItems={totalItems} newProduct={newProduct} setNewProduct={setNewProduct}/>}
      </nav>

      {isMenuOpen && (
        <MobileMenu subMenu={subMenu} setSubMenu={setSubMenu} setIsMenuOpen={setIsMenuOpen}/>
      )}
    </>
  );
};

export default NavBar;
