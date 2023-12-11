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
            navigation
            zoom={true}
            initialSlide={imageIndex}
            onSwiper={setSwiper}
            modules={[Zoom, Navigation]}
            className={styles.productImageSwiper}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                
                <div id="zoomDiv" className={`swiper-zoom-target ${styles.productImageDiv}`}>
                <div className="swiper-zoom-container">
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