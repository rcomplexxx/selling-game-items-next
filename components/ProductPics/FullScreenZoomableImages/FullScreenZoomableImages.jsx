import React, { useRef, useEffect, useState } from "react";
import styles from "./fullscreenzoomableimage.module.css";
import { Zoom, Navigation, Pagination } from 'swiper/core';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import 'swiper/css/zoom'
import Image from "next/image";


const FullScreenZoomableImage = ({ imageIndex, fullScreenChange, images }) => {
  const [swiper,setSwiper] = useState();



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
              onClick={() => {
                fullScreenChange(imageIndex);
              }}
              className={styles.close_button}
            />
          </div>

          <Swiper
          speed={400}
         slidesPerView={1}
           
           
            initialSlide={imageIndex}
            onSwiper={setSwiper}
            
            className={styles.productImageSwiper}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className={`carousel-item`}>
                 
                <div id="zoomDiv" className={`${styles.productImageDiv}`}>
              
                  <Image
                   height={0}
                   width={0}
                   sizes="100vw"
                    src={image.src}
                    alt="Zoomable"
                    className={`${styles.productImage}`}
                   
                  />
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