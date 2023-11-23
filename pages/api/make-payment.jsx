import paypal from "@paypal/checkout-server-sdk";
import productsData from "../../data/products.json";
import betterSqlite3 from "better-sqlite3";
import RateLimiter from "@/utils/rateLimiter.js";

const limiterPerDay = new RateLimiter({
  apiNumberArg: 2,
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

const makePayment = async (req, res) => {
  const putInDatabase = (orderId) => {
    return new Promise((resolve, reject) => {
      try {
        const db = betterSqlite3(process.env.DB_PATH);
        //  db.prepare(`DROP TABLE IF EXISTS orders`).run();
        db.prepare(
          `
          CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY,
            email TEXT,
            firstName TEXT,
            lastName TEXT,
            address TEXT,
            apt TEXT,
            country TEXT,
            postcode TEXT,
            state TEXT,
            suburb TEXT,
            phone TEXT,
            discount TEXT,
            items TEXT,
            orderId TEXT,
            packageStatus TEXT,
            approved BOOLEAN,
            createdDate INTEGER
          )
        `,
        ).run();

        const {
          email,
          firstName,
          lastName,
          address,
          apt,
          country,
          postcode,
          state,
          suburb,
          phone,
          discount,
          items,
        } = req.body.order;

        db.prepare(
          `INSERT INTO orders (email, firstName, lastName, address, apt, country, postcode, state, suburb, phone, discount, items, orderId, packageStatus, approved, createdDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '0', false, ?)`,
        ).run(
          email,
          firstName,
          lastName,
          address,
          apt,
          country,
          postcode,
          state,
          suburb,
          phone,
          discount,
          JSON.stringify(items),
          orderId,
          Math.floor(Date.now() / 86400000),
        );

        db.close();
        resolve("Order placed successfully.");
      } catch (error) {
        console.error("Error in database operations:", error);
        reject("Error in database operations.");
      }
    });
  };

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    if (!(await limiterPerDay.rateLimiterGate(clientIp)))
      return res.status(429).json({ error: "Too many requests." });

    let totalPrice = req.body.order.items
      .reduce((sum, product) => {
        const productInfo = productsData.find((item) => item.id === product.id);
        if (productInfo) {
          sum += productInfo.price * product.quantity;
        }

        return sum;
      }, 0)
      .toFixed(2);

    console.log(totalPrice);
    const discount = req.body.order.discount;
    if (discount != "0") {
      const discountFloat = parseFloat(discount);

      totalPrice = totalPrice - discountFloat;
      totalPrice.toFixed(2);
    }

    let request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: totalPrice,
          },
        },
      ],
      application_context: {
        payment_method: {
          payer_selected: "PAYPAL",
          payee_preferred: "UNRESTRICTED",
        },
      },
    });

    const response = await client.execute(request);

    // Check if the payment is approved
    if (response.result.status === "CREATED") {
      await putInDatabase(response.result.id);
      res.status(200).json({ success: true, orderId: response.result.id });
    } else {
      // Payment was not successful
      res
        .status(400)
        .json({ success: false, error: "Payment was not approved." });
    }
  } catch (error) {
    // Handle errors

    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, error: "Error verifying payment." });
  }
};

export default makePayment;
