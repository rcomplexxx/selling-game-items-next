import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "./ratinginfo.module.css";

export default function RatingInfo({ratingData, setOpenRatingInfo}) {   
   
  useEffect(()=>{document.getElementById('ratingInfo').focus()}, [])


  return (
    <div id='ratingInfo' className={styles.ratingInfo} tabIndex={0} 
     onBlur={(event)=>{
   
      if(window.getComputedStyle(event.target).getPropertyValue('position') === 'absolute')
      setOpenRatingInfo(false)}}>
        <div className={styles.ratingTitle}>
               <StarRatings
            rating={ratingData.rating}
            starRatedColor="#97892F"
            numberOfStars={1}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="32px"
            starSpacing="2px"
          />
          <span className={styles.ratingSpan}>{ratingData.rating}</span>
          </div>
          <RatingMetric rating={5} rateNumber={ratingData.stars5} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={4} rateNumber={ratingData.stars4} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={3} rateNumber={ratingData.stars3} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={2} rateNumber={ratingData.stars2} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={1} rateNumber={ratingData.stars1} sumOfAllReviews={ratingData.reviewsNumber}/>
    </div>
  );
}


function RatingMetric({rating, rateNumber,  sumOfAllReviews}) {  

    const [opened, setOpened]= useState(false);

    useEffect(()=>{setOpened(true)},[]);
    const percentage= Math.round(rateNumber / sumOfAllReviews *100);



return <div className={styles.ratingMetric}>
    <StarRatings
            rating={rating}
            starRatedColor="#97892F"
            numberOfStars={5}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="16px"
            starSpacing="2px"
          />
          <div className={styles.percentRatingWrapper}>
            <div style={{width:`${opened?percentage:0}%`}} className={styles.percentageRatingDiv}></div>
          </div>
          <span className={styles.rateNumber}>({rateNumber})</span>
</div>
}
