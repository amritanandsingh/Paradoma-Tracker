// server.js
const express = require('express');
const app = express();
const port = 3000;
const db = require("./config/mongoose");
const cors = require('cors');
const jsonwebtoken = require('jsonwebtoken');
const jwksRsa = require("jwks-rsa");

const authConfig = {
  domain: 'dev-7d0ygutb8yledbnb.us.auth0.com',
  audience: 'sr90NTWpUqYxMBupqN2L8HRDz4rDbAyM',
};

app.use(cors());
app.use(express.json());


app.use("/", require("./routes/index"));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello, this is a simple Express API!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
