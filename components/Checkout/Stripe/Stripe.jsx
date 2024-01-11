import React, { useRef, useState } from 'react';
import Cards from 'react-credit-cards';
import styles from './stripe.module.css'
import 'react-credit-cards/es/styles-compiled.css';
import { useStripe,  CardNumberElement, CardCvcElement, CardExpiryElement} from "@stripe/react-stripe-js"
import CCInput from './CCInput/CCInput';
import FloatingBadge from '../FloatingBadge/FloatingBadge';
import { Elements, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router";
import Image from 'next/image';
import BillingInfo from './BillingInfo/BillingInfo';
               

const Stripe = ({organizeUserData, products, checkFields}) => {
    const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] = useState(true);
    const [floatingLabels, setFloatingLabels]= useState({});
    const [focusedField, setFocusedField]= useState();
    const [paymentProcessing, setPaymentProcessing]= useState(false);
    const [cardHolderName, setCardHolderName]= useState('');
    const [cardStatesEntered, setCardStatesEntered]= useState({
      cardNumber:false, expiryDate:false, cvv:false, cardHolderName:false
    });
    const [stripeError, setStripeError]= useState();
    const [errors, setErrors] = useState({});
    const errorhelperRef=useRef({});
    const floatingLabelsHelper=useRef({cardNumber:false, expiryDate:false, cvv:false});
    const stripe = useStripe();
    const elements= useElements();

    const router = useRouter();


    const deleteError = (field) => {
      if (errors.hasOwnProperty(field)) {
        const newErrors = { ...errors };
      
        delete newErrors[field];
        setErrors(newErrors);
      }
    };
 
  
   
   


 


const handleStripePay= async(event)=>{

  event.preventDefault();
  setPaymentProcessing(true);
  setStripeError();
  errorhelperRef.current={...errors};
  if (!errors.hasOwnProperty('cardNumber')){errorhelperRef.current={...errorhelperRef.current, cardNumber:'Enter a valid card number'}}
  if (!errors.hasOwnProperty('expiryDate')){errorhelperRef.current={...errorhelperRef.current, expiryDate:'Enter a valid card number'}}
  if (!errors.hasOwnProperty('cvv')){errorhelperRef.current={...errorhelperRef.current, cvv:'Enter a valid card number'}}
  if(document.getElementById('cardHolderName').value==='') {errorhelperRef.current={...errorhelperRef.current, cardHolderName:'Enter your name exactly as it\'s written on the card'}}
  setErrors(errorhelperRef.current);
 
  const clickPass= checkFields() && !errors.cardNumber && !errors.expiryDate && !errors.cvv && !errors.cardHolderName;
  if(!clickPass) { setPaymentProcessing(false);return;}


  const cardElement = elements.getElement(CardNumberElement);

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement
        })

        if(!error) {
          try {



            




              const {id} = paymentMethod
              const requestData = organizeUserData('STRIPE');
              console.log(products);
              let totalPrice = products
              .reduce((sum, product) => {
              
                  sum += product.price * product.quantity;
                
                
        
                return sum;
              }, 0)
              .toFixed(2);


           
             

              const discountEl = document.getElementById("discountPrice");
              let discount = "0";
              if (discountEl) {
                discount = discountEl.innerText;
                discount = discount.substring(discount.indexOf("$") + 1).trim();
              }
            if (discount != "0") {
              const discountFloat = parseFloat(discount);
        
              totalPrice = totalPrice - discountFloat;
              totalPrice.toFixed(2);
            }




              const requestDataFinal=  {...requestData, stripeId:id, amount: totalPrice};
              console.log('reqdata BITNO ~!!!~', requestDataFinal)

              const response = await fetch("/api/make-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...requestDataFinal, items: JSON.stringify(requestDataFinal.items)
                }),
              });
              const data=await response.json();
              console.log('rp',data);
              console.log('ss', data.clientSecret)
              if(data.success) {
                const clientSecret=data.clientSecret;
                const result = await stripe.confirmCardPayment(clientSecret, {
                  payment_method: {
                    card: cardElement,
                    billing_details: {
                      name: 'Jenny Rosen',
                    },
                  },
                });
              
                if (!result.error) {
                  //approve payment
                  const approved = await fetch("/api/approve-payment", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      paymentMethod: 'STRIPE',
                      paymentId: clientSecret,
                    }),
                  });
                  if(approved.ok)router.push("/thank-you");
                  else{setPaymentProcessing(false);}
                }
                else {
                  
                  setStripeError('Error occured. Payment was not processed.')
                  setPaymentProcessing(false);
                }
              }
              else{setPaymentProcessing(false);}
  
          } catch (error) {
            console.log(error)
            setPaymentProcessing(false);
            setStripeError('Error occured. Payment was not processed.')
          }
      } else {
        console.log(error)
        if(error.code==='incomplete_number' || error.code==='invalid_number')setErrors({...errors,cardNumber:'Enter a valid card number'})
        else if( error.code === 'incomplete_expiry') setErrors({...errors,expiryDate:'Enter a valid exipry date'})
        else if( error.code === 'incomplete_cvc') setErrors({...errors,cvv:'Enter a valid security code'})
        else setErrors({...errors,payment:'Error occured. Payment was not processed.'})
        setPaymentProcessing(false);
        // Enter your name exactly as it’s written on your card
      }


}

