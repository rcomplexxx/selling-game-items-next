import { useRouter } from "next/router";
import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails, {
  OrderDetailsInfo,
} from "@/components/Checkout/OrderDetails";
import React, { useState, useEffect, useLayoutEffect } from "react";

import products from "../../../data/products.json";
import Head from "next/head";
import styles from "./checkout.module.css";

const BuyNowPage = () => {
  const router = useRouter();

  const { params } = router.query;
  console.log(params);

  const [loading, setLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);

  useLayoutEffect(() => {
    const queryParameters = window.location.search;
    const urlParams = new URLSearchParams(queryParameters);

    // Get individual query parameters
    const productid = urlParams.get("productid");
    const variant = urlParams.get("variant");
    const quantity = urlParams.get("quantity");

    if (!productid || !quantity) {
      setCartProducts([]);
    }

    const product = products.find((p) => {
      return p.id == productid;
    });

    if (product) {
      const newProduct = {
        id: product.id,
        quantity: quantity,
        name: product.name,
        image: product.images[0],
        price: product.price,
        variant: variant
      };
      setCartProducts([newProduct]);
    } else {
      setCartProducts([]);
    }
    setLoading(false);
  }, []);

  if (loading)
    return <div className={styles.checkout_container}>Loading...</div>;

  if (params != "buynow" || cartProducts.length == 0)
    return <div className={styles.checkout_container}></div>;

  return (
    <>
      <Head>
        <title>Checkout - Gamesmoke shop</title>
      </Head>

      <div className={styles.checkout_container}>
        <OrderDetails products={cartProducts} />

        <CheckoutInfo products={cartProducts} setCartProducts={setCartProducts}>
          {" "}
        </CheckoutInfo>
      </div>
    </>
  );
};

export default BuyNowPage;
