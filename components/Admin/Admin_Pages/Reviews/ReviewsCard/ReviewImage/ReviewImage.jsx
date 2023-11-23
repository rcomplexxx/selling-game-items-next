import { useRef, useState } from "react";
import styles from "./reviewimage.module.css";

export default function ReviewsCard({
  imageIndex,
  imageName,
  deleted,
  setImages,
}) {
  console.log(deleted);

  return (
    <img
      src={`/images/review_images/${imageName}`}
      className={`${styles.reviewImage} ${
        deleted ? styles.deletedImage : styles.unDeletedImage
      }`}
      onClick={() => {
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
  );
}
