import React, { useState, useEffect,  useMemo, useRef } from "react";
import { useRouter } from "next/router";


import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from "@/contexts/AppContext";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import EmailFlowPopup from "@/components/EmailFlowPopup/EmailFlowPopup";
import { inter, eb_Garamond } from "@/utils/fonts";

export default function App({ Component, pageProps }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [newProduct, setNewProduct]=useState();
  const [emailPopup, setEmailPopup] = useState(false);

  const router = useRouter();
  const popupTimeout=useRef();

  useEffect(() => {

  
  
    

  

    document.querySelector("html").className=`${inter.variable} ${eb_Garamond.variable}`;

    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    setCartProducts(storedCartProducts || []);

    if(!localStorage.getItem("popupShownDateInDays"))localStorage.setItem("popupShownDateInDays", Math.floor(Date.now() / 86400000))
 
 
 

  


  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
  
    



    
    if((Math.floor(Date.now() / 86400000))-localStorage.getItem("popupShownDateInDays")>15  &&
      
      router.pathname!=='/404' && (router.pathname==='/' || (router.pathname.includes('/products') && !router.asPath.includes('#zoom')
    && !router.asPath.includes('#write-review')) || router.pathname.includes('/collection') || router.pathname=='/our-story' || router.pathname=='/faq')){
    popupTimeout.current= setTimeout(()=>{

     
       
    
      setEmailPopup(true); 
    
   
    }, 30000);
  }

    return ()=>{ clearTimeout(popupTimeout.current); }





  }, [router.asPath]);





const totalItems= useMemo(()=>{
  let s=0;
  cartProducts.forEach(cp=>{
    s=s+cp.quantity;
  })
  return s
},[cartProducts])




  return (
 
     
    
    <div
      id="hronika"
      className={`hronika`}
    >
       <Head>
      <title>Gamebuff</title>
        <link rel="icon" href="/images/favicon.ico" />
     
        </Head>
       
      
      
     <Navbar totalItems={totalItems}  newProduct={newProduct} setNewProduct={setNewProduct}/>

      
      <AppContext.Provider value={{ cartProducts, setCartProducts, setNewProduct }}>
        <Component {...pageProps} />
      </AppContext.Provider>
      
       <Footer />
       {emailPopup && <EmailFlowPopup setEmailPopup={setEmailPopup}/>}
    </div>
   
     
  
  );
}
