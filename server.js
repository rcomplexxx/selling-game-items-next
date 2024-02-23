const next = require('next');
const express = require('express');
const dbCleaner = require('./utils/dbCleaner.jsx');




const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();


//PUT ADDITIONAL CODE HERE. IMPORTANT!

console.log('Additional code.');

app.prepare().then(() => {

  dbCleaner();

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT} - env ${process.env.NODE_ENV}`);
  });
});