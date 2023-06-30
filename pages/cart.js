import React from "react";
import Products from "@/components/Products/Products.jsx";
import products from "../data/products.json";
import Cart from "@/components/Cart/Cart.jsx";
import Head from 'next/head';


export default function ProductPage() {
  return (
<>
<Head>
   <title>Cart- Gamesmoke shop</title>
 </Head>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Cart />
    </div>
    </>
  );
}

