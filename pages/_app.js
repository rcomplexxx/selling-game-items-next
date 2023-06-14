import '../styles/globals.css';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState( []);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [hasScrollbar, setHasScrollbar] = useState(true);

  const router=useRouter();
  console.log(hasScrollbar);


  useEffect(() => {
    localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    console.log(JSON.parse(localStorage.getItem('cartProducts')))
  }, [cartProducts]);


  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem('cartProducts'));
    console.log(storedCartProducts);
    if (storedCartProducts) {
      setCartProducts(storedCartProducts);
    }
  }, []);

  useEffect(() => {
   
   
      const hasVerticalScrollbar =  window.visualViewport.width < document.body.clientWidth;
      setHasScrollbar(hasVerticalScrollbar);
  
    

  
  }, [router.pathname]);

  return (
    <>
      <div
        id="hronika"
        style={{
          width: hasScrollbar?'calc(100% - 10px)':'100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'black',
          color: 'white',
          minHeight: '100vh',
          minWidth: 'calc(100vw - 10px)',
          maxWidth:"100vw",
          alignItems: 'center',
          overflowY: 'overlay',
          overflowX: 'hidden'
        }}
      >
        <Navbar
          totalItems={cartProducts.length}
          handleDrawerToggle={handleDrawerToggle}
        />

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        <Footer />
      </div>
    </>
  );
}