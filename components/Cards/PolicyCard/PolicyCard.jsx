import React from 'react';
import styles from './policyCard.module.css';


export function PolicyMiniCard(props){
 
  return <div className='centered'><div  className={props.bigTopMargin?styles['policy-main-div'] +' '+ styles['big-top-margin']:styles['policy-main-div']}></div>
  {props.children}
  
  </div>
}

export default function PolicyCard(props){

    return <div className={props.smallContent?styles['policy-background-div']+  styles.bigBackDiv:styles['policy-background-div']}
  > <PolicyMiniCard >{props.children}</PolicyMiniCard>
  
    </div>


}
