
import React from 'react'
import products from '../../data/products.json'
import Image from 'next/image';
import AppContext from "@/contexts/AppContext";

    import { useRouter } from 'next/router';
    

    import { useState,useContext } from 'react';
    import { RatingStar } from 'rating-star';
    import styles from '../../styles/productpage.module.css'
   
    
   
   
    
    
     function ProductInfoBuy({product}){


    
    
        const images = [
            '/images/'+product.image,
            '/images/keyboard.png',
            '/images/boxItem.png',
            '/images/keyboard.png',
            '/images/boxItem.png',
            '/images/keyboard.png',
          ];
    
    
          const prevImage = () => {
            const currentIndex = images.indexOf(selectedImage);
            if (currentIndex > 0) {
              setSelectedImage(images[currentIndex - 1]);
            }
          };
        
          const nextImage = () => {
            const currentIndex = images.indexOf(selectedImage);
        if (currentIndex < images.length - 1) {
          setSelectedImage(images[currentIndex + 1]);
        }
          };
    
        
        const [selectedImage, setSelectedImage] = useState(images[0]);
    
     
    
      const selectImage = (image) => {
        setSelectedImage(image);
      };
      console.log(selectedImage)
    
        return    <div className={styles.gallery}>
        <div className={styles.main_image}>
        <div className={styles.media}>
      <Image 
        src={selectedImage} // Path to your image from the `public` directory
        alt="Example Image"
      
        style={{objectFit:'cover'}}
        fill
      />
      </div>
          <button className={styles.arrow + ' ' + styles.left} onClick={prevImage}>
              &lt;
            </button>
            <button className={styles.arrow + ' ' +styles.right} onClick={nextImage}>
              &gt;
            </button>
        </div>
        <div className={styles.thumbnail_images}>
          {images.map((image, index) => (
           <button
           key={index}
           onClick={() => selectImage(image)}
           className={`${styles.thumbnail_image_button} ${
             selectedImage === image ? styles.selected : ''
           }`}
         >
           <Image src={image} alt={`Thumbnail ${index}`} width={80} height={45} style={{margin:"auto"}} />
         </button>

            
          ))}
        </div>
      </div>
    }




    


export default function ProductPage({product}){

        
  if(!product) return <p style={{marginTop:"100px"}}>Product not found.</p>
    
    
    
        const [selectedStyle, setSelectedStyle] = useState('Black Kitten');
      
        const handleStyleChange = (style) => {
          setSelectedStyle(style);
        };
    



        const { cartProducts, setCartProducts } = useContext(AppContext);

        const onAddToCart = (quantity = 1) => {
          let foundProduct = false;
          let newCartProducts = cartProducts.map((cp) => {
            if (cp.id === product.id) {
              cp.quantity = cp.quantity + 1;
              foundProduct = true;
            }
            return cp;
          });
          if (!foundProduct) {
            newCartProducts = [
              ...newCartProducts,
              {
                id: product.id,
                quantity: quantity,
                name: product.name,
                image: product.image,
                price: product.price,
              },
            ];
          }
      
          console.log(newCartProducts);
          setCartProducts(newCartProducts);
        };

    
       
    
    
        return  <>
            
            <div className={styles.productPageDiv}> 
            <div>
               <ProductInfoBuy product={product}/>
               
                </div>
    
    
    
                <div style={{marginLeft:"10px", display:"flex", flexDirection:"column", alignItems:"center"}}>
          <h1 className={styles.product_title}>{product.name}</h1>
          <div className={styles.product_rating}>  <RatingStar
    
            maxScore={50}
            id="123"
            rating={46}
          />(14)</div>
          <p className={styles.product_price}>1,160.14 RSD</p>
          <p className={styles.product_style_label}>Style - {selectedStyle}</p>
          <div className={styles.product_style_options}>
         
            <button className={styles.product_style_button} onClick={() => handleStyleChange('Black Kitten')}>
            <Image 
       src={'/images/' + product.image} alt="Black Kitten" className={styles.product_style_image}
        
      
        style={{objectFit:'cover'}}
        fill
      />
            
            </button>
            <button className={styles.product_style_button} onClick={() => handleStyleChange('Gray Kitten')}>
           
              <Image 
       src={'/images/' + product.image} alt="Gray Kitten" className={styles.product_style_image}
        
      
        style={{objectFit:'cover'}}
        fill
      />
            </button>
            <button className={styles.product_style_button} onClick={() => handleStyleChange('White Kitten')}>
              <Image 
       src={'/images/' + product.image} alt="White Kitten" className={styles.product_style_image}
        
      
        style={{objectFit:'cover'}}
        fill
      />
            </button>
          </div>
          <button className={styles.add_to_cart_button} onClick={() => onAddToCart(1)}>Add to Cart</button>
        </div>
    
    
    
    
    
    
            </div>
            </>
       
    }



















    
    export async function getStaticPaths() {
      const productPagesArray = [];
    
      products.forEach((product) => {
        const path = { params: { productId: product.id.toString() } };
        const props = { product };
        productPagesArray.push({ path, props });
      });
    
      return { paths: productPagesArray, fallback: false };
    }
    

    export async function getStaticProps(context) {

      const productId=context.params.productId;
      const product= products.find(p=>{return p.id==productId})
 

        // Return the data as props
        return {
          props: {
            product
          },
        };
      }
      


