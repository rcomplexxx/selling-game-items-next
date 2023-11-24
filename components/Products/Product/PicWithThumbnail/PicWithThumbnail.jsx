import Image from "next/image";
import styles from "./picwiththumbnail.module.css";
import { useEffect, useState } from "react";

export default function PicWithThumbnail({ product }) {
  const [images, setImages] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [animationsAllowed, setAnimationsAllowed] = useState(false);
  

  useEffect(() => {
    if (product.images.length > 1 && window.innerWidth > 980) {
      const thumbIndexes = product.thumbnails ? product.thumbnails : [0, 1];
      const myImages = [];
      if (product.images.length > thumbIndexes[0])
        myImages.push(product.images[thumbIndexes[0]]);
      else myImages.push(product.images[0]);

      if (product.images.length > thumbIndexes[1])
        myImages.push(product.images[thumbIndexes[1]]);
      else if(product.images[1])myImages.push(product.images[1]);
      else myImages.push(product.images[0]);

      setImages(myImages);
    } else {
      setImages(product.images);
    }

    const handleResize = () => {
      if (window.innerWidth < 980) {
        setAnimationsAllowed(false);
      }
      if (window.innerWidth > 980) {
        setAnimationsAllowed(true);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Image
        height={0}
        width={0}
        src={`/images/` + images[0]} // Path to your image from the `public` directory
        alt="Example Image"
        className={`${styles.productImage} ${styles.productImage1} ${
          images.length > 1
            ? (isHovered
              ? styles.invisibleImage
              : styles.fadeIn)
            : isHovered
            ? styles.zoomIn
            : styles.zoomOut
        }`}
        sizes="(max-width: 480px) 90vw,(max-width: 600px) 80vw, (max-width: 900px) 45vw, 25vw"
        loading="eager"
        onMouseOver={() => {
          if (window.innerWidth > 980) {
            setIsHovered(true);
          }
        }}
        onMouseOut={() => {
          if (window.innerWidth > 980) setIsHovered(false);
        }}
      />
      {images.length > 1 && animationsAllowed && (
        <Image
          height={0}
          width={0}
          src={`/images/` + images[1]} // Path to your image from the `public` directory
          alt="Thumbnail"
          className={`${styles.productImage} ${styles.invisibleImage} ${
            isHovered ? styles.zoomIn : styles.invisibleImage
          }`}
          sizes="(max-width: 480px) 90vw,(max-width: 600px) 80vw, (max-width: 900px) 45vw, 25vw"
        />
      )}
      {product.stickerPrice && <div className={styles.sale}>Sale</div>}
    </>
  );
}
