import React from "react";
import products from "../../data/products.json";
import Image from "next/image";
import AppContext from "@/contexts/AppContext";
import CustomerReviews from "@/components/CustomerReviews/CustomerReviews.jsx";
// import Carousel from "react-gallery-carousel";
// import "react-gallery-carousel/dist/index.css";

import { useState, useContext, useRef } from "react";
import StarRatings from "react-star-ratings";
import styles from "../../styles/productpage.module.css";

import Head from "next/head";
import QuantityButton from "@/components/QuantityButton/QuantityButton";
import FrequentlyBoughtTogether from "@/components/FrequentlyBoughtTogether/FrequentlyBoughtTogether";

import ProductPageCards from "@/components/ProductPageCards/ProductPageCards";

import ProductPics from "@/components/ProductPics/ProductPics";
import { useRouter } from "next/router";
import { getReviewsData } from "@/utils/getStartReviews";

//slickGoTo
//afterChange(index)=>{}
//Alice~~!
//activeIndex : Number, default 0 - Set carousel at the specified position.
//onUpdated={(e) => { e.item je index

export default function ProductPage({ product, images, startReviews }) {
  if (!product) return <p className={styles.notFound}>Product not found.</p>;


  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant]=useState(product.variants && product.variants[0].name);
  const router = useRouter();

  const carouselRef = useRef();

  const { cartProducts, setCartProducts, setNewProduct } = useContext(AppContext);

  const onAddToCart = ( quantity = 1) => {
    const productIndex = cartProducts.findIndex((cp) => cp.id === product.id);

    if (productIndex !== -1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[productIndex].quantity += quantity;
      setNewProduct(updatedCartProducts[productIndex]);
      setCartProducts(updatedCartProducts);
    } else {
      const newProduct = {
        id: product.id,
        quantity: quantity,
        name: product.name,
        image: product.images[0],
        price: product.price,
        variant: variant
      };
      setNewProduct(newProduct);
      setCartProducts([...cartProducts, newProduct]);
    }
  };

  const buyNow = () => {
    router.push(
      `/checkout/buynow?productid=${product.id}${product.variants && `&variant=${variant}`}&quantity=${quantity}`,
    );
  };
  

  return (
    <>
      <Head>
        <title>{product.name} - Gamesmoke shop</title>
      </Head>
      <div className={styles.productPageDiv}>
        <div className={styles.media}>
          <ProductPics  onAddToCart ={ onAddToCart }images={images} />
        </div>

        <div className={styles.productInfo}>
          <h1 className={styles.product_title}>{product.name}</h1>
          <div
            className={styles.product_rating}
            onClick={() => {
              document
                .getElementById("customerReviews")
                .scrollIntoView({ behavior: "smooth" });
            }}
          >
            {" "}
            <StarRatings
              rating={product.raiting?product.raiting:4.7}
              starRatedColor="#97892F"
              numberOfStars={5}
              starEmptyColor={"#ebebeb"}
              starDimension="20px"
              starSpacing="0.4px"
            />
            <span>({product.reviewNumber})</span>
          </div>
          <div className={styles.product_price}>
            {product.stickerPrice && <span>${product.stickerPrice.toFixed(2)}</span>}$
            {product.price.toFixed(2)}
          </div>
          <p className={styles.product_style_label}>Color: {variant}</p>
          <div className={styles.product_style_options}>
            {product.variants && product.variants.map(v=>{
           return  <span
              className={styles.product_style_span}
              onClick={() => {
                
                setVariant(v.name);
              }}
            >
              <Image
                src={"/images/" + v.image}
                alt={v.name}
                sizes="(max-width: 980px) 48px, 64px"
                className={styles.productVariantImage}
               
                height={0}
                width={0}
              />
            </span>
            })

}
           
          </div>

          <QuantityButton quantity={quantity} setQuantity={setQuantity} />

          <button
          id='addToCart'
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart( quantity)}
          >
            Add to Cart
          </button>

          <button className={styles.but_now_button} onClick={() => buyNow()}>
            Buy it now
          </button>

          <FrequentlyBoughtTogether
            products={product.fbt}
            onAddToCart={onAddToCart}
          />

          <ProductPageCards />
        </div>
      </div>

      <CustomerReviews product_id={product.id} startReviews={startReviews} reviewNumber={product.reviewNumber} stars={product.raiting?product.raiting:4.7} />
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: products.map((product) => {
      return { params: { productId: product.id.toString() } };
    }),

    fallback: true,
  };
}

export async function getStaticProps(context) {
  const productId = context.params.productId;
  const product = products.find((p) => {
    return p.id == productId;
  });

  const images = product.images
    .map((img) => {
      return {
        src: "/images/" + img,
        alt: "product image",
      };
    })
    .concat([
      {
        src: "/images/keyboard.png",
        alt: "second product image",
      },
      {
        src: "/images/keyboard2.png",
        alt: "third product image",
      },
      {
        src: "/images/boxItem2.png",
        alt: "third product image",
      },
      {
        src: "/images/boxItem.png",
        alt: "third product image",
      },
    ]);


    const reviewsData= getReviewsData(productId);
    


  // Return the data as props
  return {
    props: {
      product,
      images,
      startReviews: reviewsData,
    },
  };
}
