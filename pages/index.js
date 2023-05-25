
import React,{useContext} from 'react';
import HomeText from '@/components/HomeText';
import HomeReviews from '../components/HomeReviews/HomeReviews.jsx'
import Products from '@/components/Products/Products.jsx';
import products from "../data/products.json";
import styles from "../styles/appStyle.module.css";
import AppContext from "@/contexts/AppContext";
const HomePage = ({products}) => {


  const { hasScrollbar } = useContext(AppContext);

  return ( <>
     
     <div className={styles.heroImageDiv}></div>
                <div className={styles.heroWindow}>
                  <button className={styles.linkButton +' '+ styles.linkButtonFirst}>Shop Now</button>
                  <button className={styles.linkButton}>New Items</button>
                  <button className={styles.linkButton}>On Sale</button>
                </div>
    
                <main className={styles.content + hasScrollbar?' '+styles.marginRight:''}>
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