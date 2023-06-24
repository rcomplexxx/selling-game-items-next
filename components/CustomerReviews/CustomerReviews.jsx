import React, { useState } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";
import styles from './customerreviews.module.css'
import { RatingStar } from 'rating-star';


function Review(){
    return <>

    <div style={{ width: '100%', maxHeight: 'max-content' }}>
    <Image
src="/images/1.png"
width={0}
height={0}
sizes="100vw"
style={{ width: '100%', height: 'auto', marginBottom:"5px" }} // optional
/>
<RatingStar maxScore={5} id="123" rating={5} />
<p style={{marginTop:"5px"}}>Very nice and very happy. Def need to be creative to hang it and would be nice if it came with hooks but all in all it’s very nice. Good accent light for a baby room!</p>
</div></>

}

export default function CustomerReviews(){







    return <div className={styles.mainDiv}>
        <h1>Customer Reviews</h1>
         <Grid container spacing={2}>
        {[...Array(12)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Review />
          </Grid>
        ))}
      </Grid>

    </div>
}