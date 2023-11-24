import { verifyToken } from "../../utils/auth.js"; // Adjust the path based on your project structure
import RateLimiter from "@/utils/rateLimiter.js";
import betterSqlite3 from "better-sqlite3";

const limiterPerTwoMins = new RateLimiter({
  apiNumberArg: 5,
  tokenNumberArg: 20,
  expireDurationArg: 120, //secs
});

export default async function adminCheckHandler(req, res) {
  const { token } = req.cookies;

  const getFromDb = (table, queryCondition) => {
    try {
      const db = betterSqlite3(process.env.DB_PATH);

      let queryString;
      if (table === "orders" || table === "messages") {
        queryString = `SELECT * FROM ${table} WHERE ${queryCondition}`;
      } else {
        queryString = `SELECT id, name, text, stars, imageNames, product_id FROM ${table} WHERE ${queryCondition}`;
      }

      // Fetching data from the specified table with the given query condition
      const rows = db.prepare(queryString).all();

      // Closing the database connection
      db.close();

      res.status(200).json({ data: rows });
    } catch (error) {
      console.error("Error fetching data from database:", error);
      return res
        .status(500)
        .json({ successfulLogin: false, error: "No data to send" });
    }
  };

  const updateDb = async (table, data, queryCondition) => {
    try {
      const db = betterSqlite3(process.env.DB_PATH);

      for (let i = 0; i < data.length; i++) {
        if (table === "reviews") {
          if (data[i].deleted) {
            const deleteStatement = db.prepare(
              `DELETE FROM ${table} WHERE id = ?`,
            );
            deleteStatement.run(data[i].id);
            db.prepare(`UPDATE ${table} SET id = id - 1 WHERE id > ?`).run(
              data[i].id,
            );
          } else {
            db.prepare(`UPDATE ${table} ${queryCondition}`).run(
              data[i].name,
              data[i].text,
              data[i].imageNames === "null" ? null : data[i].imageNames,
              data[i].id,
            );

            if (data[i].swapId) {
              const currentRowData = db
                .prepare(`SELECT * FROM ${table} WHERE id = ?`)
                .get(data[i].id);
              const targetRowData = db
                .prepare(`SELECT * FROM ${table} WHERE id = ?`)
                .get(data[i].swapId);

              if (targetRowData) {
                db.prepare(
                  `UPDATE ${table} SET name = ?, text = ?, stars = ?, imageNames = ? WHERE id = ?`,
                ).run(
                  targetRowData.name,
                  targetRowData.text,
                  targetRowData.stars,
                  targetRowData.imageNames,
                  data[i].id,
                );

                db.prepare(
                  `UPDATE ${table} SET name = ?, text = ?, stars = ?, imageNames = ? WHERE id = ?`,
                ).run(
                  currentRowData.name,
                  currentRowData.text,
                  currentRowData.stars,
                  currentRowData.imageNames,
                  data[i].swapId,
                );
              } else {
                db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(data[i].id);

                db.prepare(
                  `INSERT INTO ${table} (id, name, text, stars, imageNames, product_id) VALUES (?, ?, ?, ?, ?, ?)`,
                ).run(
                  data[i].swapId,
                  currentRowData.name,
                  currentRowData.text,
                  currentRowData.stars,
                  currentRowData.imageNames,
                  currentRowData.product_id,
                );
              }
            }
          }
        } else {
          db.prepare(`UPDATE ${table} ${queryCondition}`).run(
            data[i].status,
            data[i].id,
          );
        }
      }

      db.close();

      return res.status(200).json({ data_saved: true });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ successfulLogin: false, error: "Database update error" });
    }
  };

  //   } catch (error) {
  //     console.error('Error handling GET request:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // }

  try {
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    if (!(await limiterPerTwoMins.rateLimiterGate(clientIp)))
      return res.status(429).json({ error: "Too many requests." });

    // Verify the token
    const userIsAdmin = verifyToken(token);

    // You might want to check if the user with this ID has admin privileges in your database
    // For simplicity, let's assume userId 1 is the admin
    if (userIsAdmin) {
      const { dataType, data } = req.body;
      console.log(dataType);
      if (!dataType) return res.status(200).json({ successfulLogin: true });
      else {
        if (dataType === "get_unfulfilled_orders")
          return getFromDb("orders", `approved = '1' AND packageStatus = '0'`);
        else if (dataType === "get_unapproved_orders")
          return getFromDb("orders", `approved = '0'`);
        else if (dataType === "get_fulfilled_orders")
          return getFromDb("orders", `packageStatus != '0'`);
        else if (dataType === "get_unanswered_messages")
          return getFromDb("messages", `msgStatus = '0'`);
        else if (dataType === "get_answered_messages")
          return getFromDb("messages", `msgStatus != '0'`);
        else if (dataType === "get_reviews")
          return getFromDb(
            "reviews",
            `product_id = ${data.product_id}`,
          ); //Doraditi za product_id===data.product_id
        else if (dataType === "get_subscribers")
          return getFromDb("subscribers", ``);
        else if (dataType === "send_unfulfilled_orders") {
          if (!data)
            return res
              .status(500)
              .json({ successfulLogin: false, error: "No data to send" });

          await updateDb("orders", data, `SET packageStatus = ? WHERE id = ?`);
        } else if (dataType === "send_unanswered_messages") {
          if (!data)
            return res
              .status(500)
              .json({ successfulLogin: false, error: "No data to send" });

          await updateDb("messages", data, `SET msgStatus = ? WHERE id = ?`);
        } else if (dataType === "send_reviews") {
          if (!data)
            return res
              .status(500)
              .json({ successfulLogin: false, error: "No data to send" });

          await updateDb(
            "reviews",
            data,
            "SET name = ?, text = ?, imageNames = ? WHERE id = ?",
          );
        } else {
          console.error("Wrong data type");
          res
            .status(500)
            .json({ successfulLogin: false, error: "Wrong data type" });
        }
      }
    } else {
      res
        .status(400)
        .json({
          successfulLogin: false,
          error: "You do not have access to this sector. Get lost noob.",
        });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ successfulLogin: false, error: "Internal Server Error" });
  }
} //