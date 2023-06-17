import React from 'react';
import { useRouter } from 'next/router';
import products from '../../data/products.json'

export default function ProductPage({products}) {
  const router = useRouter();

  // Redirect to home page
  
    if(!products)router.push('/');
 

  return (
    <div>
      <p>Product Page</p>
    </div>
  );
}



export async function getStaticPaths(){



    return {
      fallback:false,
      paths:[
        {
        params:{
            products:products
        }
    },
]
};



}