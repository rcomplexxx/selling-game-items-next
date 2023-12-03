import styles from "./productmobilepics.module.css";

import FullScreenZoomableImage from "@/components/ProductPics/FullScreenZoomableImages/FullScreenZoomableImages";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import MainSlider from "./MainSlider";
import Thumbnails from "./Thumbnails";

export default function ProductPics({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const [mobileInterface, setMobileInterface] = useState(false);
  const [fixedMedia, setFixedMedia] = useState(0);
  const [spawnAddToCart, setSpawnAddToCart] = useState(false);
  const [swiper, setSwiper] = useState(null);

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

  useLayoutEffect(() => {
    const handleResize = () => {
      setMobileInterface(window.innerWidth <= 980);
    };

    // Initial check and event listener setup
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const sliderRefMini = useRef();

  //useMemo


 

  const fullScreenChange = (index) => {
    setImageIndex(index);
    swiper.slideTo(index);
    if (sliderRefMini.current) sliderRefMini.current.slickGoTo(index - 1, true);
    setZoomed(false);
  };

  return (
    <>
      {spawnAddToCart && (
        <div className={styles.fixedAddToCartDiv}>
          <button className={styles.fixedAddToCart}>Add to cart</button>
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
        
          <MainSlider setZoomed={setZoomed} mobileInterface={mobileInterface} images={images}
          imageIndex={ imageIndex} setImageIndex={setImageIndex} setSwiper={setSwiper} 
          sliderRefMini={sliderRefMini} />
        <Thumbnails  images={images}
          imageIndex={ imageIndex} setImageIndex={setImageIndex} swiper={swiper} 
          sliderRefMini={sliderRefMini}/>
 <div className={styles.grid_container}>
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    swiper.slideTo(index);
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
                    sizes="33vw"
                    height={0}
                    width={0}
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
