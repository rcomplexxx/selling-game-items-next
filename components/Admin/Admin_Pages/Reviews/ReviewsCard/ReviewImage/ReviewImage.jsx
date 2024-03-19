import { useRef, useState } from "react";
import styles from "./reviewimage.module.css";
import Image from "next/image";

export default function ReviewsCard({
  imageIndex,
  imageName,
  deleted,
  setImages,
  changed
}) {
  console.log(deleted);

  return (
    <div className={styles.imgController}>
    <Image
      src={`/images/review_images/${imageName}`}
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
