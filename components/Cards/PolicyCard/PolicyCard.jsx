import React from 'react';
import styles from './policyCard.module.css';


export function PolicyMiniCard(props){
 
  return <div  className={props.homeCard?styles['policy-main-div'] +' '+ styles['homeCard']:styles['policy-main-div']}>
  {props.children}
  
  </div>
}

export default function PolicyCard(props){

    return <div className={props.smallContent?styles['policy-background-div']+  styles.bigBackDiv:styles['policy-background-div']}
  > <PolicyMiniCard hoomeCard={props.homeCard}>{props.children}</PolicyMiniCard>
  
    </div>


}
