import React from "react";
import HomeText from "@/components/HomeText";
import HomeReviews from "../components/HomeReviews/HomeReviews.jsx";
import Products from "@/components/Products/Products.jsx";
import products from "../data/products.json";
import styles from "../styles/appStyle.module.css";
import Head from 'next/head';
import Link from 'next/link'

const HomePage = ({ products }) => {
  return (
    <>
  
<Head>
   <title>Gamesmoke shop</title>
 </Head>
      <div className={styles.heroImageDiv}/>
      <div className={styles.heroWindow}>
        <Link href='/products' className={styles.linkButton}>
          Shop Now
        </Link>
       
      </div>

      <main className={styles.content}>
        <HomeText />

        <Products showAll={false} products={products} />
        <HomeReviews />
      </main>
    </>
  );
};

export async function getStaticProps() {
  // Return the data as props
  return {
    props: {
      products: products.slice(0, 6),
    },
  };
}

export default HomePage;
