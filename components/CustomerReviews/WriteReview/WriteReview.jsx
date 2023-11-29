import { useEffect, useState } from "react";
import styles from "./writereview.module.css";
import StarRatings from "react-star-ratings";
import { useRouter } from "next/router";
import Link from "next/link";

export default function WriteReview({ stars, reviewNumber }) {
  const [infoDivOpen, setInfoDivOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [raitingPage, setRaitingPage] = useState(0);
  const [animation, setAnimation] = useState(false);
  const [images, setImages] = useState([]);
  const [reviewInfo, setReviewInfo] = useState({
    text: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errors, setErrors] = useState({ firstName: false, email: false, images5: false });
  
  const outAnimationTime = 500;
  const inAnimationTime = 200;

  const handleImageUpload = (e) => {

    const files = e.target.files;
    
    const newImages = [...images];
    let arrayMax = 5 - images.length;
    if(files.length>arrayMax) setErrors({...errors, images5:true}); else setErrors({...errors,images5:false});

    for (
      let i = 0;
      i < (files.length < arrayMax ? files.length : arrayMax);
      i++
    ) {
      if (files[i]) {
        const uploadedImagePath = URL.createObjectURL(files[i]);
        newImages.push(uploadedImagePath);
      }
    }
    setImages(newImages);

    // if (file) {
    //   const reader = new FileReader();

    //   // Callback function to handle the result of the file reading
    //   reader.onloadend = () => {
    //     setImage(reader.result); // Store the image data in the state
    //   };

    //   // Read the contents of the uploaded file as a data URL
    //   reader.readAsDataURL(file);
    // }
  };

  const handleNext = () => {
    if (animation) return;

    setAnimation("swipeOutLeft");

    setTimeout(() => {
      setRaitingPage((prev) => prev + 1);

      setAnimation("swipeInRight");
      setTimeout(() => {
        setAnimation(undefined);
      }, inAnimationTime);
    }, outAnimationTime);
  };

  const handleBack = () => {
    if (animation) return;

    setAnimation("swipeOutRight");

    setTimeout(() => {
      setRaitingPage((prev) => prev - 1);

      setAnimation("swipeInLeft");
      setTimeout(() => {
        setAnimation(undefined);
      }, inAnimationTime);
    }, outAnimationTime);
  };

  const router = useRouter();

  useEffect(() => {
    if (infoDivOpen) {
      router.push(router.asPath + "#write-review");
    }

    if (router.asPath.includes("#")) router.back();

    setRaitingPage(0);
  }, [infoDivOpen]);

  useEffect(() => {
    if (!router.asPath.includes("#")) {setInfoDivOpen(false);
      setImages([]);
      setReviewInfo({
        text: "",
        firstName: "",
        lastName: "",
        email: "",
      });
     setErrors({ firstName: false, email: false });
    }
  }, [router.asPath]);

  const handleRatingClick = (newRating) => {
    setRating(newRating);
    handleNext();
    // You can perform additional actions here when a rating is clicked.
  };

  return (
    <>
      <div className={styles.writeReviewDiv}>
        <div className={styles.raitingDiv}>
          <StarRatings
            rating={stars}
            starRatedColor="#97892F"
            numberOfStars={5}
            starEmptyColor={"#103939"}
            starHoverColor="orange"
            starDimension="24px"
            starSpacing="2px"
          />{" "}
          <span className={styles.reviewsNumberSpan}>
            {reviewNumber} reviews
          </span>
        </div>
        <button
          onClick={() => {
            setInfoDivOpen(!infoDivOpen);
          }}
          className={styles.writeReviewButton}
        >
          Write review
        </button>
      </div>

      {infoDivOpen && (
        <div className={styles.writeReviewPopupDiv}>
          <div className={styles.reviewBackgroundDiv} />
          <div className={styles.mainReviewDiv}>
            {raitingPage !== 0 && raitingPage !== 4 && (
              <div
                className={`${styles.writeReviewFooter} ${styles.writeReviewFooterMobile}`}
              >
                <button onClick={handleBack} className={styles.remindMeLater}>
                  Back
                </button>

                {raitingPage == 1 && images.length===1 && (
                  <button onClick={handleNext} className={styles.remindMeLater}>
                    Skip
                  </button>
                )}
              </div>
            )}

            <div
              className={`${styles.reviewPageDiv} ${
                animation == "swipeOutLeft"
                  ? styles.swipeOutLeftAnimation
                  : animation == "swipeInRight"
                  ? styles.swipeInRightAnimation
                  : animation == "swipeInLeft"
                  ? styles.swipeInLeftAnimation
                  : animation == "swipeOutRight"
                  ? styles.swipeOutRightAnimation
                  : ""
              }`}
            >
              {raitingPage == 0 ? (
                <>
                  <span className={styles.rateQuestion}>
                    How would you rate this product?
                  </span>
                  <StarRatings
                    rating={rating}
                    starRatedColor="#97892F"
                    numberOfStars={5}
                    changeRating={handleRatingClick}
                    starEmptyColor={"#103939"}
                    starHoverColor="orange"
                    starDimension="48px"
                    starSpacing="12px"
                  />
                </>
              ) : raitingPage == 1 ? (
                <>
                  <div className={styles.mediaTitle}>
                    <h1>Show it off!</h1>

                    <span>We'd love to see it in action!</span>
                  </div>

                  {images.length !== 0 ? (
                    <div className={styles.userImagesDivWrapper}><div className={styles.userImagesDiv}>
                      {images.map((image, i) => {
                       return <div key={i} className={styles.userImageDiv}>
                          <button className={styles.cancelImage} onClick={()=>{
                            let newImages= images.filter(img=>{return img!=image});
                            setImages(newImages);
                          }}>X</button>
                          <img src={image} className={styles.userImage} />
                        </div>;
                      })}

                    { images.length!==5 && <div className={styles.addImageDiv} onClick={handleImageUpload}>
                    <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              handleImageUpload(event);
                            }}
                            className={styles.mediaButtonImgInput}
                            multiple
                          ></input>
                      <span>+</span></div>}
                      
                      
                  
                     
                    </div>
                    <button className={styles.userImgsContinue} onClick={handleNext}>Continue</button>
                      {errors.images5 && <p className={styles.requiredError}>You can select up to 5 photos</p>}
                      </div>
                  ) : (
                    <>
                      <div className={styles.centerButtons}>
                        <button className={styles.mediaButton}>
                          Add photos{" "}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              handleImageUpload(event);
                            }}
                            className={styles.mediaButtonImgInput}
                            multiple
                          ></input>
                        </button>
                        <button className={styles.mediaButton}>
                          Add video{" "}
                          <input
                            type="file"
                            accept="video/*"
                            onChange={handleNext}
                            className={styles.mediaButtonImgInput}
                          ></input>
                        </button>
                      </div>
                      <button
                        className={styles.remindMeLater}
                        onClick={handleNext}
                      >
                        Remind me later
                      </button>
                    </>
                  )}
                </>
              ) : raitingPage == 2 ? (
                <>
                  <h1>Tell us more!</h1>
                  <textarea
                    className={styles.writeReviewText}
                    value={reviewInfo.text}
                    onChange={(event) => {
                      setReviewInfo((prev) => {
                        return { ...prev, text: event.target.value };
                      });
                    }}
                    rows={8}
                  />
                </>
              ) : raitingPage == 3 ? (
                <>
                  <h1>About you</h1>
                  <div className={styles.personInfo}>
                    <div className={styles.personInfoDiv}>
                      <label>
                        First Name <span className={styles.required}>*</span>
                      </label>
                      <input
                        value={reviewInfo.firstName}
                        onChange={(event) => {
                          if (errors.firstName)
                            setErrors((prev) => {
                              return { ...errors, firstName: false };
                            });
                          setReviewInfo((prev) => {
                            return { ...prev, firstName: event.target.value };
                          });
                        }}
                        className={styles.personInfoInput}
                      />
                      {errors.firstName && (
                        <p className={styles.requiredError}>Required field</p>
                      )}
                    </div>
                    <div className={styles.personInfoDiv}>
                      <label>Last Name</label>
                      <input
                        className={styles.personInfoInput}
                        value={reviewInfo.lastName}
                        onChange={(event) => {
                          setReviewInfo((prev) => {
                            return { ...prev, lastName: event.target.value };
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className={styles.personEmailDiv}>
                    <label>
                      Email<span className={styles.required}> *</span>
                    </label>
                    <input
                      className={styles.personEmail}
                      value={reviewInfo.email}
                      onChange={(event) => {
                        if (errors.email)
                          setErrors((prev) => {
                            return { ...errors, email: false };
                          });
                        setReviewInfo((prev) => {
                          return { ...prev, email: event.target.value };
                        });
                      }}
                    />
                    {errors.email && (
                      <p className={styles.requiredError}>
                        {reviewInfo.email == ""
                          ? "Required field"
                          : "Please fill a valid email address"}
                      </p>
                    )}
                  </div>
                  <p className={styles.writeReviewTerms}>
                    By submitting, I acknowledge the{" "}
                    <Link href="/terms-of-service">Terms of Service</Link> and{" "}
                    <Link href="/privacy-policy">Privacy Policy</Link> and that
                    my review will be publicly posted and shared online
                  </p>
                </>
              ) : (
                <>
                  <h1>Thank you!</h1>
                  <span>Your review was submitted</span>
                </>
              )}
            </div>

            {raitingPage == 0 || raitingPage == 4 ? (
              <button
                onClick={() => {
                  setInfoDivOpen(false);
                  setImages([]);
                  setReviewInfo({
                    text: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                  });
                 setErrors({ firstName: false, email: false });
                }}
                className={styles.closeButton}
              >
                X
              </button>
            ) : (
              <div
                className={`${styles.writeReviewFooter} ${
                  raitingPage == 1
                    ? animation == "swipeInRight"
                      ? styles.writeReviewFooterSpawn
                      : animation == "swipeOutRight"
                      ? styles.swipeOutRightFooterAnimation
                      : animation == "swipeOutLeft" &&
                        styles.nextButtonMobileAnim
                    : raitingPage == 3 &&
                      animation == "swipeOutLeft" &&
                      styles.swipeOutLeftFooterAnimation
                }`}
              >
                <button
                  onClick={handleBack}
                  className={`${styles.remindMeLater} ${styles.remindMeLaterMobileControl}`}
                >
                  Back
                </button>

                <div
                  className={`${styles.progressDiv} ${
                    (raitingPage > 1 ||
                      (raitingPage == 1 && animation == "swipeOutLeft")) &&
                    styles.progressDivMobileControl
                  }`}
                >
                  <div className={styles.progressBar}>
                    <div className={`${styles.progressBarFilled}`} />
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={`${
                        raitingPage == 0 &&
                        animation == "swipeOutLeft" &&
                        styles.fillProgressBar
                      } ${raitingPage > 0 && styles.progressBarFilled} ${
                        raitingPage == 1 &&
                        animation == "swipeOutRight" &&
                        styles.fillOutProgressBar
                      }
   }`}
                    />{" "}
                  </div>

                  <div className={styles.progressBar}>
                    <div
                      className={`${
                        (raitingPage > 1 ||
                          (raitingPage == 1 && animation == "swipeOutLeft")) &&
                        styles.fillProgressBar
                      } ${
                        raitingPage == 2 &&
                        animation == "swipeOutRight" &&
                        styles.fillOutProgressBar
                      }
   }`}
                    />{" "}
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${
                        (raitingPage > 2 ||
                          (raitingPage == 2 && animation == "swipeOutLeft")) &&
                        styles.fillProgressBar
                      } ${
                        raitingPage == 3 &&
                        animation == "swipeOutRight" &&
                        styles.fillOutProgressBar
                      }
   }`}
                    />{" "}
                  </div>
                </div>

                {raitingPage == 1 ? (
                  animation == "swipeOutLeft" ? (
                    <button
                      disabled={reviewInfo.text == ""}
                      onClick={handleNext}
                      className={`${styles.nextButton} ${
                        reviewInfo.text == "" && styles.nextButtonDisabled
                      }`}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className={`${styles.remindMeLater} ${styles.remindMeLaterMobileControl}`}
                    >
                      {images.length!=0?'Continue':'Skip'}
                    </button>
                  )
                ) : raitingPage == 2 ? (
                  animation == "swipeOutLeft" ? (
                    <button
                      onClick={() => {
                        if (reviewInfo.firstName == "") {
                          if (!/^\S{3,}@\S{3,}\.\S{2,}$/.test(reviewInfo.email))
                            setErrors({ email: true, firstName: true });
                          else setErrors({ email: false, firstName: true });
                          return;
                        } else if (
                          !/^\S{3,}@\S{3,}\.\S{2,}$/.test(reviewInfo.email)
                        ) {
                          setErrors({ firstName: false, email: true });
                          return;
                        } else {
                          setErrors({ firstName: false, email: false });
                          handleNext();
                        }
                      }}
                      className={`${styles.nextButton}`}
                    >
                      Done
                    </button>
                  ) : (
                    <button
                      disabled={reviewInfo.text == ""}
                      onClick={handleNext}
                      className={`${styles.nextButton} ${
                        reviewInfo.text == "" && styles.nextButtonDisabled
                      }`}
                    >
                      Next
                    </button>
                  )
                ) : raitingPage == 3 ? (
                  <button
                    onClick={() => {
                      if (reviewInfo.firstName == "") {
                        if (!/^\S{3,}@\S{3,}\.\S{2,}$/.test(reviewInfo.email))
                          setErrors({ email: true, firstName: true });
                        else setErrors({ email: false, firstName: true });
                        return;
                      } else if (
                        !/^\S{3,}@\S{3,}\.\S{2,}$/.test(reviewInfo.email)
                      ) {
                        setErrors({ firstName: false, email: true });
                        return;
                      } else {
                        setErrors({ firstName: false, email: false });
                        handleNext();
                      }
                    }}
                    className={`${styles.nextButton}`}
                  >
                    Done
                  </button>
                ) : (
                  <></>
                )}
              </div>
            )}

            {raitingPage == 4 && (
              <div
                className={`${styles.writeReviewFooter} ${styles.continueFooter}`}
              >
                <Link href="/products" className={styles.continueLink}>
                  <button className={`${styles.nextButton}`}>Continue</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
