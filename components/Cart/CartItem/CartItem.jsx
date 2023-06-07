import React, {useContext} from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@mui/material';

import styles from './cartitem.module.css'

import classNames from 'classnames';

import AppContext from '@/contexts/AppContext';

const CartItem = ({ item}) => {



  const { cartProducts, setCartProducts } = useContext(AppContext);



          const handleUpdateCartQty = async (quantity) => {
       
        
            return setCartProducts(
              cartProducts.filter((cp) =>{
               if(cp.id === item.id){
                cp.quantity=cp.quantity+quantity;
                return cp.quantity !== 0
               }
              
              return true;
              }
              )
            );

       
      };
    
      const handleRemoveFromCart = async (lineItemId) => {
        const newCartProducts = cartProducts.filter((cp) => cp.id != lineItemId);
        console.log(lineItemId);
        console.log(newCartProducts);
        setCartProducts(newCartProducts);
      };

   







  

      return (
        <div style={{ color: 'white', backgroundColor: 'yellow' }}>
          <div className={styles.media}>
            <img src={`/images/${item.image}`} alt={item.name} className={classNames(styles.mediaImage)} />
          </div>
          <div className={classNames(styles.cardContent)}>
            <h4 style={{ margin: 0 }}>{item.name}</h4>
            <h5 style={{ margin: 0 }}>${item.price}</h5>
          </div>
          <div className={classNames(styles.cardActions)}>
            <div className={styles.buttons}>
              <button type="button" style={{ color: 'white', backgroundColor: 'black' }} className={styles.button} onClick={() => handleUpdateCartQty(-1)}>-</button>
              <p style={{ margin: '0 8px' }}>{item.quantity}</p>
              <button type="button" style={{ color: 'white', backgroundColor: 'black' }} className={styles.button} onClick={() => handleUpdateCartQty(1)}>+</button>
            </div>
            <button type="button" style={{ color: 'white', backgroundColor: 'black' }} className={styles.removeButton} onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </div>
        </div>
      );
}

export default CartItem;
