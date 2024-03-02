import React, { useEffect, useRef, useState } from "react";
import StarRatings from "react-star-ratings";
import styles from "./ratinginfo.module.css";

export default function RatingInfo({ratingData, openRatingInfo, setOpenRatingInfo}) {  
  
  const ratingInfoWrapperRef = useRef();
  const pointerEventTimeoutRef = useRef();
 
   
  useEffect(()=>{

    let firstClick=false;

    const handleClick= (event)=>{
      if(!firstClick){firstClick=true;return;}
      console.log('click',!ratingInfoWrapperRef.current.contains(event.target) )
      if (!ratingInfoWrapperRef.current.contains(event.target) && window.innerWidth>480)
      setOpenRatingInfo(false);
    }


   if(openRatingInfo) {
    // ratingInfoWrapperRef.current.focus();

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

   return ()=>{ document.removeEventListener("click", handleClick)}
  

}, [openRatingInfo])


  return (
    <div ref={ratingInfoWrapperRef} className={`${styles.ratingInfoWrapper} ${openRatingInfo && styles.ratingInfoOpen}`} 
    tabIndex={0} 
    // onBlur={(event)=>{
   
    //   if(window.innerWidth>480)
    //   setOpenRatingInfo(false)}}
    >
    <div   className={`${styles.ratingInfo}`} tabIndex={0} 
     
      
      >
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
