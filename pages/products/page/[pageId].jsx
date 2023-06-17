import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';

const ProductPage = ({ products }) => {
  // Redirect to home page if no product
console.log(products);

  return (
    <div>
      <p>Product Page</p>
    </div>
  );
};



export async function getStaticPaths() {
    const productLength = products.length;
    const pagesArray = [];
  
    for (let i = 0; i < Math.floor(productLength / 12) + 1; i++) {
      pagesArray.push({ params: { pageId: (i+1).toString() } });
    }
  
    return { paths: pagesArray, fallback: false };
  }
  
  export async function getStaticProps(context) {
    const pageId = parseInt(context.params.pageId, 10);
    const productLength = products.length;
    let productArray = 
    pageId * 12 > productLength
        ? null
        : products.slice((pageId - 1) * 12, pageId * 12);
  
    // Return the data as props
    return {
      props: {
        products: productArray,
      },
    };
  }
  




export default ProductPage;