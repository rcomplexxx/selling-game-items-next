import { useRef, useState } from "react";
import styles from "./reviewimage.module.css";
import Image from "next/image";

export default function ReviewsCard({
  productId,
  imageIndex,
  imageName,
  deleted,
  setImages,
  changed
}) {
 
  return (
    <div className={styles.imgController}>
    <Image
      src={`/images/review_images/productId_${productId}/${imageName}`}
      height={0} width={0}
      sizes="100vw"
      className={`${styles.reviewImage} ${deleted && styles.deletedImage} ${changed && styles.imageChanged}`}
      onClick={() => {
        if(changed)return
        setImages((prev) => {
          let newImages = [...prev];

          newImages = newImages.map((img, index) => {
            if (index == imageIndex) {
              return { imageName: img.imageName, deleted: !img.deleted };
            }
            return img;
          });
          return newImages;
        });
      }}
    />
    </div>
  );
}
