import styles from './fbt.module.css'
import Image from 'next/image'
import Link from "next/link";
import products from '../../data/products.json'

export default function FrequentlyBoughtTogether({onAddToCart}){






  const FreqProduct = ({productId})=>{

    console.log(products);

    const product = products.find((p) => {
      return p.id == productId;
    });
  


    return <div className={styles.product_style_div}>
    <Link  href='/products/3' className={styles.product_style_span} >
        <Image
          src={`/images/${product.image}`}
          alt="Black"
          className="object_fit_cover"
          fill
        />
        
      </Link>
      <div className={styles.infoSpaceDiv}>
      <p className={styles.product_title}>{product.name}</p>
      <p className={styles.product_price}>{product.price} RSD</p>
      </div>
       <button
            className={styles.add_to_cart_button}
            onClick={() => onAddToCart(product,1)}
          >
            Add to Cart
          </button>
      </div>
  }

    
  

  return <div className={styles.freqMain}><h3 className={styles.h2Title}>Frequently bought together</h3>
  <div className={styles.freqBought}>
  <FreqProduct productId={4} />
  <FreqProduct productId={5} />
     

   
    </div>
    </div>

}