import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import StarRatings from 'react-star-ratings';
import RatingInfo from './RatingInfo/RatingInfo';
import styles from './writereviewvisible.module.css';

import dynamic from 'next/dynamic';


const WriteReview = dynamic(() => import('./WriteReview'));


export default function WriteReviewVisible({ratingData}) {
    const [openRatingInfo, setOpenRatingInfo]=useState(false);
    const  [infoDivOpen, setInfoDivOpen] = useState(undefined);

   
    useEffect(()=>{

        if(infoDivOpen) { 
          
         document.body.classList.add('hideScroll'); }
       
     
      
        else document.body.classList.remove('hideScroll');
       
     },[infoDivOpen]);

  return (<>
    <div className={styles.writeReviewDiv}>
        <div className={styles.ratingDiv}
        onClick={(event)=>{
          event.stopPropagation();
          event.preventDefault();
          
         setOpenRatingInfo(!openRatingInfo)}}>
          <StarRatings
            rating={ratingData.rating}
            starRatedColor="#97892F"
            numberOfStars={5}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="24px"
            starSpacing="2px"
          />
          <span className={styles.reviewsNumberSpan}>
            {ratingData.reviewsNumber} reviews
          </span>

          <Image
        src={'/images/greaterLess3.png'}
        loading={'lazy'} alt='Show'
        height={0}
        width={0}
        sizes="12px"
          className={`${styles.plusStyle} ${
            openRatingInfo && styles.plusStyleRotate
          }`}
        />

        </div>
       <RatingInfo ratingData={ratingData} openRatingInfo={openRatingInfo} setOpenRatingInfo={setOpenRatingInfo}/>



        <button
          onClick={() => {
            setInfoDivOpen(!infoDivOpen);
          }}
          className={styles.writeReviewButton}
        >
          Write review
        </button>
      </div>
          {infoDivOpen &&  <WriteReview infoDivOpen={infoDivOpen} setInfoDivOpen={setInfoDivOpen}/>}
      </>
  )
}
