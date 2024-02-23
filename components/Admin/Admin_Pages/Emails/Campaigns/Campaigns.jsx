import React from 'react'
import styles from './campaigns.module.css'

export default function Campaigns({campaignData}) {

    console.log(campaignData);

    // const getEmailData=async()=>{

    //     try {
    //         const response = await fetch("/api/admincheck", {
    //           method: "POST",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           body: JSON.stringify(
    //            { dataType:'get_email_campaigns' } 
    //           ),
    //         });
      
    //         if (response.ok) {
    //           const data = await response.json();
    //           console.log("Maine DATA!", data);
    //           //Ovde takodje zatraziti emails campaign kasnije .
    //           //na slican princip kao sto sam trazio emails.
    //           setCampaignData(data.data);
    //           console.log('Email data', data);
             
             
    //         } else {
    //           throw new Error("Network response was not ok.");
    //         }
    //       } catch (error) {
    //         console.error(
    //           "There has been a problem with your fetch operation:",
    //           error
    //         );
    //       }

    // }






  return (
  
     <div>
      <h1>Campaigns</h1>
      {campaignData?.map(campaign=>{
        return <>
          <input value={campaign.title} className={styles.campaignInput} placeholder='Campaign title'/>
          {/* {campaign.emails.map(email=>{return })} */}
      <input value={campaign.emails} className={styles.campaignInput} placeholder='Included emails'/>
        </>
      })
    

}
    </div>
  )
}
