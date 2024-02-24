const next = require('next');
const express = require('express');
const dbCleaner = require('./utils/dbCleaner.jsx');
const sendEmailJob = require('./utils/sendEmailJob.jsx');
const betterSqlite3 = require ("better-sqlite3");



const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

function startEmailJobs(){

  try{
  const db = betterSqlite3(process.env.DB_PATH);

const campaigns= db.prepare(`SELECT * FROM emailCampaigns`).all();
console.log('campaigns', campaigns);

campaigns.forEach(campaign=>{
  const emails = JSON.parse(campaign.emails);
  const emailToSend=emails.find(email=>{
    return email.sent==false
  
      });
      const altSendDate= new Date(new Date().getTime() + 1000 * 60 * 30).getTime();
      console.log('alt time',altSendDate);
      if( emailToSend)sendEmailJob(emailToSend.sendDate<new Date().getTime()?altSendDate:emailToSend.sendDate, campaign.id, emailToSend.id );

})
  }
  catch(error){
    console.log('server start error', error);
  }

//mozda dodati i retry numbers i pokusati da posaljem mejl kroz 30 min. Tipa 5 retryja
//kad radim retryje, svaki email pomeriti za 30 min.
}


//PUT ADDITIONAL CODE HERE. IMPORTANT!

console.log('Additional code.');



app.prepare().then(() => {

  dbCleaner();
  //Here start email crons
  startEmailJobs();
  

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT} - env ${process.env.NODE_ENV}`);
  });
});