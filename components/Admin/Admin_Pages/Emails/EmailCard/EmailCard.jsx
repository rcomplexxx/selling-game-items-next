import React, { useEffect, useRef, useState } from 'react'

import ReactHtmlParser from "react-html-parser";

import styles from './emailcard.module.css'
import { useRouter } from 'next/router';


export default function EmailCard({id,title, text, handleSaveEmail}) {

    const [emailTitle, setEmailTitle] = useState()
    const [emailText, setEmailText] = useState()
    const [previewEmailContent, setPreviewEmailContent]= useState();

    useEffect(()=>{
      setEmailTitle(title);
      setEmailText(text)
    },[])



    const handlePreviewEmail = ()=>{
        try {
            // Attempt to parse the HTML
            const parsedHtml = ReactHtmlParser(text);
        
            if (Array.isArray(parsedHtml) && parsedHtml.every(React.isValidElement)) {
                setPreviewEmailContent(parsedHtml);
              } else {
                // Handle the case where parsing did not result in valid React elements
                setPreviewEmailContent(<div>An error occurred while parsing the HTML.</div>);
              }
          } catch (error) {
            // Handle the error (e.g., log it, display an error message, etc.)
            console.error('Error parsing HTML:', error);
        
            // Perform a specific action when there is an error in HTML text
            setPreviewEmailContent(<div>An error occurred while parsing the HTML.</div>);
          }
    }


   


    // const handleSaveEmail = async()=>{
    //   let newEmailData = {title:titleRef.current.value, text:emailTextRef.current.value };

    
     
    //     await fetch("/api/admincheck", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ dataType: 'send_new_email', data: newEmailData }),
    //     })
    //       .then((response) => {
    //         if (response.ok) {
    //           console.log(response);
    //           router.push('/admin/emails');
    //         }
    //       })
  
    //       .catch((error) => {console.log(error)});
    // }

    


  return (
  <>
      <div className={styles.emailContentDiv}>
     



<div className={styles.idDiv}> 
  
   <span className={styles.currentIdText}>email id:</span>
   <span className={styles.currentId}>{id}</span>
 </div>


        <input value={emailTitle} 
        onChange={(event)=>{setEmailTitle(event.target.value)}}
        className={styles.titleInput} placeholder='Email title...'/>

        <textarea
        value={emailText}
        onChange={(event)=>{setEmailText(event.target.value)}}
        tabIndex={0}
        contentEditable={true}
        suppressContentEditableWarning={true}
        className={styles.textArea}
        
        placeholder='Email html content...'
        onFocus={(event) => {
          event.target.style.height = event.target.scrollHeight + "px";
        }}
        />
        <button className={styles.previewButton} onClick={handlePreviewEmail}>Preview Email</button>
        <button onClick={()=>{handleSaveEmail(id, emailTitle, emailText)}} className={`${styles.previewButton} ${styles.saveButton}`}>Save Email</button> 
     
        { previewEmailContent && <><div className={styles.previewContent}>
        {previewEmailContent}
      </div> 
      </>} 
      </div>

    
     
      </>
  )
}
