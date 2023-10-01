import React, { useState, useEffect } from "react";
import {
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Typography,
} from "@mui/material";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";

const NavBar = ({ totalItems }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const router = useRouter();
  const pathname = router.pathname;


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
 
 

  return (
    <>
      <nav className={styles.appBar}>
        <Toolbar className={styles.toolbar}>
         
{/* Doradi className={classNames(styles.menuButton)} */}
          {windowWidth < 980 ? (
            <div className={styles.growAlt}>
              <IconButton
                
                onClick={handleMobileMenuOpen}
                aria-label="Menu"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Link
                href="/"
                style={{ marginLeft: "10px",  }}
                className='text_decoration_none'
              >
                <Typography
                  variant="h6"
                  className={styles.title}
                  color="inherit"
                >
                  <img
                    src="/images/commerce.png"
                    alt="Gamebuff"
                    className={styles.image}
                  />
                  Gamebuff
                </Typography>
              </Link>
            </div>
          ) : (
            <>
            <Link href="/" className="text_decoration_none">
            <h1 className={styles.title}>
               <img
                 src="/images/commerce.png"
                 alt="Gamebuff"
                 className={styles.image}
               />
               Gamebuff</h1>
               
             
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
                href="/aboutus"
                className={`${styles.linkStyle} ${
                  pathname === "/aboutus" ? styles.currentLink : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/contactus"
                className={`${styles.linkStyle} ${
                  pathname === "/contactus" ? styles.currentLink : ""
                }`}
              >
                Contact us
              </Link>
            </div>
            </>
          )}

          
            <Link href="/cart">
              <IconButton
                className={styles.cartStyle}
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge
                  badgeContent={totalItems}
                  overlap="rectangular"
                  color="secondary"
                >
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Link>
        </Toolbar>
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
          styles.mainMenuCard + " " + (isMenuClosing ? styles.menuClose : "")
        }
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "10px",
          }}
        >
          <button
           className={styles.menuItem_x_button}
            onClick={handleMobileMenuClose}
          >
            <Typography
              style={{ fontSize: "20px", fontWeight: "700", cursor: "pointer" }}
              variant="body1"
            >
              x
            </Typography>
          </button>
        </MenuItem>

        <Link
          href="/"
          className={`${styles.linkStyle} ${
            pathname === "/" ? styles.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">Home</Typography>
          </MenuItem>
        </Link>

        <Link
          href="/products"
          className={`${styles.linkStyle} ${
            pathname === "/products" ? styles.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/products"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">Products</Typography>
          </MenuItem>
        </Link>
        <Link
          href="/aboutus"
          className={`${styles.linkStyle} ${
            pathname === "/aboutus" ? styles.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/aboutus"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">About</Typography>
          </MenuItem>
        </Link>
        <Link
          href="/contactus"
          className={`${styles.linkStyle} ${
            pathname === "/contactus" ? styles.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/contactus"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">Contact us</Typography>
          </MenuItem>
        </Link>
      </div>
    </div>
  )}
    </>
  );
};

export default NavBar;
