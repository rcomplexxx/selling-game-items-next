import React, { useContext } from "react";
import Link from "next/link";
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
    <div className={styles.mainItemDiv}>
<Link href={`/products/${item.id}`}>
<div className={styles.media}>
        <Image
          src={`/images/${item.image}`}
          alt={item.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      </Link>

      <div className={styles.mainItemInfo}>
    

     <Link className={styles.link} href={`/products/${item.id}`}>
        <h4 className={styles.productName}>{item.name}</h4>
        </Link>
      
        
     
      
      
      <div className={classNames(styles.cardActions)}>
        <div className={styles.buttons}>
        <button
           className={styles.quantityButton}
            onClick={() => handleUpdateCartQty(-1)}
          >
            -
          </button>
          <h2>{item.quantity}</h2>
          <button
           className={styles.quantityButton}
            onClick={() => handleUpdateCartQty(1)}
          >
            +
          </button>
        </div>
        <button
          className={styles.removeButton}
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
        </button>
      </div>
      
      <h2 className={styles.itemPrice}>${item.price}</h2>
       </div>
    
    </div>
  );
};

export default CartItem;
