const cron = require('node-cron');
const betterSqlite3 = require('better-sqlite3');






 function emailSendJob( dateInUnix, campaignId, emailId) {


//
   



    console.log('setting email cron scheduler', new Date(dateInUnix* 1000), dateInUnix)


const date =formatDateToCron(new Date(dateInUnix));
console.log('setting email cron scheduler', date)

cron.schedule(date, () => {
  console.log('Send email here');

    //inicijalizuji kampanju, i email kampanje(sa svim atributima).
    //proveri da li kampanja poseduje taj mejl, ako ne, neka greska je u pitanju i return
    //posalji email
    //Updatovati u db tu kampanju, sa razlikom da je email verdnost sent=true;
        // Ako je to bio zadnji mejlo u kampanju, staviti da je kampanja completed(ubaciti completed vrednost i 
        // prilikom kreiranja tabele campaign)
    //Ako nije zadnji mejl, pozvati funkciju emailSendJob( dateInUnix, campaignId, emailId)(da, istu ovu f-ju)
    //sa vrednostima sledeceg emaila(email sendDate), iste ove campaign, i sledeceg emailId

    try{

        const db = betterSqlite3(process.env.DB_PATH);
    const campaign= db.prepare(`SELECT * FROM emailCampaigns WHERE id = ?`, campaignId).get(campaignId);
    console.log('c',campaign);
      const campaignEmails=JSON.parse(campaign.emails);
      console.log('campaignEmails', campaignEmails)

    

        const email = db.prepare(`SELECT * FROM emails WHERE id = ?`).get(emailId);

      

        const currentEmailIndex=campaignEmails.findIndex(email=>{return email.id==emailId});
    
        if(currentEmailIndex!=-1 && currentEmailIndex<campaignEmails.length-1)
            {
                emailSendJob( campaignEmails[currentEmailIndex+1].sendDate, campaignId, campaignEmails[currentEmailIndex+1].id)
            }
        console.log('Email to send', email.title);


        db.prepare(`UPDATE emailCampaigns SET emails = ? WHERE id = ?`).run(
            JSON.stringify(campaignEmails.map(email=>{if(email.id==emailId)return {...email, sent:true};
            return email;
            })),
            campaign.id,
          );


            db.close();
        
    }
    catch(error){
        console.log('cron error', error)
    }
 
       


  console.log('Initialize new job scheduler if condition is met by calling emailSendJob again, and it is not'
  ,'considered a recursion as the task ends once the cron is set');
  //doSomethingWithEmail(email); Allowed because cron captures the variables used inside of it




});

 }



 function formatDateToCron(date) {
    console.log('date is', date)
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // Note: Months are zero-indexed in JavaScript
    const dayOfWeek = date.getDay();

    return `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
}



 module.exports = emailSendJob;