import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PicWithThumbnail from "../Products/Product/PicWithThumbnail/PicWithThumbnail";

import products from '../../data/bestsellers.json'
import styles from './bestsellers.module.css'
import Link from "next/link";
import { useRef } from "react";


export default function BestSellers(){

  const sliderRef =useRef();

  const settings = {
    speed: 400,
    slidesToShow: 7.4,
  slidesToScroll: 3,
    arrows: true,
    infinite: false,
  
    responsive: [
      {
        breakpoint: 768, // define the breakpoint for smaller screens
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1180, // define the breakpoint for even smaller screens
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 2,
        }},{
          breakpoint: 1280, // define the breakpoint for even smaller screens
          settings: {
            slidesToShow: 4.2,
            slidesToScroll: 2,
          }},
          ,{
            breakpoint: 1480, // define the breakpoint for even smaller screens
            settings: {
              slidesToShow: 6.2,
              slidesToScroll: 2,
            }
      },
      // Add more responsive settings as needed
    ],
    variableWidth: false,
    centerMode: false,
    centerPadding: "0", // Set padding between centered items to 0
  };

   
    return <div className={styles.mainDiv}>
      <h1>Bestsellers</h1>
      <Slider ref={sliderRef} {...settings} className={styles.slider}>
           
           
           {products.map((product, index) => {
              return (
             
                  <Link href={`/products/${product.id}`} key={index} className={styles.productImageDiv}>
                    <div className={styles.productImageDiv2}>
                  <PicWithThumbnail product={product} />
                  </div>
                 <h2>{product.name}</h2>
                </Link>
              );
            })}
          </Slider>

    </div>;
}