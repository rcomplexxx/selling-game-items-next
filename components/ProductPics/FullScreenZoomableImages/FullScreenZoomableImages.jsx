import React, { useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom,  } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/zoom'
import Image from "next/image";


const FullScreenZoomableImage = ({ imageIndex, fullScreenChange, images }) => {
  const [swiper,setSwiper] = useState();
  const [mouseStartingPoint, setMouseStartingPoint] = useState({x:0, y:0});



  return (
    <>
      <div className={styles.full_screen_container}>
        <div className={styles.spaceController}>
          <div className={styles.closeSuiter}>
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
              
          <Swiper
          speed={400}
         slidesPerView={1}
         touchStartPreventDefault={false}
         zoom= {{
          enabled: true,
          maxRatio:2.5,
          toggle: !matchMedia('(pointer:fine)').matches
         }}
            initialSlide={imageIndex}
            onSwiper={setSwiper}
            modules={[Zoom]}
            className={styles.productImageSwiper}
            grabCursor= {true}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className='carousel-item'>
                  <div className="swiper-zoom-container">
                <div id="zoomDiv" className={`${styles.productImageDiv} swiper-zoom-target`}
               
                onMouseDown={(event)=>{
                  if(!matchMedia('(pointer:fine)').matches) return
                  const { clientX, clientY } = event;
                 
                  setMouseStartingPoint({ x: clientX , y: clientY });
                  console.log(mouseStartingPoint);
                 }}

                onMouseUp={(event)=>{
                  
                    if(!matchMedia('(pointer:fine)').matches) return
                  const { clientX, clientY } = event;
                 
                  const differenceX = Math.abs(clientX - mouseStartingPoint.x);
                  const differenceY = Math.abs(clientY - mouseStartingPoint.y);
                  console.log(differenceX,differenceY);
                 
                  if (differenceX < 16 && differenceY < 16) {
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