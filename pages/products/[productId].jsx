import React from "react";
import products from "../../data/products.json";
import Image from "next/image";
import AppContext from "@/contexts/AppContext";
import CustomerReviews from "@/components/CustomerReviews/CustomerReviews.jsx";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

import { useState, useContext } from "react";
import { RatingStar } from "rating-star";
import styles from "../../styles/productpage.module.css";
import reviewsData from "../../public/reviews.json";
import Head from 'next/head';





export default function ProductPage({ product,images, startReviews }) {
  if (!product) return <p style={{ marginTop: "100px" }}>Product not found.</p>;

  const [selectedStyle, setSelectedStyle] = useState("Black Kitten");




  const { cartProducts, setCartProducts } = useContext(AppContext);

  const onAddToCart = (quantity = 1) => {
    const productIndex = cartProducts.findIndex((cp) => cp.id === product.id);
  
    if (productIndex !== -1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[productIndex].quantity += 1;
      setCartProducts(updatedCartProducts);
    } else {
      const newProduct = {
        id: product.id,
        quantity: quantity,
        name: product.name,
        image: product.image,
        price: product.price,
      };
      setCartProducts([...cartProducts, newProduct]);
    }
  };

  return (
<>
<Head>
   <title>{product.name} - Gamesmoke shop</title>
 </Head>
      <div className={styles.productPageDiv}>
        <div className={styles.media}>
          <Carousel
            images={images}
            transitionSpeed={0.25}
            hasMediaButton={false}
            hasIndexBoard={false}
            hasSizeButton={false}
            swipeThreshold={0.2}
            thumbnailWidth="16%"
            thumbnailHeight="16%"
            style={{ width: "100%", aspectRatio: "16/9" }}
          />
        </div>

        <div
        className={styles.productInfo}
          
        >
          <h1 className={styles.product_title}>{product.name}</h1>
          <div className={styles.product_rating}>
            {" "}
            <RatingStar maxScore={50} id="123" rating={46} />
            (14)
          </div>
          <p className={styles.product_price}>1,160.14 RSD</p>
          <p className={styles.product_style_label}>Style - {selectedStyle}</p>
          <div className={styles.product_style_options}>
          <span className={styles.product_style_span}  onClick={() => setSelectedStyle("Black Kitten")}>
              <Image
                src={"/images/" + product.image}
                alt="Black Kitten"
                className="object_fit_cover"
                fill
              />
            </span>
            <span className={styles.product_style_span}  onClick={() => setSelectedStyle("Gray Kitten")}>
              <Image
                src={"/images/" + product.image}
                alt="Gray Kitten"
                className="object_fit_cover"
                fill
              />
              </span>
              

          <span  className={styles.product_style_span} onClick={() => setSelectedStyle("White Kitten")}>
            
              <Image
                src={"/images/" + product.image}
                alt="White Kitten"
                className="object_fit_cover"
                fill
              />
           </span>
          </div>
          <button
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart(1)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <CustomerReviews startReviews={startReviews}/>
    </>
  );
}

export async function getStaticPaths() {
 

  
  

  return { paths: products.map((product) => {return { params: { productId: product.id.toString() } }; }), 
    
    fallback: true };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = products.find((p) => {
    return p.id == productId;
  });

  const images = [
    {
      src: "/images/" + product.image,
      alt: 'product image',
    },
    {
      src: "/images/keyboard.png",
      alt: 'second product image',
    },
    {
      src: "/images/boxItem.png",
      alt: 'third product image',
    },
  ];

  // Return the data as props
  return {
    props: {
      product,
      images,
      startReviews:reviewsData.slice(0, 12)
      
    },
  };
}
