import { OAuth2Client } from  'google-auth-library';

// Your Google API credentials
const YOUR_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const YOUR_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const YOUR_REDIRECT_URI = process.env.GOOGLE_CLIENT_URI;

const oAuth2Client = new OAuth2Client(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URI
);

export default async function validateToken(paymentToken){

    console.log('ptoken',paymentToken);


    try{
    const ticket = await oAuth2Client.verifyIdToken({
        idToken: paymentToken,
        audience: YOUR_CLIENT_ID, // Specify your Google API client ID
      });



      // Validate and decode the payment token using google-auth-library
      console.log(ticket);

      const payload = ticket.getPayload();

      // Now 'payload' contains the decoded information from the payment token
      console.log('Decoded payment token:', payload);

      // Perform additional server-side processing, validation, and storage
      // ...

      // Respond to the client with success or failure
     return true;
    } catch (error) {
      console.error('Error decoding payment token:', error);

      return false;
    }
  }