import React from "react";
import Products from "@/components/Products/Products.jsx";
import products from "../../data/products.json";
import Link from "next/link";
import styles from "./page/page.module.css";

export default function ProductPage({ products }) {
  const totalPageNumber = Math.ceil(products.length / 12);
  const links = [
    <div className={styles.pageLink}>
      <Link href={`/products/page/${1}`} key={1}>
        {1}
      </Link>
    </div>,
  ];

  for (let i = 2; i <= totalPageNumber; i++) {
    links.push(
      <Link href={`/products/page/${i}`} key={i}>
        {i}
      </Link>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Products showAll={true} products={products}></Products>

      <div className={styles.linkDiv}>
        {links}
        {totalPageNumber > 1 && <Link href={`/products/page/2`}>{"->"}</Link>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      products: products.slice(0, 12),
    },
  };
}
