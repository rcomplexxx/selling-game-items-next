import React, { useState, useEffect } from "react";
import { RatingStar } from "rating-star";
import styles from "./homeReviews.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const reviews = [
  {
    id: 1,
    title: "Review one",
    reviewText:
      "I don't like ordering online, but I decided to go with the flow. These products were out of this world! When it arrived, I gamed the whole night, and had a perfect gaming night! Love it!",
    author: "Monika W.",
    authorImage: "girl1Edited3.png"
  },
  {
    id: 2,
    title: "Review two",
    reviewText:
      "I love the headphones I got from here. The sound is three dimensional, litelarry!",
    author: "Marta N.",
    authorImage: "girl2Edited3.png"
  },
  {
    id: 3,
    title: "Review three",
    reviewText:
      "I knew I found the best online store for gaming when I've seen amazing keyboard that I couldn't find anywhere! I ordered, it arrived, and I am more then satisfied with product.",
    author: "Luke B.",
    authorImage: "guy1Edited3.png"
  },
];

function Review({ title, reviewText, author, authorImage }) {
  console.log('authorImage', `/images/${authorImage}`);
  return (
    <div className={styles.reviewDiv}>
      <h1 className={styles.reviewTitle}>{title}</h1>
      <RatingStar maxScore={5} id="123" rating={5} />
      <p className={styles.reviewText}>{reviewText}</p>
      <div className={styles.authorDiv}>
        <Image className={styles.authorImage} src={`/images/${authorImage}`} height={0} width={0} sizes="48px"/>
      <p className={styles.authorName}>{author}</p>
      </div>
    </div>
  );
}

export default function HomeReviews() {
  const [windowWidth, setWindowWidth] = useState(0);

  const settings = {
    speed: 400,
    arrows: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    centerMode: true,
    centerPadding: "0", // Set padding between centered items to 0
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.mainReviewDiv}>
      <h1 className={styles.title}>Customer reviews</h1>
      <div className={styles.mainDiv}>
        {windowWidth > 1080 ? (
          reviews.map((review, index) => (
            <Review
              key={review.id}
              title={review.title}
              reviewText={review.reviewText}
              author={review.author}
              authorImage={review.authorImage}
            />
          ))
        ) : (
          <>
            <Slider {...settings} className={styles.slider}>
              {reviews.map((review) => (
                <div className={`carousel-item`} key={review.id}>
                  <Review
                    smallScreen={true}
                    title={review.title}
                    reviewText={review.reviewText}
                    author={review.author}
                    authorImage={review.authorImage}
                  />
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </div>
  );
}
