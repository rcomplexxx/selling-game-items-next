import React, { useContext } from "react";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import Image from "next/image";
import styles from "./cartitem.module.css";

import classNames from "classnames";

import AppContext from "@/contexts/AppContext";

const CartItem = ({ item }) => {
  const { cartProducts, setCartProducts } = useContext(AppContext);

  const handleUpdateCartQty = async (quantity) => {
    setCartProducts(
      cartProducts.map((cp) => {
        if (cp.id === item.id) {
          cp.quantity += quantity;
          return cp.quantity !== 0 ? cp : null;
        }
        return cp;
      }).filter(Boolean)
    );
  };

  const handleRemoveFromCart = async (lineItemId) => {
    const newCartProducts = cartProducts.filter((cp) => cp.id != lineItemId);
    console.log(lineItemId);
    console.log(newCartProducts);
    setCartProducts(newCartProducts);
  };

  return (
    <Card style={{ color: "white", backgroundColor: "black" }}>
      <div className={classNames(styles.media)}>
        <Image
          src={`/images/${item.image}`}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <CardContent className={classNames(styles.cardContent)}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="h5">${item.price}</Typography>
      </CardContent>
      <CardActions className={classNames(styles.cardActions)}>
        <div className={styles.buttons}>
          <Button
            type="button"
            size="small"
            style={{ color: "white" }}
            onClick={() => handleUpdateCartQty(-1)}
          >
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button
            type="button"
            size="small"
            style={{ color: "white" }}
            onClick={() => handleUpdateCartQty(1)}
          >
            +
          </Button>
        </div>
        <Button
          variant="contained"
          type="button"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default CartItem;
