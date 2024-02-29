import React from 'react'
import { useRef, useState } from "react";
import DropCard from '../DropCard/DropCard';
import styles from "./contactcard.module.css";

export default function ContactCard() {






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
    











  return (  <DropCard dropCardId={'3'} title="Ask a question"  contactCard={true}>
    


      
        

    <div className={styles.mainDiv}>
        {/* <p className={styles.getInTouch}>
         
         For any question or enquiry, feel free to contact our helpful Customer Service team.
          </p> */}

          <p className={styles.getInTouch}><b>Please note</b>, normal response time is 1 - 2 days. Please be patient, we answer all questions as quickly as possible.</p>
          <div className={styles.contactInfoDiv}>
            
            <div className={styles.infoDiv}>
              <div className={styles.inputGroup}>
                <label>Name</label>
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
                <label>Email</label>
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
          </div>
          <div className={styles.messageField}>
            <label>Question</label>
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
  )
}
