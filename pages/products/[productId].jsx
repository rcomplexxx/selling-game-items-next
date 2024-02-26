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
import getRatingData from "@/utils/getRatingData";
import PayPalButton from "@/components/Checkout/PayPal/PayPal";
import GooglePay from "@/components/Checkout/GooglePay/GooglePay";

//slickGoTo
//afterChange(index)=>{}
//Alice~~!
//activeIndex : Number, default 0 - Set carousel at the specified position.
//onUpdated={(e) => { e.item je index

export default function ProductPage({ product, images, startReviews, ratingData }) {
  if (!product) return <p className={styles.notFound}>Product not found.</p>;
 

  const [quantity, setQuantity] = useState(1);
  const [variant, setVariant]=useState(product.variants && product.variants[0].name);
  const router = useRouter();


  const { cartProducts, setCartProducts, setNewProduct, } = useContext(AppContext);

  const onAddToCart = ( quantity = 1,addedProduct=product, addedVariant=variant) => {
    const productIndex = cartProducts.findIndex((cp) => cp.id === addedProduct.id && cp.variant===addedVariant);

    if (productIndex !== -1) {
      const updatedCartProducts = [...cartProducts];
      updatedCartProducts[productIndex].quantity += quantity;
      setNewProduct(updatedCartProducts[productIndex]);
      setCartProducts(updatedCartProducts);
    } else {
      const newProduct = {
        id: addedProduct.id,
        quantity: quantity,
        name: addedProduct.name,
        image: addedProduct.images[0],
        price: addedProduct.price,
        variant: addedVariant
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
      
      <div className={styles.productPageDiv}>
        <div className={styles.media}>
          <ProductPics productId={product.id} onAddToCart ={ onAddToCart }images={images} variantImageIndex={product.variants && product.variants.find((v)=>{return v.name==variant})?.variantProductImageIndex} />
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
           
            <StarRatings
              rating={ratingData.rating?ratingData.rating:4.7}
              starRatedColor="#97892F"
              numberOfStars={5}
              starEmptyColor={"#ebebeb"}
              starDimension="20px"
              starSpacing="0.4px"
            />
            <span>({ratingData.reviewsNumber})</span>
          </div>
          <div className={styles.product_price}>
            {product.stickerPrice && <span>${product.stickerPrice.toFixed(2)}</span>}$
            {product.price.toFixed(2)}
          </div>
          <p className={styles.product_style_label}>Color: {variant}</p>
          <div className={styles.product_style_options}>
            {product.variants && product.variants.map((v, i)=>{
           return  <div
           key={i}
              className={`${styles.product_style_span}`}
              onClick={() => {
                
                setVariant(v.name);
              }}
            >
              <Image
                src={"/images/" + v.image}
                alt={v.name}
                sizes="(max-width: 980px) 48px, 64px"
                className={`${styles.productVariantImage} ${v.name==variant && styles.productVariantSelected}`}
               
                height={0}
                width={0}
              />
            </div>
            })

}
           
          </div>

          <QuantityButton quantity={quantity} setQuantity={setQuantity} />

         

          <button
          id='addToCart'
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart( quantity)}
            onMouseDown={(event)=>{event.preventDefault()}}
          >
            Add to Cart
          </button>

          {/* <div className={styles.paypalWrapper}>
            <PayPalButton type='instant' color='gold' organizeUserData={
             (paymentMethod)=>{
                const email = "";
                const firstName = "";
                const lastName = "";
                const address = "";
                const apt = "";
                const country = "";
                const zipcode = "";
                const state = "";
                const city = "";
                const phone = "";
               
                const items=[{
                  id: product.id,
                  quantity: quantity,  
                  variant: variant
                }];
               
                const requestData = {
                  order: {
                    email,
                    firstName,
                    lastName,
                    address,
                    apt,
                    country,
                    zipcode,
                    state,
                    city,
                    phone,
                    discountCode: "",
                    tip: 0,
                    items:items ,
                  },
                  paymentMethod: paymentMethod,
                  paymentToken: undefined
            
                  // Include other payment-related data if required
                };
                return requestData
              }
            
          }/>
          </div> */}


          <button className={styles.but_now_button} onClick={() => buyNow()}>
            Buy it now
          </button>


        

          <div className={styles.buyBadges}>
          <Image src='/images/cardVisa2.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/>
            <Image src='/images/cardMasterCard5.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/>
           <Image src='/images/cardAmex2.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/>
           
         
          {/* <div id="moreCards" className={styles.moreCards}>+4</div> */}
            <Image src='/images/cardJcb2.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/>
            
            {/* <Image src='/images/cardGpay2.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/> */}
            <Image src='/images/cardDiscover3.svg' className={styles.creditCardLogo} height={0} width={0} sizes="72px"/>
          </div>

          <FrequentlyBoughtTogether
            fbtProductInfo={product.fbt}
            onAddToCart={onAddToCart}
          />

          <ProductPageCards />
        </div>
      </div>

      <CustomerReviews product_id={product.id} startReviews={startReviews} ratingData={ratingData} />
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
    
    

    let ratingData={};
    let reviewsNumberFinal = 0;
    let sumOfAllReviews= 0 ;
    for(let i=1; i <6; i++){
      const reviewsNumber = getRatingData(productId, i);
      ratingData={...ratingData, [`stars${i}`]:reviewsNumber}
      reviewsNumberFinal = reviewsNumberFinal + reviewsNumber;
      sumOfAllReviews=sumOfAllReviews+reviewsNumber*i;
    }
    const averageValue=reviewsNumberFinal!==0?Math.round(sumOfAllReviews/reviewsNumberFinal * 10)/ 10:4.7;
    if(reviewsNumberFinal===0) ratingData={stars5:386, stars4:60, stars3:0, stars2:1, stars1:2, reviewsNumber: 449, rating: averageValue}
    else{ratingData={...ratingData, reviewsNumber: reviewsNumberFinal, rating: averageValue}}
  // Return the data as props
  return {
    props: {
      product,
      images,
      startReviews: reviewsData,
      ratingData: ratingData
    },
  };
}



