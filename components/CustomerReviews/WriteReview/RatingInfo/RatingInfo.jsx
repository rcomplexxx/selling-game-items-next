import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "./ratinginfo.module.css";

export default function RatingInfo({ratingData, openRatingInfo, setOpenRatingInfo}) {  
  
  const ratingInfoWrapperRef = useRef();
  const pointerEventTimeoutRef = useRef();
  
 
   
  useEffect(()=>{

  
    const handleClick= (event)=>{
    
  
      if (!ratingInfoWrapperRef.current.contains(event.target) && window.innerWidth>480)
      setOpenRatingInfo(false);
    }


   if(openRatingInfo) {

    pointerEventTimeoutRef.current= setTimeout(()=>{
  
      ratingInfoWrapperRef.current.style.pointerEvents='auto'
    },300)
   
      ratingInfoWrapperRef.current.classList.add(styles.ratingInfoOpenManualClass);
    ratingInfoWrapperRef.current.style.maxHeight = `${ratingInfoWrapperRef.current.scrollHeight}px`;
      document.addEventListener("click", handleClick)
   

   }
   else{
    clearTimeout(pointerEventTimeoutRef.current);
    ratingInfoWrapperRef.current.style.pointerEvents='none'
      ratingInfoWrapperRef.current.classList.remove(styles.ratingInfoOpenManualClass);
      ratingInfoWrapperRef.current.style.maxHeight = `0`;


      document.removeEventListener("click", handleClick)



   }

   return ()=>{ 
    clearTimeout(pointerEventTimeoutRef.current);
    document.removeEventListener("click", handleClick)
  
  }
  

}, [openRatingInfo])



  return (
    <div ref={ratingInfoWrapperRef} className={`${styles.ratingInfoWrapper} ${openRatingInfo && styles.ratingInfoOpen}`} 
   
    onClick={(event)=>{if(openRatingInfo)event.preventDefault();}}
   >

    <div className={styles.ratingInfoMain}>
  
        <div className={styles.ratingTitle}>
               <StarRatings
            rating={ratingData.rating}
            starRatedColor="var(--star-color)"
            numberOfStars={1}
            starEmptyColor={"var(--star-empty-color)"}
          
            starDimension="32px"
            starSpacing="2px"
          />
          <span className={styles.ratingSpan}>{ratingData.rating.toFixed(1)}</span>
          </div>
          {

          }
          <RatingMetric rating={5} rateNumber={ratingData.stars5} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={4} rateNumber={ratingData.stars4} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={3} rateNumber={ratingData.stars3} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={2} rateNumber={ratingData.stars2} sumOfAllReviews={ratingData.reviewsNumber}/>
          <RatingMetric rating={1} rateNumber={ratingData.stars1} sumOfAllReviews={ratingData.reviewsNumber}/>
          </div>
    </div>
  );
}


function RatingMetric({rating, rateNumber,  sumOfAllReviews}) {  

    const [opened, setOpened]= useState(false);

    useEffect(()=>{setOpened(true);
    
    },[]);
    const percentage= Math.round(rateNumber / sumOfAllReviews *100);



return <div className={styles.ratingMetric}>
    <StarRatings
            rating={rating}
            starRatedColor="var(--star-color)"
            numberOfStars={5}
            starEmptyColor={"var(--star-empty-color)"}
            
            starDimension="16px"
            starSpacing="2px"
          />
          <div className={styles.percentRatingWrapper}>
            <div className={styles.percentageRatingDiv} style={{width:`${opened?percentage:0}%`}} ></div>
          </div>
          <span className={styles.rateNumber}>({rateNumber})</span>
</div>
}
