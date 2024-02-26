import React, { useMemo } from 'react'
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
  
     <div className={styles.mainDiv}>
      <h1>Campaigns</h1>
      {campaignData?.map(campaign=>{
        return <CampaignCard id={campaign.id} title={campaign.title} emails={campaign.emails} campaignType={campaign.campaignType}/>
      })
    

}
    </div>
  )
}


function CampaignCard({id, title, emails,campaignType}){


    let fullEmails=useMemo(()=>{

      if(!emails)return [];
      return JSON.parse(emails);
     
    
    },[emails])
   
    
 

  return <div className={styles.campaignDiv}>
     

    <div className={styles.idDiv}> 
    <div className={styles.campaignType}>{campaignType}</div>

    <div className={styles.currentId}>
   
   <span>campaign id: </span>
   {id}
 </div></div>


  <input value={title} className={styles.campaignInput} placeholder='Campaign title'/>
  {/* {campaign.emails.map(email=>{return })} */}
<div className={`${styles.campaignEmailsDiv}`} placeholder='Included emails'>
<span>{`Email IDs${campaignType=='campaign' ?' (and send dates)':''}:`}</span>
  {
        fullEmails?.map((email, index)=>{

          const date = new Date(email.sendDate);
        
  const formattedDate = `${date.getDate()}.${(date.getMonth() + 1)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
          if(campaignType=='campaign')
          return <span>{`${email.id} | ${formattedDate }`}</span>
          return <span>{`${email.id}`}</span>
        })
  }
  </div>
</div>

}
