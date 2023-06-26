import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from "@/contexts/AppContext";
import Footer from "@/components/Footer/Footer";

export default function App({ Component, pageProps }) {
  const [cartProducts, setCartProducts] = useState(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    return storedCartProducts || [];
  });
  const [hasScrollbar, setHasScrollbar] = useState(true);

  const router = useRouter();

 

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    setHasScrollbar(window.visualViewport.width < document.body.clientWidth);
  }, [router.pathname]);

  return (
    
      <div
        id="hronika"
       className="hronika"
      >
        <Navbar
          totalItems={cartProducts.length}
        />

        <AppContext.Provider value={{ cartProducts, setCartProducts }}>
          <Component {...pageProps} />
        </AppContext.Provider>

        <Footer />
      </div>
  );
}
