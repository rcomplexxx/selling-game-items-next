import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';
import Products from '@/components/Products/Products.jsx';

const ProductPage = ({ pageId, products }) => {
  // Redirect to home page if no product
  console.log(products);

  const getPageMenu = () => {
    // Define the page menu options
    const pageMenuOptions = ["One", "Two", "Three", "Four", "Five"];

    // Generate the menu items based on the pageId
    const menuItems = pageMenuOptions.map((option, index) => (
      <li key={index} className={pageId === index + 1 ? "active" : ""}>
        {option}
      </li>
    ));

    // Render the page menu
    return (
      <ul className="page-menu">
        {menuItems}
      </ul>
    );
  };

  return (
    <>
      {getPageMenu()}
      <Products showAll={true} products={products} />
    </>
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