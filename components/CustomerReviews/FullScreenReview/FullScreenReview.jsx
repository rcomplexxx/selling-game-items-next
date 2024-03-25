import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import styles from './fullscreenreview.module.css';
import StarRatings from 'react-star-ratings';

export default function FullScreenReview({authorName, text, stars, imageSrc, setFullScreenReview}) {
    const [imageLoaded, setImageLoaded] = useState(false);

   




    







const mainReviewDiv= useRef();



const killFullScreenReview = ()=>{
 
        document.documentElement.classList.remove("hideScroll");
        setFullScreenReview(false);
  



}







useEffect(()=>{


  document.documentElement.classList.add("hideScroll");




  window.history.pushState(null, null, location.href);
  history.go(1);


  const handlePopState = (event)=>{
    
    killFullScreenReview();

   
  
  }

 


  window?.addEventListener("popstate", handlePopState);
 
  


  return ()=>{

   
    window?.removeEventListener("popstate", handlePopState);
 
   

   

  }
},[])









 



  return (
    <div onClick={()=>{history.back();}} className={styles.mainWrapper}>

      
<div ref={mainReviewDiv} onClick={(event)=>{event.stopPropagation()}} className={`${styles.mainDiv} ${imageLoaded && styles.spawnFullScreenReview}`}>

    <Image src='/images/cancelWhite.png' height={0} width={0} sizes='32px' onClick={()=>{history.back();}} className={styles.closeFullScreen}/>

   {imageSrc && <div className={styles.reviewImageDiv}>

        <Image
        src={imageSrc}
        height={0} width={0}
        sizes='448px'
        loading='eager'
        //za mobilni je 100vw, inace ima tacno odredjeno
        onLoad={() => setImageLoaded(true)}
        className={styles.reviewImage}
        />

    </div>
}

    <div className={styles.reviewDiv}>
        <div className={styles.authorDiv}>
        <span className={styles.authorName}>{authorName}</span>
       
        <div className={styles.verifiedPurchaseDiv}>
        <Image src='/images/correct.png' height={0} width={0} sizes='24px'
        className={styles.verifiedImage}/>
        <span>Verified purchase</span>
        </div>
        </div>
        <StarRatings
          rating={stars}
         
          starRatedColor="var(--star-color)"
          numberOfStars={5}
          starEmptyColor={"var(--star-empty-color)"}
          starDimension="20px"
          starSpacing="2px"
        />

        <div className={styles.reviewText}>
        {text}
        </div>

        
        </div>

        
        
      
        </div>


    </div>
  )
}
