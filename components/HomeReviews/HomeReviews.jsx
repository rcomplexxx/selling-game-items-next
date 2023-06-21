export default function HomeReviews() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [currentReview, setCurrentReview] = useState(0);

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

  const slideRenderer = ({ key, index }) => {
    const reviewIndex = Math.abs(
      index - reviews.length * Math.floor(index / reviews.length)
    );
    const review = reviews[reviewIndex];
    return (
      <div className={styles.swiperCenterer}>
        <Review
          key={review.id}
          title={review.title}
          reviewText={review.reviewText}
          author={review.author}
          style={{
            display: "flex",
            width: "30%",
          }}
        />
      </div>
    );
  };

  const handleIndexChange = (index) => {
    setCurrentReview(index);
  };

  return (
    <>
      <h2 className={styles.title}>WHAT OUR CUSTOMERS HAVE TO SAY</h2>
      <div className={windowWidth > 1080 ? styles.mainDiv : styles.mainDiv + ' ' + styles.SSMainDiv}>
        {windowWidth > 1080 ? (
          reviews.map((review, index) => (
            <Review
              key={review.id}
              title={review.title}
              reviewText={review.reviewText}
              author={review.author}
              style={{
                display: "flex",
                width: '30%'
              }}
            />
          ))
        ) : (
          <>
            <AutoPlaySwipeableViews
              index={currentReview}
              onChangeIndex={handleIndexChange}
              enableMouseEvents
              interval={5000} // Auto play interval in milliseconds
              enableSlideInterpolation
              slideRenderer={slideRenderer}
            >
              {reviews.map((review) => (
                <Review
                  smallScreen={true}
                  key={review.id}
                  title={review.title}
                  reviewText={review.reviewText}
                  author={review.author}
                />
              ))}
            </AutoPlaySwipeableViews>
            <Pagination
              count={reviews.length}
              index={currentReview}
              onChangeIndex={setCurrentReview}
            />
          </>
        )}
      </div>
    </>
  );
}