import Image from "next/image";
import DropCard from "./DropCard/DropCard";
import styles from "./productPageCards.module.css";
import ContactCard from "./ContactCard/ContactCard";

export default function ProductPageCards() {
 

  return (
    <>
      <DropCard dropCardId={'0'} title="Description">
        <div className={styles.descriptionDiv}>
          <p>
            Satisfy your cat’s natural instincts to scratch, perch, play, and
            catnap without sacrificing your home décor. The redesigned Jungle
            Gym Cat Tree 2.0 is an innovation in modern cat furniture, designed
            to accentuate and elevate your interior décor while providing your
            cat with a paradise of its very own.
          </p>

          <p>
            Tested by cats and their owners, our second iteration of this sleek,
            modern cat tree is better than ever with more scratching surfaces,
            lounging areas, and added platforms for easy accessibility - all
            with the same timeless elegance and high-quality wood construction.
          </p>

          <p>
            The Jungle Gym Cat Tree Condo 2.0 is ideal for multi-cat households,
            with five levels that are each designed for ultimate cat comfort and
            to help maintain their physical and mental health.
          </p>

          <p>
            Your cat can hide away and nap in the windowed cubby, scratch on any
            of the four carpeted platforms, 2 side sisal scratch pads, or
            two-tier sisal scratching post, snooze in the cat hammock or survey
            their kingdom from the top observation platform.
          </p>

          <p>
            Each perching surface is covered with removable, scratchable felt
            pads for easy cleaning. For cats that naturally seek height, the
            curved top platform promises to be a perfect lounging area – or the
            kitty hammock for cats that want a bit of breathability.
          </p>

          <p>
            The sturdy fabric of the hammock is designed to support the shifting
            positions of cats of all sizes while keeping them safe and cozy.
          </p>

          <p>
            So if you are looking for unique cat furniture with a modern twist,
            this affordable cat tree might be just up your alley. Because our
            Jungle Gym Cat Tree Condo is designed not only for your cat's
            comfort and entertainment but for yours as well.
          </p>
        </div>
      </DropCard>

      <DropCard dropCardId={'1'} title="Key features">
        <div className={styles.descriptionDiv}>
         
          <ul>
            <li>Measures approximately: 24" x 19.5" x 50"</li>
            <li>100% all-natural Ash Wood</li>
            <li>5 levels for ultimate kitty play</li>
            <li>Sleek, modern S-curve design</li>
            <li>Cozy Hammock and Basket Lounge</li>
            <li>2 Removable sisal scratcher side pads</li>
            <li>
              4 Removable felt platform covers to stimulate scratching and
              stress relief
            </li>
            <li>Hideaway cubby</li>
            <li>Plush faux fur cushion for hideaway cubby</li>
            <li>Top observation platform</li>
            <li>Made from non-toxic and pet-safe materials</li>
            <li>Assembly Required (View assembly instructions)</li>
          </ul>
        </div>
      </DropCard>
      <DropCard dropCardId={'2'} title="Shipping & Returns">
        <div className={styles.descriptionDiv}>
          <p>
            THIS PRODUCT SHIPS FREE TO CONTINENTAL USA. A SAVINGS OF OVER $75!
          </p>

          <p>
            Please Note: There is no restocking fee for this item. However,
            customers interested in a return for a refund must pay for the
            return shipping costs.
          </p>
        </div>
      </DropCard>
      <ContactCard/>

      <div className={styles.trustIcons}>
        <div className={styles.trustIcon}>
          <Image height={0} width={0} sizes="48px" loading={'lazy'} className={styles.trustIconImage} alt='Free shipping' src='/images/truckIcon8.svg' />
          <span>Free shipping</span>
        </div>
        <div className={styles.trustIcon}>
          <Image height={0} width={0} sizes="48px" loading={'lazy'} className={styles.trustIconImage} alt='Free return' src='/images/packageReturn4.png'/>
          <span>Free returns</span>
        </div>
        <div className={styles.trustIcon}>
          <Image height={0} width={0} sizes="48px" loading={'lazy'} className={styles.trustIconImage} alt='Guarantee' src='/images/guarantee4.png'/>
          <span>30 Days money back guarantee</span>
        </div>
      </div>
    </>
  );
}
