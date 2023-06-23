import React, { useState } from "react";
import Image from "next/image";
import { Grid } from "@mui/material";


function Review(){
    return <><h1>Customer Reviews</h1>

    <div style={{ width: '200px', maxHeight: 'max-content', backgroundColor:"gray" }}>
    <Image
src="/images/1.png"
width={0}
height={0}
sizes="100vw"
style={{ width: '100%', height: 'auto', marginBottom:"5px" }} // optional
/>
LLLLL
<p style={{marginTop:"5px"}}>Very nice and very happy. Def need to be creative to hang it and would be nice if it came with hooks but all in all it’s very nice. Good accent light for a baby room!</p>
</div></>

}

export default function CustomerReviews(){







    return <div className="centered">
         <Grid container spacing={2}>
        {[...Array(12)].map((_, index) => (
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
            <Review />
          </Grid>
        ))}
      </Grid>

    </div>
}