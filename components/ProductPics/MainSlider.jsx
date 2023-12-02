
import styles from "./productmobilepics.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef } from "react";
import Image from "next/image";

export default function MainSlider({setZoomed, mobileInterface, images, imageIndex,
     setImageIndex,sliderRef , sliderRefMini}){




    const settings = {
        //Stavi direkt u funkciju
        speed: 400,
        arrows: false,
        infinite: false,
        slidesToShow: 1,
        Scroll: 1,
        variableWidth: true,
        centerMode: true,
       
        centerPadding: 0, // Set padding between centered items to 0
        swipe: mobileInterface,
        afterChange: (index) => {
          if (index == imageIndex) return;
          setImageIndex(index);
          if (index < imageIndex) sliderRefMini.current.slickGoTo(index);
          else sliderRefMini.current.slickGoTo(index - 1);
        },
      };

  

   return <Slider ref={sliderRef} {...settings}>
    {images.map((img, index) => {
      return (
        <div key={index} className="carousel-item">
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
              priority={index == 0}
              loading={index !== 0 && "lazy"}
            />
            <Image
            height={0}
            width={0}
            sizes="20px"
            priority={index == 0}
            loading={index == 0 && "lazy"}
              className={styles.zoomImg}
              src={"/images/zoomIconAw.png"}
            />
          </div>
        </div>
      );
    })}
  </Slider>
}