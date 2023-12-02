import React from "react";
import HomeText from "@/components/HomeText/HomeText";
import HomeReviews from "../components/HomeReviews/HomeReviews.jsx";
import Products from "@/components/Products/Products.jsx";
import products from "../data/products.json";
import styles from "../styles/appStyle.module.css";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

const HomePage = ({ products }) => {
  return (
    <>
      <Head>
        <title>Gamesmoke shop</title>
      </Head>

      <div className={styles.heroWindow}>
        <Image
          height={0}
          width={0}
         
          src={`/images/gamerwpmobile.png`} // Path to your image from the `public` directory
          alt="Hero Discount Image"
          priority={true}
          sizes="100vw"
          className={styles.heroImage}
        />
        <Link href="/products" className={styles.linkButton}>
          Shop Now
        </Link>
      </div>

      <div className={styles.content}>
        <HomeText />

        <Products showAll={false} products={products} />
        <HomeReviews />
      </div>
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
