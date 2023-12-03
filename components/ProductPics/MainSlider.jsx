
import styles from "./productmobilepics.module.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";

import Image from "next/image";


export default function MainSlider({setZoomed, mobileInterface, images, imageIndex,
  setImageIndex,sliderRef , sliderRefMini}){


  const settings = {
    speed: 400,

    slidesPerView: "auto",
    spaceBetween: 8,
    centeredSlides: true,
    slideToClickedSlide: true,
    on: {
      slideChange: () => {
        const index = sliderRef.current.swiper.realIndex;
        if (index === imageIndex) return;
        setImageIndex(index);
        if (index < imageIndex) sliderRefMini.current.swiper.slideTo(index);
        else sliderRefMini.current.swiper.slideTo(index - 1);
      },
    },
    className: styles.mySlider
  };

  return (
    <div className={styles.sliderController}>
    <Swiper  ref={sliderRef} {...settings}>
      {images.map((img, index) => (
        <SwiperSlide key={index} className={`carousel-item ${styles.slide}`}>
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
              loading={index !== 0 ? "lazy" : undefined}
            />
            <Image
              height={0}
              width={0}
              sizes="20px"
              priority={index === 0}
              loading={index !== 0 ? "lazy" : undefined}
              className={styles.zoomImg}
              src={"/images/zoomIconAw.png"}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
}