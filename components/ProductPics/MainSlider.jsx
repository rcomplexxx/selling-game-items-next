
import styles from "./productmobilepics.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";

import Image from "next/image";


export default function MainSlider({setZoomed, mobileInterface, images, imageIndex,setSwiper,
  setImageIndex, swiperMini}){


  const settings = {
    speed: 400,

    slidesPerView: "auto",
    spaceBetween: 8,
    centeredSlides: true,
    slideToClickedSlide: true,
   
    onSlideChange: (swiper) => {
        const index = swiper.activeIndex;
        setImageIndex(index);
        if (index < imageIndex)   swiperMini.slideTo(index);
        else  swiperMini.slideTo(index - 1);
      
    },
    className: styles.mySlider
  };

  return (
    
    <Swiper  onSwiper={setSwiper} {...settings}>
      {images.map((img, index) => (
        <SwiperSlide key={index} className={`carousel-item ${styles.slide} ${!mobileInterface && 'swiper-no-swiping'}`}>
          <div
            className={styles.productImageDiv}
            onClick={() => {
              setZoomed(true);
            }}
          >
            <Image
              className={styles.productImage}
              src={img.src}
              alt={img.alt}
              sizes="100vw"
              height={0}
              width={0}
              priority={index === 0}
              loading={index>0?'lazy':undefined}
             
            />
            <Image
              height={0}
              width={0}
              sizes="20px"
              priority={index === 0}
              className={styles.zoomImg}
              src={"/images/zoomIconAw.png"}
              loading={index>0?'lazy':undefined}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  
  );
}