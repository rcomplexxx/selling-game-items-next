import React, { useState } from "react";
import Image from "next/image";
import styles from './customerreviews.module.css'
import { RatingStar } from 'rating-star';
import Masonry from 'react-masonry-css'
import classNames from "classnames";


function Review({author,text, image}){
    return <>

    <div style={{ width: '100%', maxHeight: 'max-content' }}>
    {image && <Image
src={'/images/'+image}
width={0}
height={0}
sizes="100vw"
style={{ width: '100%', height: 'auto', marginBottom:"5px" }} // optional
/>}
<RatingStar maxScore={5} id="123" rating={5} />
<p style={{marginTop:"5px"}}>{text}</p>
</div></>

}

export default function CustomerReviews(props){
 
  const [reviews, setReviews]=useState(props.reviews);
  const handleReview = async () => {
    try {
      const response = await fetch('/reviews.json'); // Replace with the correct path to your JSON file
      const data = await response.json();
      
      const newReviews = data.slice(reviews.length, reviews.length + 6); // Load 6 more reviews
      setReviews(prevReviews => [...prevReviews, ...newReviews]); // Append the new reviews to the existing ones
    } catch (error) {
      console.error('Error loading reviews:', error);
    }
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    0: 1
  };
  
  
  





    return <div className={styles.mainDiv} >
        <h1>Customer Reviews</h1>
        <Masonry
  breakpointCols={breakpointColumnsObj}
  className={classNames(styles.my_masonry_grid)}
  columnClassName={classNames(styles.my_masonry_grid_column)}
>
        { reviews.map((review, index) => {
         return <Review author={review.author} text={review.text} image={review.image}/>
         
        })}
        </Masonry>
        <button style={{ marginTop:"10px", 
        marginBottom:"20px", fontSize:"28px", padding:"8px 16px", color:"gray", 
        backgroundColor:"transparent", border:"solid gray 1px", textDecoration:"none", cursor:"pointer" }}
        onClick={handleReview}>Show More</button>

    </div>
}