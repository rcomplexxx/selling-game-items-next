import React, { useRef, useState } from 'react';
import Cards from 'react-credit-cards';
import styles from './creditcard.module.css'
import 'react-credit-cards/es/styles-compiled.css';
import InputField from '../Input/InputField';
import CCInput from './CCInput/CCInput';

const CreditCardForm = () => {
    const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true);


    const cardHolderNameRef= useRef();
    const cardNumberRef=useRef();
    const expDateRef= useRef();
    const csvRef= useRef();
    
     
     const handleExpDateChange = (event) => {
        const typedValue = event.target.value;
        var numericValue = inputValue.replace(/\D/g, '');

        // Format as YYYY/MM
        if (numericValue.length >= 4) {
          numericValue = numericValue.substring(0, 4) + '/' + numericValue.substring(4);
        }
    
        // Set the formatted value back to the input
        event.target.value = numericValue;
        
      }
      //pravila: prvi broj je manji od 12. Ako je prva cifra 1, i length upravo postao 2, dodaje se ' / ' na vrednost
      //Ako je length ==0, i prva cifra je veca od 1, dodaje se ' / ' i upisuje se broj 0ukucana_cifra.
      //Ako je prvi broj veci od 12, upisuje se greska ispod inputa.
      //pravila za csv: Ako je length < 3, izbaci gresku Enter the CVV or security code on your card
      //Proveriti pravila za cc number
    

  return (
    <div className={styles.creditCardForm}>
    
     
    <div className={styles.ccInputRow}>
       
        <CCInput
        id="cardNumber"
        placeHolder='Card number'
          type="text"
          name="number"
          maxlength="16"
          ref={cardNumberRef}
        />
</div>
      <div className={styles.ccInputRow}>
       

       
        <CCInput
         id="expiryDate"
         placeHolder='Expiration date (MM / YY)'
          type="text"
          name="expiry"
          maxlength="9"
          ref={expDateRef}
        />
         <CCInput
         id="cvv"
         placeHolder='Security code'
          type="text"
          name="cvc"
          maxlength="4"
          ref={csvRef}
        />

</div>
       
<div className={styles.ccInputRow}>
<CCInput
       id="cardholderName"
       placeHolder='Name on card'
          type="text"
          name="name"
       ref={cardHolderNameRef}
         
        />
      </div>
      <label>
      <input type="checkbox" id="isShippingBilling" checked={billingAddressSameAsShipping}
      onChange={()=>{setBillingAddressSameAsShipping(!billingAddressSameAsShipping)}}
      />
      Use shipping address as billing
    </label>
    </div>
  );
};

export default CreditCardForm;


// {/* <Cards
// number={cardNumber}
// name={name}
// expiry={expiry}
// cvc={cvc}
// focused={focus}
// /> */}