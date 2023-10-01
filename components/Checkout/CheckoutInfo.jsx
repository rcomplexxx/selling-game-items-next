import React, { useState, useRef} from "react";
import styles from "./checkoutinfo.module.css";
import InputField from "./Input/InputField";
import CountryInput from "./Input/CountryInput/CountryInput";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function CheckoutInfo({products , children }) {
  const [errors, setErrors] = useState({});
  const [shippingType, setShippingType]= useState('free');

  const contactScrollRef = useRef();


 

 






 





  const handleChange = (event) => {
   
        
        if(errors.hasOwnProperty(event.target.id)){
          const newErrors= {...errors};
          const field= event.target.id;
          delete newErrors[field];
          setErrors(newErrors);

        }
  

  };

  const handlePaypalButtonClick=async (data, actions) => {
    try{
    console.log('action checked');
    let newErrors={};
    // if(document.getElementById('email').value==='') return actions.reject();
    const testId=(id)=>{
      if(document.getElementById(id).value === ''){
        newErrors={...newErrors, [id]:`${id} is a required field.`}  }
      }
    



    if(document.getElementById('email').value === ''){
      newErrors={...newErrors, email:"Email is a required field."}  }
    if(!/^\S{3,}@\S{4,}\.\S{2,}$/.test(document.getElementById('email').value))
    {newErrors={...newErrors, email:"Please enter a valid email address."} }
    testId('firstName'); testId('lastName'); testId('address');
    testId('country'); testId('postcode'); testId('state');
    testId('suburb'); testId('phone');
      setErrors(newErrors);
     

      if(Object.keys(newErrors).length!==0) {
       
       

        window.scrollTo({
          top: document.getElementById( Object.keys(newErrors)[0]).getBoundingClientRect().top + window.scrollY -12,
          behavior: 'smooth',
        });
        
      

      
        return actions.reject();}


      const email = document.getElementById('email').value;
      const firstName = document.getElementById('firstName').value;
      const lastName = document.getElementById('lastName').value;
      const address = document.getElementById('address').value;
      const apt = document.getElementById('apt').value;
      const country = document.getElementById('country').value;
      const postcode = document.getElementById('postcode').value;
      const state = document.getElementById('state').value;
      const suburb = document.getElementById('suburb').value;
      const phone = document.getElementById('phone').value;
      const orderProductsArr =  products.map((product,i) => {
      // return { id: product.id, name: product.name, quantity: product.quantity}
      return 'Product ' + (i+1) + ': id ' + product.id + ' | name ' + product.name + 
      ' | quantity ' + product.quantity
    });
    let orderProducts= '';
    for(let i=0; i<orderProductsArr.length; i++){
      if(i!=orderProductsArr.length-1)
      orderProducts= orderProducts + orderProductsArr[i] +'    ~♢~\n';
      else orderProducts= orderProducts + orderProductsArr[i];
    }

       

      
      const response = await fetch('/api/sqlliteapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          table: 'orders',
          order: {
            email,
            firstName,
            lastName,
            address,
            apt,
            country,
            postcode,
            state,
            suburb,
            phone,
            orderProducts
          },
        }),
      });
      console.log(response);

      if(response.ok)  return actions.resolve();

console.log('Server error. Please try again later.')

