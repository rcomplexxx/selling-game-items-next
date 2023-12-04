import styles from "./fbt.module.css";
import Image from "next/image";
import Link from "next/link";
import products from "../../data/products.json";

const FreqProduct = ({ productId, onAddToCart }) => {
  const product = products.find((p) => {
    return p.id == productId;
  });

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
          className="object_fit_cover"
          sizes="128px"
         
        />
      </Link>
      <div className={styles.infoSpaceDiv}>
        <p className={styles.product_title}>{product.name}</p>
        <p className={styles.product_price}>${product.price}</p>
      </div>
      <button
        className={styles.add_to_cart_button}
        onClick={() => onAddToCart(product, 1)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default function FrequentlyBoughtTogether({ products, onAddToCart }) {
  return (
    <div className={styles.freqMain}>
      <h3 className={styles.h2Title}>Frequently bought together</h3>
      <div className={styles.freqBought}>
        {products ? (
          products.map((p, index) => (
            <FreqProduct key={index} productId={p} onAddToCart={onAddToCart} />
          ))
        ) : (
          <>
            <FreqProduct onAddToCart={onAddToCart} productId={4} />
            <FreqProduct onAddToCart={onAddToCart} productId={5} />
          </>
        )}
      </div>
    </div>
  );
}
