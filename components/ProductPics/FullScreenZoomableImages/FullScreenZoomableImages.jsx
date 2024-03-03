import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";

import Image from "next/image";
import ToastMessage from "./ToastMessage/ToastMessage";





const FullScreenZoomableImage = ({
  imageIndex,
  changeImageIndex,
  fullScreenChange,
  images,
}) => {
  const [navActive, setNavActive] = useState(true);
  const [navLocked, setNavLocked] = useState(false);

  const [showToastMessage, setShowToastMessage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [swiper, setSwiper] = useState();
  const [mouseStartingPoint, setMouseStartingPoint] = useState({ x: 0, y: 0 });
  const [arrowDissapear, setArrowDissapear] = useState(false);
 

  const fixedZoomDivRef= useRef();
  const fullImageRef= useRef();

 





  useEffect(() => {
    const fixedZoomDiv = fixedZoomDivRef.current;

    const mainImg = document.getElementById(`mainImage${imageIndex}`);

    const fullImg = fullImageRef.current;
    const biggerWidth =
      (window.innerHeight - 48) / window.innerWidth >
      fullImg.naturalHeight / fullImg.naturalWidth;
    const scaleRatio = biggerWidth
      ? (window.innerWidth - 40) / window.innerWidth
      : mainImg.getBoundingClientRect().height / (window.innerHeight - 48);

    // fixedZoomDiv.style.opacity = `0`;

  
    mainImg.style.opacity = "0";

    //prebaciti u complete

    const rgbValues =
      getComputedStyle(fixedZoomDiv).backgroundColor.match(/\d+/g);

    const transitionEnded = () => {
      mainImg.style.opacity = "1";
     
      fixedZoomDiv.removeEventListener("transitionend", transitionEnded);
    };

    fixedZoomDiv.addEventListener("transitionend", transitionEnded);

    fixedZoomDiv.style.transition = "background-color 0.2s 0.01s ease";
    fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1)`;

 

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
      setShowToastMessage(1);
     
    }


    }, 380);


    


  }


    setTimeout(() => {
      document.body.classList.add("hideScroll");
      
    }, 280);




  }, []);
  //

  //Mozda izbaciti navlocked i active

  useEffect(()=>{
    const handlePopState=()=>{  setNavActive(false);killFullScreen();}

    window?.addEventListener("popstate", handlePopState);

   return ()=>{
    window?.removeEventListener("popstate", handlePopState);
   }
  },[imageIndex,zoomed])

  useEffect(() => {
    const fixedZoomDiv = fixedZoomDivRef.current;
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
      if (swipeYLock || zoomed) return;
      if (event.touches.length > 1) {
        return;
      }
      console.log('new touch start')
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
     

        const lastTouch = event.changedTouches[0];
        if (currY < -128 || currY > 128) {
        
          killFullScreen(currY);
        } else {
          if (currY > 16 || currY < -16) {//
            setNavLocked(false);
            if (!zoomed) {
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
        
          
          

          timeoutId = setTimeout(() =>{
                
            setNavActive((navActive) => !navActive);
            clearTimeout(timeoutId);
            timeoutId = null;
          }, 300);

          
      
    };

    if (matchMedia("(pointer:fine)").matches) {
      handleUserInteraction();
      window.addEventListener("mousemove", handleUserInteraction);
    }
    else{
    window.addEventListener("touchstart", handleTouchStart, true);
    window.addEventListener("touchmove", handleTouchYMove, true);

    window.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      clearTimeout(timeoutId);
      timeoutId = null;
      
        window.removeEventListener("mousemove", handleUserInteraction);
   
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchmove", handleTouchYMove, true);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [imageIndex,zoomed]);






  

  const killFullScreen = useCallback((currY = 0) => {
  
    if (zoomed) swiper.zoom.toggle();

    if(global.toastMessageNotShowable ){
    if(currY!=0){
      
      setShowToastMessage(2);
    }
    else
    setShowToastMessage(3);
    }



    setTimeout(
      function () {
        const fullImg = fullImageRef.current;
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



       
      
      

          setArrowDissapear(true)

        fullImg.style.transformOrigin = "top center";
        fullImg.style.transition = "transform 0.3s ease";
        fullImg.style.transform = `translateX(${XTr}px) translateY(${YTr}px) scale(${scaleRatio})`;

        fixedZoomDivRef.current.style.backgroundColor = `rgba(0, 0, 0, 0)`;

        setNavLocked(true);
        document.body.classList.remove("hideScroll");

        setTimeout(function () {
          fullScreenChange(false);

      
        }, 300);

       
      },
      zoomed ? 300 : 0
    );
  },[zoomed, imageIndex]);


 


  return (
  
      <div ref={fixedZoomDivRef} className={styles.full_screen_container}>
 

      
          <div
            className={`${styles.closeSuiter} ${
              !navLocked && navActive ? styles.navActive : styles.navInactive
            }`}
          >
            <div className={styles.pagination}>
              {imageIndex + 1} / {swiper && swiper.slides?.length}
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
            className={`${styles.leftArrow} ${arrowDissapear && styles.arrowSpawnReverse} ${
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
            className={`${styles.leftArrow} ${styles.rightArrow} ${arrowDissapear && styles.arrowSpawnReverse} ${
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
              if (zoomed) {swiper.zoom.out();
              setZoomed(false);
              }
              changeImageIndex(swiper.activeIndex);
            }}
            onSwiper={setSwiper}
            modules={[Zoom]}
            className={styles.productImageSwiper}
            grabCursor={true}
          >
            {images.map((image, index) => (
              <SwiperSlide
               
                key={index}
                className="carousel-item"
              >
                <div className="swiper-zoom-container">
                  <div
                    id={"zoomDiv" + index}
                    className={`${styles.productImageDiv} ${
                      zoomed && styles.productImageDivZoomed //zoomedChange
                    } swiper-zoom-target`}
                    onMouseDown={(event) => {
                      ;
                      if (
                        event.button !== 0 ||
                        !matchMedia("(pointer:fine)").matches
                      )
                        return;
                      const { clientX, clientY } = event;

                      setMouseStartingPoint({ x: clientX, y: clientY });
                    }}
                    onMouseUp={(event) => {
                     
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
                      ref={index==imageIndex?fullImageRef:undefined}
                      height={0}
                      width={0}
                      sizes="100vw"
                      src={image.src}
                      alt="Zoomable"
                      className={`${styles.productImage}`}
                      draggable={false}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        
        {showToastMessage!=0 && <ToastMessage showToastMessage={showToastMessage} setShowToastMessage={setShowToastMessage}/>}
      </div>
  
  );
};

export default FullScreenZoomableImage;
