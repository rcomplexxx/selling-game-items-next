import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import Image from "next/image";

import collections from "@/data/collections.json";
import Search from "./Search/Search";

import dynamic from "next/dynamic";

// import MobileMenu from "./MobileMenu/MobileMenu";
const MobileMenu = dynamic(() => import("./MobileMenu/MobileMenu"));
const PopupCart = dynamic(() => import("./PopupCart/PopupCart"));

const NavBar = ({ totalItems, newProduct, setNewProduct }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [subMenu, setSubMenu] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);

  const subMenuRef = useRef();

  const router = useRouter();
  const pathname = router.asPath;

  const handleMobileMenuOpen = (event) => {
    setSubMenu(0);
    setIsMenuOpen(true);
  };

  useEffect(() => {
    let handleClickOutside;

    if (subMenu == 1) {
      subMenuRef.current.style.top = "40px";

      handleClickOutside = (event) => {
     

        if (
          !subMenuRef.current?.contains(event.target) &&
          !document?.getElementById("infoDropMenuLink").contains(event.target)
        ) {
          setSubMenu(0);
        }
      
      };

      document?.addEventListener("click", handleClickOutside, true);
    } else if (subMenu == 2) {
      subMenuRef.current.style.top = "40px";

      handleClickOutside = (event) => {
      

        if (
          !subMenuRef.current?.contains(event.target) &&
          !document
            ?.getElementById("collectionsDropMenuLink")
            .contains(event.target)
        ) {
          setSubMenu(0);
        }
     
      };

      document?.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [subMenu]);

  // !showNav && styles.disableNav
  return (
    <>
      {(newProduct || searchOpen || isMenuOpen) && (
        <div className={styles.substituteDiv} />
      )}

      <nav
        className={`${styles.appBar} ${
          (newProduct || searchOpen || isMenuOpen) && styles.appBarFixed
        } ${newProduct && window.scrollY > 0 && styles.appBarMaterialize}`}
        onMouseDown={(event) => {
          if (newProduct) event.preventDefault();
        }}
        id="navBar"
      >
        <div className={styles.toolbarDiv}>
          <div className={styles.growAlt}>
            <div
              id="mobileMenuSpawn"
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
            <Link href="/" className={styles.logoLink}>
              <Image
                height={24}
                width={24}
                src="/images/commerce.png"
                alt={`${process.env.NEXT_PUBLIC_SITE_NAME} icon`}
                className={styles.image}
              />
              <h1 className={styles.title}>
                {/* {process.env.NEXT_PUBLIC_SITE_NAME} */}
                Gamebuff
              </h1>
            </Link>
          </div>

          <div className={styles.grow}>
            <Link
              href="/"
              className={`${styles.linkStyle} ${
                pathname === "/" && styles.currentLink
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`${styles.linkStyle} ${
                pathname === "/products" && styles.currentLink
              }`}
            >
              Products
            </Link>

            <Link
              href="/collection/sale/page/1"
              className={`${styles.linkStyle} ${
                pathname === "/collection/sale/page/1" && styles.currentLink
              }`}
            >
              Sale
            </Link>

            <div className={styles.subMenuPortal}>
              <div
                id="collectionsDropMenuLink"
                className={`${styles.subMenuTitle} ${styles.linkStyle}`}
                onClick={() => {
                  setSubMenu(subMenu == 2 ? 0 : 2);
                }}
              >
                <span>Collections</span>
                <Image
                  height={8}
                  width={8}
                  src="/images/greaterLessx.png"
                  className={`${styles.subMenuArrow} ${
                    subMenu == 2 && styles.subMenuArrowOpen
                  }`}
                />
              </div>
              {subMenu == 2 && (
                <div id="collectionsDropMenu"   ref={subMenuRef} className={`${styles.subMenu}`}>
                  {collections.map((c) => {
                    return (
                      <Link
                        href={`/collection/${c.name
                          .toLowerCase()
                          .replace(/ /g, "-")}/page/1`}
                        className={`${styles.menuItemDiv} ${
                          pathname ===
                          `/collection/${c.name
                            .toLowerCase()
                            .replace(/ /g, "-")}/page/1`
                            ? styles.currentLinkMobile
                            : ""
                        }`}
                        onClick={() => {
                          setSubMenu(0);
                        }}
                      >
                        {c.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <div className={styles.subMenuPortal}>
              <div
                id="infoDropMenuLink"
                className={`${styles.subMenuTitle} ${styles.linkStyle}`}
                onClick={() => {
                  setSubMenu(subMenu == 1 ? 0 : 1);
                }}
              >
                <span>Info</span>
                <Image
                  height={8}
                  width={8}
                  src="/images/greaterLessx.png"
                  className={`${styles.subMenuArrow} ${
                    subMenu == 1 && styles.subMenuArrowOpen
                  }`}
                />
              </div>
              {subMenu == 1 && (
                <div
                  id="infoDropMenu"
                  ref={subMenuRef}
                  className={`${styles.subMenu} ${styles.subMenuFaq}`}
                >
                  <Link
                    href="/our-story"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/our-story" ? styles.currentLinkMobile : ""
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    Our story
                  </Link>

                  <Link
                    href="/faq"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/faq" ? styles.currentLinkMobile : ""
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    FAQ
                  </Link>

                  <Link
                    href="/terms-of-service"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/terms-of-service" &&
                      styles.currentLinkMobile
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    Terms of service
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/privacy-policy" && styles.currentLinkMobile
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    Privacy policy
                  </Link>
                  <Link
                    href="/shipping-policy"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/shipping-policy" &&
                      styles.currentLinkMobile
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    Shipping policy
                  </Link>
                  <Link
                    href="/refund-policy"
                    className={`${styles.menuItemDiv} ${
                      pathname === "/refund-policy" && styles.currentLinkMobile
                    }`}
                    onClick={() => {
                      setSubMenu(0);
                    }}
                  >
                    Refund policy
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              className={`${styles.linkStyle} ${
                pathname === "/contact-us" && styles.currentLink
              }`}
            >
              Contact us
            </Link>
          </div>

          <div className={styles.rightOptions}>
            <Search searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
            <Link href="/cart">
              <div className={styles.cartStyle}>
                <Image
                  height={32}
                  width={32}
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
        {!isMenuOpen && newProduct && (
          <PopupCart
            totalItems={totalItems}
            newProduct={newProduct}
            setNewProduct={setNewProduct}
          />
        )}
      </nav>

      {isMenuOpen && (
        <MobileMenu
          isMenuOpen={isMenuOpen}
          subMenu={subMenu}
          setSubMenu={setSubMenu}
          setIsMenuOpen={setIsMenuOpen}
        />
      )}
    </>
  );
};

export default NavBar;
