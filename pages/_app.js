import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from "@/contexts/AppContext";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [hasScrollbar, setHasScrollbar] = useState(true);
  const [showNav, setShowNav]= useState(true);

  const router = useRouter();

  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    setCartProducts(storedCartProducts || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    setHasScrollbar(window.visualViewport.width < document.body.clientWidth);
   router.pathname==='/checkout'?setShowNav(false):setShowNav(true);
  }, [router.pathname]);

  return (
    
      <div
        id="hronika"
       className="hronika"
       style={{width: hasScrollbar ? "calc(100% - 10px)" : "100%"}}
      >
        {showNav &&<Navbar
          totalItems={cartProducts.length}
        />}

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        {router.pathname!=='/checkout' && <Footer />}
      </div>
  );
}
