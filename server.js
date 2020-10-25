const dev = process.env.NODE_ENV !== "production";
require('dotenv').config()
const express = require("express");
const next = require("next");
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();

app.prepare().then(() => {
  server.all("*", (req, res) => {
    return handle(req, res);
  });
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('Server is ready!');
  });
}).catch((exception) => {
  console.error(exception.stack);
  process.exit(1);
})
