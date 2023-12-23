import { generateToken } from "../utils/auth.js"; // Import necessary functions for token generation and password verification
import RateLimiter from "@/utils/rateLimiter.js";
import { Xumm } from "xumm";

const limiterPerHour = new RateLimiter({
  apiNumberArg: 8,
  tokenNumberArg: 8,
  expireDurationArg: 3600, //secs
});

export default async function logHandler(req, res) {
  try {
    // const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // if (!(await limiterPerHour.rateLimiterGate(clientIp)))
    //   return res.status(429).json({ error: "Too many requests." });

    // Retrieve user data from the database based on the username


    const xumm = new Xumm(process.env.XUMM_KEY,
        process.env.XUMM_SECRET
        
      );

      console.log("pong", await xumm.ping());
      const transaction = { TransactionType: 'SignIn' };
      console.log("payload", await xumm.payload?.create(transaction))

    //   const payload = {
    //     txjson: {
    //       TransactionType: 'Payment',
    //       Destination: 'rGY3h8Bv6DytD9B5byRBr49owzXsA9qYBw', // Replace with your own XRP address
    //       Amount: '1000000', // Replace with the amount of XRP to receive
    //     },
    //     options: {
    //       submit: true,
    //     },
    //   };


      const transactionResponse = await xumm.createPayloadAndSign(payload);

if (transactionResponse.isError) {
  console.log('Error submitting Xumm transaction:', transactionResponse.error);
  return res
          .status(500)
          .json({ success: false, error: transactionResponse.error });
  // Handle the error (e.g., log, notify user, etc.)
} else {
  // The transaction was submitted successfully
  const payloadReference = transactionResponse.uuid;
  console.log('Xumm transaction submitted successfully. Payload reference:', payloadReference);

  return res
  .status(200)
  .json({ success: true, payLoadRef: payloadReference });
}
   
   
      

    
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: e });
  }
  console.log('weird');
  res.status(500).json({ success: false, error: 'Transaction initiation failed.' });
}
