import styles from "./productmobilepics.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FullScreenZoomableImage from "@/components/ProductPics/FullScreenZoomableImages/FullScreenZoomableImages";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ProductPics({ images }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const [mobileInterface, setMobileInterface] = useState(false);
  const [fixedMedia, setFixedMedia] = useState(0);

  const router= useRouter();


  useEffect(() => {
    if(zoomed){
      router.push(router.asPath+'#zoom')
   
    
    }

    if (router.asPath.includes('#'))router.back();
  
   
    
   
  }, [zoomed]);


  useEffect(() => {
 
   if(!router.asPath.includes('#'))setZoomed(false)
  }, [router.asPath]);






  useEffect(() => {
    //129

    const productPicsElement = document.getElementById("productPics");
    const handleScroll = () => {
      //Vrednost 129 se dobija  console.log(document.getElementById('productPics').getBoundingClientRect().top),
      //a od pocetka do dna elementa dodamo samo njegovu visinu, tj. + document.getElementById('productPics').clientHeight
      //console.log(document.getElementById('productPics').getBoundingClientRect().top+ document.getElementById('productPics').clientHeight)
      const height = productPicsElement.clientHeight;

      setFixedMedia(
        window.scrollY >= 97 ? (window.scrollY <= height - 500 ? 1 : 2) : 0,
      );
    };

    const observer = new ResizeObserver((entries) => {
      const height = productPicsElement.clientHeight;
      setFixedMedia(
        window.scrollY >= 97 ? (window.scrollY <= height - 500 ? 1 : 2) : 0,
      );
    });

    // Start observing the target element (productPicsElement)
    observer.observe(productPicsElement);

    // Clean up the observer when the component is unmounted

    // Add event listener for window resize

    window.addEventListener("scroll", handleScroll);
    // Clean up event listener on component unmount
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

  const sliderRef = useRef();
  const sliderRefMini = useRef();

  //useMemo
  const settings = {
    //Stavi direkt u funkciju
    speed: 400,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    Scroll: 1,
    variableWidth: true,
    centerMode: true,

    centerPadding: "0", // Set padding between centered items to 0
    swipe: mobileInterface,
    afterChange: (index) => {
      if (index == imageIndex) return;
      setImageIndex(index);
      if (index < imageIndex) sliderRefMini.current.slickGoTo(index);
      else sliderRefMini.current.slickGoTo(index - 1);
    },
  };

  const settings2 = {
    speed: 400,
    arrows: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: false,
    centerMode: false,
    centerPadding: "0", // Set padding between centered items to 0
  };

  const fullScreenChange = (index) => {
    setImageIndex(index);
    sliderRef.current.slickGoTo(index, true);
    if (sliderRefMini.current) sliderRefMini.current.slickGoTo(index - 1, true);
    setZoomed(false);
  };

  return (
    <>
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
          className={`${fixedMedia == 1 ? styles.productPicsFixed : ""} ${
            fixedMedia == 2 ? styles.productPicsBot : ""
          }`}
        >
          <Slider ref={sliderRef} {...settings} className={styles.slider}>
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
                      loading={index == 0 ? "eager" : "lazy"}
                    />
                    <img
                      className={styles.zoomImg}
                      src={"/images/zoomIconAw.png"}
                    />
                  </div>
                </div>
              );
            })}
          </Slider>

          <div className={styles.slider2Controller}>
            {" "}
            <Slider
              ref={sliderRefMini}
              {...settings2}
              className={styles.slider2}
            >
              {images.map((img, index) => {
                return (
                  <div key={index} className="carousel-item">
                    <div
                      onClick={() => {
                        sliderRef.current.slickGoTo(index);
                        setImageIndex(index);
                      }}
                      className={`${styles.productImage2Div} ${
                        imageIndex == index && styles.selectedImage
                      }`}
                    >
                      <Image
                        className={styles.productImage}
                        src={img.src}
                        alt={img.alt}
                        loading={index < 3 ? "eager" : "lazy"}
                        sizes="33vw"
                        height={0}
                        width={0}
                      />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
          <div className={styles.grid_container}>
            {images.map((img, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    sliderRef.current.slickGoTo(index, true);
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
