
import { useEffect, useState } from 'react';
import styles from './writereview.module.css'
import StarRatings from "react-star-ratings";
import { useRouter } from 'next/router';
import Link from 'next/link';


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
    
     setRaitingPage(0);
      
     
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
   

<div className={styles.reviewPageDiv}>


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
  <button className={styles.remindMeLater} onClick={()=>{setRaitingPage(prev=>prev+1)}}>Remind me later</button>
</>):raitingPage==2?<>
<h1>Tell us more!</h1>
<textarea className={styles.writeReviewText} rows={8}/>
</>:raitingPage==3?<>
<h1>About you</h1>
<div className={styles.personInfo}>
  <div  className={styles.personInfoDiv}><label>First Name</label><input className={styles.personInfoInput}/></div>
  <div  className={styles.personInfoDiv}><label>Last Name</label><input className={styles.personInfoInput}/></div>
  </div>
  <div className={styles.personEmailDiv}>
    <label>Email</label>
<input className={styles.personEmail}/>
</div>
</>:<>

<h1>Thank you!</h1>
  <span>Your review was submitted</span>

</>


      }

</div>


{raitingPage==0||raitingPage==4?<button onClick={()=>{setInfoDivOpen(false)}} className={styles.closeButton}>
      X
    </button>:<div className={styles.writeReviewFooter}>
  <button onClick={()=>{setRaitingPage(prev=>prev-1)}} className={styles.remindMeLater}>Back</button>
  <div className={styles.progressDiv}>
    <div className={styles.progressBar}/>
<div className={styles.progressBar} />
<div className={`${styles.progressBar} ${raitingPage < 2 && styles.emptyProgressBar}`} />
<div className={`${styles.progressBar} ${raitingPage < 3 && styles.emptyProgressBar}`} />
   
   
    </div>
   { raitingPage==1?<button onClick={()=>{setRaitingPage(prev=>prev+1)}} className={styles.remindMeLater}>Skip</button>:
   raitingPage==2?<button onClick={()=>{setRaitingPage(prev=>prev+1)}} className={styles.remindMeLater}>Next</button>:
   raitingPage==3?<button onClick={()=>{setRaitingPage(prev=>prev+1)}} className={styles.remindMeLater}>Done</button>:
   <></>
   }
 

</div>}

{raitingPage==4 && <div className={`${styles.writeReviewFooter} ${styles.continueFooter}`}>
    <Link href='/products'><button className={styles.remindMeLater}>Continue</button></Link></div>}
  


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