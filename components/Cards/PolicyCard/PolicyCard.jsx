import React from "react";
import styles from "./policyCard.module.css";

export function PolicyMiniCard(props) {
  return (
    <div
    className={`${styles["policy-main-div"]} ${props.homeCard ? styles.homeCard : ""}`}
    >
      {props.children}
    </div>
  );
}

export default function PolicyCard(props) {
  return (
    <div
      className={
        props.smallContent
          ? styles["policy-background-div"] + ' ' + styles.bigBackDiv
          : styles["policy-background-div"]
      }
    >
      {" "}
      <PolicyMiniCard homeCard={props.homeCard}>
        {props.children}
      </PolicyMiniCard>
    </div>
  );
}
