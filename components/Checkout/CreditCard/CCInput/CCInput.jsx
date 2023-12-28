import React from "react";
import styles from "./ccinput.module.css";

export default function CCInput({
  id,
  ref,
  maxlength,
  autocomplete,
  placeHolder,
  type,
  handleChange,
  error,
  children,
}) {
  return (
    <div className={styles.form_group}>
      <input
        type={type}
        id={id}
        placeholder=" "
        maxlength={  maxlength?maxlength:128}
        onChange={handleChange}
        autoComplete={autocomplete && autocomplete}
        className={`${styles.input_field} ${error ? styles.input_error : ""}`}
      />
      <label htmlFor={id} className={styles.label}>
        {placeHolder}
      </label>
      {children && children}
    </div>
  );
}
