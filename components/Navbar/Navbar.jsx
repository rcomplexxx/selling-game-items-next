import React, { useState } from 'react';
import { Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';




import classes from './navbar.module.css';

const NavBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
 
  
  const router = useRouter();
  const  pathname = router.pathname;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const [isMenuOpen, setIsMenuOpen] = useState(false);

const handleMenuToggle = () => {
  setIsMenuOpen(!isMenuOpen);
};

const renderMobileMenu = (
  <>
    <IconButton className={classes.menuButton} onClick={handleMenuToggle} aria-label="Menu" color="inherit">
      <MenuIcon />
    </IconButton>
    {isMenuOpen && (
      <div className={classes.mobileMenu}>
        <MenuItem>
          <Link href="/cart">
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
          <Typography variant="body1" className={classes.menuItemText}>
            Cart
          </Typography>
        </MenuItem>
      </div>
    )}
  </>
);
  console.log(pathname)

 
  return (
  <>
    <nav className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link href="/">
          <Typography variant="h6" className={classes.title} color="inherit">
            <img src="/images/commerce.png" alt="Game Smoke Gear" height="25px" className={classes.image} />
            GameSmoke Gear
          </Typography>
        </Link>
        <div className={classes.grow}>
          {window.innerWidth < 600 ? (
            <IconButton className={classes.menuButton} onClick={handleMenuToggle} aria-label="Menu" color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Link href="/" className={`${classes.linkStyle} ${pathname === '/' ? classes.currentLink : ''}`}>
                Home
              </Link>
              <Link href="/products" className={`${classes.linkStyle} ${pathname === '/shop' ? classes.currentLink : ''}`}>
                Shop
              </Link>
              <Link href="/aboutus" className={`${classes.linkStyle} ${pathname === '/about-us' ? classes.currentLink : ''}`}>
                About
              </Link>
              <Link href="/contactus" className={`${classes.linkStyle} ${pathname === '/contact-us' ? classes.currentLink : ''}`}>
                Contact us
              </Link>
            </>
          )}
        </div>
        <div className={classes.button}>
          <Link href="/cart">
            <IconButton className={classes.cartStyle} aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} overlap="rectangular" color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </nav>
    {isMenuOpen && (
      <div className={classes.mobileMenu}>
        <MenuItem>
          <Link href="/cart">
            <IconButton aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </Link>
          <Typography variant="body1" className={classes.menuItemText}>
            Cart
          </Typography>
        </MenuItem>
      </div>
    )}
  </>
);
};

export default NavBar;
