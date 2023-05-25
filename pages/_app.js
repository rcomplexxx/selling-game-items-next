import '../styles/globals.css';
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
// import { commerce } from "./lib/commerce";
import React, { useState, useEffect } from "react";

export default function App(Component, pageProps ) {
  const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const hasVerticalScrollbar =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;
    setHasScrollbar(hasVerticalScrollbar);
  }, []);

  return (
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
      }}
    >
 
        <Navbar
          totalItems={cartProducts.length}
          handleDrawerToggle={handleDrawerToggle}
        />

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        <Footer/>
        </div>
  );

}