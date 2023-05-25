import '../styles/globals.css';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
// import { commerce } from "./lib/commerce";

export default function App({ Component, pageProps }) {


  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  console.log('my Scroll'+hasScrollbar)

  useEffect(() => {
    const hasVerticalScrollbar = window.visualViewport.width < document.body.clientWidth;
    setHasScrollbar(hasVerticalScrollbar);
  }, []);

  return (<>
    <div
      id="hronika"
      style={{
        width: hasScrollbar ? "calc(100% - 10px)" : "100%",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        minWidth: "100vw",
        marginRight:hasScrollbar ? "10px" : "0",
      }}
    >
      {hasScrollbar && <span>Hello</span>}
 
        <Navbar
          totalItems={cartProducts.length}
          handleDrawerToggle={handleDrawerToggle}
        />

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        <Footer/>
      </div>
    </>
  );
}