import { useEffect } from "react";
import { useState } from "react";
import { CountryDropdown } from "react-country-region-selector";
import styles from "./countryinput.module.css";
import Image from "next/image";

export default function CountryInput({ id, setErrors, error }) {
  const [country, setCountry] = useState("");

  const handleChange = (c) => {
    console.log(c);

    setCountry(c);

    if (error && c !== "" && c !== null) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };

        delete newErrors.country;
        return newErrors;
      });
    }
  };

  return (
    <div className={`${styles.form_group}  ${error && styles.input_error}`}>
      <CountryDropdown
        id={id}
        value={country}
        priorityOptions={["CA", "US", "GB"]}
        onChange={(c) => {
          handleChange(c);
        }}
        defaultOptionLabel="Country *"
        classes={`${styles.countrySelectStyle} ${
          country !== "" ? styles.countryColoredPlaceholder : ""
        }`}
        tabIndex={1000}
        disabled={false}
      />
      <Image
        src="/images/greater.svg"
        alt="Arrow Down"
        height={12}
        width={16}
        priority={true}
        className={styles.arrowDown}
      />
      <label
        htmlFor={id}
        className={`${styles.label} ${country != "" && styles.labelDown}`}
      >
        Country
      </label>
      <label
        htmlFor={id}
        className={`${styles.countryNameLabel} ${
          country != "" && styles.countryNameLabelEnabled
        }`}
      >
        {country != "" ? country : ""}
      </label>
    </div>
  );
}
