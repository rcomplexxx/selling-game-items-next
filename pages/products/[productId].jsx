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

  const handleStyleChange = (style) => {
    setSelectedStyle(style);
  };



  const { cartProducts, setCartProducts } = useContext(AppContext);

  const onAddToCart = (quantity = 1) => {
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
          quantity: quantity,
          name: product.name,
          image: product.image,
          price: product.price,
        },
      ];
    }


    setCartProducts(newCartProducts);
  };

  return (

      <div className={styles.productPageDiv}>
        <Head>
   <title>{product.name} - Gamesmoke shop</title>
 </Head>
        <div className={styles.media}>
          <Carousel
            images={images}
            hasMediaButton={false}
            hasIndexBoard={false}
            hasSizeButton={false}
            thumbnailWidth="16%"
            thumbnailHeight="16%"
            style={{ width: "100%", aspectRatio: "16/9" }}
          />
        </div>

        <div
          style={{
            marginLeft: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
            <button
              className={styles.product_style_button}
              onClick={() => handleStyleChange("Black Kitten")}
            >
              <Image
                src={"/images/" + product.image}
                alt="Black Kitten"
                className={styles.product_style_image}
                fill
              />
            </button>
            <button
              className={styles.product_style_button}
              onClick={() => handleStyleChange("Gray Kitten")}
            >
              <Image
                src={"/images/" + product.image}
                alt="Gray Kitten"
                className={styles.product_style_image}
                
                fill
              />
            </button>
            <button
              className={styles.product_style_button}
              onClick={() => handleStyleChange("White Kitten")}
            >
              <Image
                src={"/images/" + product.image}
                alt="White Kitten"
                className={styles.product_style_image}
              
                fill
              />
            </button>
          </div>
          <button
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart(1)}
          >
            Add to Cart
          </button>
        </div>
        <CustomerReviews startReviews={startReviews}/>
      </div>
  );
}

export async function getStaticPaths() {
  const productPagesArray = [];

  products.forEach((product) => {
    productPagesArray.push({ params: { productId: product.id.toString() } });
  });

  return { paths: productPagesArray, fallback: true };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = products.find((p) => {
    return p.id == productId;
  });

  const images = [
    {
      src: "/images/" + product.image,
    },
    {
      src: "/images/keyboard.png",
    },
    {
      src: "/images/boxItem.png",
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
