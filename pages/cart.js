import React from "react";
import Cart from "@/components/Cart/Cart.jsx";
import Head from 'next/head';


export default function Cart() {
  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
       <Head>
        <title>Cart - Gamesmoke shop</title>
      </Head>
      <Cart />
    </div>
  );
}

