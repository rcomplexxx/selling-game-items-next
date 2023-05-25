import '../styles/globals.css';


import React, { useState, useEffect, createContext, } from "react";

import  Navbar  from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
// import { commerce } from "./lib/commerce";









export default function App({ Component, pageProps }) {



  
   
      const [mobileOpen, setMobileOpen] = React.useState(false);
    
      const [cartProducts, setCartProducts] = useState([]);
    

      const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

      

      const [hasScrollbar, setHasScrollbar] = useState(false);

  useEffect(() => {
    const hasScrollbar = window.innerWidth < document.documentElement.clientWidth;
    setHasScrollbar(hasScrollbar);
  }, []);



  return (
<>

  

<div
id="hronika"
style={{
  width: hasScrollbar ? 'calc(100% - 10px)' : '100%',
  width:'100%',
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
   
   </>
        
      
  );
}


