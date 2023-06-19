import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';
import Products from '@/components/Products/Products.jsx';
import Link from 'next/link';
import styles from './page.module.css';

const ProductPage = ({ totalPageNumber,pageId, products }) => {
  // Redirect to home page if no product

  const links = [];

  for (let i = 1; i <= totalPageNumber; i++) {
    links.push(
      pageId==i?<div className={styles.pageLink}>
      <Link href={`/products/page/${i}`}  key={i}>
        {i}
      </Link>
      </div>:<Link href={`/products/page/${i}`}  key={i}>
        {i}
      </Link>

    );
  }

  return (
    <div style={{display:'flex', flexDirection:"column", alignItems:"center"}}>
      

      <Products showAll={true} products={products} />
      <div className={styles.linkDiv}>
      {pageId!==1 &&<Link href={`/products/page/${pageId - 1}`}>
        {'<-'}
      </Link>}
        {links}
      {pageId!==totalPageNumber &&<Link href={`/products/page/${pageId + 1}`}>
        {'->'}
      </Link>}
      </div>
     
    </div>
  );
};



export async function getStaticPaths() {
    const productLength = products.length;
    const pagesArray = [];
  
    for (let i = 0; i < Math.floor(productLength / 12) + 1; i++) {
      pagesArray.push({ params: { pageId: (i+1).toString() } });
    }
  
    return { paths: pagesArray, fallback: true };
  }
  
  export async function getStaticProps(context) {
    const pageId = parseInt(context.params.pageId, 10);

    if (pageId === 1) {
      return {
        redirect: {
          destination: `/products`,
           permanent: true,
        },
      };
    }
  

    const productLength = products.length;
    let productArray = 
    (pageId-1) * 12 > productLength
        ? null
        : (pageId*12>productLength?products.slice((pageId - 1) * 12, productLength):products.slice((pageId - 1) * 12, pageId * 12));
  
    // Return the data as props
    return {
      props: {
        totalPageNumber: Math.floor(productLength / 12) + 1,
        products: productArray,
        pageId: pageId
      },
    };
  };


 
  

  
  




export default ProductPage;