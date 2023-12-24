import React from "react";
import  GooglePayButton  from '@google-pay/button-react';
import styles from './googlepay.module.css'
import classNames from "classnames";


const GooglePay=({checkFields, organizeUserData})=>{
  //paymentRequest.paymentMethodData.tokenizationData.token

    const handleGoogleButtonClick=(event)=>{
        const newErrors = checkFields();

        if (Object.keys(newErrors).length !== 0) {
          window.scrollTo({
            top:
              document
                .getElementById(Object.keys(newErrors)[0])
                .getBoundingClientRect().top +
              window.scrollY -
              12,
            behavior: "smooth",
          });
  
          event.preventDefault()
    }
}


async function handleGpayOrder(paymentToken) {
  try {
    
    const requestData = organizeUserData(paymentToken);
    console.log('mydata',requestData)
    return await fetch("/api/make-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((validation) => {
        if (validation.success) {
          console.log("Validation true", validation.message);
         
        } else {
          console.log(validation.error);
          return;
        }
      })
      .catch((error) => {
        // Handle errors that occur during the fetch or processing of the response
        console.error("Error creating order:", error);
        throw error; // Rethrow the error for the calling code to handle
      });
  } catch (err) {
    return;
  }
}


    return <GooglePayButton
    environment={process.env.GPAYENVIRENMENT}
    className={classNames(styles.gpayButton)}
    buttonSizeMode='fill'
    buttonColor="white"
    paymentRequest={{
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['MASTERCARD', 'VISA'],
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId',
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: 'exampleMerchantId',
        merchantName: 'Example Merchant',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US',
      },
    }}
    onClick={handleGoogleButtonClick}
    onLoadPaymentData={async(paymentRequest) => {
      console.log('load payment data', paymentRequest);
     return await handleGpayOrder(paymentRequest.paymentMethodData.tokenizationData.token)
    }}
    onError={(reason)=>{console.log(reason)}}
  />
}

export default GooglePay;