import React, { useState } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import styles from './customerreviews.module.css'
import { RatingStar } from 'rating-star';
import reviews from '../../data/reviews.json'


function Review({author,text, image}){
    return <>

    <div style={{ width: '100%', maxHeight: 'max-content' }}>
    {image && <Image
src="/images/1.png"
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







    return <div className={styles.mainDiv}>
        <h1>Customer Reviews</h1>
         <Grid container spacing={2}>
        { reviews.map((review) => {
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Review author={review.author} text={review.text} image={author.image}/>
          </Grid>
        })}
      </Grid>

    </div>
}