import styles from "./productmobilepics.module.css";

import FullScreenZoomableImage from "@/components/ProductPics/FullScreenZoomableImages/FullScreenZoomableImages";
import { useEffect,   useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper.min.css";


export default function ProductPics({ images, onAddToCart }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const [fixedMedia, setFixedMedia] = useState(0);
  const [spawnAddToCart, setSpawnAddToCart] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [swiperMini, setSwiperMini] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (zoomed) {
      router.push(router.asPath + "#zoom");

      document.body.classList.add("hideScroll");
    } else document.body.classList.remove("hideScroll");

    if (router.asPath.includes("#")) router.back();
  }, [zoomed]);

  useEffect(() => {
    if (!router.asPath.includes("#")) setZoomed(false);
  }, [router.asPath]);
  
  useEffect(()=>{
    swiper && swiper.slideTo(0, 400);
  },[images])

  useEffect(() => {
    //129

    // Check if the element exists

    const productPicsElement = document.getElementById("productPics");
    const AddToCartEl = document.getElementById("addToCart");
    const handleScroll = () => {
      const height = productPicsElement.clientHeight;

      setFixedMedia(
        window.scrollY >= 96
          ? window.scrollY <=
            height - document.getElementById("productImages").clientHeight + 96
            ? 1
            : 2
          : 0
      );
      setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0);
    };

    const observer = new ResizeObserver((entries) => {
      const height = productPicsElement.clientHeight;
      setFixedMedia(
        window.scrollY >= 96
          ? window.scrollY <=
            height - document.getElementById("productImages").clientHeight + 96
            ? 1
            : 2
          : 0
      );
      setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0);
    });

    observer.observe(productPicsElement);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  


 
  //useMemo

  const settings = {
    speed: 400,

    slidesPerView: "auto",
    
    centeredSlides: false,

    className: styles.myslider,
   
   
    onSlideChange: (swiper) => {
        const index = swiper.activeIndex;
        setImageIndex(index);
        if (index < imageIndex)   swiperMini.slideTo(index);
        else  swiperMini.slideTo(index - 1);
      
    },
  };


  const settings2 = {
    centeredSlides: false,
    slidesPerView: "auto",
    loop: false,
    className: styles.slider2
  };


 

  const fullScreenChange = (index) => {
    setImageIndex(index);
    swiper.slideTo(index);
     swiperMini.slideTo(index - 1);
    setZoomed(false);
  };

  return (
    <>
      {spawnAddToCart && (
        <div className={styles.fixedAddToCartDiv}>
          <button className={styles.fixedAddToCart} onClick={()=>{onAddToCart()}}>Add to cart</button>
        </div>
      )}

      {zoomed && (
        <FullScreenZoomableImage
          imageUrl="/images/boxItem.png"
          imageIndex={imageIndex}
          fullScreenChange={fullScreenChange}
          images={images}
        />
      )}
      <div id="productPics" className={styles.productPicsWrapper}>
        <div
          id="productImages"
          className={`${fixedMedia == 1 ? styles.productPicsFixed : ""} ${
            fixedMedia == 2 ? styles.productPicsBot : ""
          }`}
        >
        
        <Swiper  onSwiper={setSwiper} {...settings}>
      {images.map((img, index) => (
        <SwiperSlide key={index} className={`carousel-item ${styles.slide} ${index==images.length-1 && styles.lastSlide}`}>
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
              loading={index>1?'lazy':undefined}
              draggable="false"
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
        <div className={styles.slider2Suiter}>
   

   <div className={`${styles.leftArrowDiv} ${imageIndex===0 && styles.disabledArrow}`}
   
   onClick={()=>{ swiper.slideTo(imageIndex-1);}}>
                <Image 
                height={12}
                width={12}
                src='/images/greaterLess2.png'
                
                />
            </div>

            <div className={`${styles.leftArrowDiv} ${styles.rightArrowDiv} ${imageIndex===images.length-1 && styles.disabledArrow}`} onClick={()=>{ swiper.slideTo(imageIndex+1);}}>
                <Image 
               height={12}
               width={12}
                src='/images/greaterLess2.png'
                />
            </div>


            
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
                  loading={index>2?'lazy':undefined}
                  height={0}
                  width={0}
                  draggable="false"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      
    </div>
 <div className={styles.grid_container}>
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    swiper.slideTo(index, 0);
                    setImageIndex(index);
                  }}
                  className={`${styles.productImage2Div}`}
                >
                  <Image
                    className={`${styles.productImage} ${
                      imageIndex == index && styles.selectedImage
                    }`}
                    src={img.src}
                    alt={img.alt}
                    sizes="20vw"
                    height={0}
                    width={0}
                    draggable="false"
                  />
                </div>
              );
            })}
          </div>
          
        </div>
      </div>
    </>
  );
}
