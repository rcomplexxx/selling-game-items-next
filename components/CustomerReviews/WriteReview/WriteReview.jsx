
import { useEffect, useState } from 'react';
import styles from './writereview.module.css'
import StarRatings from "react-star-ratings";
import { useRouter } from 'next/router';


export default function WriteReview({stars, reviewNumber}){
    const [infoDivOpen, setInfoDivOpen]=useState(false);
    const [rating, setRating] = useState(5);
    const [raitingPage, setRaitingPage] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [mounted, setMounted]= useState(false);

 
    const router = useRouter();



  
     
    

  


  
    useEffect(() => {
      if(infoDivOpen){
        router.push(router.asPath+'#write-review')
     
      
      }

      if (router.asPath.includes('#'))router.back();
    
     
      
     
    }, [infoDivOpen]);


    useEffect(() => {
   
     if(!router.asPath.includes('#'))setInfoDivOpen(false)
    }, [router.asPath]);
  






    const handleRatingClick = (newRating) => {
      setRating(newRating);
      setRaitingPage(1);
      // You can perform additional actions here when a rating is clicked.
    };

    if(submitted) return <p className={styles.submittedReview}>Review submitted. Please refresh the page to see it.</p>

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
    {raitingPage==0||raitingPage==5?<button onClick={()=>{setInfoDivOpen(false)}} className={styles.closeButton}>
      X
    </button>:<div className={styles.writeReviewFooter}>
  <button onClick={()=>{setRaitingPage(prev=>prev-1)}}>Back</button>
  <div className={styles.progressDiv}>
    <div className={styles.progressBar}/><div className={styles.progressBar}/><div className={styles.progressBar}/><div className={styles.progressBar}/>
    </div>
  <button onClick={()=>{setRaitingPage(prev=>prev+1)}}>Continue</button>

</div>}
  
      { raitingPage==0?(<>
        
      <span className={styles.rateQuestion}>How would you rate this item?</span>
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

</>):<></>


      }


  </div>
  
  </div>}














{/*     

      <div className={`${styles.reviewInfoDiv} ${infoDivOpen && styles.materialize}`}>
        
          <div className={styles.contactInfoDiv}>
            <div className={styles.infoDiv}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input
                  id="name"
                    placeholder='Enter your name(public)'
                  className={styles.contactInput}
                />
              </div>




              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  id="email"
                  placeholder='Enter your email(private)'
                  className={styles.contactInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Raiting</label>
              <StarRatings
rating={rating}
starRatedColor="#97892F"
numberOfStars={5}
changeRating={handleRatingClick}
starEmptyColor={"#103939"}
starHoverColor="orange"
starDimension="24px"
starSpacing="2px"

/>
</div>
            </div>
          </div>
          <div className={styles.messageField}>
            <label>Review</label>
            <textarea
                placeholder='Write your review here'
              className={styles.messageTextArea}
              rows={6}
            />
          </div>
          <button onClick={()=>{setSubmitted(true)}} className={styles.sendButton}>
            Submit review
          </button>
        </div>
 */}

    


    
    </>
}