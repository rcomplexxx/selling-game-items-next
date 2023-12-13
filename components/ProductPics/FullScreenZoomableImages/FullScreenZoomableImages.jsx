import React, { useEffect, useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom,  Navigation  } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/zoom'
import 'swiper/css/navigation';
import Image from "next/image";


const FullScreenZoomableImage = ({ imageIndex,setImageIndex, fullScreenChange, images }) => {
  const [navActive, setNavActive]= useState(true);
  const [zoomed,setZoomed]=useState(false);
  const [grabbing, setGrabbing] = useState(false);
  const [swiper,setSwiper] = useState();
  const [mouseStartingPoint, setMouseStartingPoint] = useState({x:0, y:0});

  useEffect(()=>{

    let timeoutId;
    let touchCoordinates= {x:0, y:0};
    
    const handleUserInteraction=()=>{
      
      
      setNavActive(true);
    clearTimeout(timeoutId);
   timeoutId= setTimeout(function () {
      setNavActive(false);
    }, 3000);
  }

  const handleTouchStart=(event)=>{
 
    touchCoordinates={x:event.touches[0].clientX, y:event.touches[0].clientY};
  }

  const handleTouchInteraction=(event)=>{
    
    const lastTouch =event.changedTouches[event.changedTouches.length-1];
    if(Math.abs(lastTouch.clientX-touchCoordinates.x)<16 && Math.abs(lastTouch.clientY-touchCoordinates.y)<16)
  setNavActive(navActive=>!navActive);
  }

  if(matchMedia('(pointer:fine)').matches) window.addEventListener("mousemove", handleUserInteraction);
    window.addEventListener("touchstart", handleTouchStart,true);
    window.addEventListener("touchend", handleTouchInteraction);


    return () =>{ 
     if(matchMedia('(pointer:fine)').matches) window.removeEventListener("mousemove", handleUserInteraction);
     window.removeEventListener("touchstart", handleTouchStart, true);
      window.removeEventListener("touchend", handleTouchInteraction);

}
  }, []);

  return (
    <>
      <div className={styles.full_screen_container}  >

{/* document.addEventListener("mousemove", handleUserInteraction);
  document.addEventListener("click", handleUserInteraction);
  document.addEventListener("touchstart", handleUserInteraction); */}
        <div className={styles.spaceController}>
          <div className={`${styles.closeSuiter} ${navActive && styles.navActive}`}>

      <div className={styles.pagination}>{imageIndex+1} / {swiper && swiper.slides.length}</div>
    <div>
    <Image
            height={0}
            width={0}
            sizes="24px"
             src={zoomed?'/images/zoomOutIconAw.png':'/images/zoomIconAw.png'}
              alt="zoom"
              onClick={() => {
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
              onClick={() => {
                fullScreenChange(imageIndex);
              }}
              className={styles.close_button}
              
            />

</div>
          </div>

          <Image height={12} width={12} src='/images/greaterLess3.png' className={styles.leftArrow}></Image>
          <Image height={12} width={12} src='/images/greaterLess3.png' className={styles.rightArrow}></Image>  
          <Swiper
          speed={400}
         slidesPerView={1}
         touchStartPreventDefault={false}
         
         navigation={{
          prevEl: `.${styles.leftArrow}`, 
          nextEl: `.${styles.rightArrow}`, 
          
        }}
         zoom= {{
          enabled: true,
          maxRatio:2,
          toggle: !matchMedia('(pointer:fine)').matches
         }}
         
         onZoomChange= {() => {
       
          setZoomed(zoomed=>!zoomed);
        }}
        onSlideChange={(swiper)=>{if(zoomed)swiper.zoom.out(); setZoomed(false); setImageIndex(swiper.activeIndex);}}
            initialSlide={imageIndex}
            onSwiper={setSwiper}
            modules={[Zoom, Navigation]}
            className={styles.productImageSwiper}
            grabCursor= {true}
           
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className='carousel-item'>
                  <div className="swiper-zoom-container">
                <div id="zoomDiv" className={`${styles.productImageDiv} ${zoomed && (grabbing?styles.grabbing:styles.grabCursor)} swiper-zoom-target`}
               
                onMouseDown={(event)=>{
                  setGrabbing(true);
                  if( event.button !== 0 || !matchMedia('(pointer:fine)').matches) return
                  const { clientX, clientY } = event;
                 
                  setMouseStartingPoint({ x: clientX , y: clientY });
                  console.log(mouseStartingPoint);
                 }}

                onMouseUp={(event)=>{
                  setGrabbing(false);
                    if(event.button !== 0 || !matchMedia('(pointer:fine)').matches) return
                  const { clientX, clientY } = event;
                 
                  const differenceX = Math.abs(clientX - mouseStartingPoint.x);
                  const differenceY = Math.abs(clientY - mouseStartingPoint.y);
                  console.log(differenceX,differenceY);
                 
                  if (differenceX < 12 && differenceY < 12) {
                     swiper.zoom.toggle(event);
                  }
                }}
             
                >
              
                  <Image
                   height={0}
                   width={0}
                   sizes="100vw"
                    src={image.src}
                    alt="Zoomable"
                    className={`${styles.productImage}`}
                    draggable={false}
                  />
                </div>  </div>
               
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default FullScreenZoomableImage;