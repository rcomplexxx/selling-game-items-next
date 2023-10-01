import React, { useState } from "react";
import Image from "next/image";
import styles from "./customerreviews.module.css";
import { RatingStar } from "rating-star";
import Masonry from "react-masonry-css";
import classNames from "classnames";

function Review({ author, text, image, }) {
  return (
    <div className={styles.reviewDiv}>
      
      {image && (
        <Image
        height={0}
        width={0}
          src={"/images/" + image}
          alt="review image"
          sizes="100vw"
          className={styles.reviewImage}
        />
      )}
      <RatingStar maxScore={5} id="123" rating={5} />
      <p className={styles.reviewText}>{text}</p>
      <p className={styles.reviewAuthor}>{author}</p>
    </div>
  );
}

export default function CustomerReviews({ startReviews }) {
  const [reviews, setReviews] = useState([]);

  

 

  return (
    <div className={styles.mainDiv} id='customerReviews'>
      <h1>Customer Reviews</h1>
      <Masonry
        breakpointCols={{
          default: 4,
          1200: 3,
          700: 2,
          580:1
        }}
        className={classNames(styles.my_masonry_grid)}
        columnClassName={classNames(styles.my_masonry_grid_column)}
      >
        {startReviews.map((review, index) => {
          return (
            <Review
              key={index}
              author={review.author}
              text={review.text}
              image={review.image}
            />
          );
        })}

        {reviews.map((review, index) => {
          return (
            <Review
              key={index + 12}
              author={review.author}
              text={review.text}
              image={review.image}
            />
          );
        })}
      </Masonry>
      <button className={styles.showMoreButton} onClick={async () => {
    try {
      const response = await fetch("/reviews.json"); // Replace with the correct path to your JSON file
      const data = await response.json();

      const newReviews = data.slice(12, reviews.length + 18); // Load 6 more reviews
      /* PAZNJA!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Ovo je prava verzija koda, a ova gore je za testerske svrhe! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!PAZNJA*/
      /* !!!!!!!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~ const newReviews = data.slice(12+reviews.length, reviews.length + 18); ~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!*/
      /* PAZNJA!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Ovo je prava verzija koda, a ova gore je za testerske svrhe! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!PAZNJA*/
      /* !!!!!!!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~ const newReviews = data.slice(12+reviews.length, reviews.length + 18); ~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!*/
      /* PAZNJA!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Ovo je prava verzija koda, a ova gore je za testerske svrhe! ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!PAZNJA*/
      /* !!!!!!!!!!!!!!! ~~~~~~~~~~~~~~~~~~~~~~~~~~~ const newReviews = data.slice(12+reviews.length, reviews.length + 18); ~~~~~~~~~~~~~~~~~~~~~~~~~~~ !!!!!!!!!!!!!!*/
      
      setReviews((prevReviews) => [...prevReviews, ...newReviews]); // Append the new reviews to the existing ones
    } catch (error) {
      console.error("Error loading reviews:", error);
      //
    }
  }}>
        Show More
      </button>
    </div>
  );
}
