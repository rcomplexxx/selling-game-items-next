import React from "react";
import products from "../../data/products.json";
import Image from "next/image";
import AppContext from "@/contexts/AppContext";
import CustomerReviews from "@/components/CustomerReviews/CustomerReviews.jsx";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";

import { useState, useContext,useRef } from "react";
import { RatingStar } from "rating-star";
import styles from "../../styles/productpage.module.css";
import reviewsData from "../../public/reviews.json";
import Head from 'next/head';
import QuantityButton from "@/components/QuantityButton/QuantityButton";
import FrequentlyBoughtTogether from "@/components/FrequentlyBoughtTogether/FrequentlyBoughtTogether";

import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";



export default function ProductPage({ product,images, startReviews }) {
  if (!product) return <p style={{ marginTop: "100px" }}>Product not found.</p>;

  const [selectedStyle, setSelectedStyle] = useState("Black");
  const [quantity, setQuantity] = useState(1);
  const carouselRef= useRef();



  const { cartProducts, setCartProducts } = useContext(AppContext);

  const onAddToCart = (product,quantity = 1) => {
    const productIndex = cartProducts.findIndex((cp) => cp.id === product.id);
  
    if (productIndex !== -1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[productIndex].quantity += quantity;
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
          ref={carouselRef}
            images={images}
            transitionSpeed={0.25}
          
            hasMediaButton={false}
            hasIndexBoard={false}
            hasSizeButton={false}
            swipeThreshold={0.2}
              swipeRollbackSpeed={0.01}
            thumbnailWidth="var(--size-10)"
            thumbnailHeight="calc(var(--size-10) * 9 / 16)"
            style={{ width: "100%", aspectRatio: "16/9" }}
          />
        </div>
        <div
        className={styles.productInfo}
          
        >
          <h1 className={styles.product_title}>{product.name}</h1>
          <div className={styles.product_rating} onClick={()=>{document.getElementById("customerReviews").scrollIntoView({ behavior: "smooth" });}}>
            {" "}
            <RatingStar size={20} maxScore={50} id="123" rating={46} colors={{mask: "rgb(151, 137, 47)"}} />
            (14)
          </div>
         <p className={styles.product_price}> 1,160.14 RSD</p>
          <p className={styles.product_style_label}>Color: {selectedStyle}</p>
          <div className={styles.product_style_options}>
          <span className={styles.product_style_span} 
          onClick={() => {carouselRef.current.goToIndex(0);setSelectedStyle("Black");}}>
         
              <Image
                src={"/images/" + product.image}
                alt="Black"
                className="object_fit_cover"
                fill
              />
            </span>
            <span className={styles.product_style_span}  
            onClick={() => {carouselRef.current.goToIndex(1);setSelectedStyle("Gray");}}>
              <Image
                src={"/images/keyboard.png" }
                alt="Gray"
                className="object_fit_cover"
                fill
              />
              </span>
              

          <span  className={styles.product_style_span}  onClick={() => {carouselRef.current.goToIndex(2);setSelectedStyle("White");}}>
            
              <Image
                src={"/images/boxItem.png" }
                alt="White"
                className="object_fit_cover"
                fill
              />
           </span>
          </div>

          <QuantityButton quantity={quantity} setQuantity={setQuantity}/>

          <button
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart(product,quantity)}
          >
            Add to Cart
          </button>



        <FrequentlyBoughtTogether onAddToCart={onAddToCart} />

        
        <ProductPageCards/>

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
