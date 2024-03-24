import React from 'react';
import styles from './review.module.css';
import Image from "next/image";
import StarRatings from "react-star-ratings";
import ReactHtmlParser from "react-html-parser";

export default function  Review({ product_id, name, text,  stars, imageNames }) {





  return (
    <div className={styles.reviewDiv}>
     
          {imageNames &&    <Image
            
              height={0}
              width={0}
              src={`/images/review_images/productId_${product_id}/${imageNames[0]}`}
              alt="review image"
              loading={"lazy"}
              sizes="(max-width: 580px) 100vw, (max-width: 700px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className={styles.reviewImage}
            />
          }
      

      
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








 
  
  









// {imageNames &&
//   JSON.parse(imageNames).map((image, index) => {
//     return (
//       <Image
//         key={index}
//         height={0}
//         width={0}
//         src={`/images/review_images/productId_${product_id}/${image}`}
//         alt="review image"
//         loading={"lazy"}
//         sizes="(max-width: 580px) 100vw, (max-width: 700px) 50vw, (max-width: 1200px) 33vw, 25vw"
//         className={styles.reviewImage}
//       />
//     );
//   })}