import React from "react";
import { IconButton, CardActions, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";
import Image from "next/image";
import classNames from "classnames";
import Link from "next/link";

import styles from "./product.module.css";

const Product = ({ product, onAddToCart }) => {
 

  const router = useRouter();

  return (
    <div className={styles.root}>
      <Link href={"products/" + product.id}>
        <div className={styles.media}>
          <Image
            src={`/images/` + product.image} // Path to your image from the `public` directory
            alt="Example Image"
            className="object_fit_cover"
            fill
          />
        </div>
      </Link>
      <div className={styles.cardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {product.name}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            ${product.price}
          </Typography>
       
      </div>
      <CardActions disableSpacing className={styles.cardActions}>
        <IconButton
          className={classNames(styles.cartStyle)}
          aria-label="Add to Cart"
          onClick={() => onAddToCart(product, 1)}
        >
          <AddShoppingCart style={{ color: "white" }} />
        </IconButton>
      </CardActions>
    </div>
  );
};

export default Product;
