import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "./raitinginfo.module.css";

export default function RaitingInfo({raiting}) {   
   


  return (
    <div className={styles.raitingInfo}>
        <div className={styles.raitingTitle}>
               <StarRatings
            rating={raiting}
            starRatedColor="#97892F"
            numberOfStars={1}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="32px"
            starSpacing="2px"
          />
          <span className={styles.raitingSpan}>{raiting}</span>
          </div>
          <RaitingMetric raiting={5} rateNumber={384} percentage={384/447*100}/>
          <RaitingMetric raiting={4} rateNumber={60} percentage={60/447*100}/>
          <RaitingMetric raiting={3} rateNumber={0} percentage={0}/>
          <RaitingMetric raiting={2} rateNumber={1} percentage={1/447*100}/>
          <RaitingMetric raiting={1} rateNumber={2} percentage={2/447*100}/>
    </div>
  );
}


function RaitingMetric({raiting, rateNumber, percentage}) {  

    const [opened, setOpened]= useState(false);

    useEffect(()=>{setOpened(true)},[])



return <div className={styles.raitingMetric}>
    <StarRatings
            rating={raiting}
            starRatedColor="#97892F"
            numberOfStars={5}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="16px"
            starSpacing="2px"
          />
          <div className={styles.percentRaitingWrapper}>
            <div style={{width:`${opened?percentage:0}%`}} className={styles.percentageRaitingDiv}></div>
          </div>
          <span className={styles.rateNumber}>({rateNumber})</span>
</div>
}
