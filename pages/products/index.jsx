import React from 'react'
import Products from '@/components/Products/Products.jsx'
import products from '../../data/products.json'


export default function ProductPage({slicedProducts}){


  return <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
  <Products showAll={true} products={slicedProducts}>
    
  </Products>


  </div>

}


export async function getStaticProps() {

  const slicedProducts= products.slice(0, 6);

    // Return the data as props
    return {
      props: {
        slicedProducts
      },
    };
  }
  