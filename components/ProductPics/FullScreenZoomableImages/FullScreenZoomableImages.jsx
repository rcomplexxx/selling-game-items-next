import React, { useEffect, useRef, useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";

import "swiper/css/navigation";
import Image from "next/image";
import { useRouter } from "next/router";

const FullScreenZoomableImage = ({
  imageIndex,
  changeImageIndex,
  fullScreenChange,
  images,
}) => {
  const [navActive, setNavActive] = useState(true);
  const [navLocked, setNavLocked] = useState(false);

  const [showToastMessage, setShowToastMessage] = useState(false);
  const [zoomed, _setZoomed] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [swiper, setSwiper] = useState();
  const [mouseStartingPoint, setMouseStartingPoint] = useState({ x: 0, y: 0 });
 
  const toastTimeout = useRef();
  const routeMounted=useRef(false)
  const router = useRouter();

  const zoomRef = useRef(false);

  const setZoomed = (zoomed) => {
    _setZoomed(zoomed);
    zoomRef.current = zoomed;
  };

  useEffect(() => {
    const fixedZoomDiv = document.getElementById("fixedZoomDiv");

    const mainImg = document.getElementById(`mainImage${imageIndex}`);

    const fullImg = document.getElementById(`fullImage${imageIndex}`);
    const biggerWidth =
      (window.innerHeight - 48) / window.innerWidth >
      fullImg.naturalHeight / fullImg.naturalWidth;
    const scaleRatio = biggerWidth
      ? (window.innerWidth - 40) / window.innerWidth
      : mainImg.getBoundingClientRect().height / (window.innerHeight - 48);

    // fixedZoomDiv.style.opacity = `0`;

    const zoomInImg = document.getElementById(`zoomIn${imageIndex}`);

    zoomInImg.style.opacity = "0";
    mainImg.style.opacity = "0";

    //prebaciti u complete

    const rgbValues =
      getComputedStyle(fixedZoomDiv).backgroundColor.match(/\d+/g);

    const transitionEnded = () => {
      mainImg.style.opacity = "1";
      zoomInImg.style.opacity = "1";
      fixedZoomDiv.removeEventListener("transitionend", transitionEnded);
    };

    fixedZoomDiv.addEventListener("transitionend", transitionEnded);

    fixedZoomDiv.style.transition = "background-color 0.2s 0.01s ease";
    fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1)`;

    document
      .getElementsByClassName(styles.leftArrow)[0]
      .classList.add(styles.arrowSpawn);
    document
      .getElementsByClassName(styles.rightArrow)[0]
      .classList.add(styles.arrowSpawn);

    const deltaX = biggerWidth
      ? 0
      : mainImg.getBoundingClientRect().left -
        (window.innerWidth -
          ((window.innerHeight - 48) / fullImg.naturalHeight) *
            fullImg.naturalWidth *
            scaleRatio) /
          2;
    const deltaY = biggerWidth
      ? mainImg.getBoundingClientRect().top -
        48 -
        ((window.innerHeight -
          48 -
          (window.innerWidth / fullImg.naturalWidth) * fullImg.naturalHeight) /
          2) *
          scaleRatio
      : mainImg.getBoundingClientRect().top - 48;

    fullImg.style.transformOrigin = "top center";
    fullImg.style.transition = "transform 0s linear";
    fullImg.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px) scale(${scaleRatio})`;

    setTimeout(() => {
      fullImg.style.transition =
        "left 0.3s ease, top 0.3s ease, transform 0.3s ease";
      fullImg.style.left = `0`;
      fullImg.style.transform = `scale(1)`;
      fullImg.style.top = `0`;
    }, 10);


      if(!matchMedia("(pointer:fine)").matches){
    setTimeout(()=>{
      if(!global.toastMessageNotShowable){
      setShowToastMessage(true);
      global.toastMessageNotShowable=true;
    }


    }, 380);


    toastTimeout.current= setTimeout(()=> {
      const toast = document.getElementById("toastMessage");
      if(toast){
      
      toast.classList.add(styles.dissapearingToast);      

      setTimeout(()=>{
        setShowToastMessage(false);
        clearTimeout(toastTimeout.current);
      },500);
      
      
    }
    },
    4500)


  }


    setTimeout(() => {
      document.body.classList.add("hideScroll");
      
    }, 280);




  }, []);

  useEffect(()=>{
    const handlePopState=()=>{ setNavLocked(false); setNavActive(false);killFullScreen();}

    window?.addEventListener("popstate", handlePopState);

   return ()=>{
    window?.removeEventListener("popstate", handlePopState);
   }
  },[imageIndex])

  useEffect(() => {
    const fixedZoomDiv = document.getElementById("fixedZoomDiv");
    const rgbValues =
      getComputedStyle(fixedZoomDiv).backgroundColor.match(/\d+/g);

    let timeoutId;
    let swipeYLock = false;
    let touchCoordinates = { x: 0, y: 0 };
    const imgDiv = document.getElementById("zoomDiv" + imageIndex);

    let currX = 0;
    let currY = 0;

    const handleUserInteraction = () => {
      setNavActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        setNavActive(false);
      }, 3000);
    };

    const handleTouchStart = (event) => {
      if (event.touches.length > 1) {
        return;
      }
      imgDiv.style.transition = "transform 0s ease";

      touchCoordinates = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchYMove = (event) => {
      if (swipeYLock || zoomRef.current) return;
      if (event.touches.length > 1) {
        return;
      }

      currY =
        event.changedTouches[event.changedTouches.length - 1].clientY -
        touchCoordinates.y;
      if (currY > -16 && currY < 16) {
        imgDiv.style.transform = `translateY(${0}px)`;
        fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1`;

        currX =
          event.changedTouches[event.changedTouches.length - 1].clientX -
          touchCoordinates.x;
        if (currX < -5 || currX > 5) swipeYLock = true;

        return;
      }

      setNavLocked(true);

      imgDiv.style.transform = `translateY(${currY}px)`;

      fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${
        rgbValues[1]
      }, ${rgbValues[2]}, ${
        1 -
        Math.abs(
          (imgDiv.getBoundingClientRect().top - 48) / window.innerHeight
        ) *
          2
      })`;
    };

    const handleTouchEnd = (event) => {
      swipeYLock = false;
      if (event.touches.length > 1) {
        return;
      }
      if (!timeoutId) {
        console.log("Zooming", zoomed);

        const lastTouch = event.changedTouches[event.changedTouches.length - 1];
        if (currY < -128 || currY > 128) {
          killFullScreen(currY);
        } else {
          if (currY > 16 || currY < -16) {
            setNavLocked(false);
            if (!zoomRef.current) {
              imgDiv.style.transition =
                "transform 0.3s ease, background-color 0.3s ease";
              imgDiv.style.transform = `translateY(${0}px)`;

              fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1`;
            }
          }
        }

        if (
          Math.abs(lastTouch.clientX - touchCoordinates.x) < 16 &&
          Math.abs(lastTouch.clientY - touchCoordinates.y) < 16 &&
          event.target !== document.querySelector(`.${styles.zoomButton}`) &&
          event.target !== document.querySelector(`.${styles.close_button}`)
        )
        {

            setTimeout(()=>{
              const toast = document.getElementById("toastMessage");
              if(toast){
              
              toast.classList.add(styles.dissapearingToast);  
              setTimeout(()=>{setShowToastMessage(false)},300)    
              } 
            },300)
          

          timeoutId = setTimeout(function () {
                
            setNavActive((navActive) => !navActive);
            clearTimeout(timeoutId);
            timeoutId = null;
          }, 300);

          }
      } else {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    if (matchMedia("(pointer:fine)").matches) {
      handleUserInteraction();
      window.addEventListener("mousemove", handleUserInteraction);
    }
    window.addEventListener("touchstart", handleTouchStart, true);
    window.addEventListener("touchmove", handleTouchYMove, true);

    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (matchMedia("(pointer:fine)").matches)
        window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.addEventListener("touchmove", handleTouchYMove, true);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [imageIndex]);

  const killFullScreen = (currY = 0) => {
  
    if (zoomed) swiper.zoom.toggle();


    clearTimeout(toastTimeout.current);
    const toast = document.getElementById("toastMessage");
      if(toast){
        toast.classList.add(styles.instantDissapearingToast);
     
      

    


    }



    const timeoutIdMain = setTimeout(
      function () {
        const fullImg = document.getElementById(`fullImage${imageIndex}`);
        const mainImg = document.getElementById(`mainImage${imageIndex}`);
        const biggerWidth =
          (window.innerHeight - 48) / window.innerWidth >
          fullImg.naturalHeight / fullImg.naturalWidth;

        // const scaleX = biggerWidth?fullImg.getBoundingClientRect().width / fullImg.offsetWidth:
        // fullImg.getBoundingClientRect().height / fullImg.offsetHeight;
        const scaleRatio = biggerWidth
          ? (window.innerWidth - 40) / window.innerWidth
          : mainImg.getBoundingClientRect().height / (window.innerHeight - 48);

        // mainImg.getBoundingClientRect().width /window.innerWidth:

        const distanceDifference =
          mainImg.getBoundingClientRect().top -
          fullImg.getBoundingClientRect().top;
        const distanceXDifference =
          mainImg.getBoundingClientRect().left -
          fullImg.getBoundingClientRect().left;
        const XTr = biggerWidth
          ? distanceXDifference -
            (fullImg.getBoundingClientRect().width -
              fullImg.getBoundingClientRect().width * scaleRatio) /
              2
          : mainImg.getBoundingClientRect().left -
            (window.innerWidth -
              (fullImg.getBoundingClientRect().height / fullImg.naturalHeight) *
                fullImg.naturalWidth *
                scaleRatio) /
              2;
        const YTr = biggerWidth
          ? mainImg.getBoundingClientRect().top -
            48 -
            ((window.innerHeight -
              48 -
              (window.innerWidth * fullImg.naturalHeight) /
                fullImg.naturalWidth) /
              2) *
              scaleRatio -
            currY
          : distanceDifference;

        if (matchMedia("(pointer:fine)").matches && window.innerWidth > 980) {
          const zoomInImg = document.getElementById(`zoomIn${imageIndex}`);
          zoomInImg.style.opacity = "0";

          mainImg.style.opacity = "0";

          setTimeout(() => {
            mainImg.style.opacity = "1";
            zoomInImg.style.opacity = "1";
          }, 300);
        }

        //doraditi
        document
          .getElementsByClassName(styles.leftArrow)[0]
          .classList.remove(styles.arrowSpawn);
        document
          .getElementsByClassName(styles.rightArrow)[0]
          .classList.remove(styles.arrowSpawn);
        document
          .getElementsByClassName(styles.leftArrow)[0]
          .classList.add(styles.arrowSpawnReverse);
        document
          .getElementsByClassName(styles.rightArrow)[0]
          .classList.add(styles.arrowSpawnReverse);

        fullImg.style.transformOrigin = "top center";
        fullImg.style.transition = "transform 0.3s ease";
        fullImg.style.transform = `translateX(${XTr}px) translateY(${YTr}px) scale(${scaleRatio})`;

        fixedZoomDiv.style.backgroundColor = `rgba(0, 0, 0, 0)`;

        setNavLocked(true);
        document.body.classList.remove("hideScroll");
        const timeoutId = setTimeout(function () {
          fullScreenChange(imageIndex);

          clearTimeout(timeoutId);
        }, 300);

        clearTimeout(timeoutIdMain);
      },
      zoomed ? 300 : 0
    );
  };


  useEffect(() => {
    if (routeMounted.current && !router.asPath.includes("#zoom")) ;
    
    routeMounted.current=true;
  }, [router.asPath]);




  return (
    <>
      <div id="fixedZoomDiv" className={styles.full_screen_container}>
        {/* document.addEventListener("mousemove", handleUserInteraction);
  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchstart", handleUserInteraction); */}
 {showToastMessage && <div id='toastMessage' className={styles.toast}>Double tap to zoom</div>}
        <div className={styles.spaceController}>
          <div
            className={`${styles.closeSuiter} ${
              !navLocked && navActive ? styles.navActive : styles.navInactive
            }`}
          >
            <div className={styles.pagination}>
              {imageIndex + 1} / {swiper && swiper.slides.length}
            </div>
            <div>
              <Image
                height={0}
                width={0}
                sizes="24px"
                src={
                  zoomed //zoomedChange
                    ? "/images/zoomOutIconAw.png"
                    : "/images/zoomIconAw.png"
                }
                alt="zoom"
                onClick={(event) => {
                  event.stopPropagation();
                  swiper.zoom.toggle();
                }}
                className={styles.zoomButton}
              />
              <Image
                height={0}
                width={0}
                sizes="24px"
                src="/images/cancelWhite.png"
                alt="cancel"
                onClick={(event) => {
                  event.stopPropagation();
                  killFullScreen();
                }}
                className={styles.close_button}
              />
            </div>
          </div>

          <Image
            height={12}
            width={12}
            src="/images/greaterLess3.png"
            onClick={() => {
              swiper.slidePrev();
            }}
            className={`${styles.leftArrow} ${
              !matchMedia("(pointer:fine)").matches && styles.noArrow
            }`}
          ></Image>
          <Image
            height={12}
            width={12}
            src="/images/greaterLess3.png"
            onClick={() => {
              swiper.slideNext();
            }}
            className={`${styles.rightArrow} ${
              !matchMedia("(pointer:fine)").matches && styles.noArrow
            }`}
          ></Image>
          <Swiper
            initialSlide={imageIndex}
            speed={400}
            slidesPerView={1}
            touchStartPreventDefault={false}
            zoom={{
              enabled: true,
              maxRatio: 2,
              toggle: !matchMedia("(pointer:fine)").matches,
            }}
            onZoomChange={() => {
              setZoomed(!zoomed);
            }}
            onSlideChange={(swiper) => {
              if (zoomed) swiper.zoom.out();
              setZoomed(false);
              changeImageIndex(swiper.activeIndex);
            }}
            onSwiper={setSwiper}
            modules={[Zoom, Navigation]}
            className={styles.productImageSwiper}
            grabCursor={true}
          >
            {images.map((image, index) => (
              <SwiperSlide
                id={`slide${index}`}
                key={index}
                className="carousel-item"
              >
                <div className="swiper-zoom-container">
                  <div
                    id={"zoomDiv" + index}
                    className={`${styles.productImageDiv} ${
                      zoomed && (grabbing ? styles.grabbing : styles.grabCursor) //zoomedChange
                    } swiper-zoom-target`}
                    onMouseDown={(event) => {
                      setGrabbing(true);
                      if (
                        event.button !== 0 ||
                        !matchMedia("(pointer:fine)").matches
                      )
                        return;
                      const { clientX, clientY } = event;

                      setMouseStartingPoint({ x: clientX, y: clientY });
                    }}
                    onMouseUp={(event) => {
                      setGrabbing(false);
                      if (
                        event.button !== 0 ||
                        !matchMedia("(pointer:fine)").matches
                      )
                        return;
                      const { clientX, clientY } = event;

                      const differenceX = Math.abs(
                        clientX - mouseStartingPoint.x
                      );
                      const differenceY = Math.abs(
                        clientY - mouseStartingPoint.y
                      );

                      if (differenceX < 12 && differenceY < 12) {
                        swiper.zoom.toggle(event);
                      }
                    }}
                  >
                    <Image
                      id={`fullImage${index}`}
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={image.src}
                      alt="Zoomable"
                      className={`${styles.productImage}`}
                      draggable={false}
                    />
                  </div>{" "}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FullScreenZoomableImage;
