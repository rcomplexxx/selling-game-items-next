import React, { useState } from "react";

import { useRouter } from "next/router";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import styles from './paypal.module.css'


const PayPalButton=({checkFields, organizeUserData,method='paypal',  setCartProducts, setErrors})=>{
  const [paypalError, setPaypalError] = useState();


  const router = useRouter();



    const handlePayPalButtonClick =  async(data, actions) => {
      
      
    

        try {
          setPaypalError();
          
          let newErrors = {};
          // if(document.getElementById('email').value==='') return actions.reject();
          const testId = (id) => {
            if (document.getElementById(id).value === "") {
              newErrors = { ...newErrors, [id]: `${id} is a required field.` };
            }
          };
      
          if (document.getElementById("email").value === "") {
            newErrors = { ...newErrors, email: "Email is a required field." };
          }
          if (
            !/^\S{3,}@\S{3,}\.\S{2,}$/.test(document.getElementById("email").value)
          ) {
            newErrors = {
              ...newErrors,
              email: "Please enter a valid email address.",
            };
          }
      
          testId("firstName");
          testId("lastName");
          testId("address");
          testId("country");
          testId("zipcode");
          testId("state");
          testId("city");
      
          const phone = document.getElementById("phone").value; //
          if (phone.length < 5)
            newErrors = { ...newErrors, phone: "Invalid phone" };
          else {
            for (let i = 0; i < phone.length; i++) {
              const char = phone[i];
              if (
                !(
                  (char >= "0" && char <= "9") ||
                  ["+", "-", "(", ")", " ", ".", "/"].includes(char)
                )
              ) {
                newErrors = { ...newErrors, phone: "Invalid phone" };
              }
            }
          }
      
          setErrors(newErrors);
      
      
          const errorsExist=Object.keys(newErrors).length !== 0;
          console.log('errorsExist?', errorsExist)
          if (errorsExist) {
            window.scrollTo({
              top:
                document
                  .getElementById(Object.keys(newErrors)[0])
                  .getBoundingClientRect().top +
                window.scrollY -
                12,
              behavior: "smooth",
            });

            
            return actions.reject();
         
        }
        else{
       
          return actions.resolve();
        }
      
    




          
        } catch (error) {
          console.log(error);
          return actions.reject();
        }
      };


      async function handlePayPalOrder(paymentMethod) {

        try {

          console.log('creating order');
          const requestData = organizeUserData(paymentMethod);
          checkFields();
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
                color: 'gold',
                height: 48
              }}
              className={styles.paypalButton}
            />
            {paypalError && <p className={styles.paypalError}>{paypalError}</p>}
    </PayPalScriptProvider>

}

export default PayPalButton;