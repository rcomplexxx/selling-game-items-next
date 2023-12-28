import React, { useRef, useState } from 'react';
import Cards from 'react-credit-cards';
import styles from './creditcard.module.css'
import 'react-credit-cards/es/styles-compiled.css';
import InputField from '../Input/InputField';
import CCInput from './CCInput/CCInput';

const CreditCardForm = () => {
    const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true);
    const [cardNumber, setCardNumber]= useState('');
    const [expDate, setExpDate]= useState('');
    const [cvv, setCvv]= useState('');
    const [cardHolderName, setCardHolderName]= useState('');

 
  

    const handleCardNumber = (event)=>{
       
        const value=event.target.value.replace(/\s/g, '');
        if(!isNaN(+value)){
            
         setCardNumber( value.replace(/(.{4})/g, '$1 '));
        }
        
    }


    const handleExpDate = (event)=>{
       
       
        const value=event.target.value;
        let newValue=value.replace(/\//g, '').replace(/\s/g, '');
        if(expDate.length===5 && value.length===4){setExpDate(Math.floor(+newValue / 10)); return;}
        if(!isNaN(+newValue)){
        if(value.length===1 && value>1)newValue=`0${value}`;
      
        if(newValue.length>1)newValue=newValue.slice(0, 2) + ' / ' + newValue.slice(2)
       
         setExpDate(newValue);
        }
        
    }


    const handleCvv = (event)=>{
       
        const value=event.target.value;
        if(!isNaN(+value) && value.length<5){
            
         setCvv(value);
        }
        
    }
    
     
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
          maxlength="23"
          value={cardNumber}
          handleChange={handleCardNumber}
        />
</div>
      <div className={styles.ccInputRow}>
       

       
        <CCInput
         id="expiryDate"
         placeHolder='Expiration date (MM / YY)'
          type="text"
          name="expiry"
          maxlength="9"
          value={expDate}
          handleChange={handleExpDate}
        />
         <CCInput
         id="cvv"
         placeHolder='Security code'
          type="text"
          name="cvc"
          maxlength="4"
          value={cvv}
          handleChange={handleCvv}
        />

</div>
       
<div className={styles.ccInputRow}>
<CCInput
       id="cardholderName"
       placeHolder='Name on card'
          type="text"
          name="name"
         value={cardHolderName}
         handleChange={(event)=>{setCardHolderName(event.target.value)}}
        />
      </div>
      <label>
      <input type="checkbox" id="isShippingBilling" checked={billingAddressSameAsShipping}
      onChange={()=>{setBillingAddressSameAsShipping(!billingAddressSameAsShipping)}}
      />
      Use shipping address as billing
    </label>
    <button className={styles.payNowButton}>Pay now</button>
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