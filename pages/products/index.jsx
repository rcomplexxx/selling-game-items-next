import React from "react";
import Products from "@/components/Products/Products.jsx";
import products from "../../data/products.json";
import Link from "next/link";
import styles from "./page/page.module.css";
import Head from "next/head";
import Image from "next/image";
import PageNumber from "@/components/PageNumbers/PageNumbers";
import { NextSeo } from "next-seo";
import { unimportantPageSeo } from "@/utils/SEO-configs/next-seo.config";

export default function ProductPage({ products, links }) {
  return (
    <div className={styles.mainDiv}>
      <NextSeo {...unimportantPageSeo('/products')}/>
      <Products showAll={true} products={products}></Products>

      <PageNumber mainLink='/products/page/' links={links} pageId={1}/>
      
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
      links: links.length === 0 ? null : links,
    },
  };
}