return actions.reject();


    }
    catch(error){return actions.reject(); }

   
  }


  const handlePaypalButtonApprove= (data, actions) => {
    // Handle actions when the payment is approved
    console.log('Payment approved:', data);
    
    // You can perform additional actions here, such as capturing the payment or navigating to a success page
    
    // For example, you can capture the payment like this:
    return actions.order.capture().then(async function (details) {
      console.log('Payment captured:', details);
      
      // Check if the payment was approved
      if (details.status === 'COMPLETED') {

        console.log('mail to be sent:'+ document.getElementById('email').value );             
        const response = await fetch('/api/sqlliteapi', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            table: 'orders',
            order: {
              approved: true,
              orderId: data.orderID,
              email: document.getElementById('email').value
            },
          }),
        });

        if (response.ok) console.log('Payment was successful')

      
        
        // Payment was successful
      } else if (details.status === 'DECLINED' && details.status_details.reason === 'INSUFFICIENT_FUNDS') {
        if (response.ok) console.log('Payment error. Not enough funds.')
      } else {
        console.log('Payment error.')
      }
    }).catch(function (error) {
      console.error('Capture request failed:', error);
      
    });
  }



  


  return (<>  {children}
  <div className={styles.leftWrapper}>
    <div className={styles.checkout_left}>
    
      <div className={styles.checkout_section}>
        <h2 ref={contactScrollRef}>Contact</h2>
        <form>
        <div className={styles.input_row}>
          <InputField
            id="email"
           
            placeHolder="Email *"
            type="email"
          
            handleChange={handleChange}
           
            error={errors.email}
          >
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </InputField>
          </div>

          <h1 className={Object.keys(errors).length> 0?styles.deliveryTitle:styles.deliveryTitleNormal}>Delivery</h1>
          {Object.keys(errors).length> 0 &&<p className={styles.requiredNote}>Fields marked with * are required.</p>}

          <div className={styles.input_row}>
            <InputField
              id="firstName"
             
              placeHolder="First name *"
              type="text"
             
              handleChange={handleChange}
            
              error={errors.firstName}
            />
            <InputField
              id="lastName"
             
              placeHolder="Last name *"
              type="text"
          
              handleChange={handleChange}
             
              error={errors.lastName}
            />
          </div>
          <div className={styles.input_row}>
            <InputField
              id="address"
              
              placeHolder="Address *"
              type="text"
            
              handleChange={handleChange}
           
              error={errors.address}
            />

            <InputField
              id="apt"
              
              placeHolder="Apartment, suite, etc. (Optional)"
              type="text"
            />
          </div>
          <div className={styles.input_row}>
            <CountryInput
              id="country"
             
              setErrors={setErrors}
              error={errors.country}
           
              inputNumber={9}
            />
            <InputField
              id="postcode"
              
              placeHolder="Postcode *"
              type="text"
              
              handleChange={handleChange}
            
              error={errors.postcode}
            />
            <InputField
              id="state"
              
              placeHolder="State *"
              type="text"
            
              handleChange={handleChange}
            
              error={errors.state}
            />
          </div>
          <div className={styles.input_row}>
            <InputField
              id="suburb"
             
              placeHolder="Suburb *"
              type="text"
             
              handleChange={handleChange}
            
              error={errors.suburb}
            />
            <InputField
              id="phone"
              
              placeHolder="Phone *"
              type="tel"
            
              handleChange={handleChange}
       
              error={errors.phone}
            />
          </div>
        </form>
      </div>

   

      <div className={styles.checkout_section}>
        <h2>Shipping Method</h2>
        <label className={styles.shipping_method}>
       
          <input type="radio" id="freeShipping" name="shippingMethod"
          checked={shippingType==='free'} className={styles.radioButton}
          onChange={()=>{setShippingType('free')}}/>
          <span className={styles.checkmark}></span>
          <span> FREE Shipping (Tracked & Insured) <span className={styles.shipping_method_sp}>Free</span></span>
         
        </label>
        <label className={styles.shipping_method}>
        
          <input type="radio" id="expressShipping" name="shippingMethod" 
           checked={shippingType==='express'} className={styles.radioButton}
           onChange={()=>{setShippingType('express')}}/>
           <span className={styles.checkmark}></span>
          <span>Express Shipping (2-3 days) <span className={styles.shipping_method_sp}>$9.99</span>
          </span>
        </label>
      </div>
      <h1 className={styles.paymentTitle}>Payment</h1>
      <p className={styles.paymentNotification}>All transactions are secure and encrypted.</p>
      <PayPalScriptProvider
          options={{
            "client-id":
              "AQB3vOguzerJ-HXgJavEAMlivjs3DTNyWi2W7yKI94arI23zXOAaSJx4Zf4JzTO9RjvJdr5AflrFHWp1",
          }}
        >
          {/* 
          da prikazem spinner*/}
          <PayPalButtons
            fundingSource="paypal"

            onClick={handlePaypalButtonClick }
          onApprove={handlePaypalButtonApprove}

            createOrder={(data, actions) => {

              let totalPrice = 0;
              products.forEach((cp, i) => {
                totalPrice = totalPrice + cp.quantity * cp.price;
              });
              totalPrice = totalPrice.toFixed(2);


              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: totalPrice,
                    },
                  },
                ],
              });
            }}
          />

          <PayPalButtons
            fundingSource="card"
            
           onClick={handlePaypalButtonClick }
          onApprove={handlePaypalButtonApprove}
          
            createOrder={(data, actions) => {

              let totalPrice = 0;
              products.forEach((cp, i) => {
                totalPrice = totalPrice + cp.quantity * cp.price;
              });
              totalPrice = totalPrice.toFixed(2);

              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "USD",
                      value: totalPrice,
                    },
                  },
                ],
              });
            }}
          />
          </PayPalScriptProvider>
          {Object.keys(errors).length> 0 && 
          <p className={styles.paypalNote}>Fill in required fields to enable buttons.
          </p>}
          </div>
    </div></>
  );
}
