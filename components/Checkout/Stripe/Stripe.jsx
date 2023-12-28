import {loadStripe} from '@stripe/stripe-js';
import {
  PaymentElement,
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './stripe.module.css'

import { useState } from 'react';



const StripeButton=({checkFields, organizeUserData,method='paypal'})=>{


    const stripe = useStripe();
    const elements = useElements();
        const [errorMessage, setErrorMessage] = useState(null);
      
        const handleSubmit = async (event) => {
            event.preventDefault();

            if (elements == null) {
              return;
            }
        
            // Trigger form validation and wallet collection
            const {error: submitError} = await elements.submit();
            if (submitError) {
              // Show error to your customer
              setErrorMessage(submitError.message);
              return;
            }
        
            // // Create the PaymentIntent and obtain clientSecret from your server endpoint
            // const res = await fetch('/create-intent', {
            //   method: 'POST',
            // });
        
            // const {client_secret: clientSecret} = await res.json();
           const clientSecret= `${process.env.STRIPE_SECRET_KEY}`;
            const {error} = await stripe.confirmPayment({
              //`Elements` instance that was used to create the Payment Element
              elements,
              clientSecret,
              confirmParams: {
                return_url: 'https://example.com/order/123/complete',
              },
            });
        
            if (error) {
              // This point will only be reached if there is an immediate error when
              // confirming the payment. Show error to your customer (for example, payment
              // details incomplete)
              setErrorMessage(error.message);
            } else {
              // Your customer will be redirected to your `return_url`. For some payment
              // methods like iDEAL, your customer will be redirected to an intermediate
              // site first to authorize the payment, then redirected to the `return_url`.
            }
          };

    return <form onSubmit={handleSubmit} className={styles.mainForm}>
   <label>
        Card details
        <CardElement className={styles.stripeCard}  />
      </label>
      <button type="submit" disabled={!stripe || !elements}>
        Pay
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
  </form>
}

const InjectStripe= () => {
    const options = {
      
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
          /*...*/
        },
      };
      
    const stripePromise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY}`);
    return <Elements  stripe={stripePromise} options={options}>
      <StripeButton />
    </Elements>
};

export default InjectStripe;


