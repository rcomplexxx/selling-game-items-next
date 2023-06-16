import React, { useContext } from "react";
import Grid from "@mui/material/Grid";

import Product from "./Product/Product";
import styles from "./products.module.css";
import AppContext from "@/contexts/AppContext";
import Link from "next/link";

const Products = ({ products, showAll }) => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const onAddToCart = async (product, quantity = 1) => {
    let foundProduct = false;
    let newCartProducts = cartProducts.map((cp) => {
      if (cp.id === product.id) {
        cp.quantity = cp.quantity + 1;
        foundProduct = true;
      }
      return cp;
    });
    if (!foundProduct) {
      newCartProducts = [
        ...newCartProducts,
        {
          id: product.id,
          quantity,
          name: product.name,
          image: product.image,
          price: product.price,
        },
      ];
    }

    console.log(newCartProducts);
    setCartProducts(newCartProducts);
  };


  const renderAll = () => {
    return products.map((product) => (
      <Grid
        className={styles.productGridStyle}
        key={product.id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      </Grid>
    ));
  };

  const renderSome= ()=>{
    return products
    .slice(0, 6) // Slice the products array to get only the first 9 products
    .map((product, i) => (
      <Grid
        className={styles.productGridStyle}
        key={product.id}
        item
        xs={12}
        sm={6}
        md={4}
        lg={4}
      >
        <Product key={product.id} product={product} onAddToCart={onAddToCart} />
      </Grid>
    ));
  };

 
  

  return (
    <div className={styles.toolbar}>
      <h1 className={styles.title}>Explore our collection</h1>
      <div>
        <Grid
          className={styles.mainGridStyle}
          container
          justifyContent="center"
        >
          {showAll?renderAll():renderSome()}
        </Grid>    
      </div>
      {!showAll && <Link href="/products" style={{ marginTop:"10px", marginBottom:"20px", fontSize:"28px", padding:"8px 16px", color:"gray", backgroundColor:"transparent", border:"solid gray 1px", textDecoration:"none" }}>View All</Link>}
    </div>
  );
};

export default Products;
