
import React from 'react';
import HomeText from '@/components/HomeText';
import HomeReviews from '../components/HomeReviews/HomeReviews.jsx'
import Products from '@/components/Products/Products.jsx';
import products from "../data/products.json";
import styles from "../styles/appStyle.module.css";
import Image from 'next/image.js';
const HomePage = ({products}) => {
  return ( <>
     
     <div className={styles.heroImageDiv}></div>
     <Image className={styles.heroImage}
      src={'/images/gamerwp.png'} // Path to your image from the `public` directory
      alt="Example Image"
    
      objectFit="cover"
      fill
     
     ></Image>
                <div className={styles.heroWindow}>
                  <button className={styles.linkButton +' '+ styles.linkButtonFirst}>Shop Now</button>
                  <button className={styles.linkButton}>New Items</button>
                  <button className={styles.linkButton}>On Sale</button>
                </div>
    
                <main className={styles.content}>
                  <HomeText></HomeText>
                  <HomeReviews></HomeReviews>
                 <Products products={products}/>
                </main>
                
                
                </>
                
                
                );
}



export async function getStaticProps() {

 

  // Return the data as props
  return {
    props: {
      products
    },
  };
}


export default HomePage;