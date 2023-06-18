import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';
import Products from '@/components/Products/Products.jsx';
import Link from 'next/link';

const ProductPage = ({ products }) => {
  // Redirect to home page if no product
  console.log(products);

  return (
    <div>
      <h1>Products</h1>
    
      <Products showAll={true} products={products} />
      <div>
        <Link>1</Link>
        <Link>2</Link>
        <Link>3</Link>
        <Link>4</Link>
        <Link>5</Link>
        <Link>{'->'}</Link>
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
        products: productArray
      },
    };
  }
  




export default ProductPage;