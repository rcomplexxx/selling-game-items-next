import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Autosuggest from 'react-autosuggest';
import styles from "./navbar.module.css";
import Image from "next/image";
import PopupCart from "./PopupCart/PopupCart";

import Search from "./Search/Search";
import MobileMenu from "./MobileMenu/MobileMenu";

const NavBar = ({ totalItems, newProduct, setNewProduct }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [subMenu, setSubMenu]=useState(0);



  const router = useRouter();
  const pathname = router.asPath;

  const handleMobileMenuOpen = (event) => {
    setIsMenuOpen(true);
  };
 
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    setWindowWidth(window.innerWidth);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

console.log(pathname)




  return (
    <>
    {newProduct && <div className={styles.substituteDiv}/>}
      <nav className={`${styles.appBar} ${newProduct && styles.appBarFixed}`}>
        <div className={styles.toolbarDiv}>
          {windowWidth < 980 ? (
            <div className={styles.growAlt}>
              <div
                className={styles.menuIconDiv}
                onClick={handleMobileMenuOpen}
              >
                <img
                  src="/images/menuIcon2.png"
                  className={styles.smallMenuImage}
                  alt="Mobile menu"
                />
              </div>
              <Link href="/" className={styles.titleDiv}>
                <h6 className={styles.title}>
                  <img
                    src="/images/commerce.png"
                    alt="Gamebuff icon"
                    className={styles.image}
                  />
                  Gamebuff
                </h6>
              </Link>
            </div>
          ) : (
            <>
              <Link href="/" className="text_decoration_none">
                <h1 className={styles.title}>
                  <img
                    src="/images/commerce.png"
                    alt="Gamebuff icon"
                    className={styles.image}
                  />
                  Gamebuff
                </h1>
              </Link>
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
       
       className={`${styles.linkStyle}`}
       onClick={() => {
         setSubMenu(subMenu==1?0:1);
       }}
     >
       FAQ
       </div>
       {subMenu==1 && <div className={styles.subMenu}>


      <Link
        href="/faq"
        className={`${styles.menuItemDiv} ${
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
        className={`${styles.menuItemDiv} ${
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
        className={`${styles.menuItemDiv} ${
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
        className={`${styles.menuItemDiv} ${
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
        className={`${styles.menuItemDiv} ${
          pathname === "/refund-policy" ? styles.currentLinkMobile : ""
        }`}
        onClick={() => {
          pathname !== "/refund-policy" && setIsMenuOpen(false);
        }}
      >
        <p>Refund policy</p>
      </Link>

       
     </div>
}
     </div>

                <Link
                  href="/aboutus"
                  className={`${styles.linkStyle} ${
                    pathname === "/aboutus" ? styles.currentLink : ""
                  }`}
                >
                  About us
                </Link>
                <Link
                  href="/contact"
                  className={`${styles.linkStyle} ${
                    pathname === "/contact" ? styles.currentLink : ""
                  }`}
                >
                  Contact us
                </Link>
              </div>
            </>
          )}
          <div className={styles.rightOptions}>

                  <Search/>
                  <Link href="/cart">
                <div className={styles.cartStyle}>
                  <img
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
        <PopupCart totalItems={totalItems} newProduct={newProduct} setNewProduct={setNewProduct}/>
      </nav>

      {isMenuOpen && (
        <MobileMenu subMenu={subMenu} setSubMenu={setSubMenu} setIsMenuOpen={setIsMenuOpen}/>
      )}
    </>
  );
};

export default NavBar;
