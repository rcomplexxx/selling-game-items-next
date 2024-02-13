import React, { useEffect } from "react";
import HomeText from "@/components/HomeText/HomeText";
import HomeReviews from "../components/HomeReviews/HomeReviews.jsx";
import Products from "@/components/Products/Products.jsx";
import products from "../data/products.json";
import styles from "../styles/appStyle.module.css";
import Head from "next/head";
import Link from "next/link";
import Ticker from 'react-ticker'
import Image from "next/image";

const HomePage = ({ products }) => {

useEffect(()=>{
  var s = document.getElementById("heroShopNow");

  const parallax=()=> {
    
  var yPos = -window.scrollY/50;  
  s.style.transform = `translateY(${yPos}px)` }

window.addEventListener("scroll", parallax);
return()=>{
  window.removeEventListener("scroll", parallax)
}

},[])


  return (
    <>
      <Head>
        <title>Gamesmoke shop</title>
      </Head>

   

      <picture className={styles.heroWindow}>
    <source srcset="/images/gameGirl2Zoomed.png"
            media="(min-width: 720px)"/>
   
        <img
          height={0}
          width={0}
         src={`/images/gameGirl2.png`} // Path to your image from the `public` directory
          alt="Hero Discount Image"
          priority={true}
          sizes="100vw"
        

          className={styles.heroImage}
        />
 



        <Link id='heroShopNow' href="/products" className={styles.linkButton}>
          Shop Now
        </Link>
        </picture>

      
     



      <div className={styles.content}>
     

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
