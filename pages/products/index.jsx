import React from "react";
import Products from "@/components/Products/Products.jsx";
import products from "../../data/products.json";
import Link from "next/link";
import styles from "./page/page.module.css";

export default function ProductPage({ products,  links }) {
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
        {links &&
          links.map((link) => {
            return link === 1 ? (
              <div className={styles.pageLink}>
                {" "}
                <Link href={`/products/page/${1}`} key={1}>
                  {1}
                </Link>
              </div>
            ) : (
              <Link href={`/products/page/${link}`} key={link}>
                {link}
              </Link>
            );
          })}
        {links && <Link href={`/products/page/2`}>{"->"}</Link>}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const totalPageNumber = Math.ceil(products.length / 12);
  const links = [];
  if (totalPageNumber !== 1) {
    for (let i = 1; i <= totalPageNumber; i++) {
      links.push(i);
    }
  }

  return {
    props: {
      products: products.slice(0, 12),
      links: links.length===0?null:links,
    },
  };
}
