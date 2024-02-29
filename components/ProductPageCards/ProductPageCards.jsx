import Image from "next/image";
import DropCard from "./DropCard/DropCard";
import styles from "./productPageCards.module.css";
import { useRef, useState } from "react";
import Link from "next/link";

export default function ProductPageCards() {
  const [messageLoading, setMessageLoading]= useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [contactErrors, setContactErrors] = useState({name:false, email: false, message:false});
  
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  
  const handleSubmit = async () => {
    if(messageSent)return;
    console.log("submite Starter.");
    setMessageLoading(true);
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const message = messageRef.current.value;

      let nameError=false;
      let emailError=false;
      let messageError=false;

      const emailPattern = /^\w+@\w+\.\w+$/;
      if (!emailPattern.test(email)) {
        if(email.length==0)emailError='This field is required.'
        else emailError='Please enter a valid email.'
      
        }

        if(name.length==0){
          nameError='This field is required.'
        }

      if (message.match(/ /g) < 2) {
       if(message.length==0) messageError='This field is required.'
        else if (message.match(/ /g) < 2) messageError='Please enter at least three words.'
      }

      if(nameError || emailError || messageError){
        setContactErrors({name:nameError, email: emailError, message: messageError});
        return;
      }

      const response = await fetch("/api/sqlliteapi", {
        method: "POST",
        body: JSON.stringify({
          type: "messages",
          message: { name, email, message },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("Question sent successfully.");
        // Reset form fields if needed
        setMessageSent(true)
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        console.error("Error sending question:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending question:", error);
    } finally{setMessageLoading(false);}
  };

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
      <DropCard dropCardId={'3'} title="Ask a question"  contactCard={true}>
    


      
      <div className={styles.mainContactDiv}>
        
        

        <p className={styles.getInTouch}><b>Please note</b>, normal response time is 1 - 2 days. Please be patient, we answer all questions as quickly as possible.</p>
        <div className={styles.contactInfoDiv}>
          
          
            <div className={styles.inputGroup}>
              <label className={styles.contactLabel}>Name</label>
              <input
                id="name"
                placeholder="Write your name here"
                ref={nameRef}
                className={styles.contactInput}
                onChange={()=>{ setContactErrors({...contactErrors, name: false})}}
              />
              {contactErrors.name && <span className={styles.contactError}>{contactErrors.name}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.contactLabel}>Email</label>
              <input
              placeholder="Write your email here"
                id="email"
                ref={emailRef}
                className={styles.contactInput}
                onChange={()=>{ setContactErrors({...contactErrors, email: false})}}
              />
              
              {contactErrors.email && <span className={styles.contactError}>{contactErrors.email}</span>}
            </div>
        
        </div>
        <div className={styles.messageField}>
          <label className={styles.messageLabel}>Question</label>
          <textarea
          placeholder="Write your question here"
            ref={messageRef}
            onChange={()=>{setMessageSent(false);
             setContactErrors({...contactErrors, message: false})
            }}
            className={styles.messageTextArea}
            rows={6}
            maxLength={500}
          />
           {contactErrors.message && <span className={`${styles.contactError} ${styles.contactMessageError}`}>{contactErrors.message}</span>}
          
          {messageSent && <span className={styles.messageSuccess}>Question sent successfully.</span>}
        </div>
        <button onClick={handleSubmit} className={`${styles.sendButton} ${(messageLoading || messageSent) && styles.sendButtonDisabled}`}>
          Send
        </button>
      </div>
      
      </DropCard>

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
