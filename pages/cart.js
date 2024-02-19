import React from "react";
import Cart from "@/components/Cart/Cart.jsx";

import Head from "next/head";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart - {process.env.NEXT_PUBLIC_SITE_NAME}</title>
      </Head>
      <Cart />
     
    </>
  );
}
