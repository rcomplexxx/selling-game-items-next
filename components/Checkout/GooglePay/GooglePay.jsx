import React from "react";
import  GooglePayButton  from '@google-pay/button-react';
import styles from './googlepay.module.css'
import classNames from "classnames";


const GooglePay=()=>{


    return <GooglePayButton
    environment="TEST"
    className={classNames(styles.gpayButton)}
    buttonSizeMode='fill'
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
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant',
      },
      transactionInfo: {
        totalPriceStatus: 'FINAL',
        totalPriceLabel: 'Total',
        totalPrice: '100.00',
        currencyCode: 'USD',
        countryCode: 'US',
      },
    }}
    onLoadPaymentData={paymentRequest => {
      console.log('load payment data', paymentRequest);
    }}
  />
}

export default GooglePay;