import React, { useState, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useRouter } from "next/router";
// import sqlite3 from 'sqlite3';

import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from "@/contexts/AppContext";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";
import EmailFlowPopup from "@/components/EmailFlowPopup/EmailFlowPopup";

export default function App({ Component, pageProps }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [newProduct, setNewProduct]=useState();
  const [showNav, setShowNav] = useState(true);
  const [removeNavFinal, setRemoveNavFinal]= useState(false);
  const [emailPopup, setEmailPopup] = useState(false);

  const router = useRouter();
  const popupTimeout=useRef();

  useEffect(() => {

  
    const handleRouteChangeComplete = (url) => {
      url.startsWith("/checkout") ||
      url === "/thank-you" ||
      
      url.startsWith("/admin")
        ? setRemoveNavFinal(true)
        : setRemoveNavFinal(false);
    }
    

    const handleRouteChangeStart = (url) => {

      
      // 'url' parameter contains the new route
      setNewProduct();
      if(url.startsWith("/checkout") ||
      url === "/thank-you" ||
      
      url.startsWith("/admin")){ setShowNav(false);}
        else{ setShowNav(true); setRemoveNavFinal(false);}
      console.log('Route change started to:', url);
    };

   
    handleRouteChangeStart(router.pathname);
    handleRouteChangeComplete(router.pathname);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    //NAPRAVITI SMOOTH ANIMACIJU ZATVARANJA NAVBARA CIM SE KLIKNE NA LINK KOJI NE TREBA DA SADRZI NAVBAR


    // Cleanup the event listener when the component unmounts
   
    //beforeHistoryChange



    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    setCartProducts(storedCartProducts || []);



    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };


  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    const handleRouteChangeComplete = (url) => {
      url.startsWith("/checkout") ||
      url === "/thank-you" ||
      
      url.startsWith("/admin")
        ? setRemoveNavFinal(true)
        : setRemoveNavFinal(false);
    };
    
    handleRouteChangeComplete(router.pathname);



    clearInterval(popupTimeout.current); popupTimeout.current= setInterval(()=>{
      console.log('lstr', localStorage.getItem("popupShownDateInDays"), Math.floor(Date.now() / 86400000) )
      if(localStorage.getItem("popupShownDateInDays") && (Math.floor(Date.now() / 86400000))-localStorage.getItem("popupShownDateInDays")<15 ){ clearTimeout(popupTimeout.current); return;}
        console.log(router);
    if(router.pathname!=='/404' && (router.pathname==='/' || (router.pathname.includes('/products') && !router.asPath.includes('#zoom')
    && !router.asPath.includes('#write-review')) || router.pathname.includes('/collection') || router.pathname=='/our-story' || router.pathname=='/faq')){
      setEmailPopup(true);  clearTimeout(popupTimeout.current);
    }
   
    }, 30000);





  }, [router.asPath]);









  // // ! Koristiti ovaj segment koda za pravljenje jedne tabele u
  // // !sqllite koja se treba inicijalizovati samo jednom. Nakon
  // // !inicijalizacije izbrisati ovaj segment koda
  // // import sqlite3 from 'sqlite3';

  //   const db = new sqlite3.Database('./data/database.db');

  // // Create a table
  // db.run('CREATE TABLE IF NOT EXISTS admincheck (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)');

  // // Insert data into the table
  // const username = 'rcomplexxx';
  // const password = 'bleachbankairevolution98';

  // db.run('INSERT INTO admincheck (username, password) VALUES (?, ?)', [username, password], function(err) {
  //   if (err) {
  //     return console.error('Error inserting data:', err.message);
  //   }
  //   console.log(`A row has been inserted with id ${this.lastID}`);
  // });

  // // Close the database connection
  // db.close();

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
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {emailPopup && <EmailFlowPopup setEmailPopup={setEmailPopup}/>}
      {!removeNavFinal && <Navbar totalItems={totalItems}  newProduct={newProduct} setNewProduct={setNewProduct}/>}

      <AppContext.Provider value={{ cartProducts, setCartProducts, setNewProduct }}>
        <Component {...pageProps} />
      </AppContext.Provider>

      {showNav && <Footer />}
    </div>
  );
}
