import React from 'react';
import styles from './checkoutinfo.module.css'



export default function BillingAddressForm({handleBlur, handleChange}){

   

    return  <form><div className={styles.input_row}>
    <div className={styles.form_group}>
      <label htmlFor="address">Address *</label>
      <input
        type="text"
        id="address"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.address?styles.input_error:null)}
      />
      {errors.address && errorPharagraph(errors.address)}
    </div>
    <div className={styles.form_group}>
      <label htmlFor="apt">Apt, suite, etc. (optional)</label>
      <input
        type="text"
        id="apt"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.apt?styles.input_error:null)}
      />
      
    </div>
    </div>
    <div className={styles.input_row}>
    <div className={styles.form_group}>
      <label htmlFor="country">Country *</label>
      <input
        type="text"
        id="country"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.country?styles.input_error:null)}
      />
     
    </div>
    <div className={styles.form_group}>
      <label htmlFor="postcode">Postcode *</label>
      <input
        type="text"
        id="postcode"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.postcode?styles.input_error:null)}
      />
     
    </div>
    <div className={styles.form_group}>
      <label htmlFor="state">State *</label>
      <input
        type="text"
        id="state"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.state?styles.input_error:null)}
      />
     
    </div>
    </div>
    <div className={styles.input_row}>
    <div className={styles.form_group}>
      <label htmlFor="suburb">Suburb *</label>
      <input
        type="text"
        id="suburb"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.suburb?styles.input_error:null)}
      />
      
    </div>
    <div className={styles.form_group}>
      <label htmlFor="phone">Phone *</label>
      <input
        type="text"
        id="phone"
        onBlur={handleBlur}
        onChange={handleChange}
        className={styles.input_field +  ' ' + (errors.phone?styles.input_error:null)}
      />
      
    </div>
    </div>
    </form>
}