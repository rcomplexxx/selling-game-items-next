import React from "react";
import { useRouter } from "next/router";
import Products from "../../components/Products";

const ProductPage = () => {
  const router = useRouter();
  const { pageId } = router.query;

  // Assuming you have the products array available
  const products = [
    // Your products data here
  ];

  const currentPage = parseInt(pageId);

  return <p>You are in Page</p>>
};

export default ProductPage;