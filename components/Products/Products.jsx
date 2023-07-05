import React, { useContext } from "react";
import Link from "next/link";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";
import styles from "./products.module.css";
import AppContext from "@/contexts/AppContext";

const Products = ({ products, showAll }) => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const onAddToCart = (product, quantity = 1) => {
  const existingProduct = cartProducts.find((cp) => cp.id === product.id);

  if (existingProduct) {
    existingProduct.quantity += 1;
    setCartProducts([...cartProducts]);
  } else {
    const newCartProducts = [
      ...cartProducts,
      {
        id: product.id,
        quantity,
        name: product.name,
        image: product.image,
        price: product.price,
      },
    ];
    setCartProducts(newCartProducts);
  }
};

  return (
    <div className={styles.toolbar}>
      <h1 className={styles.title}>Explore our collection</h1>
        <Grid
          className={styles.mainGridStyle}
          container
          justifyContent="flex-start"
        >
          {products.map((product, i) => (
            <Grid
              className={styles.productGridStyle}
              key={product.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
            >
              <Product
                product={product}
                onAddToCart={onAddToCart}
              />
            </Grid>
          ))}
        </Grid>
      {!showAll && (
        <Link
          href="/products"
          className={styles.viewAllLink}
        >
          View All
        </Link>
      )}
    </div>
  );
};

export default Products;
