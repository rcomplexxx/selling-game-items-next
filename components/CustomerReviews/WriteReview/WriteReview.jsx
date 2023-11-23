
import { useState } from 'react';
import styles from './writereview.module.css'
import StarRatings from "react-star-ratings";


export default function WriteReview(){
    const [infoDivOpen, setInfoDivOpen]=useState(false);
    const [rating, setRating] = useState(5);
    const [submitted, setSubmitted] = useState(false);

    const handleRatingClick = (newRating) => {
      setRating(newRating);
      // You can perform additional actions here when a rating is clicked.
    };

    if(submitted) return <p className={styles.submittedReview}>Review submitted. Please refresh the page to see it.</p>

    return <>
    <div className={styles.writeReviewDiv}>
        <button onClick={()=>{setInfoDivOpen(!infoDivOpen)}} className={styles.writeReviewButton}>Write review</button>

      </div>




    

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


    


    
    </>
}