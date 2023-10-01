import React from "react";
import PolicyCard from "@/components/Cards/PolicyCard/PolicyCard";
import Head from 'next/head';

export default function AboutUs() {
  return (

    <div className="centered">
       <Head>
        <title>About us - Gamesmoke shop</title>
      </Head>
      <PolicyCard homeCard={false} smallContent={true}>
        <h1>About us</h1>

        <p>Welcome to the League of Items.</p>
        <p>
          Our story began when we saw a gap in the market of new and innovative
          products not being pushed into the market quick enough nor without any
          quality control. Huge brands and corporations are slow and often not
          caring about their customers as they have millions more.
        </p>
        <p>
          That’s where our idea was born - create a shop with highest quality
          products for our favorite game while providing EXCEPTIONAL customer
          satisfaction level.
        </p>
        <p>
          We have worked really hard to pull this all together simply to satisfy
          you - the end customer. Hopefully you can feel that genuine love for
          our products when purchasing from us!
        </p>
        <p>
          Thank you for showing interest in our shop, and gl hf in your future
          games!
        </p>
        <p>Happy shopping! 🌠</p>
      </PolicyCard>
    </div>
  );
}
