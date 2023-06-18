import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';
import Products from '@/components/Products/Products.jsx';

const ProductPage = ({ pageId, products }) => {
  // Redirect to home page if no product
  console.log(products);

  return (
    <div>
      <h1>Products</h1>
      <div>
        <h2>Menu</h2>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>---)</button>
      </div>
      <Products showAll={true} products={products} />
      
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
    (pageId-1) * 12 > productLength
        ? null
        : (pageId*12>productLength?products.slice((pageId - 1) * 12, productLength):products.slice((pageId - 1) * 12, pageId * 12));
  
    // Return the data as props
    return {
      props: {
        products: productArray,
        pageId: pageId
      },
    };
  }
  




export default ProductPage;