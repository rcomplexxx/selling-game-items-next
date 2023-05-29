import React, { useState, useEffect } from 'react';
import { Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@mui/material';
import { ShoppingCart, Menu as MenuIcon } from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/router';

import classes from './navbar.module.css';

const NavBar = ({ totalItems }) => {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const router = useRouter();
  const pathname = router.pathname;

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    setWindowWidth(window.innerWidth);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id="primary-search-account-menu-mobile"
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link href="/">
          <Typography variant="body1">Home</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/products">
          <Typography variant="body1">Shop</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/aboutus">
          <Typography variant="body1">About</Typography>
        </Link>
      </MenuItem>
      <MenuItem>
        <Link href="/contactus">
          <Typography variant="body1">Contact us</Typography>
        </Link>
      </MenuItem>
    </Menu>
  );

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
            {windowWidth < 980 && (
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileMenuOpen}
                aria-label="Menu"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
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
      {renderMobileMenu}
    </>
  );
};

export default NavBar;