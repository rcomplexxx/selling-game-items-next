import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import styles from './productmobilepics.module.css';
import Image from 'next/image';


export default function Thumbnails({ images, imageIndex, swiper, setImageIndex, setSwiperMini }) {
  const settings2 = {
    spaceBetween: 16, // Set the space between slides
    slidesPerView: "auto",
    navigation: true,
    pagination: {
      clickable: true,
    },
    loop: false,
    className: styles.slider2
  };

  return (
    <>
      <div className={styles.slider2Controller}>
        <Swiper {...settings2} onSwiper={setSwiperMini}>
          {images.map((img, index) => (
            <SwiperSlide key={index}  className={`carousel-item ${styles.slide2}`}>
              <div
                onClick={() => {
                  swiper.slideTo(index);
                  setImageIndex(index);
                }}
                className={`${styles.productImage2Div} ${imageIndex === index && styles.selectedImage}`}
              >
                <Image
                  className={styles.productImage}
                  src={img.src}
                  alt={img.alt}
                  sizes="25vw"
                  loading='lazy'
                  height={0}
                  width={0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}