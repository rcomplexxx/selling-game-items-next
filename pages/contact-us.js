import PolicyCard from "@/components/Cards/PolicyCard/PolicyCard";
import React, { useRef, useState } from "react";
import Head from "next/head";
import styles from '../styles/contactus.module.css'
import Link from "next/link";

export default function ContactUs() {

  const [messageLoading, setMessageLoading]= useState(false);
  const [messageSent, setMessageSent] = useState(false);
  
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();
  

  const handleSubmit = async () => {
    console.log("submite Starter.");
    setMessageLoading(true);
    try {
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const message = messageRef.current.value;

      const emailPattern = /^\w+@\w+\.\w+$/;
      if (!emailPattern.test(email)) return;

      if (message.match(/ /g) < 2 || message.length < 10) return;

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
        console.log("Message sent successfully.");
        // Reset form fields if needed
        setMessageSent(true)
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally{setMessageLoading(false);}
  };


  return (
<>
<Head>
        <title>Contact - Gamesmoke shop</title>
      </Head>

    <div className={styles.mainDiv}>
        <h1>Contact Us</h1>
        <div className={styles.contactUsTextDiv}>

        <span className={styles.contactUsText}>Before contacting us, please check if your question/concern has been answered on our <Link href={'/faq'}>FAQ PAGE</Link>.</span>
        <span className={styles.contactUsText}>If your question/concern can't be found on our FAQ page, kindly provide us your <b>order id number</b>, from the email sent after purchase. If you can't find it, please provide us with <b>full name/address</b> you used when placing the order.</span>
        <span className={styles.contactUsText}>Note - Normal response time is 1 - 2 days. Please be patient, we answer all questions as quickly as possible.</span>
        


        </div>  
          <div className={styles.contactInfoDiv}>
            <div className={styles.infoDiv}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input
                  id="name"
                  placeholder="Write your name here"
                  ref={nameRef}
                  className={styles.contactInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                placeholder="Write your email here"
                id="email"
                ref={emailRef}
                className={styles.contactInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.messageField}>
            <label>Message</label>
            <textarea
            placeholder="Write your message here"
              ref={messageRef}
              onChange={()=>{setMessageSent(false);}}
              className={styles.messageTextArea}
              rows={6}
              maxLength={500}
            />
           {messageSent && <span className={styles.messageSuccess}>Message sent successfully.</span>}
          </div>
          <button disabled={messageLoading} onClick={handleSubmit} className={`${styles.sendButton} ${messageLoading && styles.sendButtonDisabled}`}>
            Send
          </button>
        </div>
        </>
  );
}
