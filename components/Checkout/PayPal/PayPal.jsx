import React, { useState } from "react";

import { useRouter } from "next/router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from './paypal.module.css'


const PayPalButton=({checkFields, organizeUserData,method='paypal',  setCartProducts, setErrors, color='blue'})=>{
  const [paypalError, setPaypalError] = useState();


  const router = useRouter();



    const handlePayPalButtonClick =  async(data, actions) => {
      
      
    

        try {
          const fieldsCorrect=checkFields();

            if(!fieldsCorrect) return actions.reject();
          else return actions.resolve();
        

          
        } catch (error) {
          console.log(error);
          return actions.reject();
        }
      };


      async function handlePayPalOrder(paymentMethod) {

        try {

          console.log('creating order');
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
              console.log("order id returned", order.paymentId);
              return order.paymentId;
            } else {
              setPaypalError('Error occured. Payment was not processed.')
              return;
            }
          } catch (error) {
            setPaypalError('Error occured. Payment was not processed.')
            
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
              paymentMethod: 'PAYPAL',
              paymentId: data.orderID,
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

      const cancelHandler = async () => { setPaypalError('Payment is canceled.') };
      const errorHandler = async () => { setPaypalError('Error occured. Payment was not processed.') };


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
              onCancel={cancelHandler}
              createOrder={async()=>{return await handlePayPalOrder('PAYPAL')}}
              style={{
                color: color,
                height: 48
              }}
              className={styles.paypalButton}
            />
            {paypalError && <p className={styles.paypalError}>{paypalError}</p>}
    </PayPalScriptProvider>

}

export default PayPalButton;