import React, { useState, useEffect } from "react";
import { RatingStar } from 'rating-star';
import styles from './homeReviews.module.css';

const reviews = [
  { id: 1, title: "Thanks GameSmoke Gear1" },
  { id: 2, title: "Thanks GameSmoke Gear2" },
  { id: 3, title: "Thanks GameSmoke Gear3" }
];



export default function HomeReviews() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <h2 className={styles.title}>WHAT OUR CUSTOMERS HAVE TO SAY</h2>
      <div className={styles.mainDiv}>
        {windowWidth > 1080 ? (
          reviews.map((review, index) => (
            <Review
              key={review.id}
              title={review.title}
              style={{
                display: "flex" 
              }}
            />
          ))
        ) : (
            <>
          <button className={`${styles.arrow} ${styles.left}`} onClick={prevReview}>
            &lt;
          </button>
          <Review
            title={reviews[currentReview].title}
            style={{
              display: "flex",
            }}
          />
        

<button className={`${styles.arrow} ${styles.right}`} onClick={nextReview}>
            &gt;
          </button>
          
          </>
        )}



      </div>
      
    </>
  );
}


function Review({ title, style }) {
  return (
    <div className={styles.reviewDiv} style={style}>
      <h1 className={styles.reviewTitle}>{title}</h1>
      <RatingStar maxScore={5} id="123" rating={5} />
      <p>
        I sometimes don't like ordering online, but I decided to go with the flow. These products were out of this world! Can't believe it! Gosh! When it arrived, I gamed the whole night, and 3 hoes sucked my cock! Love it!
      </p>
      <h4>- Monika W.</h4>
    </div>
  );
}