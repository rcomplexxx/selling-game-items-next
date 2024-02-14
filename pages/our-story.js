import React from "react";
import PolicyCard from "@/components/Cards/PolicyCard/PolicyCard";
import Head from "next/head";
import Image from "next/image";
import styles from '../styles/ourstory.module.css'

export default function OurStory() {
  return (
    <div className="centered">
      <Head>
        <title>Our story - Gamesmoke shop</title>
      </Head>
      <div className={styles.mainDiv}>
        <h1>Our story</h1>
        <div className={styles.mainContent}>
        <Image src='/images/gamingFriends2.jpg' className={styles.ourStoryImage} sizes="100vw" height={0} width={0}/>
        <div className={styles.ourStoryText}>
        
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
        </div>
      </div>
      </div>
    </div>
  );
}


// The Nue Cup™ was designed from long nights and hard days filled with neck and shoulder pain. I found myself incredibly frequent to cupping therapy appointments, massages and even acupuncture to help cure my build up of stress, knots, and over all pain and discomfort. I quickly realized this was not sustainable and looked to begin developing a new and improved solution. Cupping was the form of therapy that helped my shoulder and neck tension the most so I worked tirelessly to develop something that I could use myself, while sitting at my desk with ease, after 4 years of development I am extremely proud to present to you.... The Nue Cup™