const handleCCChange=   (event) => {
  // Access the value from the CardElement when it changes
  //elementType - cardExpiry - cardCvc
  //  cardNumber expiryDate cvv
  const errorField= event.elementType==='cardNumber'?'cardNumber':(event.elementType==='cardExpiry'?'expiryDate':'cvv')
  const errorName = `Enter a valid ${event.elementType==='cardNumber'?'card number':(event.elementType==='expiry date'?'expiryDate':'security number')}`
  setErrors({...errors, [errorField]: undefined});
  const cardValue = event;
  errorhelperRef.current[errorField]=(!cardValue.complete || cardValue.error)?errorName:undefined;
  floatingLabelsHelper.current[errorField]=!cardValue.empty;
};

const handleCCBlur= ()=>{
  console.log('b',floatingLabelsHelper.current);
  setErrors(errorhelperRef.current);
  setFloatingLabels({...floatingLabelsHelper.current});
  setFocusedField(undefined);
}
  
    

  return (
    <div className={styles.creditCardForm}>
    
     
    <div className={styles.ccInputRow}>
    <div className={styles.form_group}>
    <div className={styles.inputWrapper}>
    <CardNumberElement
    onBlur={handleCCBlur}
    onChange={handleCCChange}
    onFocus={()=>{
      setFocusedField('cardNumber');
      setFloatingLabels({...floatingLabelsHelper.current, cardNumber:true});
    
      }}
    options={{placeholder:'',  style: {
      base: {
        color: 'white',
        backgroundColor:'gray'
      },
      empty:{
        backgroundColor:'white'
      },
      invalid: {
        color: 'white'
      }
    }}}
        className={`${styles.input_field} ${errors.cardNumber && styles.input_error} ${focusedField==='cardNumber' && styles.stripeFieldFocused}`}
      /> 
      <FloatingBadge imageName='lock3.png'/>
      <label className={`${styles.label} ${floatingLabels.cardNumber && styles.labelFloating}`}>Card number</label>

</div>



      {errors.cardNumber && <p className={styles.stripeError}>{errors.cardNumber}</p>}
        </div>
</div>
      <div className={styles.ccInputRow}>
       <div className={styles.form_group}>
      <CardExpiryElement id="expiryDate"
 onBlur={handleCCBlur}
 onFocus={()=>{
  setFocusedField('expiryDate');
  setFloatingLabels({...floatingLabelsHelper.current, expiryDate:true});
  }}
 onChange={handleCCChange}
      options={{placeholder:'',  style: {
        base: {
          color: 'white',
          backgroundColor:'transparent'
        },
        invalid: {
          color: 'white'
        }
      }}}
      className={`${styles.input_field} ${errors.expiryDate && styles.input_error} ${focusedField==='expiryDate' && styles.stripeFieldFocused}`}
    />
    <label className={`${styles.label} ${floatingLabels.expiryDate && styles.labelFloating}`}>Expiration Date (MM / YY)</label>
    {errors.expiryDate && <p className={styles.stripeError}>{errors.expiryDate}</p>}
    </div>
     <div className={styles.form_group}>

      <div className={styles.inputWrapper}>
  <CardCvcElement  id="cvv" 
   onBlur={handleCCBlur}
   onChange={handleCCChange}
  onFocus={()=>{
    setFocusedField('cvv');
  setFloatingLabels({...floatingLabelsHelper.current, cvv:true});
  }}
   options={{placeholder:'',  style: {
    base: {
      color: 'white',
      backgroundColor:'transparent'
    },
    invalid: {
      color: 'white'
    }
  }}}
  className={`${styles.input_field} ${errors.cvv && styles.input_error} ${focusedField==='cvv' && styles.stripeFieldFocused}`}/>
  <FloatingBadge message={'3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.'}/>
   <label className={`${styles.label} ${floatingLabels.cvv && styles.labelFloating}`}>Security code</label>
   </div>
 
  {errors.cvv && <p className={styles.stripeError}>{errors.cvv}</p>}
  </div>
      

</div>
       
<div className={styles.ccInputRow}>
<CCInput
       id="cardHolderName"
       placeHolder='Name on card'
          type="text"
          name="name"
         value={cardHolderName}
         handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
         
        //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
   
        //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
         error={errors.cardHolderName}
        />
      </div>
      <div className={styles.billingCheckboxDiv}  onClick={()=>{setBillingAddressSameAsShipping(!billingAddressSameAsShipping)}}>
      <input type="checkbox" id="isShippingBilling" checked={billingAddressSameAsShipping}
     
      />
      <label className={styles.billingCheckboxLabel}>
      Use shipping address as billing
    </label>
    </div>


  <BillingInfo isOpen={!billingAddressSameAsShipping}/>










    <button className={styles.payNowButton} onClick={handleStripePay}>{paymentProcessing?
    <Image src='/images/spinner.png' height={0} width={0} className={styles.spinner}/>
    :'Pay now'}</button>
    {stripeError && <p className={styles.stripePayError}>{stripeError}</p>}
    </div>
  );
};




export default function StripeWrapper({organizeUserData,  products, checkFields}){
const stripePromise = loadStripe('pk_test_51OR1EhAom3KfH7oBf5QRKboVHPrFIrZ3nwmtwS30uSDtrHbpgwsFzf19Np73RjxFiAqUy0tjPi5BIYdDmSPDExya00m4ZFZoI1');

return (
  <Elements stripe={stripePromise}>
  <Stripe organizeUserData={organizeUserData}  products={ products} checkFields={checkFields}/>
  </Elements>
);
}



// {/* <Cards
// number={cardNumber}
// name={name}
// expiry={expiry}
// cvc={cvc}
// focused={focus}
// /> */}