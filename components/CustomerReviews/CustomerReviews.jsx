import React, { useState, useRef } from "react";
import Image from "next/image";
import styles from "./customerreviews.module.css";
import StarRatings from "react-star-ratings";
import ReactHtmlParser from "react-html-parser";
import Masonry from "react-masonry-css";
import classNames from "classnames";

import WriteReviewVisible from "./WriteReview/WriteReviewVisible";

function Review({ name, text,  stars, imageNames }) {
  return (
    <div className={styles.reviewDiv}>
      {imageNames &&
        JSON.parse(imageNames).map((image, index) => {
          return (
            <Image
              key={index}
              height={0}
              width={0}
              src={`/images/review_images/${image}`}
              alt="review image"
              loading="lazy"
              sizes="100vw"
              className={styles.reviewImage}
            />
          );
        })}

      
        <StarRatings
          rating={parseInt(stars, 10)}
          starRatedColor="#97892F"
          numberOfStars={5}
          starEmptyColor={"#103939"}
          starDimension="20px"
          starSpacing="2px"
        />
    
      <p className={styles.reviewText}>{ReactHtmlParser(text)}</p>
      <p className={styles.reviewAuthor}>{name}</p>
    </div>
  );
}

export default function CustomerReviews({ product_id, ratingData, startReviews }) {
  const [reviews, setReviews] = useState(startReviews ? startReviews : []);
  const newReviews = useRef([]);
  const [loadButtonExists, setLoadButtonExists] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.mainDiv} id="customerReviews">
      <h1>Customer Reviews</h1>

      
   <WriteReviewVisible ratingData={ratingData}/>









      <div  id='masonry' className={styles.coolDiv}>
        <Masonry
          breakpointCols={{
            default: 4,
            1200: 3,
            700: 2,
            580: 1,
          }}
          className={classNames(styles.my_masonry_grid)}
          columnClassName={classNames(styles.my_masonry_grid_column)}
        >
          {reviews.map((review, index) => {
            return (
              <Review
                key={index}
                name={review.name}
                text={review.text}
                stars={review.stars}
                imageNames={review.imageNames} //popravi ovo
              />
            );
          })}
        </Masonry>
      </div>
      {loadButtonExists && (
        <button
       
          className={styles.showMoreButton}
          onClick={async () => {
            if (isLoading) {
              // Prevent multiple clicks while the operation is in progress
              return;
            }

            setIsLoading(true);

            try {
              if (newReviews.current.length > 0) {
                const index = newReviews.current.findIndex(
                  (review) => review.id === reviews[reviews.length - 1].id,
                );

                if (index !== 31 && index != newReviews.current.length - 1) {
                  setReviews((prevReviews) => [
                    ...prevReviews,
                    ...newReviews.current.slice(index + 1, index + 9),
                  ]);
                  return;
                }
              }

              const response = await fetch("/api/getreviews", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  product_id: product_id,
                  starting_position: reviews.length - 20,
                }),
              });

              if (response.ok) {
                const data = await response.json();
                if (data.reviews.length === 0) setLoadButtonExists(false);

                newReviews.current = [...data.reviews]; // Load 6 more reviews

                setReviews((prevReviews) => [
                  ...prevReviews,
                  ...newReviews.current.slice(0, 8),
                ]); // Append the new reviews to the existing ones
              } else {
                throw new Error("Network response was not ok.");
              }
            } catch (error) {
              console.error("Error loading reviews:", error);
            } finally {
              setIsLoading(false); // Reset loading state regardless of success or failure
            }
          }}
        >
          Show More
        </button>
      )}
    </div>
  );
}
