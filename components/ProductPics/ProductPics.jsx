import styles from "./productmobilepics.module.css";

import dynamic from "next/dynamic";
import { useCallback, useEffect,   useRef,   useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
// import FullScreenZoomableImage from "./FullScreenZoomableImages/FullScreenZoomableImages";

const FullScreenZoomableImage = dynamic(() => import('@/components/ProductPics/FullScreenZoomableImages/FullScreenZoomableImages'));


export default function ProductPics({ images, onAddToCart, variantImageIndex }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(undefined);
  
  const [fixedMedia, setFixedMedia] = useState(0);
  const [spawnAddToCart, setSpawnAddToCart] = useState(false);
  const [swiper, setSwiper] = useState(null);
  const [swiperMini, setSwiperMini] = useState(null);

  const router = useRouter();
  const variantImageIndexMountedRef=useRef(false);

  useEffect(() => {
    if(zoomed===undefined){
      if(router.asPath.includes("#zoom"))
      router.push(router.asPath.split('#zoom')[0]);
     
      return;
    }
    if (zoomed) {
      if(!router.asPath.includes("#zoom"))router.push(router.asPath + "#zoom");

   


      router.beforePopState((state) => {
        state.options.scroll = false;
        return true;
      });

    } else { 
    if (router.asPath.includes("#zoom")) {router.back();}
  }

   
  }, [zoomed]);

  // useEffect(() => {
  //   if (!router.asPath.includes("#zoom")) setZoomed(false);
    
  // }, [router.asPath]);
  
  useEffect(()=>{
    swiper && swiper.slideTo(0, 400);
  },[images])

  useEffect(() => {
    //129

    // Check if the element exists

    const productPicsElement = document.getElementById("productPics");
    const AddToCartEl = document.getElementById("addToCart");
    const  masonryEl = document.getElementById("masonry");
    setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0 && masonryEl.getBoundingClientRect().bottom > window.innerHeight);
    
    console.log('mason', masonryEl);
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
     
      setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0 && masonryEl.getBoundingClientRect().bottom > window.innerHeight);

      
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
      setSpawnAddToCart(AddToCartEl.getBoundingClientRect().bottom < 0 && masonryEl.getBoundingClientRect().bottom > window.innerHeight);
    });

    observer.observe(productPicsElement);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(()=>{
    console.log('variant image index', variantImageIndex);
    if(variantImageIndex && variantImageIndex>=-1 && variantImageIndex < images.length && variantImageIndexMountedRef.current){
      swiper?.slideTo(variantImageIndex,window.innerWidth<980?400:0);
      
    }
    variantImageIndexMountedRef.current=true;
  },[variantImageIndex])

  


 
 

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
       
        <div className={`${styles.fixedAddToCartDiv} ${spawnAddToCart && styles.fixedAddToCartDivSpawn}`}>
          <button className={styles.fixedAddToCart}   onMouseDown={(event)=>{event.preventDefault()}} onClick={()=>{onAddToCart()}}>Add to cart</button>
        </div>
      

      {zoomed && (
        <FullScreenZoomableImage
       
          imageIndex={imageIndex}
         
          changeImageIndex={(imageIndex)=>{
            
            swiper.slideTo(imageIndex, 0, false);
            setImageIndex(imageIndex)}}
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
            id={`mainImage${index}`}
              className={styles.productImage}
              src={img.src}
              alt={img.alt}
              sizes="(max-width: 980px) 100vw, 576px"
              height={0}
              width={0}
              priority={index == 0 || index==1}
              loading={(index==0 || index==1)?'eager':'lazy'}
              draggable="false"
            />
           {imageIndex==index && <Image
           id={`zoomIn${index}`}
           alt="Zoom in"
              height={0}
              width={0}
              sizes="20px"
              
              className={styles.zoomImg}
              src={"/images/zoomIconAw.png"}
              loading={'lazy'}
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
                loading={'lazy'}
                alt='Prev'
                />
            </div>

            <div className={`${styles.leftArrowDiv} ${styles.rightArrowDiv} ${imageIndex===images.length-1 && styles.disabledArrow}`} onClick={()=>{ swiper.slideTo(imageIndex+1);}}>
                <Image 
               height={12}
               width={12}
               loading={'lazy'}
                src='/images/greaterLess3.png'
                alt='Next'
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
                  loading={index>2 ? 'lazy':undefined}
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
                    loading={'lazy'}
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
