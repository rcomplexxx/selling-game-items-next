import React, { useState } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import styles from './customerreviews.module.css'
import { RatingStar } from 'rating-star';
import reviews from '../../data/reviews.json'
import Masonry from 'react-masonry-css'


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

export default function CustomerReviews(){


  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  
  //...
  
  <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column"
  >
    <div>My Element</div>
    <div>My Element</div>
    <div>My Element</div>
    <div>My Element</div>
  </Masonry>




    return <div className={styles.mainDiv} >
        <h1>Customer Reviews</h1>
        <Masonry
  breakpointCols={breakpointColumnsObj}
  className="my-masonry-grid"
  columnClassName="my-masonry-grid_column"
>
        { reviews.map((review, index) => {
         return <Review author={review.author} text={review.text} image={review.image}/>
         
        })}
        </Masonry>

    </div>
}