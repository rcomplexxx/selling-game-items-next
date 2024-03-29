import React from "react";
import Link from "next/link";
import Product from "./Product/Product";
import styles from "./products.module.css";
import AppContext from "@/contexts/AppContext";

const Products = ({ products, showAll, productListTitle }) => {
 

  return (
    <div className={styles.toolbar}>
     {productListTitle && <h1 className={styles.title}>{productListTitle}</h1>}
      <div className={styles.mainGridStyle}>
        {products.map((product, i) => (
          <Product
            key={i}
            product={product}
          
          />
        ))}
      </div>
      {!showAll && (
        <Link href="/products" className={styles.viewAllLink}>
          View All
        </Link>
      )}
    </div>
  );
};

export default Products;
