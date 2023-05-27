import '../styles/globals.css';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
import { useRouter } from 'next/router';
// import { commerce } from "./lib/commerce";

export default function App({ Component, pageProps }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [hasScrollbar, setHasScrollbar] = useState(false);

  const router=useRouter();
  

  useEffect(() => {
   
   
      const hasVerticalScrollbar = document.documentElement.scrollHeight > document.documentElement.clientHeight;
      setHasScrollbar(hasVerticalScrollbar);
  


  
  }, [router.pathname]);

  return (
    <>
      <div
        id="hronika"
        style={{
          width: hasScrollbar ? 'calc(100% - 10px)' : '100%',
          height: 'fit-content',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'black',
          color: 'white',
          minHeight: '100vh',
          minWidth: 'calc(100vw - 10px)',
          alignItems: 'center',
          overflowY: 'overlay'
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