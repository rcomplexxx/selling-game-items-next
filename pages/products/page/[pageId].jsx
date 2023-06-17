import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import products from '../../../data/products.json';

const ProductPage = ({ product }) => {
  // Redirect to home page if no product
  const router = useRouter();
  useEffect(() => {
    if (!product) {
      router.push('/');
    }
  }, []);

  return (
    <div>
      <p>Product Page</p>
    </div>
  );
};



export default ProductPage;