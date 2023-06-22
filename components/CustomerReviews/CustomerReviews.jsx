import React, { useState } from "react";
import Image from "next/image";

export default function CustomerReviews(){







    return <div className="centered">
        <h1>Customer Reviews</h1>

         <div style={{ width: '200px', maxHeight: 'max-content', backgroundColor:"gray" }}>
    <div style={{ position: 'relative', width: '100%'}}>
      <Image
        src="/images/1.png"
        alt="Product Image"
        layout="fill"
        objectFit="contain"
      />
    </div>
  </div>


    </div>
}