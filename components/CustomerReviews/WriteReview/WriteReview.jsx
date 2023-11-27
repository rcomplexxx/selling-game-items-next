
import { useEffect, useState } from 'react';
import styles from './writereview.module.css'
import StarRatings from "react-star-ratings";
import { useRouter } from 'next/router';
import Link from 'next/link';


export default function WriteReview({stars, reviewNumber}){
    const [infoDivOpen, setInfoDivOpen]=useState(false);
    const [rating, setRating] = useState(5);
    const [raitingPage, setRaitingPage] = useState(0);
  const [animation, setAnimation]=useState(false);

  const outAnimationTime= 500;
  const inAnimationTime= 200;

  const handleNext=()=>{

    if(animation)return;

    setAnimation('swipeOutLeft');

    
    setTimeout(() => {
      setRaitingPage((prev) => prev + 1);
    
      setAnimation('swipeInRight');
      setTimeout(() => {
        
        setAnimation(undefined);
  
      }, inAnimationTime);


    }, outAnimationTime);
  
  }


  const handleBack=()=>{

    if(animation)return;

    setAnimation('swipeOutRight');

    
    setTimeout(() => {
      setRaitingPage((prev) => prev - 1);
    
      setAnimation('swipeInLeft');
      setTimeout(() => {
        
        setAnimation(undefined);
  
      }, inAnimationTime);


    }, outAnimationTime);
  
  }


 
    const router = useRouter();



  
     
    

  


  
    useEffect(() => {
      if(infoDivOpen){
        router.push(router.asPath+'#write-review')
     
      
      }

      if (router.asPath.includes('#'))router.back();
    
     setRaitingPage(0);
      
     
    }, [infoDivOpen]);


    useEffect(() => {
   
     if(!router.asPath.includes('#'))setInfoDivOpen(false)
    }, [router.asPath]);
  






    const handleRatingClick = (newRating) => {
      setRating(newRating);
      handleNext();
      // You can perform additional actions here when a rating is clicked.
    };

  

    return <>
    <div className={styles.writeReviewDiv}>

<div className={styles.raitingDiv}>
    <StarRatings
rating={stars}
starRatedColor="#97892F"
numberOfStars={5}
starEmptyColor={"#103939"}
starHoverColor="orange"
starDimension="24px"
starSpacing="2px"

/> <span className={styles.reviewsNumberSpan}>{reviewNumber} reviews</span>

</div>
        <button onClick={()=>{setInfoDivOpen(!infoDivOpen)}} className={styles.writeReviewButton}>Write review</button>

      </div>


{infoDivOpen && <div className={styles.writeReviewPopupDiv}>
<div className={styles.reviewBackgroundDiv}/>
  <div className={styles.mainReviewDiv}>






  {raitingPage!==0 && raitingPage!==4 && <div className={`${styles.writeReviewFooter} ${styles.writeReviewFooterMobile}`}>
  <button onClick={handleBack} className={styles.remindMeLater}>Back</button>
 
   { raitingPage==1 && <button onClick={handleNext} className={styles.remindMeLater}>Skip</button>
   }
 

</div>}


  






   

<div className={`${styles.reviewPageDiv} ${animation=='swipeOutLeft'?styles.swipeOutLeftAnimation: 
animation=='swipeInRight' ? styles.swipeInRightAnimation:
animation=='swipeInLeft' ? styles.swipeInLeftAnimation:
animation=='swipeOutRight' ? styles.swipeOutRightAnimation:''
}`

}>


      { raitingPage==0?(<>
        
      <span className={styles.rateQuestion}>How would you rate this product?</span>
  <StarRatings

rating={rating}
starRatedColor="#97892F"
numberOfStars={5}
changeRating={handleRatingClick}
starEmptyColor={"#103939"}
starHoverColor="orange"
starDimension="48px"
starSpacing="12px"

/>
</>):raitingPage==1?(<>
<div className={styles.mediaTitle}>
  <h1>Show it off!</h1>
  <span>We'd love to see it in action!</span>
  </div>
  <div className={styles.centerButtons}>
    <button className={styles.mediaButton}>Add photos</button>
    <button className={styles.mediaButton}>Add video</button>
  </div>
  <button className={styles.remindMeLater} onClick={handleNext}>Remind me later</button>
</>):raitingPage==2?<>
<h1>Tell us more!</h1>
<textarea className={styles.writeReviewText} rows={8}/>
</>:raitingPage==3?<>
<h1>About you</h1>
<div className={styles.personInfo}>
  <div  className={styles.personInfoDiv}><label>First Name <span className={styles.required}>*</span></label><input className={styles.personInfoInput}/></div>
  <div  className={styles.personInfoDiv}><label>Last Name</label><input className={styles.personInfoInput}/></div>
  </div>
  <div className={styles.personEmailDiv}>
    <label>Email<span className={styles.required}> *</span></label>
<input className={styles.personEmail}/>
</div>
<p className={styles.writeReviewTerms}>By submitting, I acknowledge the <Link href='/terms-of-service'>Terms of Service</Link> and <Link href='/privacy-policy'>Privacy Policy</Link> and that my review will be publicly posted and shared online</p>
</>:<>

<h1>Thank you!</h1>
  <span>Your review was submitted</span>

</>


      }

</div>


{raitingPage==0||raitingPage==4?<button onClick={()=>{setInfoDivOpen(false)}} className={styles.closeButton}>
      X
    </button>:<div className={`${styles.writeReviewFooter} ${
      raitingPage==1?(animation=='swipeInRight'?styles.writeReviewFooterSpawn:
      (animation=='swipeOutRight' ?styles.swipeOutRightFooterAnimation:(animation == 'swipeOutLeft' && styles.nextButtonMobileAnim)))
     : (raitingPage==3 && animation == 'swipeOutLeft' && styles.swipeOutLeftFooterAnimation)
      }`}>
  <button onClick={handleBack} className={`${styles.remindMeLater} ${styles.remindMeLaterMobileControl}`}>Back</button>
  
  
  <div className={`${styles.progressDiv} ${(raitingPage>1 || (raitingPage==1 && animation == 'swipeOutLeft')) && styles.progressDivMobileControl}`}>


    <div className={styles.progressBar}><div className={`${styles.progressBarFilled}`}/></div>

<div className={styles.progressBar} >
   <div className={`${(raitingPage==0 && animation=='swipeOutLeft') && styles.fillProgressBar} ${raitingPage>0 && styles.progressBarFilled} ${
    raitingPage==1 && animation=='swipeOutRight' && styles.fillOutProgressBar}
   }`}
   
   /> </div>



<div className={styles.progressBar} >
   <div className={`${(raitingPage>1 || raitingPage==1 && animation=='swipeOutLeft') && styles.fillProgressBar} ${
    raitingPage==2 && animation=='swipeOutRight' && styles.fillOutProgressBar}
   }`}
   
   /> </div>
   <div className={styles.progressBar} >
   <div className={`${(raitingPage>2 || raitingPage==2 && animation=='swipeOutLeft') && styles.fillProgressBar} ${
    raitingPage==3 && animation=='swipeOutRight' && styles.fillOutProgressBar}
   }`}
   
   /> </div>
   
    </div>


   { raitingPage==1?(animation == 'swipeOutLeft'?<button onClick={handleNext} className={`${styles.nextButton}`}>Next</button>:<button onClick={handleNext} className={`${styles.remindMeLater} ${styles.remindMeLaterMobileControl}`}>Skip</button>):
   raitingPage==2 ?<button onClick={handleNext} className={`${styles.nextButton}`}>Next</button>:
   raitingPage==3?<button onClick={handleNext} className={`${styles.nextButton}`}>Done</button>:
   <></>
   }
 

</div>}

{raitingPage==4 && <div className={`${styles.writeReviewFooter} ${styles.continueFooter}`}>
    <Link href='/products' className={styles.continueLink}><button className={`${styles.nextButton}`}>Continue</button></Link></div>}
  


  </div>
  
  </div>}



    


    
    </>
}