import React, { useContext } from 'react';
import styles from './policyCard.module.css';
import AppContext from "@/contexts/AppContext";

export function PolicyMiniCard(props) {
  const { hasScrollbar } = useContext(AppContext);
  const miniCardStyle = `${styles['policy-main-div']} ${hasScrollbar ? styles.marginRight : ''}`;

  return (
    <div className={props.bigTopMargin ? `${miniCardStyle} ${styles['big-top-margin']}` : miniCardStyle}>
      {props.children}
    </div>
  );
}

export default function PolicyCard(props) {
  return (
    <div className={props.smallContent ? `${styles['policy-background-div']} ${styles.bigBackDiv}` : styles['policy-background-div']}>
      <PolicyMiniCard>{props.children}</PolicyMiniCard>
    </div>
  );
}