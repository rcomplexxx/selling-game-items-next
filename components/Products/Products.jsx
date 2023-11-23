import React, { useContext } from "react";
import Link from "next/link";
import Product from "./Product/Product";
import styles from "./products.module.css";
import AppContext from "@/contexts/AppContext";

const Products = ({ products, showAll }) => {
  const { cartProducts, setCartProducts, setNewProduct } = useContext(AppContext);

  const onAddToCart = (product, quantity = 1) => {
    const existingProduct = cartProducts.find((cp) => cp.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      setNewProduct(existingProduct);
      setCartProducts([...cartProducts]);
    } else {

      const newProduct=  {
        id: product.id,
        quantity,
        name: product.name,
        image: product.images[0],
        price: product.price,
        variant: product.variants[0].name
      };
      setNewProduct(newProduct);

      const newCartProducts = [
        ...cartProducts,
        newProduct
      ];
      setCartProducts(newCartProducts);
    }
  };

  return (
    <div className={styles.toolbar}>
      <h1 className={styles.title}>Explore our collection</h1>
      <div className={styles.mainGridStyle}>
        {products.map((product, i) => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
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
