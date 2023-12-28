import React from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from './paypal.module.css'


const PayPalButton=({checkFields, organizeUserData,method='paypal'})=>{






    const handlePayPalButtonClick = async (data, actions) => {
        try {
          const clickPass = checkFields();
            if(clickPass)return actions.resolve();
    
            else return actions.reject();
          
    
          
        } catch (error) {
          return actions.reject();
        }
      };


      async function handlePayPalOrder(paymentMethod) {

        try {
          const requestData = organizeUserData(paymentMethod);
         
            const response = await fetch("/api/make-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestData),
            });
        
            const order = await response.json();
        
            if (order.success) {
              console.log("order id returned", order.orderId);
              return order.orderId;
            } else {
              console.log(order.message);
              return;
            }
          } catch (error) {
            console.error("Error creating order:", error);
            throw error;
          }
        
      }






      const handlePayPalButtonApprove = async (data, actions) => {
        try {
          console.log("mail to be sent:" + document.getElementById("email").value);
          const response = await fetch("/api/approve-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: data.orderID,
            }),
          });
          // Parse the JSON response
    
          if (response.ok) {
            console.log("Payment was successful");
            // Handle successful payment logic here
            setCartProducts([]);
            router.push("/thank-you");
          } else {
            const data = await response.json();
    
            if (data.error === "INSTRUMENT_DECLINED") {
              console.log(data.error);
              return actions.restart();
            } else {
              console.log(data.error);
    
              // Handle other payment errors here
            }
          }
        } catch (error) {
          console.error("Error capturing payment:", error);
          // Handle fetch or other errors here
        }
    
        // Payment was successful
      };


    return  <PayPalScriptProvider
    options={{
      "client-id":
        "AQB3vOguzerJ-HXgJavEAMlivjs3DTNyWi2W7yKI94arI23zXOAaSJx4Zf4JzTO9RjvJdr5AflrFHWp1",
    }}
  >
      <PayPalButtons
              fundingSource={`${method}`}
              onClick={handlePayPalButtonClick}
              onApprove={handlePayPalButtonApprove}
              createOrder={async()=>{return await handlePayPalOrder('PAYPAL')}}
              className={styles.paypalButton}
            />
    </PayPalScriptProvider>

}

export default PayPalButton;