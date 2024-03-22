import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import styles from "./customerreviews.module.css";
import StarRatings from "react-star-ratings";
import ReactHtmlParser from "react-html-parser";
// import Masonry from "react-masonry-css";
import classNames from "classnames";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

import WriteReviewVisible from "./WriteReview/WriteReviewVisible";

function Review({ product_id, name, text,  stars, imageNames }) {
 
  return (
    <div className={styles.reviewDiv}>
      {imageNames &&
        JSON.parse(imageNames).map((image, index) => {
          return (
            <Image
              key={index}
              height={0}
              width={0}
              src={`/images/review_images/productId_${product_id}/${image}`}
              alt="review image"
              loading={"lazy"}
              sizes="(max-width: 580px) 100vw, (max-width: 700px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={styles.reviewImage}
            />
          );
        })}

      
        <StarRatings
          rating={parseInt(stars, 10)}
          starRatedColor="var(--star-color)"
          numberOfStars={5}
          starEmptyColor={"var(--star-empty-color)"}
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
  const newReviews = useRef(startReviews ? startReviews : []);
  const [loadButtonExists, setLoadButtonExists] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  const handleShowMore= useCallback( async () => {
    if (isLoading) {
      // Prevent multiple clicks while the operation is in progress
      return;
    }

    setIsLoading(true);
    console.log('Review info before', newReviews.current, ' | ', reviews);

    try {


      let currentReviewLength= reviews.length;
      const index = newReviews.current.findIndex(
        (review) => review.id === reviews[reviews.length - 1].id,
      );


        
        
      if(index < newReviews.current.length-9){
       
          setReviews([
            ...reviews,
            ...newReviews.current.slice(index + 1, index + 9),
          ]);
          currentReviewLength= currentReviewLength + 8;
        }
     

          
        

      

        //index != newReviews.current.length - 1 je stavljeno cisto onako, mozda izbaciti
       
        
      

    else{

      const response = await fetch("/api/getreviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product_id,
          starting_position: currentReviewLength,
        }),
      });

      if (response.ok) {
        const data = await response.json();

     



       
        if (data.reviews.length === 0) 
        {
          setReviews([
            ...reviews,
            ...newReviews.current.slice(index+1, newReviews.current.length)
          ]);
          setLoadButtonExists(false);
        
        }


    



        setReviews([
          ...reviews,
          ...data.reviews.slice(0,8)
        ]);

      

        newReviews.current = [...data.reviews.slice(8,data.reviews.length)]; // Load 6 more reviews
   

      
      } else {
        throw new Error("Network response was not ok.");
      }
    } 
    
  }catch (error) {
      console.error("Error loading reviews:", error);
    } finally {
      setIsLoading(false); // Reset loading state regardless of success or failure
    }
  },[isLoading, reviews, newReviews.current])











  return (
    <div className={styles.mainDiv} id="customerReviews">
      <h1>Customer Reviews</h1>

      
   <WriteReviewVisible ratingData={ratingData}/>









      <div  id='masonry' className={styles.masonryWrapper}>


      <ResponsiveMasonry
                 columnsCountBreakPoints={{
          
            1200: 4,
            700: 3,
            580: 2,
            0: 1,
          }}
            >
             

        <Masonry
       
         
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
                product_id={product_id}
                imageNames={review.imageNames} //popravi ovo
              />
            );
          })}
        </Masonry>

        </ResponsiveMasonry>
        </div>
      {loadButtonExists && (
        <button
       
          className={styles.showMoreButton}
          onClick={handleShowMore}
        >
          {isLoading?"Loading...":"Show More"}
        </button>
      )}
    </div>
  );
}
