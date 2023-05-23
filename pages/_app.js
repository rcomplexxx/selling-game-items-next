import '../styles/globals.css';

 import data from "@/data/products.json";
import React, { useState, useEffect, createContext, } from "react";

import  Navbar  from "../components/Navbar/Navbar.jsx";
import AppContext from '@/contexts/AppContext';
import Footer from '@/components/Footer/Footer';
// import { commerce } from "./lib/commerce";




// 
// import { CssBaseline } from "@material-ui/core";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { Navbar, Products, Cart, Checkout } from "./components";
// import { commerce } from "./lib/commerce";
// import Footer from "./components/Footer/Footer";
// import "./mainStyle/appStyle.css";
// import { Typography } from "@material-ui/core";
// import PrivacyPolicy from "./Pages/conversion-pages/PrivacyPolicy";
// import AboutUs from "./Pages/conversion-pages/AboutUs";
// import ContactUs from "./Pages/conversion-pages/ContactUs";
// import ShippingPolicy from "./Pages/conversion-pages/ShippingPolicy";
// import Faq from "./Pages/conversion-pages/Faq/Faq.jsx";
// import ScrollToTop from "./Cards/ScrollToTop";
// import OrderTracker from "./Pages/conversion-pages/OrderTracker";
// import ProductPage from "./Pages/conversion-pages/ProductPage/ProductPage";
// import HomeText from "./components/HomeText";
// import HomeReviews from "./components/HomeReviews/HomeReviews";





export default function App({ Component, pageProps }) {



  
   
      const [mobileOpen, setMobileOpen] = React.useState(false);
      const [products, setProducts] = useState([]);
    
      const [cartProducts, setCartProducts] = useState([]);
    
      const [order, setOrder] = useState({});
      const [errorMessage, setErrorMessage] = useState("");
    
      const fetchProducts = async () => {
        setProducts(data);
        console.log(data);
      };
    
    //   const handleAddToCart = async (productId, quantity = 1) => {
    //     let foundProduct = false;
    //     let newCartProducts = cartProducts.map((cp) => {
    //       if (cp.id === productId) {
    //         cp.quantity = cp.quantity + 1;
    //         foundProduct = true;
    //       }
    //       return cp;
    //     });
    //     if (!foundProduct) {
    //       const specificProduct = products.find((p) => p.id == productId);
    //       if (specificProduct)
    //         newCartProducts = [
    //           ...newCartProducts,
    //           {
    //             id: productId,
    //             quantity,
    //             name: specificProduct.name,
    //             image: specificProduct.image,
    //             price: specificProduct.price,
    //           },
    //         ];
    //     }
    
    //     console.log(newCartProducts);
    //     setCartProducts(newCartProducts);
    //   };

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    
    //   const handleUpdateCartQty = async (lineItemId, quantity) => {
    //     const specificItem = cartProducts.find((cp) => cp.id === lineItemId);
    //     if (specificItem) {
    //       if (specificItem.quantity + quantity === 0)
    //         return setCartProducts(
    //           cartProducts.filter((cp) => cp.id != specificItem.id)
    //         );
    //       setCartProducts(
    //         cartProducts.map((cp) => {
    //           if (cp.id === specificItem.id) cp.quantity = cp.quantity + quantity;
    //           return cp;
    //         })
    //       );
    //     }
    //   };
    
    //   const handleRemoveFromCart = async (lineItemId) => {
    //     const newCartProducts = cartProducts.filter((cp) => cp.id != lineItemId);
    //     console.log(lineItemId);
    //     console.log(newCartProducts);
    //     setCartProducts(newCartProducts);
    //   };
    

    //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
      // const handleEmptyCart = async () => {
      //   setCartProducts([]);
      // };

        //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    
    //   const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    //     try {
    //       const incomingOrder = await commerce.checkout.capture(
    //         checkoutTokenId,
    //         newOrder
    //       );
    
    //       setOrder(incomingOrder);
    
    //       handleEmptyCart();
    //     } catch (error) {
    //       setErrorMessage(error.data.error.message);
    //     }
    //   };
    
      useEffect(() => {
        fetchProducts();
      }, []);
    
      const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    






  return (
<>

  

<div
id="hronika"
style={{
  
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "black",
  color: "white",
  minHeight: "100vh",
  minWidth: "100vw",
 
}}
>


<Navbar
    totalItems={cartProducts.length}
     handleDrawerToggle={handleDrawerToggle}
   />


<AppContext.Provider value={{ cartProducts, setCartProducts }}>
 
   <Component {...pageProps} />
   </AppContext.Provider>
  

   <Footer/>

   </div>
   
   </>
        
          /* <ScrollToTop />
          <div
            id="hronika"
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              color: "white",
              minHeight: "100vh",
              minWidth: "100vw",
            }}
          >
            <CssBaseline />
           
            <Switch>
              <Route exact path="/">
                
              </Route>
              <Route exact path="/cart">
                <Cart
                  cartProducts={cartProducts}
                  onUpdateCartQty={handleUpdateCartQty}
                  onRemoveFromCart={handleRemoveFromCart}
                  onEmptyCart={handleEmptyCart}
                />
              </Route>
              <Route path="/checkout" exact>
                <Checkout
                  order={order}
                  onCaptureCheckout={handleCaptureCheckout}
                  error={errorMessage}
                />
              </Route>
              <Route path="/privacy-policy">
                <PrivacyPolicy />
              </Route>
    
              <Route path="/shipping-policy">
                <ShippingPolicy />
              </Route>
    
              <Route path="/about-us">
                <AboutUs></AboutUs>
              </Route>
    
              <Route path="/contact-us">
                <ContactUs />
              </Route>
    
              <Route path="/faq">
                <Faq />
              </Route>
    
              <Route path="/track-order">
                <OrderTracker></OrderTracker>
              </Route>
    
              <Route path="/shop">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Products products={products} onAddToCart={handleAddToCart}>
                    {" "}
                  </Products>
                  <Cart
                    cartProducts={cartProducts}
                    onUpdateCartQty={handleUpdateCartQty}
                    onRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                    emptyCartText={false}
                  />
                </div>
              </Route>
    
              <Route path="/products/:productId">
                <ProductPage onAddToCart={handleAddToCart}></ProductPage>
              </Route>
    
              <Route path="/*">
                <Typography
                  style={{ marginTop: "76px", marginLeft: "10px" }}
                  gutterBottom
                  variant="h5"
                  component="h2"
                >
                  Page comming soon.
                </Typography>
              </Route>
            </Switch>
            <Footer />
          </div>
        </Router>

        </Navbar> */
   
  );
}
