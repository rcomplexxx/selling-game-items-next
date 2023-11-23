import paypal from "@paypal/checkout-server-sdk";
import betterSqlite3 from "better-sqlite3";
import RateLimiter from "@/utils/rateLimiter.js";
import nodemailer from "nodemailer";

const limiterPerDay = new RateLimiter({
  apiNumberArg: 3,
  tokenNumberArg: 24,
  expireDurationArg: 86400, //secs
});

// Set up your PayPal credentials
const clientId = process.env.PAYPAL_CLIENT_ID; // PayPal Client ID
const clientSecret = process.env.PAYPAL_CLIENT_SECRET; // PayPal Client Secret

// Create a PayPal client
const environment =
  process.env.NODE_ENV === "production"
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);

const client = new paypal.core.PayPalHttpClient(environment);

const approvePayment = async (req, res) => {
  const { orderId } = req.body;
  console.log(orderId);

  const updateDb = async (orderId) => {
    return new Promise((resolve, reject) => {
      try {
        const db = betterSqlite3(process.env.DB_PATH);

        // Updating the 'approved' field in the 'orders' table using prepared statements

        const result = db
          .prepare("UPDATE orders SET approved = ? WHERE orderId = ?")
          .run(1, orderId);

        // Check the result of the update operation
        if (result.changes > 0) {
          // If changes were made, resolve the promise
          resolve("Order approved successfully.");
        } else {
          // If no changes were made, reject the promise with an error message
          reject("Error: Order not found or not updated.");
        }

        // Closing the database connection
        db.close();
      } catch (error) {
        reject("Error in database operations." + error);
      }
    });
  };

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!(await limiterPerDay.rateLimiterGate(clientIp)))
      return res.status(429).json({ error: "Too many requests." });

    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});
    const response = await client.execute(request);

    if (response.result && response.result.status) {
      let status = response.result.status;
      // Check if the capture was successful
      if (response.result.status === "COMPLETED") {
        await updateDb(orderId);

        try {
          const transporter = nodemailer.createTransport({
            service: "hotmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD,
            },
          });

          await transporter.sendMail({
            //   from: 'orderconfirmed@selling-game-items-next.com',
            from: "rcomplexx@outlook.com",
            to: "rcomplexx@gmail.com",
            subject: "Order Confirmed",
            text: "Your order is confirmed.",
          });
        } catch (error) {
          console.error("Email not sent.");
        }

        return res.status(200).json({ message: "Payment successful" });
      } else if (response.result.status === "INSTRUMENT_DECLINED") {
        res.status(500).json({ error: "INSTRUMENT_DECLINED" });
      } else {
        res.status(500).json({ error: response.result.status });
      }
    }

    res.status(500).json({ error: response.result });
  } catch (error) {
    console.error("Capture request failed:", error);
    res.status(500).json({ error: "Verification error." });
  }
};

export default approvePayment;
