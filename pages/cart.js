import React from "react";
import Cart from "@/components/Cart/Cart.jsx";
import BestSellers from "@/components/BestSellers/BestSellers";
import Head from "next/head";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart - Gamesmoke shop</title>
      </Head>
      <Cart />
      <BestSellers/>
    </>
  );
}
