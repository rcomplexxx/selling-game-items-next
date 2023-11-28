import { Swiper, SwiperSlide } from 'swiper/react';


import PicWithThumbnail from '../Products/Product/PicWithThumbnail/PicWithThumbnail';

import products from '../../data/bestsellers.json';
import styles from './bestsellers.module.css';
import Link from 'next/link';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/swiper.min.css';

export default function BestSellers() {
  const sliderRef = useRef();

  const settings = {
    speed: 400,
    slidesPerView: 7.4,
    spaceBetween: 8,
   
    breakpoints: {
      1480: {
        slidesPerView: 7.4,
        spaceBetween: 8,
      
      },
      1280: {
        slidesPerView:  6.2,
        spaceBetween: 12,
      },
      1180: {
        slidesPerView: 4.2,
      
      },
      768: {
        slidesPerView: 3.2,
       
      },
     0: {
        slidesPerView: 2.2,
        spaceBetween: 16,
      
      },
    },
    variableWidth: false,
    centeredSlides: false,
    loop: false,
  };

  return (
    <div className={styles.mainDiv}>
      <h1>Bestsellers</h1>
      <Swiper {...settings} ref={sliderRef} className={styles.slider}>
        {products.map((product, index) => (
          <SwiperSlide key={index} className={styles.productImageDiv}>
            <Link href={`/products/${product.id}`}>
              <div className={styles.productImageDiv2}>
                <PicWithThumbnail product={product} />
             
              </div>
            </Link>
            <h2>{product.name}</h2>
            
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}