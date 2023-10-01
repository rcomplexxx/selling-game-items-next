import React, { useState, useEffect } from "react";
import { RatingStar } from "rating-star";
import styles from "./homeReviews.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const reviews = [
  {
    id: 1,
    title: "Review one",
    reviewText:
      "I don't like ordering online, but I decided to go with the flow. These products were out of this world! When it arrived, I gamed the whole night, and had a perfect gaming night! Love it!",
    author: "Monika W.",
  },
  {
    id: 2,
    title: "Review two",
    reviewText:
      "I love the headphones I got from here. The sound is three dimensional, litelarry!",
    author: "Marta N.",
  },
  {
    id: 3,
    title: "Review three",
    reviewText:
      "I knew I found the best online store for gaming when I've seen amazing keyboard that I couldn't find anywhere! I ordered, it arrived, and I am more then satisfied with product.",
    author: "Luke B.",
  },
];

function Review({ title, reviewText, author}) {
  return (
    <div className={styles.reviewWrapper}>
    <div className={styles.reviewDiv}>
      <h1 className={styles.reviewTitle}>{title}</h1>
      <RatingStar maxScore={5} id="123" rating={5} />
      <p className={styles.reviewText}>{reviewText}</p>
      <h4 className={styles.author}>- {author}</h4>
    </div></div>
  );
}

export default function HomeReviews() {
  const [windowWidth, setWindowWidth] = useState(0);

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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
             
            />
          ))
        ) : (
          <>
            <Carousel
            preventMovementUntilSwipeScrollTolerance
            swipeScrollTolerance={40}
              infiniteLoop
              autoPlay
              
              interval={10000}
              emulateTouch
              showThumbs={false}
              showStatus={false}
              showArrows={false}
              swipeable={true}
            >
              {reviews.map((review) => (
                <div className={styles.swiperCenterer} key={review.id}>
                  <Review
                    smallScreen={true}
                    title={review.title}
                    reviewText={review.reviewText}
                    author={review.author}
                  />
                </div>
              ))}
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
}
