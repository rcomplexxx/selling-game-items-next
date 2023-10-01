import CheckoutInfo from "@/components/Checkout/CheckoutInfo";
import OrderDetails,{OrderDetailsInfo} from "@/components/Checkout/OrderDetails";
import React,{ useState,useContext, useRef, useEffect } from "react";
import styles from "./checkout.module.css";
import AppContext from "@/contexts/AppContext";
import Head from 'next/head';



const CheckoutPage = () => {

  const { cartProducts, setCartProducts } = useContext(AppContext);
  const [divWidth, setDivWidth] = useState(0);

  const divRef = useRef(null);


  const updateWidth = () => {
    if (divRef.current) {
      setDivWidth(divRef.current.offsetWidth + 10);
      console.log(divRef.current.offsetWidth);
    }
    
  };

  // Attach the resize event listener on component mount
  useEffect(() => {
    updateWidth(); // Initial measurement
    window.addEventListener('resize', updateWidth);
    return () => {
      // Detach the event listener on component unmount
      window.removeEventListener('resize', updateWidth);
    };
  }, []);


  



  return (

    <div ref={divRef} className={styles.checkout_container}>
      <Head>
   <title>Checkout - Gamesmoke shop</title>
 </Head>
 {cartProducts.length===0?<p>No items in the bag.</p>:<>

 <CheckoutInfo products={cartProducts}> {divWidth<980 && <OrderDetailsInfo products ={cartProducts }/>}</CheckoutInfo>
      <OrderDetails products={cartProducts }>
        {divWidth>980 && <OrderDetailsInfo products={cartProducts }/> }
        </OrderDetails></>}
      
    </div>
  );
};

export default CheckoutPage;
