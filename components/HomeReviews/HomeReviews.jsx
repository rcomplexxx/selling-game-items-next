import React, { useState, useEffect } from "react";
import { RatingStar } from 'rating-star';
import styles from './homeReviews.module.css';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay, virtualize } from 'react-swipeable-views-utils';
import Pagination from './Pagination';

const reviews = [
  { id: 1, title: "Review one", reviewText: "I sometimes don't like ordering online, but I decided to go with the flow. These products were out of this world! Can't believe it! Gosh! When it arrived, I gamed the whole night, and had a perfect gaming night! Love it!",
  author: 'Monika W.'  },
  { id: 2, title: "Review two", reviewText: "I love the headphones I got from here. The sound is three dimensional, litelarry!" ,
  author: 'Marta N.' },
  { id: 3, title: "Review three", 
  reviewText: "I knew I found the best online store for gaming when I've seen amazing keyboard that I couldn't find anywhere! I ordered, it arrived, and I am more then satisfied with product." ,
  author: 'Luke B.' 
  },
];

const AutoPlaySwipeableViews = autoPlay(virtualize(SwipeableViews));

function Review({ title, reviewText, author, style, smallScreen=false }) {

if(smallScreen)return  (
  <div className={styles.swiperCenterer}>
  <div className={styles.reviewDiv} style={style}>
    <h1 className={styles.reviewTitle}>{title}</h1>
    <RatingStar maxScore={5} id="123" rating={5} />
    <p>{reviewText}</p>
    <h4>- {author}</h4>
  </div>
  </div>
);

  return (
    <div className={styles.reviewDiv} style={style}>
      <h1 className={styles.reviewTitle}>{title}</h1>
      <RatingStar maxScore={5} id="123" rating={5} />
      <p>{reviewText}</p>
      <h4>- {author}</h4>
    </div>
  );
}

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

  const renderSlide = ({ index, key }) => {
    // Calculate the adjusted index to allow looping from last to first
    const adjustedIndex = index >= reviews.length ? index % reviews.length : index;
  
    return (
      <Review
        key={key}
        title={reviews[adjustedIndex].title}
        reviewText={reviews[adjustedIndex].reviewText}
        author={reviews[adjustedIndex].author}
      />
    );
  };

  const handleIndexChange = (index) => {
    setCurrentReview(index);
  };


  return (
    <>
      <h2 className={styles.title}>WHAT OUR CUSTOMERS HAVE TO SAY</h2>
      <div className={windowWidth > 1080 ? styles.mainDiv : styles.mainDiv + ' ' + styles.SSMainDiv}>
        {windowWidth > 1080 ? (
          reviews.map((review, index) => (
            <Review
              key={review.id}
              title={review.title}
              reviewText={review.reviewText}
              author={review.author}
              style={{
                display: "flex",
                width: '30%'
              }}
            />
          ))
        ) : (
          <>
           
           <AutoPlaySwipeableViews
          index={currentReview}
          onChangeIndex={handleIndexChange}
          enableMouseEvents
          interval={5000} // Auto play interval in milliseconds
          slideStyle={{ width: '100%' }}
          slideRenderer={renderSlide}
          slideCount={reviews.length}
          enableSlideInterpolation
          infinite
>
              {reviews.map((review) => (
                <Review
                 smallScreen={true}
                  key={review.id}
                  title={review.title}
                  reviewText={review.reviewText}
                  author={review.author}
                />
              ))}
            </AutoPlaySwipeableViews>
            <Pagination
              count={reviews.length}
              index={currentReview}
              onChangeIndex={setCurrentReview}
            />
          </>
        )}
      </div>
    </>
  );
}