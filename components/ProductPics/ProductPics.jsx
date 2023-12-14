import styles from "./productmobilepics.module.css";

import FullScreenZoomableImage from "@/components/ProductPics/FullScreenZoomableImages/FullScreenZoomableImages";
import { useCallback, useEffect,   useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";


export default function ProductPics({ images, onAddToCart }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState();

  const [fixedMedia, setFixedMedia] = useState(0);
  const [spawnAddToCart, setSpawnAddToCart] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [swiperMini, setSwiperMini] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if(zoomed===undefined ){
      if(router.asPath.includes("#"))
      router.push(router.asPath.split('#')[0]);
    
    }
    else{
    if (zoomed) {
      router.push(router.asPath + "#zoom");

      document.body.classList.add("hideScroll");


      router.beforePopState((state) => {
        state.options.scroll = false;
        return true;
      });

    } else document.body.classList.remove("hideScroll");

   
  }
  }, [zoomed]);

  useEffect(() => {
    if (!router.asPath.includes("#") && zoomed!==undefined) setZoomed(false);
  }, [router.asPath]);
  
  useEffect(()=>{
    swiper && swiper.slideTo(0, 400);
  },[images])

  useEffect(() => {
    //129

    // Check if the element exists

    const productPicsElement = document.getElementById("productPics");
    const AddToCartEl = document.getElementById("addToCart");
    const productImagesEl=document.getElementById("productImages");
    const handleScroll = () => {
      if(!productPicsElement || !productImagesEl) return;
      const height = productPicsElement.clientHeight;

      setFixedMedia(
        window.scrollY >= 96
          ? window.scrollY <=
            height - productImagesEl.clientHeight + 96
            ? 1
            : 2
          : 0
      );
      setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0);
    };

    const observer = new ResizeObserver((entries) => {
   
      if(!productImagesEl) return;
      const height = productPicsElement.clientHeight;
      setFixedMedia(
        window.scrollY >= 96
          ? window.scrollY <=
            height - productImagesEl.clientHeight + 96
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

  


 
 

  const handleSlideChange = useCallback((swiper) => {
    const index = swiper.activeIndex;
    setImageIndex(index);
    if (index < imageIndex) swiperMini.slideTo(index);
    else swiperMini.slideTo(index - 1);
  }, [imageIndex, swiperMini]);



 

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
          setImageIndex={ setImageIndex}
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
        
        <Swiper  onSwiper={setSwiper} speed={400} slidesPerView='auto' onSlideChange={handleSlideChange}
        >
      {images.map((img, index) => (
        <SwiperSlide key={index} className={`carousel-item ${styles.slide} ${index==images.length-1 && styles.lastSlide}`}
        onClick={() => {
          setZoomed(true);
        }}>
         
            <Image
              className={styles.productImage}
              src={img.src}
              alt={img.alt}
              sizes="100vw"
              height={0}
              width={0}
              priority={index === 0}
              
              draggable="false"
            />
           {imageIndex==index && <Image
              height={0}
              width={0}
              sizes="20px"
              priority={index === 0}
              className={styles.zoomImg}
              src={"/images/zoomIconAw.png"}
              loading={index>0?'lazy':undefined}
            />}
         
        </SwiperSlide>
      ))}
    </Swiper>
        <div className={styles.slider2Suiter}>
   

   <div className={`${styles.leftArrowDiv} ${imageIndex===0 && styles.disabledArrow}`}
   
   onClick={()=>{ swiper.slideTo(imageIndex-1);}}>
                <Image 
                height={12}
                width={12}
                src='/images/greaterLess3.png'
                
                />
            </div>

            <div className={`${styles.leftArrowDiv} ${styles.rightArrowDiv} ${imageIndex===images.length-1 && styles.disabledArrow}`} onClick={()=>{ swiper.slideTo(imageIndex+1);}}>
                <Image 
               height={12}
               width={12}
                src='/images/greaterLess3.png'
                />
            </div>


            
        <Swiper  slidesPerView="auto" speed={400} 
  
    className={styles.slider2} onSwiper={setSwiperMini}>
           
          {images.map((img, index) => (
            <SwiperSlide key={index}  className={`carousel-item ${styles.slide2} ${imageIndex === index && styles.selectedImage}`}
            
            onClick={() => {
              swiper.slideTo(index);
              setImageIndex(index);
            }}
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
