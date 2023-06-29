import React from 'react'
import styles from './inputfield.module.css'


export default function InputField({id, placeHolder, type, handleBlur, handleChange,handleFocus, error, children}){
   


    return <div className={styles.form_group}>
    <input
      placeholder={placeHolder}
      type={type}
      id={id}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      className={`${styles.input_field} ${error ? styles.input_error : ''}`}
    />
      {children && children}
    </div>

}