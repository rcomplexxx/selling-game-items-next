import React from "react";
import Cart from "@/components/Cart/Cart.jsx";
import Head from 'next/head';


export default function CartPage() {
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

