import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


import styles from './productmobilepics.module.css';
import Image from 'next/image';


export default function Thumbnails({ images, imageIndex, swiper, setImageIndex, setSwiperMini }) {
  const settings2 = {
    centeredSlides: false,
    slidesPerView: "auto",
    loop: false,
    className: styles.slider2
  };

  return (
   
  );
}