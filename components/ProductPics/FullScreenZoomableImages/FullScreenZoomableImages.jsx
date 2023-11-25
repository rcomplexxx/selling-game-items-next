import React, { useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./fullscreenzoomableimage.module.css";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useRouter } from "next/router";

const FullScreenZoomableImage = ({ imageIndex, fullScreenChange, images }) => {
  const router = useRouter();
  const aliceSuiter = useRef();

 
  

  return (<>

    <div className={styles.full_screen_container}>


      
    
      <div className={styles.spaceController}>

      <div className={styles.closeSuiter}>
    <button
        onClick={() => {
          fullScreenChange(aliceSuiter.current.state.activeIndex);
        }}
        className={styles.close_button}
      >
        X
      </button>
      </div>



        <div className={styles.aliceSuiter}>
          <AliceCarousel
            ref={aliceSuiter}
            className={styles.alice}
            mouseTracking
            disableButtonsControls={true}
            activeIndex={imageIndex}
            items={images.map((img, index) => {
              return (
                <div key={index} className="carousel-item">
                  <div className={styles.productImageDiv}>
                    <img
                      src={img.src}
                      alt="Zoomable"
                      className={styles.productImage}
                      draggable={false}
                    />
                  </div>
                </div>
              );
            })}
          ></AliceCarousel>
          
        </div>
      </div>
    </div>
    </>
  );
};

export default FullScreenZoomableImage;
