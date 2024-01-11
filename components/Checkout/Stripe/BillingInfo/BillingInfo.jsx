import styles from './billinginfo.module.css'
import CCInput from '../CCInput/CCInput';
import { useEffect, useState } from 'react';
import CountryInput from '../../Input/CountryInput/CountryInput';
import FloatingBadge from '../../FloatingBadge/FloatingBadge';







export default function BillingInfo({isOpen}){
    const [showApt, setShowApt] = useState(false);
   
    const [errors, setErrors]= useState({});

    useEffect(()=>{
        showApt && document.getElementById("billingApt").focus();
        }, [showApt]);
        
    

    return <div className={`${styles.billingAddressWrapper} ${isOpen && styles.billingAddressWrapperSpawned}`}> 
        
            <h3 className={styles.billingAddressTitle}>Billing address</h3>

        <div className={`${styles.ccInputRow} ${styles.billingCountry}`}>
        <CountryInput
                  id="billingCountry"
                  setErrors={setErrors}
                  error={errors.country}
                  inputNumber={9}
                />
</div>
        
        <div className={styles.ccInputRow}>
    <CCInput
           id="billingFirstName"
           placeHolder='First name'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />
    
    <CCInput
           id="billingLastName"
           placeHolder='Last name'
              type="text"
              name="name"
           
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />
          </div>








          <div className={styles.ccInputRow}>
    <CCInput
           id="billingAddress"
           placeHolder='Address'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />
    

          </div>


          

               
               

{ showApt ?  <div className={styles.ccInputRow}> <CCInput
                       id="billingApt"
                       placeHolder='Apartment, suite, etc. (Optional)'
                          type="text"
                          name="name"
                         handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
                         
                        //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
                   
                        //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
                         error={errors.cardHolderName}
                        /> </div>:<p className={styles.aptAdder} onClick={()=>{setShowApt(true);}}>+ Add apartment, suite etc.</p>}
                
            
                     



          <div className={styles.ccInputRow}>
    <CCInput
           id="billingCity"
           placeHolder='City'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />

<CCInput
           id="billingState"
           placeHolder='State'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />

<CCInput
           id="billingZipcode"
           placeHolder='ZIP code'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
            />
    

          </div>



          <div className={styles.ccInputRow}>
    <CCInput
           id="billingPhone"
           placeHolder='Phone (optional)'
              type="text"
              name="name"
             handleChange={(event)=>{deleteError(event.target.id);setCardStatesEntered({...cardStatesEntered,cardHolderName:true});setCardHolderName(event.target.value)}}
             
            //  handleBlur={(event)=>{if(!cardStatesEntered.cardHolderName) return;
       
            //   if(event.target.value==='') setErrors({ ...errors, cardHolderName: 'Enter a valid card number' });}}
             error={errors.cardHolderName}
             children={ <FloatingBadge message={'In case we need to contact you about your order'}/>}
            />
       

          </div>




          </div>
    
    
}