import React from "react";
import Products from "@/components/Products/Products.jsx";
import products from "../data/products.json";
import Cart from "@/components/Cart/Cart.jsx";

export default function ProductPage({ products }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Cart />
    </div>
  );
}

export async function getStaticProps() {
  // Return the data as props
  return {
    props: {
      products,
    },
  };
}
