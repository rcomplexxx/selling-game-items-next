import React, { useRef, useState } from 'react'
import GetDataButton from '../MagicButtons/GetDataButton'
import Link from 'next/link';
import EmailCard from './EmailCard/EmailCard';

export default function Emails({emailData, setEmailData}) {
 

  console.log('my email data', emailData);

    const getEmailData=async()=>{

        try {
            const response = await fetch("/api/admincheck", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(
               { dataType:'get_emails' } 
              ),
            });
      
            if (response.ok) {
              const data = await response.json();
              console.log("Maine DATA!", data);
              //Ovde takodje zatraziti emails campaign kasnije .
              //na slican princip kao sto sam trazio emails.
              setEmailData(data.data);
              console.log('Email data', data);
             
             
            } else {
              throw new Error("Network response was not ok.");
            }
          } catch (error) {
            console.error(
              "There has been a problem with your fetch operation:",
              error
            );
          }

    }

    console.log('em data' , emailData);

  return (
    <div>
      <h1>Emails</h1>

      <button onClick={getEmailData}>Get email data</button>
      <Link href='/admin/emails/new-email'>New email.</Link>
      <Link href='/admin/emails/campaigns'>Campaigns</Link>
      <Link href='/admin/emails/new-campaign'>New campaign.</Link>
      {emailData?.emails.map(email=>{
       return <EmailCard title={email.title} text={email.text}/>
      })}
    </div>
  )
}
