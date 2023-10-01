import sqlite3 from 'sqlite3';

export default async function handler(req, res) {





  if (req.method === 'GET') {
    try {
      const db = new sqlite3.Database(process.env.DB_PATH);

    // Define a database query for fetching data (example: all orders)



    db.all('SELECT * FROM orders', (err, rows) => {
        if (err) {
          console.error('Error fetching orders:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // You can provide table details along with the data
          const tableDetails = {
            tableName: 'orders',
            columnNames: ['email', 'firstName', 'lastName', 'address', 'apt', 'country', 'postcode', 'state', 'suburb', 'phone'], // Add more column names as needed
          };
  
          res.status(200).json({ tableDetails, data: rows });
        }
        db.close();
      });


    
    } catch (error) {
      console.error('Error handling GET request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    // Handle POST requests here
    try {

       if(!req.body.table)return;


        if(req.body.table=='subscribers'){
            


            const db = new sqlite3.Database(process.env.DB_PATH);

      
            db.serialize(() => {
                db.run(`
                CREATE TABLE IF NOT EXISTS subscribers (
                  email TEXT
                )
              `);
      
         
      
              db.run(
                'INSERT INTO subscribers (email) VALUES (?)',
                [req.body.email],
                (err) => {
                  if (err) {
                    console.error('Error inserting order:', err);
                    res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                    console.log('Successfully subscribed.');
                    res.status(201).json({ message: 'Successfully subscribed.' });
                  }
                  db.close();
                }
              );
            });



        }

      


  else if(req.body.table=='orders'){

      const db = new sqlite3.Database(process.env.DB_PATH);

      if(!req.body.order.hasOwnProperty('approved')  ){

      
      db.serialize(() => {
        db.run(`
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
            orderProducts TEXT,
            packageStatus TEXT,
            approved BOOLEAN,
            orderId TEXT
            
          )
        `);

        // Assuming you have the order data in the request body
        // const { name, surname, email } = req.body;
        const { email, firstName, lastName, address, apt, country, postcode, state, suburb, phone, orderProducts} = req.body.order;

        db.run(
          'INSERT INTO orders (email, firstName, lastName, address, apt, country, postcode, state, suburb, phone, orderProducts, packageStatus, approved, orderId  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "Not Ordered", false, "")',
          [email, firstName, lastName, address, apt, country, postcode, state, suburb, phone, orderProducts],
          (err) => {
            if (err) {
              console.error('Error placing order:', err);
              res.status(500).json({ error: 'Error placing order.' });
            } else {
              console.log('Order placed successfully.');
              res.status(201).json({ message: 'Order placed successfully.' });
            }
            // Close the database connection when done
            db.close();
          }
        );
      });}

      else{


        const {email, approved, orderId} = req.body.order;

        db.serialize(() => {
        db.run(
          'UPDATE orders SET approved = ?, orderId = ? WHERE id = (SELECT MAX(id) FROM orders WHERE email = ?)',
          [approved, orderId, email],
          (err) => {
            if (err) {
              res.status(500).json({ error: 'Error approving order.' });
            } else {
              res.status(201).json({ message: 'Order approved successfully.' }); 
            }
          }
        );

        db.close();
        }

        );

      }

    }




      else if(req.body.table=='messages'){

        // Create a new SQLite database connection
        const db = new sqlite3.Database(process.env.DB_PATH);
  
        
        db.serialize(() => {
          db.run(`
            CREATE TABLE IF NOT EXISTS messages (
              id INTEGER PRIMARY KEY,
              email TEXT,
              name TEXT,
              message TEXT
              
            )
          `);
  
          // Assuming you have the order data in the request body
          // const { name, surname, email } = req.body;
          const { email, name, message } = req.body.message;
  
          db.run(
            'INSERT INTO messages (email, name, message) VALUES (?, ?, ?)',
            [email, name, message],
            (err) => {
              if (err) {
                console.error('Error sending message:', err);
                res.status(500).json({ error: 'Error sending message' });
              } else {
                console.log('Order inserted successfully.');
                res.status(201).json({ message: 'Message sent successfully.' });
              }
              // Close the database connection when done
              db.close();
            }
          );
        });}








      
    } catch (error) {
      console.error('Error handling POST request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }


  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
