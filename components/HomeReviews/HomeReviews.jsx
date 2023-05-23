import React from "react";
import { RatingStar } from 'rating-star';
import styles from './homeReviews.module.css'


 function Review(props){



    return  <div className={styles.reviewDiv}>
        <h1 className={styles.reviewTitle}>
            {props.title}
            </h1>

            <RatingStar maxScore={5} id="123" rating={5} />
         
            <p>I sometimes don't like ordering online, but I decided to go with the flow. These products were out of this world! Can't belive it! Gosh!
                When it arrived, I gamed whole night, and 3 hoes sucked my cock! Love it!
            </p>

            <h4>-Monika W.</h4>

    </div>
  
   
    
}



export default function HomeReviews(){



    return <>
    <h2 className={styles.title}>WHAT OUR CUSTOMERS HAVE TO SAY</h2>
    <div className={styles.mainDiv}>

    <Review title="Thanks GameSmoke Gear"/>
    <Review title="Thanks GameSmoke Gear"/>
    <Review title="Thanks GameSmoke Gear"/>
  
    </div>
    
    </>
}