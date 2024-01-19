import styles from './billinginfo.module.css'
import { useEffect, useState } from 'react';
import CountryInput from '../../Input/CountryInput/CountryInput';
import FloatingBadge from '../../FloatingBadge/FloatingBadge';
import InputField from '../../Input/InputField';







export default function BillingInfo({isOpen, errors, setErrors}){
    const [showApt, setShowApt] = useState(false);
   

    useEffect(()=>{
        showApt && document.getElementById("billingApt").focus();
        }, [showApt]);
        
        const handleChange = (event) => {
         if (errors.hasOwnProperty(event.target.id)) {
           const newErrors = { ...errors };
           const field = event.target.id;
           delete newErrors[field];
           setErrors(newErrors);
         }
       };
    

    return <div className={`${styles.billingAddressWrapper} ${isOpen && styles.billingAddressWrapperSpawned}`}> 
        
            <h3 className={styles.billingAddressTitle}>Billing address</h3>

        <div className={`${styles.InputFieldRow} ${styles.billingCountry}`}>
        <CountryInput
                  id="billingCountry"
                  setErrors={setErrors}
                  error={errors.billingCountry}
                  inputNumber={9}
                />
</div>
        
        <div className={styles.InputFieldRow}>
    <InputField
           id="billingFirstName"
           placeHolder='First name'
              type="text"
              name="name"
              handleChange={handleChange}
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingFirstName}
            />
    
    <InputField
           id="billingLastName"
           placeHolder='Last name'
              type="text"
              name="name"
           
             handleChange={handleChange}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingLastName}
            />
          </div>








          <div className={styles.InputFieldRow}>
    <InputField
           id="billingAddress"
           placeHolder='Address'
              type="text"
              name="name"
              handleChange={handleChange} 
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingAddress}
            />
    

          </div>


          

               
               

{ showApt ?  <div className={styles.InputFieldRow}> <InputField
                       id="billingApt"
                       placeHolder='Apartment, suite, etc. (Optional)'
                          type="text"
                          name="name"
                          handleChange={handleChange}   
                        //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
                   
                        //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
                         error={errors.billingApt}
                        /> </div>:<p className={styles.aptAdder} onClick={()=>{setShowApt(true);}}>+ Add apartment, suite etc.</p>}
                
            
                     



          <div className={styles.InputFieldRow}>
    <InputField
           id="billingCity"
           placeHolder='City'
              type="text"
              name="name"
              handleChange={handleChange}
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingCity}
            />

<InputField
           id="billingState"
           placeHolder='State'
              type="text"
              name="name"
              handleChange={handleChange}
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingState}
            />

<InputField
           id="billingZipcode"
           placeHolder='ZIP code'
              type="text"
              name="name"
              handleChange={handleChange} 
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingZipcode}
            />
    

          </div>



          <div className={styles.InputFieldRow}>
    <InputField
           id="billingPhone"
           placeHolder='Phone (optional)'
              type="text"
              name="name"
              handleChange={handleChange}  
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.billingPhone}
             children={ <FloatingBadge message={'In case we need to contact you about your order'}/>}
            />
       

          </div>




          </div>
    
    
}