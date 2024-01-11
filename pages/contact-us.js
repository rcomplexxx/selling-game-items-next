import PolicyCard from "@/components/Cards/PolicyCard/PolicyCard";
import React, { useRef } from "react";
import Head from "next/head";
import styles from '../styles/contactus.module.css'

export default function ContactUs() {

  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = async () => {
    console.log("submite Starter.");

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
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
      } else {
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };


  return (
<>
<Head>
        <title>Contact - Gamesmoke shop</title>
      </Head>

    <div className={styles.mainDiv}>
        <h1>Contact Us</h1>
          <div className={styles.contactInfoDiv}>
            <div className={styles.infoDiv}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input
                  id="name"
                  className={styles.contactInput}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Email</label>
                <input
                  id="email"
                  className={styles.contactInput}
                />
              </div>
            </div>
          </div>
          <div className={styles.messageField}>
            <label>Message</label>
            <textarea
             maxLength={500}
              className={styles.messageTextArea}
              rows={6}
            />
          </div>
          <button  className={styles.sendButton}>
            Send
          </button>
        </div>
        </>
  );
}
