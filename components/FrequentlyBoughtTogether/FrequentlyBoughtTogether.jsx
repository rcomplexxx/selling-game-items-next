import styles from "./fbt.module.css";
import Image from "next/image";
import Link from "next/link";
import products from "../../data/products.json";

const FreqProduct = ({ productId, variantIndex, onAddToCart }) => {
  const product = products.find((p) => {
    return p.id == productId;
  });

  console.log('variant index', variantIndex)

  const variantName= product.variants && (variantIndex<0 || variantIndex>product.variants?.length-1)?product.variants[0].name:product.variants[variantIndex].name;

  return (
    <div className={styles.product_style_div}>
      <Link
        href={`/products/${product.id}`}
        className={styles.product_style_span}
      >
        <Image
        height={0} width={0}
          src={`/images/${product.images[0]}`}
          alt="Black"
          className={styles.productImage}
          sizes="128px"
         
        />
      </Link>
      <div className={styles.infoSpaceDiv}>
        <p className={styles.product_title}>{product.name}</p>
        <p className={styles.product_price}>${product.price}</p>
      </div>
      <button
        className={styles.add_to_cart_button}
        onClick={() => onAddToCart(1,product, variantName)}
        onMouseDown={(event)=>{event.preventDefault()}}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default function FrequentlyBoughtTogether({ fbtProductInfo, onAddToCart }) {
  return (
    <div className={styles.freqMain}>
      <h3 className={styles.h2Title}>Frequently bought together</h3>
      <div className={styles.freqBought}>
        {fbtProductInfo ? (
          fbtProductInfo.map((p, index) => (
            <FreqProduct key={index} productId={p.id} variantIndex={p.variantIndex} onAddToCart={onAddToCart} />
          ))
        ) : (
          <>
            <FreqProduct onAddToCart={onAddToCart} productId={4} variantIndex={0} />
            <FreqProduct onAddToCart={onAddToCart} productId={5} variantIndex={0}/>
          </>
        )}
      </div>
    </div>
  );
}
