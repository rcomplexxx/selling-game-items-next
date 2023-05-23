import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
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

  const renderMobileMenu = (
    <Menu anchorEl={mobileMoreAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={mobileMenuId} keepMounted transformOrigin={{ 
      vertical: 'top', horizontal: 'right' }} open={isMobileMenuOpen} onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton component={Link} href="/cart" aria-label="Show cart items" color="inherit">
          <Badge badgeContent={totalItems} color="secondary" overlap="rectangular">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
    </Menu>
  );
  console.log(pathname)

  return (
    <>
      <nav className={classes.appBar}>
        
        <Toolbar className={classes.toolbar}>
          <Typography component={Link} href="/" variant="h6" className={classes.title} color="inherit">
            <img src='/images/commerce.png' alt="Game Smoke Gear" height="25px" className={classes.image} />GameSmoke Gear</Typography>
          <div className={classes.grow} >
            <Link href='/' className={`${classes.linkStyle} ${pathname === '/' ? classes.currentLink : ''}`}>Home</Link>
            <Link href='/products' className={`${classes.linkStyle} ${pathname === '/shop' ? classes.currentLink : ''}`}>Shop</Link>
            <Link href='/aboutus' className={`${classes.linkStyle} ${pathname === '/about-us' ? classes.currentLink : ''}`}>About</Link>
            <Link href='/contactus' className={`${classes.linkStyle} ${pathname === '/contact-us' ? classes.currentLink : ''}`}>Contact us</Link>
            
          </div>
          
          <div className={classes.button}>
            <IconButton component={Link} href="/cart" className={classes.cartStyle}   aria-label="Show cart items" color="inherit">
              <Badge badgeContent={totalItems} overlap="rectangular" color="secondary">
                <ShoppingCart />
              </Badge>
            </IconButton>
          </div>
          
        </Toolbar>
       
      </nav>
      {renderMobileMenu}
      
    </>
  );
};

export default NavBar;
