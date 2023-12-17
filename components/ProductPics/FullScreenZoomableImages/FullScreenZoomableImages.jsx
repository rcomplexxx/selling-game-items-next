import React, { useEffect, useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom, Navigation } from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/zoom";0
import "swiper/css/navigation";
import Image from "next/image";

const FullScreenZoomableImage = ({
  imageIndex,
  changeImageIndex,
  fullScreenChange,
  images,
}) => {
  const [navActive, setNavActive] = useState(true);
  const [navLocked, setNavLocked] = useState(false);
 
  const [zoomed, setZoomed] = useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [swiper, setSwiper] = useState();
  const [mouseStartingPoint, setMouseStartingPoint] = useState({ x: 0, y: 0 });

  useEffect(()=>{
    const fixedZoomDiv=  document.getElementById("fixedZoomDiv");
   
    const mainImg = document.getElementById(`mainImage${imageIndex}`);
    
    const fullImg = document.getElementById(`fullImage${imageIndex}`);
 const biggerWidth = (window.innerHeight - 48)/window.innerWidth> fullImg.naturalHeight/ fullImg.naturalWidth;
    const scaleRatio =biggerWidth?
    (window.innerWidth-40)/window.innerWidth :
    mainImg.getBoundingClientRect().height/(window.innerHeight - 48)  ;






//     const distanceDifference = mainImg.getBoundingClientRect().top - fullImg.getBoundingClientRect().top;
// const distanceXDifference = mainImg.getBoundingClientRect().left - fullImg.getBoundingClientRect().left;
// const XTr= biggerWidth?
// distanceXDifference - (fullImg.getBoundingClientRect().width - fullImg.getBoundingClientRect().width*scaleRatio)/2
// :mainImg.getBoundingClientRect().left- (window.innerWidth-fullImg.getBoundingClientRect().height/fullImg.naturalHeight* fullImg.naturalWidth*scaleRatio)/2;
// const YTr = biggerWidth?
// mainImg.getBoundingClientRect().top-48- 
// (window.innerHeight-48-(window.innerWidth* fullImg.naturalHeight /fullImg.naturalWidth))/2*scaleRatio
// :distanceDifference 






// fixedZoomDiv.style.opacity = `0`;



const rgbValues = getComputedStyle(
  fixedZoomDiv
).backgroundColor.match(/\d+/g);

fixedZoomDiv.animate([
  { backgroundColor: `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0)` },
  { backgroundColor: `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 1)` }
], {
  duration: 50,
  easing: 'ease',
});

const zoomInImg = document.getElementById(`zoomIn${imageIndex}`);

zoomInImg.style.opacity = '0';
mainImg.style.opacity = '0';

setTimeout(()=>{
  mainImg.style.opacity = '1';
  zoomInImg.style.opacity = '1';
},100)


fullImg.style.transformOrigin='top left'
fullImg.style.position= 'absolute'

const deltaX=biggerWidth?20:mainImg.getBoundingClientRect().left-(window.innerWidth-(window.innerHeight-48)/fullImg.naturalHeight*fullImg.naturalWidth)/2*scaleRatio;
const deltaY=biggerWidth?mainImg.getBoundingClientRect().top-48-(window.innerHeight-48- window.innerWidth/fullImg.naturalWidth*fullImg.naturalHeight)/2*scaleRatio:mainImg.getBoundingClientRect().top-48;



fullImg.animate([
  // key frames
  //Doraditi sutra
  {
    left: `${deltaX}px`,
    top: `${deltaY}px`,
    transform: `scale(${scaleRatio})`
  },
  {
    top: '0',
    left: '0',
    transform: 'scale(1)'
  }
], {
  // sync options
  duration: 300,
  easing: 'ease',
  complete: ()=>{
    fullImg.style.position= 'static'
  }
});

  
  


    




  


   
  
  },[])

  useEffect(() => {
    let timeoutId;
    let swipeYLock=false;
    let touchCoordinates = { x: 0, y: 0 };
    const imgDiv = document.getElementById("zoomDiv" + imageIndex);
    const fixedZoomDiv=  document.getElementById("fixedZoomDiv");
    const rgbValues = getComputedStyle(
      fixedZoomDiv
    ).backgroundColor.match(/\d+/g);

    let currX= 0;
    let currY = 0;

    const handleUserInteraction = () => {
      setNavActive(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(function () {
        setNavActive(false);
      }, 3000);
    };

    const handleTouchStart = (event) => {
      touchCoordinates = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchYMove = (event) => {
      if(swipeYLock) return;

     


      currY =
        event.changedTouches[event.changedTouches.length - 1].clientY -
        touchCoordinates.y;
        if(currY > -16 && currY < 16 ){imgDiv.style.transform = `translateY(${
           0
        }px)`;
        fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${
          rgbValues[2]
        }, 1`;
    
        currX =
        event.changedTouches[event.changedTouches.length - 1].clientX -
        touchCoordinates.x;
        if((currX < -5) || currX > 5 ) swipeYLock=true;

        return;}
       



          setNavLocked(true);
         
        
      imgDiv.style.transform = `translateY(${
       currY 
      }px)`;
   
      
     
      
      fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${
        rgbValues[2]
      }, ${1-Math.abs((imgDiv.getBoundingClientRect().top-48) / window.innerHeight) * 2})`;
    };



    const handleTouchInteraction = (event) => {
      imgDiv.style.transform = `translateY(${
        currY 
       }px)`;
      swipeYLock=false;
      const lastTouch = event.changedTouches[event.changedTouches.length - 1];
      if (currY < -128 || currY > 128) {
        killFullScreen(currY);
      // fullScreenChange(imageIndex);
      }
      else{
        setNavLocked(false);
        fixedZoomDiv.style.backgroundColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${
          rgbValues[2]
        }, 1`;
      }
      
      if (!timeoutId) {
        if (
          Math.abs(lastTouch.clientX - touchCoordinates.x) < 16 &&
          Math.abs(lastTouch.clientY - touchCoordinates.y) < 16 &&
         event.target !== document.querySelector(`.${styles.zoomButton}`) &&  event.target !== document.querySelector(`.${styles.close_button}`)
        )
          timeoutId = setTimeout(function () {
            setNavActive((navActive) => !navActive);
            clearTimeout(timeoutId);
            timeoutId = null;
          }, 300);
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

    window.addEventListener("touchend", handleTouchInteraction);

    return () => {
      if (matchMedia("(pointer:fine)").matches)
        window.removeEventListener("mousemove", handleUserInteraction);
      window.removeEventListener("touchstart", handleTouchStart, true);
      window.addEventListener("touchmove", handleTouchYMove, true);
      window.removeEventListener("touchend", handleTouchInteraction);
    };
  }, [imageIndex]);

const killFullScreen=(currY=0)=>{
 const fullImg = document.getElementById(`fullImage${imageIndex}`);
const mainImg = document.getElementById(`mainImage${imageIndex}`);
const biggerWidth = (window.innerHeight - 48)/window.innerWidth> fullImg.naturalHeight/ fullImg.naturalWidth;

const scaleRatio =biggerWidth?
(window.innerWidth-40) /window.innerWidth:
mainImg.getBoundingClientRect().height /(window.innerHeight - 48);

// mainImg.getBoundingClientRect().width /window.innerWidth:


const distanceDifference = mainImg.getBoundingClientRect().top - fullImg.getBoundingClientRect().top;
const distanceXDifference = mainImg.getBoundingClientRect().left - fullImg.getBoundingClientRect().left;
const XTr= biggerWidth?
distanceXDifference - (fullImg.getBoundingClientRect().width - fullImg.getBoundingClientRect().width*scaleRatio)/2
:mainImg.getBoundingClientRect().left- (window.innerWidth-fullImg.getBoundingClientRect().height/fullImg.naturalHeight* fullImg.naturalWidth*scaleRatio)/2;
const YTr = biggerWidth?
mainImg.getBoundingClientRect().top-48- 
(window.innerHeight-48-(window.innerWidth* fullImg.naturalHeight /fullImg.naturalWidth))/2*scaleRatio-currY
:distanceDifference 

if(matchMedia("(pointer:fine)").matches && window.innerWidth>980){const zoomInImg = document.getElementById(`zoomIn${imageIndex}`);
zoomInImg.style.opacity = '0';


mainImg.style.opacity = '0';

setTimeout(()=>{
  mainImg.style.opacity = '1';
  zoomInImg.style.opacity = '1';
},300)

}

//doraditi

fullImg.style.transformOrigin = 'top center';
fullImg.style.transition = 'transform 0.3s ease';
fullImg.style.transform = `translateX(${XTr}px) translateY(${YTr}px) scale(${scaleRatio})`;

fixedZoomDiv.style.backgroundColor = `rgba(0, 0, 0, 0)`;
setNavLocked(true);

const timeoutId = setTimeout(function () {
  fullScreenChange(imageIndex)
  clearTimeout(timeoutId);
}, 300);


}



  return (
    <>
      <div id="fixedZoomDiv" className={styles.full_screen_container}>
        {/* document.addEventListener("mousemove", handleUserInteraction);
  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchstart", handleUserInteraction); */}
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
                  zoomed
                    ? "/images/zoomOutIconAw.png"
                    : "/images/zoomIconAw.png"
                }
                alt="zoom"
                onClick={(event) => {
                  event.stopPropagation()
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
                  event.stopPropagation()
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
            className={`${styles.leftArrow} ${
              matchMedia("(pointer:fine)").matches && navActive
                ? styles.navActive
                : styles.navInactive
            }`}
          ></Image>
          <Image
            height={12}
            width={12}
            src="/images/greaterLess3.png"
            className={`${styles.rightArrow} ${
              matchMedia("(pointer:fine)").matches && navActive
                ? styles.navActive
                : styles.navInactive
            }`}
          ></Image>
          <Swiper
         
            speed={400}
            slidesPerView={1}
            touchStartPreventDefault={false}
            navigation={{
              prevEl: `.${styles.leftArrow}`,
              nextEl: `.${styles.rightArrow}`,
            }}
            zoom={{
              enabled: true,
              maxRatio: 2,
              toggle: !matchMedia("(pointer:fine)").matches,
            }}
            onZoomChange={() => {
              setZoomed((zoomed) => !zoomed);
            }}
            onSlideChange={(swiper) => {
              if (zoomed) swiper.zoom.out();
              setZoomed(false);
              changeImageIndex(swiper.activeIndex);
            }}
            initialSlide={imageIndex}
            onSwiper={setSwiper}
            modules={[Zoom, Navigation]}
            className={styles.productImageSwiper}
            grabCursor={true}
          >
            {images.map((image, index) => (
              <SwiperSlide  id={`slide${index}`} key={index} className="carousel-item">
                <div className="swiper-zoom-container">
                  <div
                    id={"zoomDiv" + index}
                    className={`${styles.productImageDiv} ${
                      zoomed && (grabbing ? styles.grabbing : styles.grabCursor)
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
