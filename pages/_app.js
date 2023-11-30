import React, { useState, useEffect, useLayoutEffect, useMemo } from "react";
import { useRouter } from "next/router";
// import sqlite3 from 'sqlite3';

import "../styles/globals.css";
import Navbar from "../components/Navbar/Navbar.jsx";
import AppContext from "@/contexts/AppContext";
import Footer from "@/components/Footer/Footer";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [newProduct, setNewProduct]=useState();
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const router = useRouter();
  useEffect;
  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts"));
    setCartProducts(storedCartProducts || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  useEffect(() => {
    setNewProduct(undefined);
    router.pathname.startsWith("/checkout") ||
    router.pathname === "/thank-you" ||
    router.pathname === "/404" ||
    router.pathname.startsWith("/admin")
      ? setShowNav(false)
      : setShowNav(true);
  }, [router.asPath]);

  useLayoutEffect(() => {
    setHasScrollbar(window.visualViewport.width < document.body.clientWidth);
  }, [showNav]);

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
  cartProducts.map(cp=>{
    s=s+cp.quantity;
  })
  return s
},[cartProducts])


  return (
    <div
      id="hronika"
      className={`hronika ${hasScrollbar && "contentWidthScrollbarOn"}`}
    >
      <Head>
        <link rel="icon" href="/images/favicon.ico" />
      </Head>
      {showNav && <Navbar totalItems={totalItems}  newProduct={newProduct} setNewProduct={setNewProduct}/>}

      <AppContext.Provider value={{ cartProducts, setCartProducts, setNewProduct }}>
        <Component {...pageProps} />
      </AppContext.Provider>

      {showNav && <Footer />}
    </div>
  );
}
