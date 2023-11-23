import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Autosuggest from 'react-autosuggest';
import styles from "./navbar.module.css";
import Image from "next/image";
import PopupCart from "./PopupCart/PopupCart";

import Search from "./Search/Search";

const NavBar = ({ totalItems, newProduct, setNewProduct }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const router = useRouter();
  const pathname = router.asPath;

  const handleMobileMenuOpen = (event) => {
    setIsMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setIsMenuClosing(true);

    setTimeout(() => {
      setIsMenuOpen(false);
      setIsMenuClosing(false);
    }, 500);
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
        <div
          className={
            styles.mobileMenu +
            " " +
            (isMenuClosing ? styles.menuCoverDissapear : "")
          }
          onClick={handleMobileMenuClose}
        >
          <div
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

            <Link
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
              href="/contact"
              className={`${styles.linkStyle} ${styles.menuItemDiv} ${
                pathname === "/contact" ?  styles.currentLinkMobile : ""
              }`}
              onClick={() => {
                pathname !== "/contact" && setIsMenuOpen(false);
              }}
            >
              <p>Contact us</p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
