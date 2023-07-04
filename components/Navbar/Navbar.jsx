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

import classes from "./navbar.module.css";

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
      <nav className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
         

          {windowWidth < 980 ? (
            <div className={classes.growAlt}>
              <IconButton
                className={classes.menuButton}
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
                  className={classes.title}
                  color="inherit"
                >
                  <img
                    src="/images/commerce.png"
                    alt="Gamesmoke Shop"
                    height="25px"
                    className={classes.image}
                  />
                  Gamesmoke Shop
                </Typography>
              </Link>
            </div>
          ) : (
            <>
            <Link href="/" className="text_decoration_none">
            <h1 className={classes.title}>
               <img
                 src="/images/commerce.png"
                 alt="Gamesmoke Shop"
                 className={classes.image}
               />
               Gamesmoke Shop</h1>
               
             
           </Link>
            <div className={classes.grow}>
              <Link
                href="/"
                className={`${classes.linkStyle} ${
                  pathname === "/" ? classes.currentLink : ""
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`${classes.linkStyle} ${
                  pathname === "/products" ? classes.currentLink : ""
                }`}
              >
                Products
              </Link>
              <Link
                href="/aboutus"
                className={`${classes.linkStyle} ${
                  pathname === "/aboutus" ? classes.currentLink : ""
                }`}
              >
                About
              </Link>
              <Link
                href="/contactus"
                className={`${classes.linkStyle} ${
                  pathname === "/contactus" ? classes.currentLink : ""
                }`}
              >
                Contact us
              </Link>
            </div>
            </>
          )}

          
            <Link href="/cart">
              <IconButton
                className={classes.cartStyle}
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
        classes.mobileMenu +
        " " +
        (isMenuClosing ? classes.menuCoverDissapear : "")
      }
      onClick={handleMobileMenuClose}
    >
      <div
        className={
          classes.mainMenuCard + " " + (isMenuClosing ? classes.menuClose : "")
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
           className={classes.menuItem_x_button}
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
          className={`${classes.linkStyle} ${
            pathname === "/" ? classes.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">Home</Typography>
          </MenuItem>
        </Link>

        <Link
          href="/products"
          className={`${classes.linkStyle} ${
            pathname === "/products" ? classes.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/products"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">Products</Typography>
          </MenuItem>
        </Link>
        <Link
          href="/aboutus"
          className={`${classes.linkStyle} ${
            pathname === "/aboutus" ? classes.currentLink : ""
          }`}
          onClick={ ()=>{pathname !== "/aboutus"  && setIsMenuOpen(false)}}
        >
          <MenuItem>
            <Typography variant="body1">About</Typography>
          </MenuItem>
        </Link>
        <Link
          href="/contactus"
          className={`${classes.linkStyle} ${
            pathname === "/contactus" ? classes.currentLink : ""
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
